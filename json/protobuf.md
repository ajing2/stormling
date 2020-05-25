# Protobut

前两天上课听玄姐说pb, 对于我这个菜鸡来说, 这玩意都没有听说过, 只能先补充一下基础支持了

# 1. protobut简介

## 1. protobut介绍

Protocol Buffers(简称protobuf), protobuf是google提供的一个开源序列化框架，类似于XML，JSON这样的数据表示语言，其最大的特点是基于二进制，因此比传统的XML表示高效短小得多。虽然是二进制数据格式，但并没有因此变得复杂，开发人员通过按照一定的语法定义结构化的消息格式，然后送给命令行工具，工具将自动生成相关的类，可以支持php、java、c++、python等语言环境。通过将这些类包含在项目中，可以很轻松的调用相关方法来完成业务消息的序列化与反序列化工作。

 protobuf在google中是一个比较核心的基础库，作为分布式运算涉及到大量的不同业务消息的传递，如何高效简洁的表示、操作这些业务消息在google这样的大规模应用中是至关重要的。而protobuf这样的库正好是在效率、数据大小、易用性之间取得了很好的平衡。

官方文档
http://code.google.com/p/protobuf/

## 2. protobuf的优缺点

Protobuf的优点如下：
A、性能好，效率高: 序列化后字节占用空间比XML少3-10倍，序列化的时间效率比XML快20-100倍。
B、有代码生成机制: 将对结构化数据的操作封装成一个类，便于使用。
C、支持向后和向前兼容: 当客户端和服务器同时使用一块协议的时候， 当客户端在协议中增加一个字节，并不会影响客户端的使用
D、支持多种编程语言: Protobuf目前已经支持Java，C++，Python、Go、Ruby等多种语言。

Protobuf的缺点如下：
A、二进制格式导致可读性差
B、缺乏自描述

# 2. idea安装protobuf插件

安装插件protobuf Support，之后重启

![2](/Users/lingjing/公众号/json/2.png)

# 3. 配置maven依赖

```maven
<dependencies>
        <dependency>
            <groupId>com.google.protobuf</groupId>
            <artifactId>protobuf-java</artifactId>
            <version>3.4.0</version>
        </dependency>
</dependencies>

<build>
        <extensions>
            <extension>
                <groupId>kr.motd.maven</groupId>
                <artifactId>os-maven-plugin</artifactId>
                <version>1.4.1.Final</version>
            </extension>
        </extensions>
        <plugins>
            <plugin>
                <groupId>org.xolstice.maven.plugins</groupId>
                <artifactId>protobuf-maven-plugin</artifactId>
                <version>0.5.0</version>
                <configuration>
                    <protocArtifact>
                        com.google.protobuf:protoc:3.1.0:exe:${os.detected.classifier}
                    </protocArtifact>
                    <pluginId>grpc-java</pluginId>
                </configuration>
                <executions>
                    <execution>
                        <goals>
                            <goal>compile</goal>
                            <goal>compile-custom</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
</build>
```

# 4. 书写proto文件

```protobuf
syntax = "proto3";
option java_package = "com.jihite";
option java_outer_classname = "PersonModel";

message Person {
     int32 id = 1;
     string name = 2;
     string email = 3;
}
```

# 5. 转换成java文件

![3](/Users/lingjing/公众号/json/3.png)

# 6.  测试

把生成的类考的代码路径下，用下面测试用例测试

```java
package com.jihite;

import com.google.protobuf.InvalidProtocolBufferException;
import org.junit.Test;
public class protobufTest {
    @Test
    public void testN() throws InvalidProtocolBufferException {
        PersonModel.Person.Builder builder = PersonModel.Person.newBuilder();
        builder.setId(1);
        builder.setName("jihite");
        builder.setEmail("jihite@jihite.com");

        PersonModel.Person person = builder.build();
        System.out.println("before:" + person);

        System.out.println("===Person Byte:");
        for (byte b : person.toByteArray()) {
            System.out.print(b);
        }
        System.out.println("================");

        byte[] byteArray = person.toByteArray();
        PersonModel.Person p2 = PersonModel.Person.parseFrom(byteArray);
        System.out.println("after id:" + p2.getId());
        System.out.println("after name:" + p2.getName());
        System.out.println("after email:" + p2.getEmail());

    }
}
```

结果:

```java
before:id: 1
name: "jihite"
email: "jihite@jihite.com"

===Person Byte:
811861061051041051161012617106105104105116101641061051041051161014699111109================
after id:1
after name:jihite
after email:jihite@jihite.com
```

