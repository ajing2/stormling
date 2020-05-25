#1. docker介绍

##1.1 docker产生的背景

Docker 是云时代的产物，它的诞生是一种必然。

对于云计算\云服务的相关概念，我们不会去阐述。不过如果想了解 Docker，那么必须对云服务的一些运营模式有所了解。

云服务的运营模式:

- IaaS(基础设施即服务):经营的是基础设施，比如阿里云服务器(只安装操 作系统)
- PaaS(平台即服务):经营的是平台，比如 MySQL 开发平台(安装在 linux 里面现成的平台)、redis 开发平台。
- SaaS(软件即服务):经营的是软件，比如公司的OA系统(部署到远程服务 器中的 OA 软件)

Docker 就是伴随着 PaaS 产生的。

##1.2 什么是docker

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应 用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux机器上，也可以实现虚拟化，容器是完全使用沙箱机制，相互之间不会有任何接口。

docker就是一种虚拟化容器技术

通过 Docker 这种虚拟化容器技术，我们可以对物理机的资源进行更加合理有效 的利用，可以将一台物理机器虚拟化出很多个拥有完整操作系统，并且相互独立 的“虚拟计算机”。

##1.3 那什么是虚拟化呢?

在计算机中，虚拟化(英语:Virtualization)是一种资源管理技术，是将计算机 的各种实体资源，如服务器、网络、内存及存储等，予以抽象、转换后呈现出来， 打破实体结构间的不可切割的障碍，使用户可以比原本的组态更好的方式来应 用这些资源。这些资源的新虚拟部份是不受现有资源的架设方式，地域或物理组 态所限制。一般所指的虚拟化资源包括计算能力和资料存储。

在实际的生产环境中，虚拟化技术主要用来解决高性能的物理硬件产能过剩和老 的旧的硬件产能过低的重组重用，透明化底层物理硬件，从而最大化的利用物理 硬件。

![docker1](/Users/lingjing/公众号/docker/docker1.png)

虚拟化技术种类很多，例如:软件虚拟化、硬件虚拟化、内存虚拟化、网络虚拟 化、桌面虚拟化、服务虚拟化、虚拟机等等。

最常用的虚拟化技术有:全虚拟化和操作系统(*OS*)虚拟化。 

比如，*VMware workstation* 就是全虚拟化的实现。

比如，我们要讲的 *Docker*，就是基于操作系统虚拟化技术的一种实现。

基于操作系统创建出一些相互独立的、功能虚拟化技术有多种实现方式，有基于 硬件进行虚拟化的技术，而 Docker 只是针对操作系统进行虚拟化，对于硬件资 源的使用率更低。

- VMware和docker的对比:

![docker2](/Users/lingjing/公众号/docker/docker2.png)



1. 启动速度快，Docker 容器启动操作系统在秒级就可以完成，而 VMware 却是达到分钟级。
2. 系统资源消耗低，一台 Linux 服务器可以运行成千上百个 Docker 容器，而VMware 大概只能同时运行 10 个左右。
3. 更轻松的迁移和扩展，由于 Docker 容器比 VMware 占用更少的硬盘空间， 在需要搭建几套软件环境的情况下，对安装好的 Docker 容器进行迁移会更 快捷，更方便。而且 Docker 容器几乎可以在任意的平台上运行，包括虚拟 机、物理机、公有云，私有云，个人电脑等，这种兼容性，可以让用户将一 个应用程序从一个平台直接迁移到另一个平台。

##1.4 docker的体系架构

- Docker Client客户端
-  Docker Daemon守护进程 
- Docker Image镜像
-  Docker Container容器

![docer3](/Users/lingjing/公众号/docker/docer3.png)

##1.5 docker中的概念

- docker守护进程: docker的守护进程运行在一个主机机器中, 用户不直接和守护进程交互, 而是通过docker客户端
- docker客户端: docker客户端是以二进制的形式出现, 是docker最基本的用户接口, 他用来接收用户的命令, 然后和docker守护进程来沟通
- docer镜像: docker镜像就是一个可读的模板, 我们可以使用docker镜像来创建docker容器, docker提供了一个简单的机制来创建对象或者更新自己已有的镜像, 也可以从其他人那里下载一个已经做好的镜像来使用.
- docker容器: 容器是用来运行应用的. 容器是从镜像中创建的运行实例, 它可以被启动, 开始, 停止, 删除. 每一个容器都相互隔离, 保证安全.
- docker注册处(Registry&Repository): docker注册处保留镜像, 这些是来自于上传或者下载镜像的公众或者私有存储的地方. 公共的docer注册处由docker hub提供.
  - Registry 是集中存放镜像文件的场所
  - Repository 是对于其中的镜像进行分类管理.
  - 一个Registry中会有过个Repository, 一个Repository中会有多个不同tag的Image, 比如: 名称为centos的Repository仓库下, 有tag为6或者7的image镜像

#2. 安装docker

docker默认安装的操作系统是**ubuntu**.

官网有安装各种环境的指南, 请参考https://docs.docker.com/

我自己本省使用mac系统的, 但是我们主要来说一下centos7.x的安装, 因为这个在服务器上用的是最多的.

```shell
# yum 安装
yum install -y docker
# 启动 docker
systemctl start docker.service
# 开启启动docker
systemctl enable docker.service
# 查看docker版本
docker version
```

Mac安装docker

```shell
brew cask install docker
```

如果需要手动下载，请点击以下链接下载: 

stable版本: https://download.docker.com/mac/stable/Docker.dmg

Edge版本: https://download.docker.com/mac/edge/Docker.dmg

# 3. Docker的镜像

## 3.1 镜像管理常用命令

```shell
# 列出镜像
docker images
# 列出正则匹配的镜像
docker images ce*
# images只会列出镜像的基本信息, 详细信息可以通过inspect命令
docker inspect [name]/[image id]
# 搜索镜像
docker search [name]
# 拉取镜像
docker pull [name]
# 删除镜像
docker rmi [name]/[image id]

```

示例:

![docker4](/Users/lingjing/公众号/docker/docker4.png)

Repository: 镜像所在仓库名称

Tag: 镜像的版本

IMAGE ID: 镜像ID

CREATE: 镜像创建事件

SIZE: 镜像大小

## 3.2 构建自己的镜像

构建自己的镜像我们可以通过手动来做, 也可以通过dockfile来做, dockfile的方式我们在后面会单独接收.

### 3.2.1 运行容器

```linux
docker run -it centos:7
```

docker run: 启动容器

-it: 以交互模式进入容器中

### 3.2.2 自定义安装软件

自己安装自己所需要的软件:

示例:

```linux
yum install -y vim
```

### 3.2.3 保存自己的镜像

重新打开一个窗口:

```linux
# 查看docker容器运行的进程
docker ps
```

![docker5](/Users/lingjing/公众号/docker/docker5.png)

```linux
docker commit 29ebec590397 centos_with_vim
# 或者, romantic_swanson 是系统随机给起的名字
docker commit romantic_swanson centos_with_vim
```

![docker6](/Users/lingjing/公众号/docker/docker6.png)

##3.3 镜像迁移

### 3.3.1 导出镜像

```linux
docker save repository:tag/imageId > /root/xx.tar.gz
# -o 输入到的文件
docker save -o mynginx.tar mynginx


```

![docker7](/Users/lingjing/公众号/docker/docker7.png)

### 3.3.2 导入镜像

```linux
docker load < /root/xx.tar.gz
# -i 输入的文件
docker load -i mynginx.tar


```

![docker8](/Users/lingjing/公众号/docker/docker8.png)

### 3.3.3 通过CONTAINER ID导入导出

```linux
## 或者使用, 下面e13c085ecbdf 是通过docker ps 查看的CONTAINER ID
docker export -o myexportcontainer1.tar e13c085ecbdf

## 或者使用
docker import myexportcontainer1.tar mycentos_imported
```

![docker9](/Users/lingjing/公众号/docker/docker9.png)



# 4. docker容器

## 4.1 创建容器

###4.1.1docker run

创建容器常用的参数说明:

- -i:表示运行容器

- -t:表示容器启动后会进入其命令行。加入这两个参数后，容器创建就能登录进去。即

  分配一个伪终端。

- --name :为创建的容器命名。

- -v:表示目录映射关系(前者是宿主机目录，后者是映射到宿主机上的目录)，可以使 用多个-v 做多个目录或文件映射。注意:最好做目录映射，在宿主机上做修改，然后 共享到容器上。

- -d:在run后面加上-d参数,则会创建一个守护式容器在后台运行(这样创建容器后不会 自动登录容器，如果只加-i -t 两个参数，创建后就会自动进去容器)。

- -p:表示端口映射，前者是宿主机端口，后者是容器内的映射端口。可以使用多个-p 做多个端口映射

以交互方式运行容器:
 *docker run -i -t --name* 容器名称 *repository:tag /bin/bash docker run -it --name* 容器名称 *imageID /bin/bash*

以守护进程方式运行容器:
 *docker run -di --name* 容器名称 *repository:tag docker run -di --name* 容器名称 *imageID*

注意:通过 *run* 创建并进入容器之后，如果使用 *exit* 命令退出容器，则容器停止。 再次进入该容器，先使用 *start* 启动容器，再使用 *exec/attach* 命令进入容器。

### 4.1.2 docker create

```linux
docker create --name mycontainer1 centos:7
```

但通过docker ps命令无法看到创建的容器，因为容器没有启动;需要使 用start命令

## 4.2 启动容器

docker start CONTAINER ID/NAME

命令:run、create、start

• 区别:run = create + start

• 示例:
 • docker create --name mycontainer1 mycentos

但通过docker ps命令无法看到创建的容器，因为容器没有启动;需要使 用start命令

• docker start 1a93677f84f5(后面是container ID)
 • docker run -d --name mycontainer2 mycentos(直接使用run命令)

## 4.3 进入容器

进入正在运行的容器的命令如下:

**docker exec -it** 容器名称或者容器 **ID /bin/bash** *docker attach* 容器名称或者容器 *ID*

两者之间的区别:
 *attach* 进入容器之后，如果使用 *exit* 退出容器，则容器停止。
 *exec* 进入容器之后，使用 *exit* 退出容器，容器依然处于运行状态。

## 4.4 查看容器

*docker ps* :查看正在运行的容器 

*docker ps -a*:查看历史运行过的容器 

*docker ps -l*:查看最近运行过的容器

## 4.5 停止容器

*docker stop* 容器名称或者容器 *ID*

## 4.6 删除容器

- 删除指定容器:

*docker rm* 容器名称或者容器 *ID* 

- 删除所有容器:

*docker rm ‘docker ps -a -q’*

![docker10](/Users/lingjing/公众号/docker/docker10.png)

## 4.7 复制文件

*docker cp* 源文件 目标文件 比如:

*docker cp /root/boot.war my-centos:/usr/local/*

说明:
 */root/boot.war* 是宿主机器的路径 *my-centos* 是容器的名称 */usr/local/*是容器内的路径

注意:源文件可以是宿主机器也可以是容器中的文件，同样，目标文件可以是容器也可以是宿主机器的文件。

## 4.8 容器日志

-  查看指定时间后的日志，只显示最后100行:

```linux
docker logs -f -t --since="2018-02-08" --tail=100 CONTAINER_ID
```

- 查看最近30分钟的日志:

```linux
docker logs --since 30m CONTAINER_ID
```

- 查看某时间之后的日志:

```linux
docker logs -t --since="2018-02-08" CONTAINER_ID
```

的说法塑料袋

# 5. dockerfile

在我们构建镜像的时候, 我们即可以手工的去构建对象, 也可以通过dockerfile来进行构建镜像, 而很多应用开发的过程中, 我们可能都需要通过dockerfile来制作我们的镜像, 就需要通过dockefile来帮我们构建镜像, 可以帮助我们省去很多人工的操作, 下面, 我们就来熟悉一下dockerfile的语法吧

## 5.1 什么是dockerFile

**Dockerfile** 是记录了镜像是如何被构建出来的配置文件, 可以被 `docker` 直接执行以创建一个镜像.

示例:

```dockerfile
FROM ubuntu:14.04
MAINTAINER YS.Zou <>

ADD run /root/run
ADD sources.list /etc/apt/sources.list
ADD id_rsa.pub /tmp/pubkey
ADD requirements /root/requirements

RUN mkdir -p /root/.ssh && \
    cat /tmp/pubkey >> /root/.ssh/authorized_keys && \
    rm -rf /tmp/pubkey
...

CMD ["bash", "/root/run"]
```

## 5.2 dockeFile的命令:

- FROM：基础镜像，当前新的镜像是基于哪个已经存在的镜像的
- MAINTAINER：镜像作者及其邮箱
- RUN：容器构建时需要执行的命令
- EXPOSE：暴露镜像的端口号
- WORKDIR：指定在创建容器后，终端默认登录进来的工作目录，一个落脚点
- ENV：用来在构建镜像过程中设置环境变量
- ADD：将宿主机目录下的文件拷贝进镜像且ADD命令会自动处理URL和解压tar压缩包
- COPY：跟ADD类似，拷贝文件和目录到镜像中
- VOLUME：容器数据卷，用于数据保存和持久化工作
- CMD：指定一个容器启动时要执行的命令，dockefile可以有多个cmd指令，但只有最后一个生效，cmd会被docker run之后的参数替换
- ENTRYPOINT：指定一个容器启动时要执行的命令，和CMD的目的一样，都是在指定容器启动程序及参数
- ONBUILD：当构建一个被继承的dockefile时运行命令，父镜像在被子继承后父镜像的onbuild被触发

## 5.3 执行dockerfile的大致流程

1. docker从基础镜像中运行一个容器
2. 执行一条命令并对容器做出修改
3. 执行类似docker commit的操作提交一个新的镜像
4. docker在基于刚提交的镜像运行一个新的容器
5. 执行dockerfile中的下一条指令知道所有指令都执行完成

## 5.4 dockerfile构建镜像的步骤

1. 准备一个文件, 名为: Dockerfile

```dockerfile
FROM nginx
RUN echo '<h1>TSF Demo Application and Docker</h1>' > /usr/share/nginx/html/index.html
```

2. 在Dockerfile所在的目录下, 执行命令用于构建镜像

```linux
docker build -t nginx:my
```

**注意:** docker build命令会根据 Dockerfile 文件及上下文构建新 Docker 镜 像。构建上下文是指 Dockerfile 所在的本地路径或一个URL(Git仓 库地址)。构建上下文环境会被递归处理，所以构建所指定的路 径还包括了子目录，而URL还包括了其中指定的子模块 

Dockerfile 一般位于构建上下文的根目录下，也可以通过-f指定该 文件的位置:

构建时，还可以通过-t参数指定构建成镜像的仓库、标签。

3. 使用Docker镜像创建容器

```linux
docker run -d -p 7788:80 nginx:my
```

4. 使用浏览器访问宿主主机的7788端口

```linux
curl http://127.0.0.1:7788
```

## 5.5 示例:

本案例中，我们将从一个centos的基础镜像开始，安装JDK和 Tomcat，并部署一个Web应用，最后启动容器并访问Web应用。 相应的Dockerfile如下:

```dockerfile
FROM centos
MAINTAINER stromling stromling@example.com
RUN mkdir /root/training
RUN mkdir /root/tools
COPY jdk-8u144-linux-x64.tar.gz /root/tools
RUN tar zxvf /root/tools/jdk-8u144-linux-x64.tar.gz -C /root/training/
ENV JAVA_HOME /root/training/jdk1.8.0_144
ENV PATH $JAVA_HOME/bin:$PATH
ADD http://mirror.bit.edu.cn/apache/tomcat/tomcat-8/v8.5.35/bin/apache- tomcat-8.5.35.tar.gz /root/tools
RUN tar zxvf /root/tools/apache-tomcat-8.5.35.tar.gz -C /root/training/ COPY MyDemoWeb.war /root/training/apache-tomcat-8.5.35/webapps 
ENTRYPOINT ["/root/training/apache-tomcat-8.5.35/bin/catalina.sh","run"]
```

- 编译生成容器:docker build -f MyDockerfile -t mywebapp . 
- 启动容器:docker run -d -p 8080:8080 mywebapp
- 通过浏览器访问Web应用
- 登录到容器检查我们创建的镜像

```linux
docker exec -it 34217bdce6bc bash
```

# 6. 管理容器的资源

## 6.1 基础知识: linux control groups

Linux Cgroup 可让您为系统中所运行任务(进程)的用户定义组 群分配资源— 比如 CPU 时间、系统内存、网络带宽或者这些资源 的组合。您可以监控您配置的cgroup，拒绝cgroup 访问某些资源， 甚至在运行的系统中动态配置您的 cgroup。所以，可以将 controll groups 理解为 controller (system resource) (for) (process) groups，也就是是说它以一组进程为目标进行系统资源分配和控 制。

###6.1.1 Linux control groups主要提供了如下功能

- Resource limitation: 限制资源使用，比如内存使用上限以及文件系统的缓存限制。

- Prioritization: 优先级控制，比如:CPU利用和磁盘IO吞吐。
- Accounting: 一些审计或一些统计，主要目的是为了计费。
- Control: 挂起进程，恢复执行进程。

### 6.1.2 查看linux内核中是否启用了cgroup

![docer11](/Users/lingjing/公众号/docker/docer11.png)

## 6.2 docker对cpu的使用

### 6.2.1 dockefile构建一个镜像

保存下面的文件命名为: Dockerfile

```dockerfile
FROM centos:lates
RUN yum install -y epel-release && yum install -y stress
ENTRYPOINT["stress"]
```

Docker能够指定(通过运行命令的-c或者--cpu-shares开关)给一个容器的可 用的CPU分配值。这是一个相对权重，与实际的处理速度无关。每个新的容 器默认的将有1024CPU配额，当我们单独讲它的时候，这个值并不意味着什 么。但是如果我们启动两个容器并且两个都将使用 100%CPU，CPU时间将在 这两个容器之间平均分割，因为它们两个都有同样的CPU配额(为了简单起 见，假设没有任何其他进程在运行)

使用下面的方式启动两个容器，运行之前创建好的mycentos

```linux
docker run -itd -c 1024  --cpus 4 centos:7 

docker run -itd -c 512  --cpus 4 centos:7 
```

**注意:**第一个容器占用**CPU**的权重是**1024**;第二个容器是**512**

通过docker stats命令观察这两个容器占用CPU的情况。

变更一个正在运行的容器的配额
 • 使用docker inspect CONTAINER命令获取容器ID(ID很长)
 • 执行下面的命令将a92daccba698容器的CPU权重设置为1024

```linux
systemctl set-property docker- a92daccba6983f210bf28c4f4f6e2c4c579d58f91a16d4702ee8e4ae7f8a0f5f.sc ope CPUShares=1024
```

## 6.3 docker对内存的使用

- 第一件事需要注意的是，默认一个容器可以使用主机上的所有内存。

- 如果你想为容器中的所有进程限制内存，使用docker run命令的 -m开 关即可。你可以使用bytes值定义它的值或是添加后缀(k，m或g)。

  • 例如:**docker run -it -m 128m centos**

- 为了显示限制的实际情况，我将再次使用我的mycentos镜像。

  • **docker run -it --rm -m 128m mycentos --vm 1 --vm-bytes 128M --vm-hang 0** • **-m128m**:用于限制容器使用的内存大小
   • **--vm1**:产生一个内存分配的进程
   • **--vm-bytes 128M**:每次分配大小为**128M**

  • **--vm-hang 0**:分配后立即释放;如果为**100**，表示分配后不释放，测试**100**秒

## 6.4 docker对I/O的使用

使用命令docker help run | grep -E 'bps|IO'得到Docker对I/O管理的 相关参数，如下:

![docker13](/Users/lingjing/公众号/docker/docker13.png)

# 7. 搭建Harbor私有仓库

## 7.1 什么是Harbor

Docker容器应用的开发和运行离不开可靠的镜像管理，虽然 Docker官方也提供了公共的镜像仓库，但是从安全和效率等方面 考虑，部署我们私有环境内的Registry也是非常必要的。Harbor是 由VMware公司开源的企业级的Docker Registry管理项目，它包括 权限管理(RBAC)、LDAP、日志审核、管理界面、自我注册、镜像 复制和中文支持等功能。

## 7.2 安装docker和docker compose

```linux
# 安装docker
yum install docker

#安装docker compose
curl -L https://github.com/docker/compose/releases/download/1.23.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
# 查看docker compose的版本
docker-compose --version
```

## 7.3 安装Harbor

Harbor支持在线和离线安装方式，这里，我们使用离线方式，先下载Harbor安装包:

```linux
wget https://storage.googleapis.com/harbor-releases/harbor-offline-installer-v1.5.3.tgz
```

### 7.3.1 解压离线安装包

```linux
tar xzvf harbor-offline-installer-v1.5.3.tgz
mv harbor /usr/local/harbor
cd /usr/local/harbor
```

###7.3.2 配置Harbor

核心配置文件:$HARBOR_HOME/harbor.cfg

```cfg
# 监听地址
hostname = harbor主机的IP地址或者主机名 # 登录密码
harbor_admin_password = 123456
# 只允许管理员可以创建项目 project_creation_restriction = everyone
```

### 7.3.3 安装Harbor

```linux
./prepare #配置Harbor
./install.sh #安装Harbor
```

### 7.3.4 访问Harbor

输入浏览器:主机ip, 如下:

默认的账户为 admin,密码为 Harbor12345。

![docker14](/Users/lingjing/公众号/docker/docker14.png)

## 7.4 在Docker客户机上通过终端访问harbor

- vi /usr/lib/systemd/system/docker.service
  ExecStart=/usr/bin/dockerd --insecure-registry my.harbor.com , 其中:my.harbor.com是harbor运行主机的hostname

- 创建/etc/docker/daemon.json文件，在文件中指定仓库地址 

```linux
cat > /etc/docker/daemon.json << EOF
 { "insecure-registries":["my.harbor.com"] }
 EOF
```

- 重启Docker

  ```linux
  systemctl daemon-reload
  systemctl restart docker
  ```

## 7.5 验证环境

使用docker login登录:

```linux
docker login my.harbor.com
```

- 创建Dockerfile 

```dockerfile
FROM centos
ENV TZ "Asia/Shanghai"
```

- 编译Dockerfile

```linux
docker build -t **my.harbor.com**/library/mycentos . 
```

- 使用docker images查看生产的镜像

- 将镜像上传到私有的harbor镜像仓库

```linux
docker push **my.harbor.com**/library/mycentos
```

# 8. docker网络和容器的通信

## 8.1 docker网络通信的基本原理

Docker中的网络接口默认都是虚拟的接口。虚拟接口的最大优势 就是转发效率极高。这是因为Linux通过在内核中进行数据复制来 实现虚拟接口之间的数据转发，即发送接口的发送缓存中的数据 包将被直接复制到接收接口的接收缓存中，而无需通过外部物理 网络设备进行交换。对于本地系统和容器内系统来看，虚拟接口 跟一个正常的以太网卡相比并无区别，只是它速度要快得多

Docker容器网络就很好地利用了Linux虚拟网络技术，在本地主机 和容器内分别创建一个虚拟接口，并让它们彼此连通(这样的一 对接口叫做veth pair)。

## 8.2 docker默认网络模式

```linux
docker run -it centos:7 /bin/bash
# 进入到容器以后, 
yum install -y net-tools && ifconfig
```

一般情况下，Docker创建一个容器的时候，会具体执行如下操作:

- 创建一对虚拟接口，分别放到本地主机和新容器的命名空间中;
- 本地主机一端的虚拟接口连接到默认的docker0网桥或指定网桥上，并具 有一个以veth开头的唯一名字，如veth1234;
- 容器一端的虚拟接口将放到新创建的容器中，并修改名字作为eth0。这 个接口只在容器的命名空间可见;
- 从网桥可用地址段中获取一个空闲地址分配给容器的eth0(例如 172.17.0.2/16)，并配置默认路由网关为docker0网卡的内部接口docker0 的IP地址(例如172.17.42.1/16)。

![docker15](/Users/lingjing/公众号/docker/docker15.png)

## 8.2 docker的网络模式

安装docker的时候, 它会自动创建四个网络, host, container, bridge, none, 除了这些, docker还支持自定义网络

镜像：busybox集成了一百多个Linux的工具箱

- host:容器将不会虚拟出自己的网卡，配置自己的IP等，而是使用宿主机 的IP和端口。
- Container:创建的容器不会创建自己的网卡，配置自己的IP，而是和一个指定的容器共享IP、端口范围

```linux
启动两个容器：第一个 docker run -it busybox /bin/sh   ---> 使用bridge的模式
				                     信息
									eth0      Link encap:Ethernet  HWaddr 02:42:AC:11:00:02  
											  inet addr:172.17.0.2  Bcast:0.0.0.0  Mask:255.255.0.0
							  
							  第二个 docker run -it --network=container:d8c0a1aa2673 busybox /bin/sh
							         其中：d8c0a1aa2673是另一个容器的ID
									eth0      Link encap:Ethernet  HWaddr 02:42:AC:11:00:02  
											  inet addr:172.17.0.2  Bcast:0.0.0.0  Mask:255.255.0.0
```



- None:该模式关闭了容器的网络功能。

- Bridge:此模式会为每一个容器分配、设置IP等，并将容器连接到一个 docker0虚拟网桥，通过docker0网桥以及Iptables nat表配置与宿主机通信。

- ##### 插件网络

  以上五种驱动都是docker原生提供的，如果以上五种不能满足你的要求，除了原生提供，还支持第三方的驱动模式接入。比如常用的 flannel、pipework、weave 和 calico 等等。

## 8.3 docker network管理命令

### 8.3.1 显示网络列表

```linux
docker networkd ls
```

### 8.3.2 创建网络

```linux
docker network create <Option> <NetworkName>
## 可选参数
--config-from 复制其他网络配置
--driver 指定网络模式
--gateway 指定网关
--internal 限制只能内部访问
--ip-range 从子网范围分配容器IP
--ipv6 启用IPv6网络
--subnet 指定网段
```

示例:

```linux
docker network create centos-network
```

![docker16](/Users/lingjing/公众号/docker/docker16.png)

###8.3.3 配置容器连接到指定的网络

```linux
docker network connect <Option> <Network> <Containner>
```

示例:

![docker17](/Users/lingjing/公众号/docker/docker17.png)

### 8.3.4 取消容器连接到指定的网络

```linux
docker network disconnect <Option> <Network> <Container>
```

示例:

![docker18](/Users/lingjing/公众号/docker/docker17.png)

### 8.3.5 查看网络详情

```linux
docker network inspect <Network>
```

示例:

![docker18](/Users/lingjing/公众号/docker/docker18.png)

### 8.3.6 删除网络

```linux
docker network rm <Network>
```

示例

```linux
docker network rm centos-network
```

### 8.3.7 清理未使用的网络

```linux
docker network prune
```

### 8.3.8 启动容器指定网络

```linux
docker run -it --network=<Network> <Option> <Image>
```

### 8.3.9 自定义bridge模式

- 创建network

```linux
docker network create -d bridge --ip-range=192.168.1.0/24 --gateway=192.168.1.1 --subnet=192.168.1.0/24 bridge2
```

- 创建一个容器指定ip并指定network

```linux
docker run -it --network=bridge2 --ip=192.168.1.3
docker run -it --network=bridge2 --ip=192.168.1.4
```

## 8.5 容器间的通信

容器间可以通过IP, Docker DNS Server和joined容器三种方式

### 8.5.1 IP通信

- 两个容器要能通信，必须要有属于同一个网络的网卡。满足这个 条件后，容器就可以通过 IP 交互了。具体做法是在容器创建时通 过 --network 指定相应的网络，或者通过 docker network connect 将现有容器加入到指定网络。

例如上面的ip: 192.168.1.3和192.168.1.4两个容器通信

### 8.5.2 Docker DNS Server

- 通过 IP 访问容器虽然满足了通信的需求，但还是不够灵活。因为我们在部 署应用之前可能无法确定 IP，部署之后再指定要访问的 IP 会比较麻烦。对 于这个问题，可以通过 docker 自带的 DNS 服务解决。
- 从 Docker 1.10 版本开始，docker daemon 实现了一个内嵌的 DNS server，使 容器可以直接通过"容器名"通信。方法很简单，只要在启动时用 --name 为 容器命名就可以了。
- 我们修改上面的两条语句，如下:

```linux
docker run -it --network=bridge2 --name box1 busybox
docker run -it --network=bridge2 --name box2 busybox
```

- **使用 docker DNS 有个限制:只能在 user-defined 网络中使用。也就是说，默认 的 bridge 网络是无法使用 DNS 的。**

###8.5.3 Joined容器

 joined 容器是另一种实现容器间通信的方式。它可以使两个或多 个容器共享一个网络栈，共享网卡和配置信息，joined 容器之间 可以通过 127.0.0.1 直接通信

			（*）基于httpd的镜像创建容器
				docker run -it --name box3 httpd
				
			（*）使用Joined容器创建一个新的容器
			    docker run -it --network=container:box3 busybox
				
			（*）测试：在第二个容器中执行wget 127.0.0.1
##8.6容器访问控制

容器的访问控制主要通过Linux上的iptables防火墙软件来进行管理 和实现。iptables是Linux系统流行的防火墙软件，在大部分发行版 中都自带。

###8.6.1 容器访问外部网络

- 我们知道容器默认指定了网关为docker0网桥上的docker0内部接口。docker0 内部接口同时也是宿主机的一个本地接口。因此，容器默认情况下是可以访 问到宿主机本地的。更进一步，容器要想通过宿主机访问到外部网络，需要 宿主机进行转发
- 如果为0，则没有开启转发，则需要手动打开: 

```linux
sysctl -w net.ipv4.ip_forward=1
```

- 更简单的，在启动Docker服务的时候设定--ip-forward=true，Docker服务会自 动打开宿主机系统的转发服务。

###8.6.2 外部访问容器实现

- 容器允许外部访问，可以在docker run时候通过-p或-P参数来启用。 不管用那种办法，其实也是在本地的iptable的nat表中添加相应的 规则，将访问外部IP地址的网包进行目标地址DNAT，将目标地址 修改为容器的IP地址。
- 例如:以一个开放80端口的Web容器为例 

```linux
docker run -it -p 80:80 centos bash
```

- 在主机上，通过iptables -nvL命令来查看

# 9.docker的数据管理

生产环境中使用Docker的过程中，往往需要对数据进行持久化， 或者需要在多个容器之间进行数据共享，这必然涉及容器的数据 管理操作。

数据卷是提供数据持久化存储，数据卷完全独立与容器的生命周期，容器在销毁时不会对数据卷进行销毁，对数据卷所持久化的内容不会长生任何变动。

## 9.1 容器中管理数据的主要两种方式

- 数据卷(Data Volumes): 容器内数据直接映射到本地主机环境;如何在容器内创建数据卷，并且把本地的目录或文件挂载到容器内的数据卷中。
- 数据卷容器(Data Volume Containers):使用特定容器维护数据卷。如何使用数据卷容器在容器和主机、容器和容器之间共享数据，并实现数据的备份和恢复。

### 9.1.1 数据卷

数据卷是一个可供容器使用的特殊目录，它将主机操作系统目录

直接映射进容器，类似于Linux中的mount操作。

- 数据卷可以提供很多有用的特性，如下所示:
  1. 数据卷可以在容器之间共享和重用，容器间传递数据将变得高效方便; 
  2. 对数据卷内数据的修改会立马生效，无论是容器内操作还是本地操作; 
  3. 对数据卷的更新不会影响镜像，解耦了应用和数据;
  4. 卷会一直存在，直到没有容器使用，可以安全地卸载它

- Demo示例:

在主机和容器之间创建数据卷，实现数据共享（共享目录）

```linux
docker run -it -v /root/mydatavolume:/root/container/mydatavolume centos /bin/bash
```

-v 指定数据卷的目录

默认：挂载的数据卷默认权限是读写（RW），也可以通过指定ro参数标识为只读

```linux
docker run -it -v /root/mydatavolume:/root/container/mydatavolume:ro centos /bin/bash
```

### 9.1.2 数据卷容器

如果用户需要在多个容器之间共享一些持续更新的数据，最简单 的方式是使用数据卷容器。数据卷容器也是一个容器，但是它的 目的是专门用来提供数据卷供其他容器挂载。

1. 创建一个数据卷容器dbdatacontainer，在这个容器中创建一个数据卷挂载: /dbdata

```linux
docker run -it -v /dbdata --name dbdatacontainer centos
```

2. 可以在其他的容器中使用 --volumes-from来挂载dbdatacontainer容器中的数据卷

```linux
docker run -it --volumes-from dbdatacontainer --name db1 centos
docker run -it --volumes-from dbdatacontainer --name db2 centos
```

## 9.2 Docker数据卷类型

1.基于主机文件系统的数据卷
由Docker主机进行管理，在文件系统中（/var/lib/docker/volumes）创建出来的文件夹用于存放数据卷，建议采用此方法进行持久化数据。非Docker进程不应修改文件系统这个文件夹。

2.基于绑定挂载的数据卷
可以存储在网络存储等任何位置，Docker主机或Docker容器上的非Docker进程可以随时修改其中的内容。

3.基于主机内存的数据卷
仅存储在主机系统的内存中，永远不会写入主机系统的文件系统。它可以在容器的生命周期中由容器使用，一般用于存储非持久状态或敏感信息。

## 9.3 基于主机文件系统的数据卷

### 9.3.1 创建数据卷

```linux
docker volume create <Volume>
```

### 9.3.2 查看数据卷

```linux
docker volume ls
```

![docker19](/Users/lingjing/公众号/docker/docker19.png)

###9.3.3 挂载数据卷

```linux
docker run -v <Volume>:<ContainerFileSystemPath>:<Mode> <Image>
```

![docker20](/Users/lingjing/公众号/docker/docker20.png)

### 9.3.4 删除数据卷

```linux
docker volume rm <Volume>
```

### 9.3.5 查看数据卷详情

```linux
docker volume inspect <Volume>
```

## 9.4 基于绑定挂载的数据卷

### 9.4.1 创建绑定挂载至本地文件系统 --mount模式

```linux
docker run -it --mount type=bind,source=<src>, target=<dst> <image>
# 查看一下挂载的情况
docker inspect <container>
```

![docker21](/Users/lingjing/公众号/docker/docker21.png)

![docker22](/Users/lingjing/公众号/docker/docker22.png)

![docke23](/Users/lingjing/公众号/docker/docke23.png)

###9.4.2 创建绑定挂载至本地文件模式 -v模式

```linux
docker run -v <HostFileSystemPath>:<ContainnerFileSystemPath>:<Mode> <Image>
```

这个直接把主机的文件挂载docker容器中, -v 挂载本地文件系统路径如果不存在该路径则会进行创建，但如果使用 --mount 挂载本地文件系统路径时如果路径不存在则会产生报错。但两者所执行后的效果是一样的。

## 9.5 基于主机内容的挂载

### 9.5.1 内存挂载卷 --mount模式

创建容器并使用内存挂载卷 --mount模式

```linux
docker run -it --mount type=tmpfs,dst=<Path> <Image>
```

### 9.5.2 内存挂载卷 --tmpfs模式

创建容器并使用内存挂载卷 --tmpfs模式

```linux
docker run -it --tmpfs <Path> <Image>
```

## 9.6 利用数据卷容器来迁移

### 9.6.1备份

首先利用centos镜像创建了一个容器worker。

使用--volumes-from dbdata 参数来让worker容器挂载dbdata容器的数据卷(即dbdata数据卷),

使用-v $(pwd):/backup参数来挂载本地的当前目录到worker容器的/backup目录。

 worker容器启动后，使用了tar cvf /backup/backup.tar /dbdata命令来将 /dbdata下内容备份为容器内的/backup/backup.tar，即宿主主机当前目录 下的backup.tar。

```linux
docker run --volumes-from dbdatacontainer -v $(pwd):/backup --name myworker centos tar cvf /backup/backup.tar /dbdata
```

### 9.6.2 恢复

如果要将数据恢复到一个容器，可以按照下面的步骤操作。

1. 首先创建一个带有数据卷的容器dbdata2:

```linux
docker run -it -v /dbdata --name dbdatacontainer2 centos
```

2. 然后创建另一个新的容器，挂载dbdata2的容器，并使用untar解压备份文 件到所挂载的容器卷中:

```linux
docker run -it --volumes-from dbdatacontainer2 -v $(pwd):/backup --name worker2 centos /bin/bash
cd /dbdata
tar xvf /backup/backup.tar
```

# 10. docker machine

##10.1 什么是docker Machine?

•Docker Machine 是 Docker 官方提供的一个工具，它可以帮助我们在远程的机器上安装 Docker，或者在虚拟机 host 上直接安装虚拟机并在虚拟机中安装 Docker。我们还可以通过 docker-machine 命令来管理这些虚拟机和 Docker。下面是来自 Docker Machine 官方文档的一张图，很形象哦！

![docker23](/Users/lingjing/公众号/docker/docker23.png)

1. 是一个远程管理工具
2. 帮助我们在远程的主机上安装和配置Docker
3. 帮助我们在远程的虚拟主机（virtualbox、vsphere等等）上安装和配置Docker

##10.2 安装docker Machine

我们参考官网给出的安装教程: https://docs.docker.com/machine/install-machine/

1. Macos:

```linux
base=https://github.com/docker/machine/releases/download/v0.16.0 &&
  curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/usr/local/bin/docker-machine &&
  chmod +x /usr/local/bin/docker-machine
```



2. linux

```linux
base=https://github.com/docker/machine/releases/download/v0.16.0 &&
  curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
  sudo mv /tmp/docker-machine /usr/local/bin/docker-machine &&
  chmod +x /usr/local/bin/docker-machine
```



3. windows, 首先安装git bash

```
base=https://github.com/docker/machine/releases/download/v0.16.0 &&
  mkdir -p "$HOME/bin" &&
  curl -L $base/docker-machine-Windows-x86_64.exe > "$HOME/bin/docker-machine.exe" &&
  chmod +x "$HOME/bin/docker-machine.exe"
```



## 10.3 docker Machine应用

如果我们有多台 centos主机都需要安装 Docker，怎么办呢？是不是一个个登录上去通过yum命令安装呢？当然不需要，通过 docker-machine 命令我们可以轻松的在远程主机上安装 Docker

安装和配置：两台主机：

node1: 192.168.119.150

node2: 192.168.119.151
**前提：配置node1和node2之间的免密码登录**

- 在node1 上安装docker machine

按照上面的安装教程, 安装docker machine

- 在node1上安装node2节点上的docker环境

```linux
docker-machine create -d generic --generic-ip-address=192.168.119.151 --generic-ssh-user=root --generic-ssh-key ~/.ssh/id_rsa remotenode2
```

•**注意：等待的时间很长**

## 10.4 docker-machine的常用命令

下面都是docker-machine后加的命令就是docker-machine command；每个参数又都是有help的，可以通过docker-machine COMMAND --help来查看。

- active 查看活跃的 Docker 主机
- config 输出连接的配置信息
- create 创建一个 Docker 主机
- env 显示连接到某个主机需要的环境变量
- inspect 输出主机更多信息
- ip 获取主机地址
- kill 停止某个主机
- ls 列出所有管理的主机
- provision 重新设置一个已存在的主机
- regenerate-certs 为某个主机重新生成 TLS 认证信息
- restart 重启主机
- rm 删除某台主机
- ssh SSH 到主机上执行命令
- scp 在主机之间复制文件
- mount 挂载主机目录到本地
- start 启动一个主机
- status 查看主机状态
- stop 停止一个主机
- upgrade 更新主机 Docker 版本为最新
- url 获取主机的 URL
- version 输出 docker-machine 版本信息
- help 输出帮助信息



# 11. Docker Compose

## 11.1 什么是Docker Compose

Docker Compose是一个用来定义和运行复杂应用的Docker工具。一个使用Docker容器的应用，通常由多个容器组成。使用Docker Compose不再需要使用shell脚本来启动容器，而使用**服务编排的方式**来管理容器

Docker Compose 通过一个配置文件来管理多个Docker容器，在配置文件中，所有的容器通过services来定义，然后使用docker-compose脚本来启动，停止和重启应用，和应用中的服务以及所有依赖服务的容器，非常适合组合使用多个容器进行开发的场景。

## 11.2 安装Docker Compose

官网地址: •https://docs.docker.com/compose/install

```linux
curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose --version
docker-compose --version
```

## 11.3 Docker Compose 常用命令与配置

- 
- ps: 列出所有运行容器

```linux
docker-compose ps
```

- 
- logs: 查看服务日志输出

```linux
docker-compose logs
```

- 
- port: 打印绑定的公共端口, 下面命令可以输出 eureka 服务 8761 端口所绑定的公共端口

```linux
docker-compose port eureka 8761
```

- 
- build: 构建或者重新构建服务

```linux
docker-compose build
```

- 
- start: 启动指定服务已存在的容器

```linux
docker-compose start helloword
```

- 
- stop: 停止已运行的服务容器

```linux
docker-compose stop helloworld
```

- 
- rm: 删除指定服务的容器

```linux
docker-compose rm helloworld
```

- 
- up: 构建. 启动容器

```linux
docker-compose up
```

- 
- kill: 通过发送SIGKILL信号来停止指定服务的容器

```linux
docker-compose kill helloworld
```

- 
- pull: 下载镜像

```linux
docker-compose pull centos:7
```

- 
- scale: 设置指定服务运行容器的个数, 已service=num形式指定

```linux
# redis的容器变成三个
docker-compose scale redis=3
```

- 
- run: 在一个服务上执行一个命令

```linux
docker-compose run web bash
```

## 11.4 docker-compose.yml 

docker-compose也是有配置文件的, 类似于spring-boot等, 需要通过配置文件来定义我们的一些配置信息

###11.4.1 什么是yml文件

- YAML 的意思其实是："Yet Another Markup Language"（仍是一种置标语言）的缩写。YAML的语法和其他高阶语言类似，并且可以简单表达清单、散列表，标量等资料形态。
- 它使用空格缩排和大量依赖外观的特色，特别适合用来表达或编辑数据结构、各种设定档、倾印除错内容、文件大纲（例如：许多电子邮件标题格式和YAML非常接近）。
- 可以是用 .yml 或 .yaml 作为文件扩展名。

###11.4.2 yml的属性

官网提供的配置文件示例:https://docs.docker.com/compose/compose-file/

- **version**: 指定 docker-compose.yml 文件的写法格式
- **service**: 多个容器集合
- **build**: 配置构建时，Compose 会利用它自动构建镜像，该值可以是一个路径，也可以是一个对象，用于指定 Dockerfile 参数

```yml
build: ./dir
---------------
build:
    context: ./dir
    dockerfile: Dockerfile
    args:
        buildno: 1
```

- **commnd**: 覆盖容器启动后默认执行的命令
- **dns**：配置 dns 服务器，可以是一个值或列表
- **dns_search**：配置 DNS 搜索域，可以是一个值或列表
- **environment**：环境变量配置，可以用数组或字典两种方式
- **expose**：暴露端口，只将端口暴露给连接的服务，而不暴露给主机
- **image**：指定服务所使用的镜像
- **network_mode**：设置网络模式
- **ports**：对外暴露的端口定义，和 expose 对应
- **links**：将指定容器连接到当前连接，可以设置别名，避免ip方式导致的容器重启动态改变的无法连接情况
- **volumes**：卷挂载路径
- **logs**：日志输出信息

```linux
--no-color          单色输出，不显示其他颜.
-f, --follow        跟踪日志输出，就是可以实时查看日志
-t, --timestamps    显示时间戳
--tail              从日志的结尾显示，--tail=200
```

##11.5 docker compose 示例

用python语言开发一个web应用，redis统计访问次数。先安装docker引擎与compse，无需安装python、redis，由compose负责

### 1. 创建工作目录

```linux
mkdir composetest
cd composetest
```

### 2. 创建应用

我们使用python中最简单的flask来创建应用, 命名为app.py

```python
from flask import Flask
from redis import Redis
import os
app = Flask(__name__)
redis = Redis(host='redis', port=6379)
 
@app.route('/')
def hello():
    redis.incr('hits')
    return 'Hello World! I have been seen %s times.' % redis.get('hits')
 
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)

```

代码中注意使用了redis作为主机名连接redis服务，那么想当然的，docker一定提供了名称解析服务，最终将redis映射成容器实例的IP地址。在app.run函数中没有指定端口号，flask默认是5000。

创建 requirements.txt文件，内容如下：

```txt
flask
redis
```

没有写过python的童鞋也不用着急, requirements.txt这个文件中就是我们python需要安装的各种依赖包, 写入到这里里面, 这个是一个规范, 大家都这么搞, 照着写就好了, 安装程序的时候, 就有人会帮我们去安装相关的应用

### 3. 创建Dockerfile

命名为Dockerfiler, 内容如下:

```linux
FROM python:2.7.10
ADD . /code
WORKDIR /code
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```

其中, 我们没有指定web服务暴露的端口.

### 4. 在compose中定义服务

```yml
version: '3'
services:
  web:
    build: .
    ports:
     - "5000:5000"
  redis:
    image: "redis"
```

定义了两个服务，一个是web，另一个是redis，对于web定义了内外端口的映射关系，使用docker compose默认创建的网络。

### 5. 使用compose构建并运行app

```linux
docker-compose up
```

### 6. 执行结果:

![docker24](/Users/lingjing/公众号/docker/docker24.png)

![docker25](/Users/lingjing/公众号/docker/docker25.png)

![docker26](/Users/lingjing/公众号/docker/docker26.png)

#12. Dokcer Swarm

## 12.1 Docker Swarm概述

Docker Swarm是Docker官方提供的一款集群管理工具，其主要作用是把若干台Docker主机抽象为一个整体，并且通过一个入口统一管理这些Docker主机上的各种Docker资源。Swarm和Kubernetes比较类似，但是更加轻，具有的功能也较kubernetes更少一些。

Docker Swarm 和 Docker Compose 一样，都是 Docker 官方容器编排项目，但不同的是，Docker Compose 是一个在单个服务器或主机上创建多个容器的工具，而 Docker Swarm 则可以在多个服务器或主机上创建容器集群服务，对于微服务的部署，显然 Docker Swarm 会更加适合。

**从 Docker 1.12.0 版本开始**，Docker Swarm 已经包含在 Docker 引擎中（docker swarm），并且已经内置了服务发现工具，我们就不需要像之前一样，再配置 Etcd 或者 Consul 来进行服务发现配置了

## 12.2 Docker Swarm体系架构

![docker27](/Users/lingjing/公众号/docker/docker27.png)

## 12.3 docker Swarm常用的概念

Swarm: 本身就是人群, 蜂群的意思, 这里指计算机集群, 在用Docker连接后的状态. docker swarm 命令可以创建, 加入, 离开一个集群

node: 指的是计算机节点, 也可以认为是Docker节点, Node分为两类: Manager和worker, 一个swarm至少要有一个manager, 部分管理命令只有在manager上才能使用, 两类node都可以运行service. 但只有manager上才能执行运行命令. 比如, 在manager上使用docker node命令可以查看, 配置, 删除node

stack: 是一组service, 和docker-compose类似. 默认情况下, 一个stack共用一个network, 相互可访问, 与其他stack网络隔绝, 这个概念只是为了编排的方便. docker stack 命令可以方便的操作一个stack, 而不用一个一个的操作service

service: 是一类容器, 对用户来说, service就是于swarm交互的最核心内容. service有两种运行模式, 一是replicated, 指定一个service运行容器的数量; 二是global, 在所有符合运行条件的node上, 都运行一个这类容器. docker service命令可以操作swarm中的service

task: task就是运行一个容器的任务, 是swarm执行命令的最小单元, 要成功运行一个service, 需要执行一个或者多个task(取决于一个servce的容器数量), 确保每一个容器都顺利启动. 通常用户操作的是service, 而非task

load balancing: 即负载均衡, 也包含反向代理. swarm使用的是ingress像是的负载均衡, 即访问每个节点的某个published端口, 都可自动代理到真正的服务

## 12.4 构建swarm集群和节点

manager节点:

```linux
docker swarm init
```

可以使用

--listen-addr 1.1.1.1: 绑定ip地址

--advertise-add 1.1.1.1 r:   用于当有多张网卡的时候, 需要辨明是哪一张网卡

![docker28](/Users/lingjing/公众号/docker/docker28.png)

![docker28](/Users/lingjing/公众号/docker/docker29.png)

node节点: 

这个命令是初始化swarm的时候, 生成的, 如上图所示

```linux
docker swarm join --token SWMTKN-1-01r79ev4rszb6k2jmds19uvdoro48m365hxyh7p7xp848i3ixm-808knqx25w05bq590rb4f3mre 192.168.65.3:2377
```

```linux
[root@manager ~]# docker node ls
			ID                           HOSTNAME  STATUS  AVAILABILITY  MANAGER STATUS
			hmcwwwjd67gcpwjwna9r4x1lb    node2     Ready   Active        
			n4rkdw24muuscoglz6ctt8mo7    node1     Ready   Active        
			pjhwl7mj4tie9vu0qzszlmdgv *  manager   Ready   Active        Leader
```

## 12.5 在swarm集群上部署应用

### 1. 构建自己的镜像

使用Dockerfile构建我们自己的镜像, 上传到Dockerhub中

Dockerfile

```dockerfile
FROM nginx
RUN echo '<h1>Swarm:Version 1 <h1>' > /usr/share/nginx/html/index.html
```

需要保证每个节点都可以访问到这个镜像

```linux
docker login
docker build -t ajing/mynginx:v1 .
docker push ajing/mynginx:v1

```

### 2. 部署应用

将上面的镜像部署到集群中

```linux
docker service create -p 7788:80 --replicas 3 --name mydemo ajing/mynginx:v1
```

还可以使用swarm进行扩容

```linux
docker service scale mydemo=5
```

## 12.6 swarm集群的数据持久化

- 为什么要进行数据持久话呢? 

因为docker容器是一种无状态的服务

### 1. 数据卷方式

volume数据卷方式: 宿主机和容器之间共享数据

```linux
docker service create -p 7788:80 --replicas 3 --name myswarmtest --mount type=volume, src=myvolumn,dst=/usr/share/nginx/html ajing/mynginx:v1
```

### 2. 通过nfs实现(不推荐)

所有节点安装：

```linux
yum -y install nfs-utils
```

测试： 

```linux
mount -t nfs 192.168.119.152:/nfs /mynfs
docker service create \
					--replicas 3 \
					--name my-nginx \
					-p 7788:80 \
					--mount 'type=volume,src=my-nfs-vol,dst=/usr/share/nginx/html,volume-driver=local,volume-nocopy=true,volume-opt=type=nfs,volume-opt=device=192.168.119.152:/nfs,"volume-opt=o=addr=192.168.119.152,vers=4,soft,timeo=180,bg,tcp,rw"' \
					ajing/mynginx:v1
```







