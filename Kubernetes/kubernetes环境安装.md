# kubernetes环境安装

# 1. 节点信息

| ip              | 主机名 | 角色 | 操作系统    |
| --------------- | ------ | ---- | ----------- |
| 192.168.157.130 | master | 主   | centeos7.6+ |
| 192.168.157.131 | ode1   | 节点 | Centos7.6+  |
| 192.168.157.132 | node2  | 节点 | Centos7.6+  |

# 2. 关闭防火墙相关

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

关闭swap

```
swapoff -a
# 永久关闭, 需要注释掉/dev开头的文字
vim /etc/fstab                                                                                       
```

如下:

```
UUID=ed95c595-4813-480e-992b-85b1347842e8 /                       ext4    defaults        1 1
# /dev/vgdata/lvdata    /data ext4    defaults        0 0           
```

# 3. 网桥配置

```
modprobe br_netfilter
cat <<EOF >  /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
```

使配置生效

```
sysctl -p /etc/sysctl.d/k8s.conf
ls /proc/sys/net/bridge
```

# 4. 安装docker

安装基本服务

```
yum install -y net-tools epel-release vim  yum-utils device-mapper-persistent-data lvm2
```

配置docker和安装docker

```
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum install -y docker-ce-18.06.0.ce
systemctl enable docker
systemctl start docker

cat <<EOF > /etc/docker/daemon.json
{
  "insecure-registries":["0.0.0.0/0"],
  "exec-opts": ["native.cgroupdriver=systemd"]
}
EOF
systemctl restart docker
```

# 5. 安装k8s相关

配置k8syum源

```
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

安装kubectl、kubelet、kubenetes-cni、kubeadm

```
yum install -y kubectl-1.14.1 kubelet-1.14.1 kubernetes-cni-0.7.5 kubeadm-1.14.1
```

设置开机启动

```
systemctl enable kubelet
```

准备k8s 需要的docker 镜像（因为外网原因，不能下载镜像）

```
cat > pullimages.sh << EOF
# 添加如下内容

docker pull mirrorgooglecontainers/kube-apiserver-amd64:v1.14.1
docker pull mirrorgooglecontainers/kube-controller-manager-amd64:v1.14.1
docker pull mirrorgooglecontainers/kube-scheduler-amd64:v1.14.1
docker pull mirrorgooglecontainers/kube-proxy-amd64:v1.14.1
docker pull mirrorgooglecontainers/pause:3.1
docker pull mirrorgooglecontainers/etcd-amd64:3.3.10
docker pull coredns/coredns:1.3.1

docker tag mirrorgooglecontainers/kube-controller-manager-amd64:v1.14.1 k8s.gcr.io/kube-controller-manager:v1.14.1
docker tag mirrorgooglecontainers/kube-scheduler-amd64:v1.14.1 k8s.gcr.io/kube-scheduler:v1.14.1
docker tag mirrorgooglecontainers/kube-apiserver-amd64:v1.14.1 k8s.gcr.io/kube-apiserver:v1.14.1
docker tag mirrorgooglecontainers/kube-proxy-amd64:v1.14.1 k8s.gcr.io/kube-proxy:v1.14.1
docker tag mirrorgooglecontainers/pause:3.1 k8s.gcr.io/pause:3.1
docker tag mirrorgooglecontainers/etcd-amd64:3.3.10 k8s.gcr.io/etcd:3.3.10
docker tag coredns/coredns:1.3.1 k8s.gcr.io/coredns:1.3.1

docker rmi mirrorgooglecontainers/kube-apiserver-amd64:v1.14.1
docker rmi mirrorgooglecontainers/kube-controller-manager-amd64:v1.14.1
docker rmi mirrorgooglecontainers/kube-scheduler-amd64:v1.14.1
docker rmi mirrorgooglecontainers/kube-proxy-amd64:v1.14.1
docker rmi mirrorgooglecontainers/pause:3.1
docker rmi mirrorgooglecontainers/etcd-amd64:3.3.10
docker rmi coredns/coredns:1.3.1

EOF

# 执行脚本
sh pullimages.sh
```

# 6. 主节点初始化

集群初始化（请记录初始化最后打印出的kubeadm join 信息）（IP根据实际情况修改）

```
kubeadm init \
--kubernetes-version=v1.14.1 \
--pod-network-cidr=10.244.0.0/16 \
--apiserver-advertise-address=`ifconfig eth0 |awk '{print $2}'|sed -n "2,1p"`

记录：
kubeadm join ${IP_ADDRESS}:6443 --token p2f3ud.l44djf21s0nj7a5y \
    --discovery-token-ca-cert-hash sha256:866d6131855e1847bcec7481a184b42ea8616bbe95a9ffcf8dfcc64cdb38a905

# 复制配置
mkdir ~/.kube
cp -i /etc/kubernetes/admin.conf ~/.kube/config
chown $(id -u):$(id -g) ~/.kube/config
```

# 7. 主节点配置flannel网络

```
wget https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
kubectl  apply -f kube-flannel.yml
```

使 master 节点参与工作负载

```
kubectl describe node | grep Taint
kubectl taint nodes --all node-role.kubernetes.io/master-
```

# 8. 子节点加入集群

**注意:** 【子节点执行】子节点加入集群（IP根据实际情况修改）

```shell
kubeadm join ${IP_ADDRESS}:6443 --token p2f3ud.l44djf21s0nj7a5y \
    --discovery-token-ca-cert-hash sha256:866d6131855e1847bcec7481a184b42ea8616bbe95a9ffcf8dfcc64cdb38a905

# 确认日志无报错

# 复制配置
mkdir ~/.kube
拷贝主节点的 ~/.kube/config 到 ~/.kube（命令:scp -r ${IP_ADDRESS}:/root/.kube/config ~/.kube/）
chown $(id -u):$(id -g) ~/.kube/config
# 在主节点查询 Ready 说明节点加入集群正常
kubectl get nodes
```

