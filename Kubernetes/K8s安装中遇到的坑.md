kubernetes的安装其实自己一直是不成功的, 各种报错, 各种问题, 一直迟迟发不出来这篇文章, 甚至期间自己还参加了一个kubernetes的培训, 各种坑, 今天终于是搞定了.

坑1:

自己以前一直使用的centos6.9, 在本地的虚拟机上安装的, 真的不行, 后来查看官网, kubernetes是有系统要求的, 应该是最少要求是centos7.6以上的版本吧.

坑2:

mac的kubernetes一直没有解决, kubernetes模式使用的源是google源, 因为kubernetes就是google爸爸开发的, 但是国内是一般情况下是没法翻墙的, 所以所需要的镜像你没法现在

坑3:

master进行初始化的时候, 你并无法保证一次性就可以成功, 总是自己需要安装那么好几次, 踩好几次坑, 经过调查需要使用`kubeadm reset`命令, 自己去删除或者kill进程, 如果你真的想我这么做了, 是一个垃圾的操作.(小白入门)



如果在安装docker过程中, 有如下的报错:

```
--> Finished Dependency Resolution
Error: Package: docker-ce-18.06.0.ce-3.el7.x86_64 (docker-ce-stable)
           Requires: container-selinux >= 2.9
 You could try using --skip-broken to work around the problem
 You could try running: rpm -Va --nofiles --nodigest
```



下载该URL软件:

http://mirror.centos.org/centos/7/extras/x86_64/Packages/container-selinux-2.107-1.el7_6.noarch.rpm

```
yum install -y container-selinux-2.68-1.el7.noarch.rpm
#如果可以直接上网,使用下面的命令
yum -y install http://mirror.centos.org/centos/7/extras/x86_64/Packages/container-selinux-2.68-1.el7.noarch.rpm
```





