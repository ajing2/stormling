# kubernetes集群的安装部署教程

安装Kubernetes, 我们需要最少三天机器， 一台master， 另外两台node节点

| IP              | hostnme | 操作系统  |
| --------------- | ------- | --------- |
| 192.168.157.130 | master  | centos7.6 |
| 192.168.157.131 | node1   | centos7.6 |
| 192.168.157.132 | node2   | centos7.6 |

## 1.安装docker

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

## 2. 安装kubelet, kubeadm, kubectl

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

 将 SELinux 设置为 permissive 模式(将其禁用) 

```
setenforce 0
sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config

```

 使用yum安装 

```
yum install -y kubelet kubeadm kubectl --disableexcludes=kubernetes

```

 这种开机自启动 

```
systemctl enable kubelet && systemctl start kubelet

```

