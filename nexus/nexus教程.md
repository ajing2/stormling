# Nexus教程

# 1. nexus介绍

## 1. 什么是nexus?

nexus是一个强大的maven仓库管理器,它极大的简化了本地内部仓库的维护和外部仓库的访问.
nexus是一套开箱即用的系统不需要数据库,它使用文件系统加Lucene来组织数据
nexus使用ExtJS来开发界面,利用Restlet来提供完整的REST APIs,通过IDEA和Eclipse集成使用
nexus支持webDAV与LDAP安全身份认证.
nexus提供了强大的仓库管理功能,构件搜索功能,它基于REST,友好的UI是一个extjs的REST客户端,占用较少的内存,基于简单文件系统而非数据库.


2016 年 4 月 6 日 Nexus 3.0 版本发布，相较 2.x 版本有了很大的改变：

- 对低层代码进行了大规模重构，提升性能，增加可扩展性以及改善用户体验。
- 升级界面，极大的简化了用户界面的操作和管理。
- 提供新的安装包，让部署更加简单。
- 增加对 Docker, NeGet, npm, Bower 的支持。
- 提供新的管理接口，以及增强对自动任务的管理。

## 2. nexus的作用

nexus是一种特殊的maven仓库, 一般用于公司, 比如公司员工开发项目, 需要每个人都去互联网上下载jar包, 这个如果外网网速不太好的好, 是比较痛苦的, 而且如果把自己的jar包上传到外部服务器,这个也是比较危险的, 此时,公司就需要搭建一个私服, 可以提供大家去私服下载jar包, 而且开发人员封装好自己的工具以后, 也可以直接发布到私服上, 其他的开发人员有额可以直接下载下来.

## 3. nexus的好处

1. 加速构建；
2. 节省带宽；
3. 节省中央maven仓库的带宽；
4. 稳定（应付一旦中央服务器出问题的情况）；
5. 控制和审计；
6. 能够部署第三方构件；
7. 可以建立本地内部仓库；
8. 可以建立公共仓库

这些优点使得Nexus日趋成为最流行的Maven仓库管理器。


# 2. 安装

nexus仓库管理器，分为两个版本，Nexus Repository Manager OSS 和 Nexus Repository Manager Pro。前者可以免费使用，相比后者，功能缺少一些，但是不影响我们搭建maven私服。所以就选择OSS版本。oss版本不支持高可用.

下面是下载的地址, 下载可能需要翻墙, 如果你没法翻墙, 放心, 小编已经给你准备好了, 链接:https://pan.baidu.com/s/1KZqbDgybUFrRQdPvlFgRhQ  密码:hfjt

![1](/Users/lingjing/公众号/nexus/1.png)

## 1.准备工作

操作系统: centos6.5+(**注意：内存最低为2G，否则运行报错**)

jdk1.8

maven安装包

nexus-3.21.2-03

## 2. 安装

安装jdk和maven我就不多说了, 大家可以参考网上的例子, 直接安装就好了.

```shell
mkdir -p  /usr/local/nexus-3.21.2  
tar xzvf nexus-3.21.2-03-unix.tar.gz -C /usr/local/nexus-3.21.2
```

可以在nexus-default.properties文件中(nexus/etc)修改web访问端口信息, 默认的端口为: 8081

启动:

```shell
./nexus run
```

## 3. 检验

打开浏览器, 访问http://ip:8081, 如果出现如下的界面, 说明正常启动了, 并且日志中也会有正常的启动信息

![2](/Users/lingjing/公众号/nexus/2.png)

点击Sign in, 如果是老的版本呢, 默认的用户名和密码是admin: admin123

新版本的密码: **/usr/local/nexus-3.21.2/sonatypework/nexus3/admin.password**, 登陆的时候, 会有提示密码存放的提示信息, 查看密码, 登陆就好了.

到此, nexus就安装完成了



# 3. 配置Nexus

## 1. nexus的工作原理

找依赖包的流程如下: 首先我们现在我们自己的pc机器上找,看是否有符合条件的jar包, 如果没有, 再去我们搭建的私服仓库找, 远程私服首先也是在本地找, 看是否有缓存的文件, 如果没有, 再去代理的远程仓库找(可以配置多个远程仓库)

![3nexus工作原理](/Users/lingjing/公众号/nexus/3nexus工作原理.png)

## 2. Nexus仓库类型

默认安装有以下这几个仓库, 在控制台也可以修改远程仓库的地址, 第三方库等.

- hosted(宿主仓库): 存在本公司开发的jar包(正式版本, 测试版本)
- proxy(代理仓库): 代理中央仓库, Maven官网的仓库
- group(组仓库):  使用时连接组仓库, 包含Hosted仓库和Proxy仓库



## 3. 界面元素介绍

我们首先登陆管理员界面, 然后点击"设置", 然后点击"Repository", 在点击Repositories, 我们就可以看到如图所示的页面信息

![4](/Users/lingjing/公众号/nexus/4.jpg)

其实nexus预设了几个仓库给我们

1. 我们先来看maven-public, 类型为group, 这个简单理解为仓库的集合, 其他的仓库就是可以加入到这个集合中的.我们点击进去编辑,可以看到, URL: http://ip:8081/repository/maven-public/, 我们终端用户在配置上, 只需要配置上面这个url, 而不用单独配置多个仓库, 用户也不需要知道某个jar包具体来源于maven中央仓库, 或者是Apache Snapshots, 或者是我们自己添加的其他仓库.

这样的好处在于, 如果我们要新增某个仓库(如开源中国, 阿里云), 客户端不需要做任何更改, 只需要在nexus上将要新增的仓库加入到对外提供服务的仓库group中就可以.

2. 下面我们来看maven-releases, maven-snapshots, 这个两个都是hosted类型, 意思是由nexus本机管理的仓库.
3. maven-central是类型为proxy的仓库, 意思为远端仓库代理, 我们查看他的配置信息, 我们可以看到, proxy的url地址为: https://repo1.maven.org/maven2/

![5](/Users/lingjing/公众号/nexus/5.png)

而这个就是我们proxy的远程配置信息

4. 好了, 那我们这几个maven的配置都熟悉完了, 怎么让hosted和proxy的都属于group组的呢? 我们重新打开maven-public的设置页面, 我们看到最后

![6](/Users/lingjing/公众号/nexus/6.png)

我们看到, 我们在这个group中, 是可以看到hosted和proxy的所有设置的, 我们只需要把我们需要的设置添加到左边的选择框中, 我们就可以选择我们所需要的类型就可以了

## 4. 配置阿里云远程仓库

我们配置一下maven仓库, 增加阿里云仓库代理地址

阿里云的仓库地址为: **[http://maven.aliyun.com/nexus/content/groups/public/](https://links.jianshu.com/go?to=http%3A%2F%2Fmaven.aliyun.com%2Fnexus%2Fcontent%2Fgroups%2Fpublic%2F)**, 我们新建一个maven类型的仓库地址, 注意, nexus可以提供多用类型的使用, 我们只需要找符合我们需求的就可以了, 如下

![7](/Users/lingjing/公众号/nexus/7.png)

我们选择maven2(proxy), 然后填入阿里云相关的信息, 就ok了

![8](/Users/lingjing/公众号/nexus/8.png)

最后, maven-pulic会自动把我们新建的仓库添加到自己的group中, 如图

![9](/Users/lingjing/公众号/nexus/9.png)

# 4. 配置下载setting.xml文件

我们客户端在使用maven的时候, maven的配置文件中有一个文件叫setting.xml, 如下图所示:

![10](/Users/lingjing/公众号/nexus/10.png)

## 1. 添加maven仓库镜像

我们需要在我们的setting.xml文件中, 设置我们nexus的仓库地址:

```xml
<mirrors>
  	<mirror>
  		<id>nexus-myself</id>
  		<!--*指的是访问任何仓库都使用我们的私服-->
  		<mirrorOf>*</mirrorOf>
  		<name>Nexus myself</name>
  		<url>http://192.168.124.29:8081/repository/maven-public/</url>
		</mirror>
		<mirror>
    	<id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/mvn/view</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
 </mirrors>
```

当然, 我们的maven配置也是可以支持你设置多个仓库地址的,

你只需要配置我们nexus的地址, 即:maven-public的url在其中, 其实就可以了.

## 2. 配置全局下载依赖(pom中无需在配置)

在maven的setting.xml文件中配置私服配置, 这种方式配置后所有本地使用改配置的maven项目的pom文件都无需配置私服下载相关配置

```xml
<profiles>
  <profile>
     <id>mycof</id>
        <repositories>
        <!-- 私有库地址-->
          <repository>
          <id>nexus</id>
          <url>http://192.168.124.29:8081/repository/maven-public/</url>
          <releases>
            <enabled>true</enabled>
          </releases>
          <snapshots>
            <enabled>true</enabled>
          </snapshots>
        </repository>
      </repositories>      
      <pluginRepositories>
        <!--插件库地址-->
        <pluginRepository>
          <id>nexus</id>
          <url>http://192.168.124.29:8081/repository/maven-public/</url>
          <releases>
            <enabled>true</enabled>
          </releases>
          <snapshots>
            <enabled>true</enabled>
           </snapshots>
        </pluginRepository>
      </pluginRepositories>
    </profile> 
```

激活使用上面的配置:

```xml
<!--激活profile-->
<activeProfiles>
  <activeProfile>mycof</activeProfile>
</activeProfiles>
```

## 3. 单独项目下载依赖(即项目pom文件中配置)

这种配置是修改单个项目的pom文件，无需修改maven的setting配置

```xml
<repositories>
  <repository>
    <id>nexus</id>
    <url>http://192.168.124.29:8081/repository/maven-public/</url>
    <releases>
      <enabled>true</enabled>
    </releases>
    <snapshots>
    <enabled>true</enabled>
    </snapshots>
  </repository>
</repositories>
```

*建议使用全局的setting配置，一个项目组共用一个maven的setting配置，项目中就无需配置下载相关的私服仓库配置*

# 5. 上传jar包

对于中央仓库没有的jar包, 需要我们自己将jar包发布到私服中去, 其中jar包主要分为两类, 一类是本地自己开发供给项目组其余同事使用, 这种直接配置项目的pom文件和maven的setting文件, 之后deploy发布即可发布到;

另一类是第三方jar包, 可以直接使用web页面上传并设置对应GAV即可;

## 1. 本地maven开发的项目上传配置

### 1. maven的setting文件配置

这里要配置上传用户及仓库信息, 这里我们使用一个用户, 在nexus2.x中还设置了一个deployment/deployment123用户, 在3.x改用户删除了, 你也可以自己配置角色和用户, 

```xml
<servers>
    <server>  
        <id>maven-releases</id>  
        <username>admin</username>  
        <password>admin123</password>  
    </server>  
    <server>  
        <id>maven-snapshots</id>  
        <username>admin</username>  
        <password>admin123</password>  
    </server>
  </servers>
```

### 2. 项目中的pom文件配置

```pom
<distributionManagement>
        <repository>
            <id>maven-releases</id>
            <name>Nexus Release Repository</name>
            <url>http://192.168.124.29:8081/repository/maven-releases/</url>
        </repository>
        <snapshotRepository>
            <id>maven-snapshots</id>
            <name>Nexus Snapshot Repository</name>
            <url>http://192.168.124.29:8081/repository/maven-snapshots/</url>
        </snapshotRepository>
    </distributionManagement>
```

### 3. 执行maven的deploy命令

这是myeclipse中上传本地项目jar到私服，IDEA中更为简单直接点击maven周期中的deploy即可

![11](/Users/lingjing/公众号/nexus/11.png)

出现uploading信息并且没报错说明上传成功。

然后到对应的仓库中查看

注意:

1. 这里只有Snapshot的仓库上传成功，Release仓库并没有上传成功，这是因为版本号名称结尾有SNAPSHOT，默认以这个结尾是不会上传到Release仓库去的，去除就会上传到Release仓库且不会上传到快照仓库
2. Release仓库默认不支持重复发布
3. 注意setting中server标签下的id要和pom文件中仓库配置的id相同，即指定上传到哪个仓库

## 2. 第三jar包上传

对于第三方jar包的上传采用nenus提供的web界面上传，上传成功后需要使用该jar包的话，依赖中填写自定义的GAV即可

![12](/Users/lingjing/公众号/nexus/12.png)