# artifactory安装教程(跟新)

以前自己也总结了artifactory的安装教程, 但是自己搭建的话, 总是报错, 一直没法成功, 找了很多办法, 最后在中国代理官网的帮助下, 终于搞定了, 今天特意分享出来.

# 1. artifactory介绍

## 1. 介绍

Artifactory是一个Maven企业级仓库。它提供先进的代理、高速缓存和安全设施，来供一个强大、独立的重复性和环境建设的Maven所使用。
Artifactory是一个Java的Maven扩展工具，Artifactory拥有很多强大的企业级特性和人性化的用户接口，拥有众多客户群。

Artifactory是一个可以被安装到Tomcat中去的Web应用程序

Artifactory 是一个高级Maven存储管理软件，通过简单易用的用户界面，提供强大的企业级功能，比如LDAP/活动目录集成和精细的权限管理等。作为一个老牌Java Maven私服，Artifactory拥有众多客户群。
Maven是Java开发者中流行的构建工具，Maven的好处之一是可以帮助减少构建应用程序时所依赖的软件构件的副本，Maven建议的方法是将所有软件构件存储于一个叫做repository的远程仓库中。

Maven会从ibiblio.org中的公用仓库中同步构件，这个公用仓库下载缓慢、不稳定，并且不包含一些构件的最新版本，而且不能上传团队私有的构件。通过设置内部Maven仓库，团队可以更有好地利用Maven仓库的优势并且克服使用ibiblio上的仓库时的缺点。

本文着眼于Maven仓库工具应提供的一些功能，列出了选择Maven仓库工具的标准，说明了使用Artifactory设置Maven仓库的相关步骤。在Linux和Windows中设置Maven仓库的过程是相同的，少数不同点在文中已经用高亮显示，本文列出了与这个Maven仓库的使用有关的POM文件的范例，用截图来向用户阐述如何设置Maven仓库，Maven和artifactory配置范例也有列出。

## 2. maven仓库的目的

Maven仓库的目的是作为团队内所使用的所有软件构件的内部私有构件仓库，将Maven构件（jar和pom）存储到一个专门的Maven仓库比将它们存储到版本控制系统中更有优势，这是因为：

- 构件（jar）是二进制文件，不属于版本控制系统，版本控制系统在处理文本文件方面比较好
- 保持较小的版本控制数据库
- Checkout、update和其他版本控制的操作可以更快

## 3. 构建内部私有仓库的优势

- 减少可能的版本冲突

- 减少首次构建时需要的手动干涉

- 中央仓库包含所有依赖的软件构件，引用单一的中央仓库比引用多个独立的本地库要好

- 使用内部仓库做clean构建时会快些，因为Maven构件是从内部服务器而不是从因特网上的ibiblio服务器获取。

# 2. 安装Artifactory

Artifactory 的官网 https://jfrog.com/open-source/

## 1. 准备工作

1. 安装jdk8

```shell
sudo yum install java-1.8.0-openjdk-devel
```

2. 添加JAVA_HOME

```shell
sudo vim /etc/profile
```

添加:

```shell
export JAVA_HOME=$(dirname $( dirname $(readlink $(readlink $( which javac)))))
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/jre/lib:$JAVA_HOME/lib:$JAVA_HOME/lib/tools.jar
```

## 2. 下载

目前artifactory已经更新到7.3.2, 6和7的安装方式还是稍微有一些区别, 我们按照6.18.1版本的方式进行安装

下载地址:https://jfrog.com/download-legacy/

linux版本的6.18.1的下载地址为: https://bintray.com/standAloneDownload/downloadArtifact?product=artifactory&artifactPath=/jfrog/artifactory-pro/org/artifactory/pro/jfrog-artifactory-pro/6.18.1/jfrog-artifactory-pro-6.18.1.zip&callback_id=anonymous

下载对应的zip包, 并进行解压在适当的地方: 

```shel
# 下载
cd /usr/local/src
wget https://bintray.com/standAloneDownload/downloadArtifact?product=artifactory&artifactPath=/jfrog/artifactory-pro/org/artifactory/pro/jfrog-artifactory-pro/6.18.1/jfrog-artifactory-pro-6.18.1.zip&callback_id=anonymous

# 解压
unzip jfrog-artifactory-pro-6.18.1.zip
mv jfrog-artifactory-pro-6.18.1 /data/apps/
cd /data/apps/jfrog-artifactory-pro-6.18.1

# 配置环境变量, ARTIFACTORY_HOME变量在安装服务的时候需要用到
sudo vim /etc/profile
# 添加如下配置信息
export ARTIFACTORY_HOME=/data/apps/artifactory-pro-6.18.1
```

## 3. 安装成系统服务

创建 service, 执行

```shell
sudo $ARTIFACTORY_HOME/bin/installService.sh
```

修改jvm参数

```java
sudo vim $ARTIFACTORY_HOME/etc/default
```

注意一点, default 里有个 `START_TMO` 参数, 配置 service 启动的超时时间, 默认 60s. 而实际测下来, 基本启动时间都在90秒左右, 所以这个值需要按需配置. **比如配置为180.**

## 4. 配置数据库

#### 1. 创建数据库

因为我们使用的是mysql数据库, artifactory提供了各种数据库的模板,我们复制过来就好了, 但是创建数据库的时候, 官网也给出了一些要求, 给出了了示例创建脚本createdb.sql脚本

**注意:**要注明COLLATE utf8_bin

```mysql
CREATE DATABASE artdb CHARACTER SET utf8 COLLATE utf8_bin;
GRANT ALL on artdb.* TO 'artifactory'@'localhost' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
```

#### 2. 配置mysql

mysql提供了数据库模板,  只需要把`$ARTIFACTORY_HOME/misc/db/mysql.properties`拷贝到`$ARTIFACTORY_HOME/etc/db.properties`下面, 并进行下面的修改:

使用的是 mysql, 修改 $ARITFACTORY_HOME/etc/db.properties

```shell
type=mysql
driver=com.mysql.jdbc.Driver
url=jdbc:mysql://ip:3306/jfrog?characterEncoding=UTF-8&elideSetAutoCommits=true&useSSL=false
username=jfrog_rw
password=<password>
```

#### 3. 必须要安装的jar包

`/data/servers/artifactory-pro-6.18.1/bin/configure.mysql.sh` 下面提供了

```shell
JDBC_VERSION=5.1.24
JDBC_JAR=mysql-connector-java-${JDBC_VERSION}.jar
```

artifactory里面没有自带的jdbc的包, 我们需要下载一下. 下载地址:https://repo1.maven.org/maven2/mysql/mysql-connector-java/5.1.24/, 选择合适的版本就可以了.



## 5. 配置二进制文件系统

本次存储的话, 就不用配置binnarystore.xml, 不配置就是存储在本地

使用的是 阿里云 oss, 修改 $ARITFACTORY_HOME/etc/binarystore.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<config version="2">
    <chain template="s3"/>
    <provider id="s3" type="s3">
       <endpoint>https://prod-jfrog-artifactory-ajing.oss-cn-test-internal.aliyuncs.com</endpoint>
       <identity>[ api key ]</identity>
       <credential>[ api key secret ]</credential>
       <httpsOnly>false</httpsOnly>
       <bucketName>prod-jfrog-artifactory-ajing</bucketName>
       <property name="s3service.disable-dns-buckets" value="true"></property>
       <multipartElementSize>4194304</multipartElementSize>
       <multiPartLimit>10000000000</multiPartLimit>
    </provider>
</config>
```

## 6. 配置ha-node

不配置集群的话, 单机就不需要改节点

我们在 $ARTIFACTORY_HOME/etc/ 下创建文件 `ha-node.properties`

```shell
node.id=art01 ## HA集群中, 全局唯一
context.url=http://ip:8081/artifactory ## 这里按需修改为自己的 ip
membership.port=0 ## 别改就对了
primary=true ## 只有 primary 为 true, 其它节点都为 false
```

## 7. 启动应用

此时, 已经完成了 primary node 的配置. 我们通过 systemctl 启动服务. 我们通过如下命令启动:

```shell
sudo systemctl start artifactory
```

访问方式为: `http://ip:8081`.

![1](/Users/lingjing/公众号/artifactory/1.png)

默认的密码: admin/password, 登陆成功后可以看到以下界面

