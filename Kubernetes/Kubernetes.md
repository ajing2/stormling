# Kubernetes

# 1. Kubernetes介绍

Kubernetes这个名字起源于希腊语，意思是舵手，由于k到s之间有8个字符又简称k8s。Google在2014年开源了Kubernetes项目，基于容器技术的分布式管理系统，在Docker技术的基础上，为容器化的应用提供部署运行、资源调度、服务发现和动态伸缩等一系列完整功能，提高了大规模容器集群管理的便捷性。

## 1. Kubernetes概述

[**Kubernetes**](https://www.kubernetes.org.cn/)是一个开源的，用于管理云平台中多个主机上的容器化的应用，Kubernetes的目标是让部署容器化的应用简单并且高效（powerful）,Kubernetes提供了应用部署，规划，更新，维护的一种机制。

Kubernetes一个核心的特点就是能够自主的管理容器来保证云平台中的容器按照用户的期望状态运行着（比如用户想让apache一直运行，用户不需要关心怎么去做，Kubernetes会自动去监控，然后去重启，新建，总之，让apache一直提供服务），管理员可以加载一个微型服务，让规划器来找到合适的位置，同时，Kubernetes也系统提升工具以及人性化方面，让用户能够方便的部署自己的应用（就像canary deployments）。

现在Kubernetes着重于不间断的服务状态（比如web服务器或者缓存服务器）和原生云平台应用（Nosql）,在不久的将来会支持各种生产云平台中的各种服务，例如，分批，工作流，以及传统数据库。

## 2. 为什么要使用Kubernetes

1. 轻量：与使用VM虚拟机相比，容器镜像创建的简便性和效率更高。
2. 敏捷：持续集成和部署，通过快速的升级或回滚，提供可靠且频繁的容器映像构建和部署。
3. 分离：在构建时创建镜像，不依赖发布环境，将运行环境及基础架构分离。
4. 一致：开发环境、测试环境、生产环境的运行环境一致性。
5. 移植：不依赖基础架构，可在不同的平台上快速应用。
6. 隔离：通过NameSpace实现不同环境中、不同租户的资源隔离。
7. 解耦：应用程序被分解成较小的独立部分，而不是整体在一台单机上运行。
8. 伸缩：可将应用基于资源利用率等进行快速的动态伸缩。
9. 效率：高密度及高效率的资源利用率。

## 3. Kubernetes理念

其实kubernetes的出现, 我们生活中的一些理念和使用场景都可以用来套用, 比如:

我们生活中使用的书包: 码头使用的集装箱, 我们拿书包举例. 标准的IT男都会有一个包包, 这个包包里面, 可以放你需要的任何东西,电脑, 笔记本, 笔, 钱包, 充电线, 水杯, 身份证, 手机等等一系列的东西, 对于每个人差异化需求可能都会有区别, 但是对于使用者来说, 我们对于包包的使用, 大家可以非常的方便, 便捷的提供我们使用

Kubernetes的出现, 就是让我们不用在去关注复杂的内部容器内部的使用, 不同的差异, 不用的使用者自己去维护就ok了, 但是对于上层的使用者来说, 封装好的Kubernetes确可以给我们更好的提供标准化, 统一化的流程服务, 更好的为容器之上的使用者提供更加完美的支持

# 2. Kubernetes常用的概念介绍

- **节点** （Master node and Worker node）
  节点通常指的就是服务器，在k8s中有两种节点：管理节点（Master Node）和工作节点（Worker Node）
  管理节点（Master Node）：负责管理整个k8s集群，一般由3个管理节点组成HA的架构。
  工作节点（Worker Node）：主要负责运行容器。

- **命名空间** (Namespace)
  k8s命名空间主要用于隔离集群资源、隔离容器等，为集群提供了一种虚拟隔离的策略；默认存在3个名字空间，分别是默认命名空间 default、系统命名空间 kube-system 和 kube-public。

- **Object**
  k8s 对象(Object)是一种持久化存储并且用于表示集群状态的实体。k8s 对象其实就是k8s自己的配置协议，总之我们可以通过定义一个object让k8s根据object定义执行一些部署任务、监控任务等等。

- **POD**
  Pod是 Kubernetes 部署应用或服务的最小的基本单位。一个Pod 封装多个应用容器（也可以只有一个容器）、存储资源、一个独立的网络 IP 以及管理控制容器运行方式的策略选项。

- **副本集** (Replica Set，RS)
  是一种控制器，负责监控和维护集群中pod的副本(replicas)数，确保pod的副本数是我们期望的样子。

- **部署** (Deployment)
  表示对k8s集群的一次更新操作，是k8s集群中最常用的Object，主要用于部署应用。支持滚动升级。

- **服务** (service)
  是对应用的抽象，也是k8s中的基本操作单元，一个服务背后由多个pod支持，服务通过负载均衡策略将请求转发到容器中。

- **Ingress**
  是一种网关服务，可以将k8s服务通过http协议暴露到外部。

- 无状态应用 & 有状态应用
  - 无状态应用指的是应用在容器中运行时候不会在容器中持久化存储数据，应用容器可以随意创建、销毁；如果一个应用有多个容器实例，对于无状态应用，请求转发给任何一个容器实例都可以正确运行。例如：web应用
  - 有状态应用指的是应用在容器中运行时候需要稳定的持久化存储、稳定的网络标识、固定的pod启动和停止次序。例如：mysql数据库

**总结**

从K8s的系统架构、技术概念和设计理念，我们可以看到K8s系统最核心的两个设计理念：一个是**容错性**，一个是**易扩展性**。容错性实际是保证K8s系统稳定性和安全性的基础，易扩展性是保证K8s对变更友好，可以快速迭代增加新功能的基础。

# 3. Kubernetes部署架构

![1](1.png)

首先, 我们观察到, Kubernetes的组件架构图, 分为master和nodes, 以及 cloud三个组成部分

## 1. master节点

master节点包含`kube-controller-manager`, `kube-apiserver`, `kube-scheduler`, `cloud-controller-manager`五个组成部分

### 1. Kube-apiserver

> 是一个将kubernetes控制平面中的API暴露出来的API服务, 用于接收用户端的操作请求, 这服务是Kubernetes控制平面的前端

它是一个无状态应用, 用户可以运行多个kube-apiserver组件的实例, 用于平衡实例的请求流量

### 2. kube-scheduler

> 用于watch监听apiserver的资源变动(增删改查), 并调度至合适的后端node节点, 从而来创建pod资源

### 3. kube-controller-manager

> 每个控制器都是独立的二进制进程, 包括: Node Controller, Replication Controller, Endpoints Controller和Service Account 和Token Controllers

### 4. etcd

> 高可用. KV架构的Kubernetes的后端数据存储组件

### 5. Cloud-controlller-manager

> 是Kubernetes与云厂商提供的服务能力对接的关键组件, 又称为kubernetes cloudprovider

## 2. Nodes节点

主要包括kubelet, kube-proxy和container runntime三个组件

### 1. kubelet

> 运行在集群每个节点的客户端, 需要保证相关容器运行在pod中, 通过podspecs标签, 描述容器的运行状态

### 2. Kube-proxy

> 是一个运行在集群每个节点的网络代理组件

### 3. Containner runtime

> 支持运行容器底层环境的软件; 支持docker, containerd, cri-o, rktlet等

## 3. cloud端

### 1. cloud

> 作为集群外部的附加能力, 通过与cloud=controller-manager组件对接, 扩展kuberntes集群于云上动态扩展的特性

## 4. Addons(附加组件)

使用Kubernetes resources增加集群功能, 如DNS, Web UI, Containner Resource Monitoring, Cluster-level Logging等等

## 5. 工作流程概述

### master

通过(API, WebUI, CLI)想APIserver发送请求, kube-scheduler组件监听APIserver的资源变动, 同时从Node节点中选取最合适的Node节点开始调度, 并把调度结果保存至Etcd中.

### node

kubelet也会监听APIserver的资源变动, 并在符合的Node通过kubelet调用相关的coker引擎进行后续打包和构建

# 4. 部署Kubernetes集群

## 1. 节点信息

| ip              | 主机名 | 角色 | 操作系统 |
| --------------- | ------ | ---- | -------- |
| 192.168.157.130 | master | 主   | centeos7 |
| 192.168.157.131 | ode1   | 节点 | Centos7  |
| 192.168.157.132 | node2  | 节点 | Centos7  |

## 2. 关闭防火墙相关

```
systemctl stop firewalld.service
systemctl stop iptables.service
systemctl disable firewalld.service
systemctl disable iptables.service
```

将 SELinux 设置为 permissive 模式(将其禁用) 

```
setenforce 0
sed -i 's/^SELINUX=enforcing$/SELINUX=disabled/' /etc/selinux/config
```

## 2. 安装docker

添加docker的yum仓库

```
tee /etc/yum.repos.d/docker.repo <<-'EOF'
[dockerrepo]
name=Docker Repository
baseurl=https://yum.dockerproject.org/repo/main/centos/$releasever/
enabled=1
gpgcheck=1
gpgkey=https://yum.dockerproject.org/gpg
EOF
```

安装docker

```
yum install -y docker-engine
```

启动docker

```
systemctl start docker
```

开启启动

```
systemctl enable docker
```

## 3. 安装kubelet, kubeadm, kubectl

kubeadm：用来初始化集群（Cluster）
kubelet：运行在集群中的所有节点上，负责启动 pod 和 容器。
kubectl：这个是 Kubernetes 命令行工具。通过 kubectl 可以部署和管理应用，查看各种资源，创建、删除和更新各种组件。

安装这三个工具，为避免出现网络不可达错误，将谷歌镜像换成阿里云镜像

```
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
exclude=kube*
EOF
```

使用yum安装 

```
yum install -y kubelet kubeadm kubectl --disableexcludes=kubernetes
```

 这种开机自启动 

```
systemctl enable kubelet && systemctl start kubelet
```



## 4. 初始化master

注意：–pod-network-cidr=10.244.0.0/16 是 k8s 的网络插件所需要用到的配置信息，用来给 node 分配子网段。然后我们这边用到的网络插件是 flannel，就是这么配。

```
kubeadm init --pod-network-cidr=10.244.0.0/16
```

有如下的报错信息:

```
[root@localhost ~]# kubeadm init --pod-network-cidr=10.244.0.0/16
W0108 16:59:41.129123   31192 version.go:101] could not fetch a Kubernetes version from the internet: unable to get URL "https://dl.k8s.io/release/stable-1.txt": Get https://dl.k8s.io/release/stable-1.txt: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
W0108 16:59:41.129373   31192 version.go:102] falling back to the local client version: v1.17.0
W0108 16:59:41.129733   31192 validation.go:28] Cannot validate kube-proxy config - no validator is available
W0108 16:59:41.129757   31192 validation.go:28] Cannot validate kubelet config - no validator is available
[init] Using Kubernetes version: v1.17.0
[preflight] Running pre-flight checks
	[WARNING IsDockerSystemdCheck]: detected "cgroupfs" as the Docker cgroup driver. The recommended driver is "systemd". Please follow the guide at https://kubernetes.io/docs/setup/cri/
	[WARNING SystemVerification]: this Docker version is not on the list of validated versions: 17.05.0-ce. Latest validated version: 19.03
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using 'kubeadm config images pull'
error execution phase preflight: [preflight] Some fatal errors occurred:
	[ERROR ImagePull]: failed to pull image k8s.gcr.io/kube-apiserver:v1.17.0: output: Error response from daemon: Get https://k8s.gcr.io/v1/_ping: dial tcp 108.177.97.82:443: getsockopt: connection refused
, error: exit status 1
	[ERROR ImagePull]: failed to pull image k8s.gcr.io/kube-controller-manager:v1.17.0: output: Error response from daemon: Get https://k8s.gcr.io/v1/_ping: dial tcp 108.177.97.82:443: getsockopt: connection refused
, error: exit status 1
	[ERROR ImagePull]: failed to pull image k8s.gcr.io/kube-scheduler:v1.17.0: output: Error response from daemon: Get https://k8s.gcr.io/v1/_ping: dial tcp 74.125.203.82:443: getsockopt: connection refused
, error: exit status 1
	[ERROR ImagePull]: failed to pull image k8s.gcr.io/kube-proxy:v1.17.0: output: Error response from daemon: Get https://k8s.gcr.io/v1/_ping: dial tcp 74.125.203.82:443: getsockopt: connection refused
, error: exit status 1
	[ERROR ImagePull]: failed to pull image k8s.gcr.io/pause:3.1: output: Error response from daemon: Get https://k8s.gcr.io/v1/_ping: dial tcp 74.125.203.82:443: getsockopt: connection refused
, error: exit status 1
	[ERROR ImagePull]: failed to pull image k8s.gcr.io/etcd:3.4.3-0: output: Error response from daemon: Get https://k8s.gcr.io/v1/_ping: dial tcp 74.125.203.82:443: getsockopt: connection refused
, error: exit status 1
	[ERROR ImagePull]: failed to pull image k8s.gcr.io/coredns:1.6.5: output: Error response from daemon: Get https://k8s.gcr.io/v1/_ping: dial tcp 74.125.203.82:443: getsockopt: connection refused
, error: exit status 1
[preflight] If you know what you are doing, you can make a check non-fatal with `--ignore-preflight-errors=...`
To see the stack trace of this error execute with --v=5 or higher
```

这个报错是因为国内gcr.io无法访问（谷歌自己的容器镜像仓库），我们需要通过阿里云镜像下载下来，重新打上标签来解决。

```
	docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.17.0
	docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager:v1.17.0 
	docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler:v1.17.0
	docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.17.0
	docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1
	docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/etcd:3.4.3-0
	docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.6.5
```

重新打回标签

```
	docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-apiserver:v1.17.0 k8s.gcr.io/kube-apiserver:v1.17.0
	docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-controller-manager:v1.17.0 k8s.gcr.io/kube-controller-manager:v1.17.0 
	docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-scheduler:v1.17.0 k8s.gcr.io/kube-scheduler:v1.17.0
	docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.17.0 k8s.gcr.io/kube-proxy:v1.17.0
	docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1 k8s.gcr.io/pause:3.1
	docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/etcd:3.4.3-0 k8s.gcr.io/etcd:3.4.3-0
	docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.6.5 k8s.gcr.io/coredns:1.6.5
```

安装好相关镜像后，再次执行init命令后，kubeadm就能成功安装。在成功安装好后，kubeadm会提示其他节点要加入集群需要执行的命令，同时提供加入集群需要的token，这个要记录下来。

```
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.169.134:6443 --token nl8oq0.ly7ti8ibkg47t3kj \
    --discovery-token-ca-cert-hash sha256:42b7132d686c233cc931628043dbe7ea277284a967e959521ee03d0872ff64df 

```

## 5. 配置kubectl

根据上面的提示，master节点需要新建一个新用户来执行相关命令

```
su - kubernetes
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

为了使用更加便捷，启用 kubectl 命令的自动补全功能。

```
echo "source <(kubectl completion bash)" >> ~/.bashrc
```

## 6. 安装Pod网络

Kubernetes 支持多种网络方案，这里我们使用 flannel。执行如下命令即可部署 flannel：

```
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

在我的虚拟机执行的时候会报错Network file descriptor is not connected，我是直接在宿主机访问该地址拿到文件内容，并保存上传到服务器/kube-flannel.yml，因为-f后面接文件名。
执行的时候还是报了如下错

```
[root@localhost ~]# kubectl apply -f kube-flannel.yml 
The connection to the server localhost:8080 was refused - did you specify the right host or port?
```

原因：kubenetes master没有与本机绑定，集群初始化的时候没有设置
解决办法：执行以下命令

```
export KUBECONFIG=/etc/kubernetes/admin.conf
```

/etc/kubernetes/admin.conf这个文件主要是集群初始化的时候用来传递参数的

## 7. node节点安装和配置

### 1. 添加集群节点

在两个node节点上分别执行

```
kubeadm join 192.168.169.134:6443 --token nl8oq0.ly7ti8ibkg47t3kj \
    --discovery-token-ca-cert-hash sha256:42b7132d686c233cc931628043dbe7ea277284a967e959521ee03d0872ff64df 
```

出现如下信息说明成功加入了集群

```
This node has joined the cluster:
* Certificate signing request was sent to apiserver and a response was received.
* The Kubelet was informed of the new secure connection details.

Run 'kubectl get nodes' on the control-plane to see this node join the cluster.

```

### 2. 安装镜像

在每一个node节点安装quay.io/coreos/flannel:v0.11.0-amd64（这个可以直接下载）、k8s.gcr.io/pause 和 k8s.gcr.io/kube-proxy 这三个镜像，其中后面两个镜像具体版本可以执行kubeadm config images list 查看一下：

```
[root@localhost ~]# kubeadm config images list
W0109 10:25:18.538307   10045 version.go:101] could not fetch a Kubernetes version from the internet: unable to get URL "https://dl.k8s.io/release/stable-1.txt": Get https://dl.k8s.io/release/stable-1.txt: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
W0109 10:25:18.539340   10045 version.go:102] falling back to the local client version: v1.17.0
W0109 10:25:18.540594   10045 validation.go:28] Cannot validate kubelet config - no validator is available
W0109 10:25:18.540636   10045 validation.go:28] Cannot validate kube-proxy config - no validator is available
k8s.gcr.io/kube-apiserver:v1.17.0
k8s.gcr.io/kube-controller-manager:v1.17.0
k8s.gcr.io/kube-scheduler:v1.17.0
k8s.gcr.io/kube-proxy:v1.17.0
k8s.gcr.io/pause:3.1
k8s.gcr.io/etcd:3.4.3-0
k8s.gcr.io/coredns:1.6.5
```

还是同样的方法，从阿里云下载，再重现打标签。

```
docker pull quay.io/coreos/flannel:v0.11.0-amd64
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.17.0
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.17.0 k8s.gcr.io/kube-proxy:v1.17.0
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1 k8s.gcr.io/pause:3.1
```

### 3. 查看节点状态

在 master 节点上执行 kubectl get nodes 查看节点状态：
如果节点状态处理NotReady，这是因为每个节点都需要启动若干组件，这些组件都是在 Pod 中运行，需要一段时间。
查看Pod状态
CrashLoopBackOff、ContainerCreating、Init:0/1 等都表明 Pod 没有就绪，只有 Running 才是就绪状态。

```
kubectl get pod --all-namespaces
```

查看Pod的具体情况

```
kubectl describe pod <Pod Name> --namespace=kube-system
```

当所有的 Pod 都处于 Running 状态后，可以发现所有的节点也就准备好了。至此 Kubernetes集群创建成功。

附录：

在node上执行kubeadm reset 可以断开node,然后重新join
在master上执行kubeadm reset后可以重新init

