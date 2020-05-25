# sonar的offline模式

sonar的模式扫描是使用jacoco插件进行扫描的, 默认的扫描也是on-line模式的, online模式我们线上是一直使用这个, 但是以前也是发现了一个问题, 就是sonar的online模式没法扫描静态方法, 没法提升我们代码的单侧覆盖率, 我们devops组的年中目标是单侧覆盖率达到70%以上,这个对我们来说也是有一个很大的挑战, 我们都在更改代码, 适应这个单侧覆盖率



以前我们说, java的静态方法, 真是没法解决了, 单测覆盖率是没法覆盖了, 我们只能要么让静态方法走一遍, 要么就是自己先不用管这个.但是sonar的offline模式, 就可以很好的解决这个问题, 下面我们就通过sonar的offline模式解决powermock的单侧覆盖率的问题

# 1. offline使用的争取方法

## 1. 配置pom文件

首先需要增加jacoco的maven配置文件和jacoco agent的配置文件, 而且, 版本最好是一直的, 要不然会引发一些问题.

```xml
<properties>
    <jacoco.version>0.8.5</jacoco.version>
    <jacoco-maven-plugin.version>0.8.5</jacoco-maven-plugin.version>

  </properties>

<dependency>
      <groupId>org.jacoco</groupId>
      <artifactId>org.jacoco.agent</artifactId>
      <classifier>runtime</classifier>
      <version>${jacoco.version}</version>
      <scope>test</scope>
</dependency>


下面是jacoco插件的配置内容
			<plugin>
          <groupId>org.jacoco</groupId>
          <artifactId>jacoco-maven-plugin</artifactId>
          <version>${jacoco-maven-plugin.version}</version>
          <executions>
            <execution>
              <id>prepare-agent</id>
              <goals>
                <goal>prepare-agent</goal>
              </goals>
            </execution>
            <execution>
              <id>report</id>
              <phase>prepare-package</phase>
              <goals>
                <goal>report</goal>
              </goals>
            </execution>
            <execution>
              <id>post-unit-test</id>
              <phase>test</phase>
              <goals>
                <goal>report</goal>
              </goals>
              <configuration>
                <dataFile>target/jacoco.exec</dataFile>
                <outputDirectory>target/jacoco-ut</outputDirectory>
              </configuration>
            </execution>
          </executions>
        </plugin>
```

## 2. 编译生成测试报告, 上传

```shell
# 1. 先清空, 在编译
mvn clean compile
# 2. 通过agent的方式, 进行test
mvn org.jacoco:jacoco-maven-plugin:0.8.5:instrument test org.jacoco:jacoco-maven-plugin:0.8.5:restore-instrumented-classes org.jacoco:jacoco-maven-plugin:0.8.5:report -Dmaven.test.failure.ignore=true -Djacoco-agent.destfile=target/jacoco.exec -Djacoco.version=0.8.5
# 3. 上传到sonar服务器上
mvn sonar:sonar -Dsonar.host.url=http://1.1.1.1:9000 -Dsonar.login=xxxxxxxxxxxxxxx

```

## 3. online模式和offline模式的区别

执行离线模式。注意，在执行测试之后，您必须借助“恢复模式化类”的目标恢复原来的类。与jacoco代码覆盖分析的首选方法是在线模式。离线模式有几个缺点，只有在特定场景明确需要这种模式时才应该使用。在使用此模式之前，请参阅有关脱机设备的文档。
离线官方说明：http://www.eclemma.org/jacoco/trunk/doc/offline.html
离线实际上使用了代理，java agent。

online模式:

1. 先进行prepare-agent
2. 进行report

offline模式:

1. instrument, 应该就是mock静态类
2. restore-instrumented-classes, 通过自己内部的方式进行存储
3. report

而在offline模式中, 自始至终都是使用-Djacoco-agent.destfile=target/jacoco.exec, jacoco agent模式的, 通过agent的方式, 进行动态的模拟