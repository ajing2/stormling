# linux入门(一)

在开始写今天的文档之前, 我自己先BB几句, 还记得自己刚大学毕业的时候, 连一个windows的cmd命令都不会, 感觉别人玩一个ping, 或者查看个ip和mac地址啥的, 都觉得牛逼的不得了.算起来自己也是从linux入门计算机,shell应该是自己接触到的第一个黑窗口, 后来慢慢会了, 才觉得也就是那么回事吧.呵呵



如果大家想快速学习一下, 还是推介大家看一下这个网址, 网址为: http://www.apelearn.com/study_v2/index.html, 其实我自己就是阿铭老师一个弟子, 在他的带领下自己才走入互联网的公司大门.



接下来, 就来整理一下自己曾经学到的一些知识吧

## 1. linux的发行版本

其实说实话, 我自己对linux的发行版本也不是很了解, 你如果网上一搜的话, 一大堆, 较知名的发行版有：Ubuntu、RedHat、CentOS、Debain、Fedora、SuSE、OpenSUSE、TurboLinux、BluePoint、RedFlag、Xterm、SlackWare等, 但是就这么多版本中, 我就接触过前三个, 可能自己比较垃圾吧(嘿嘿)

其实说起linux, 我在第一份工作的时候, 最新接触的是unix系统, 后来才知道unix是linux系统的前身, 命令啥的都差不多, 但是还是有一些细小的差距.但是当时我在银行的系统中,看到内存是1T的时候, 当时感叹了很长时间.这么牛逼的内存, 自己平时是没有见过, 后来在大型互联网公司, 而且那时银行也是有钱啊, 随着这几年, 这个硬件设备可能也比较常见了.

在回来说说发行版本, 就前三个我都接触过, 公司大部分用的是CentOS的系统, 个人办公电脑上, 很多大佬要么用的是Ubuntu, 或者是mac(本身就是Unix系统),RedHat就是收费版本的CentOs, 你可以这么简单的理解吧

其词很多人在玩linux的时候, 都在乎是否有个什么证书,其实在工作岗位中, 这个其实不是特别重要, 只要你技术过硬, 其他就不是问题, 但是如果你要提名, 或者国有企业的时候, 这个装逼特别管用.你们懂就好了.



## 2. 创建虚拟机

如果你还使用的是windows, 这个没有关系, 大家常用的vmware和virtualbox, virtualbox是免费的, vmWare是收费的, 但是国内的情况, 大家还是很懂的.

虚拟机的网卡三种模式:

1.仅主机：虚拟机用网线和pc连接

 2.桥接：虚拟机和本机并列关系，网段一样，（相当于两个pc）

 3.nat模式：pc路由转发，虚拟机把pc当成路由器

## 3. 安装操作系统

安装操作系统, 我觉得大家还是根据铭哥的教程吧, 这个还是很详细的.http://www.apelearn.com/study_v2/chapter4.html

值得说的是, 其实在大多是工作中, 很多操作系统的分区是我们需要说一下的, 一般分区的话, 大家可以都采用这种方式:

- /: 根分区, 一般分20g, 应该是基本的系统操作使用了

- /swap: swap分区,一般是内存的2倍    最大8g（后期可以增加） http://www.apelearn.com/study_v2/chapter9.html#swap
- /boot  boot启动所需要的东西,大概也就97M左右, 那分200M就好了
- /data   存放主要的数据和安装的程序, 剩下所有的磁盘空间都放在这里

## 4. ip配置

如果你安装完操作系统, 不得不说的是需要配置一下系统的IP地址了, 这个必须的骚操作

如果你是一个菜鸟, 登陆系统以后, 先给他来一个自动获取IP地址的命令:

```shell
# 自动获取ip地址
[root@localhost ~]# dhclient
#查看获取到的ip地址
[root@localhost ~]# ifconfig  
```

配置IP地址

```shell
#编辑网卡配置文件, 不同的系统最后一个名字可能会有差异
[root@localhost ~]# vi /etc/sysconfig/network-scripts/ifcfg-eth0
IPADDR=10.72.137.85
NETMASK=255.255.255.0
GATEWAY=10.72.137.1
ONBOOT=yes  #开机启动
BOOTPROTO=static  #静态的ip地址

#重启网卡
[root@localhost ~]# service network restart
正在关闭接口 eth0：                                        [确定]
关闭环回接口：                                             [确定]
弹出环回接口：                                             [确定]
弹出界面 eth0：                                            [确定]
```

## 5. 入门命令

a. 切换目录

cd			切换到根目录

cd ~		切换到根目录

cd -		 返回上一个目录(类似回看)

cd .. 		返回上一级目录

b. 查看目录

ls -l  查看性情

ls -h  展示适当的大小

ls -t   时间排序

ls -r  反序

ls -a 查看全部

一般使用: ls -lhtr 

c. 输出

echo "hello world"

d. 创建和删除目录

mkdir abc

rm -rf abc

e. 复制

cp -r   避免提示信息

f. 重命名和移动文件

1. 移动文件 mv 1.txt /home/admin
2. 重命名: mv 1.txt 2.txt

## 6. 互信

在linux服务器上操作, 免密登陆这个骚操作你一定要会啊, 也是你的装逼神器, 并且给你减少很多工作量

### 6.1 配置互信

1. 准备两台服务器

ip1:192.168.1.10

ip2:192.168.1.11

2. 确保两台服务器的selinux和防火墙关闭

两台服务器, 首先保证两台服务器的selinex是关闭的, 可以通过下面命令查看防火墙的情况:

```shell
[root@localhost ~]# sestatus
```

如果结果不为disabled, 修改vim /etc/selinux/config修改为如下: 

SELINUX=disabled

防火墙iptables如果你玩的不是特别溜, 也可以关闭,

```shell
[root@localhost ~]# iptables -F
```

3. 在ip1上创建秘钥对

```shell
[root@localhost ~]# ssh-keygen
# 一般都直接按回车就好了
```

在目录/root/.ssh/下面生成了秘钥对, 秘钥和公钥是成对出现的, 好比一把钥匙只能开一把锁.

​	a. id_rsa （私钥）

​	b. id_rsa.pub (公钥)

4. 在ip2上进行配置

执行如下命令:

```shell
[root@localhost ~]# mkdir /root/.ssh
[root@localhost ~]# scp root@192.168.1.11:/4root/.ssh/id_rsa.pub /root/.ssh/ip1_keys
[root@localhost ~]# mv /root/.ssh/ip1_keys /root/.ssh/authorized_keys
[root@localhost ~]# chmod -R 600 /root/.ssh/
```

权限有要求，一定是600，特别是非root用户的时候

这样ip1就可以免密登陆ip2了.

### 6.2 ssh免密码登陆的原理

下面套用赵强老师的一张图, 讲的还是很清楚的.

![ssh免密登陆](/Users/lingjing/Desktop/ssh免密登陆.png)

1. 机器A先生成一对秘钥对, 公钥和私钥
2. 把公钥给机器B
3. 机器B拿到机器A的公钥
4. 机器B随机产生一个随机字符串, 例如: helloworld
5. 机器B用机器A的公钥加密随机字符串: helloworld -> \*\*\*\*\*\*\*\*\*\*
6. 机器B把加密后的字符串发给机器A
7. 机器A得到机器B的发来的加密的字符串
8. 机器A使用自己的私钥解密加密的字符串
9. 把解密出来的helloworld发送给机器B
10. 机器B接收到机器A的helloworld
11. 对比第四部和第10步的随机字符是否一样.