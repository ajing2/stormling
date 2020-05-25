# redis专题

## 1. redis介绍

###1.1 什么是redis

Redis是用C语言开发的一个开源的高性能 ( key-value ) ，它是一种NOSQL的数据库。

redis是单进程单线程的内存数据库, 所以说不存在线程安全问题

redis课支持10wQPS, 可以说性能非常优秀. 之所以单进程单线程性能还那么好, 是因为底层采用了[IO多路复用(NIO思想)]

### 1.2 redis数据类型

redis提供了五种数据类型:

string(字符串)

list(链表)

set(集合)

zset(有序集合)

hash(哈希类型)

记得有一次面试, 面试官特意问了zset数据类型的用法, 平时开发中很少用到zset数据类型, 但是zset经典的应用就是排序, 后面会介绍到.

### 1.3 redis和memcached的对比

- 持久化:
  - redis可以用来做缓存, 也可以做存储, 致辞aof和rdb两种持久化方式
  - memecached只能做缓存, 没法持久化数据
- 数据结构:
  - redis有丰富的数据类型: 五种常用的数据结构
  - memcached一般就是字符串和对象

### 1.4 redis官网

- 官网地址: http://redis.io
- 中文官网地址: http://www.redis.cn
- 下载地址: http://download.redis.io/releases/

### 1.5 redis应用场景

- 内存数据库(登陆信息, 购物车信息, 用户浏览器记录)
- 缓存服务器(商品数据, 广告数据等等)(**使用的最多**)
- session共享
- 任务队列(秒杀, 抢购, 12306等)
- 分布式锁的实现
- 支持发布订阅的消息模式
- 应用排行榜(有序集合)
- 网站访问统计
- 数据过期处理



## 2. redis的多种模式

### 2.1 redis单机版

- 执行如下命令:

```shell
#第一步 安装C语言环境
yum install -y gcc-c++
yum install -y wget
# 第二步 下载源码包
wget http://download.redis.io/releases/redis-5.0.6.tar.gz
tar xzvf redis-5.0.6.tar.gz
# 第三步 编译
cd redis-5.0.6
make
# 第四步 安装
make install prefix=/usr/local/redis-5.0.6

```

- 启动redis

```shell
cd redis-5.0.6
./redis-server
```

如果出现如下的界面, 说明启动成功了:

![1581406513135](/Users/lingjing/公众号/redis专题/1581406513135.jpg)

- 守护进程启动

redis-5.0.6下面有一个配置文件redis.conf, 修改如下:

```shell
vim redis.conf

# 将`daemonize`由`no`改为`yes`
daemonize yes
# 默认绑定的是回环地址，默认不能被其他机器访问
# bind 127.0.0.1

# 是否开启保护模式，由yes该为no
protected-mode no
```

**启动**

```shell
./redis-server redis.conf
```

- 后端启动关闭方式

```shell
./redis-cli shutdown
```

- redis的其他主要命令
  -  redis-benchmark:     性能测试工具
  - redis-check-aof:      检查 AOF 日志
  - redis-check-dump:      检查 RDB 日志
  - redis-cli:               启动命令行客户端
  - redis-sentinel:    redis的哨兵服务, 在redis2.8+以后加入的
  - Redis-server:       启动Redis服务

在redis的解压目录中, 有一个redis的配置文件

### 2.2 主从模式

####1. 主从复制的作用

- 主从备份 防止主机宕机
- 读写分离,分担 master 的任务
- 任务分离,如从服分别分担备份工作与计算工作

#### 2. redis主从复制的两种方式

![slave](/Users/lingjing/公众号/redis专题/slave.png)

#### 3. redis主从服务通信的原理

![9A8A40ED](/Users/lingjing/公众号/redis专题/9A8A40ED.png)

#### 4. 配置redis主从模式

如果主服务器上需要增加redis的密码, 增加如下配置:

```shell
requirepass xxxxxx
```

redis的主, 从的安装方式, 步骤都一样, 从的配置文件从主拷贝过来, 然后在从节点的配置文佳中加上如下配置:

```shell
slaveof localhost 6379
#如果主上有密码, 则从服务器上的配置文件需要增加以下配置:
masterauth xxxxxx
```

### 2.3 哨兵模式

redis的哨兵模式是建立在主从模式上的, 因为主从模式如果主发生故障, 我们的从并无法直接提升出来主共我们使用, 所以有了哨兵模式, 简单的说, 哨兵模式就是增加的投票机制, 增加几台服务器作为哨兵节点, 即监控节点, 如果超过半数的哨兵即: 2 / n + 1的个数认为主挂了, 就会自动提升从服务器为主服务器, 并且, 哨兵是可以实时改动redis主从的配置文件的.而自己的配置文件是实时发生变化.

#### 2.3.1 sentinel结构

![image-20200211185452635](/Users/lingjing/Library/Application Support/typora-user-images/image-20200211185452635.png)

#### 2.3.2 sentinel功能

Sentinel实现如下功能：

（1）monitoring——redis实例是否正常运行。

（2）notification——通知application错误信息。

（3）failover——某个master死掉，选择一个slave升级为master，修改其他slave的slaveof关系，更新client连接。

（4）configurationprovider——client通过sentinel获取redis地址，并在failover时更新地址。

Redis 2.8及以上版本可用。



#### 2.3.3 sentinel集群

很显然，只使用单个sentinel进程来监控redis集群是不可靠的，当sentinel进程宕掉后(sentinel本身也有单点问题，single-point-of-failure)整个集群系统将无法按照预期的方式运行。所以有必要将sentinel集群，这样有几个好处：

即使有一些sentinel进程宕掉了，依然可以进行redis集群的主备切换；

如果只有一个sentinel进程，如果这个进程运行出错，或者是网络堵塞，那么将无法实现redis集群的主备切换（单点问题）;

如果有多个sentinel，redis的客户端可以随意地连接任意一个sentinel来获得关于redis集群中的信息。

最少建立3个sentinel节点(sentinel-26380.conf、sentinel-26381.conf、sentinel-26382.conf)的部署方法完全是一致的(端口不同).

#### 2.3.4 配置sentinel

根据官网给出的配置文件如下:

```shell
sentinel monitor mymaster 127.0.0.1 6379 2
sentinel down-after-milliseconds mymaster 60000
sentinel failover-timeout mymaster 180000
sentinel parallel-syncs mymaster 1

# 监控其他集群
sentinel monitor resque 192.168.1.3 6380 4
sentinel down-after-milliseconds resque 10000
sentinel failover-timeout resque 180000
sentinel parallel-syncs resque 5
```

- 第一行配置指示 Sentinel 去监视一个名为 mymaster 的主服务器， 这个主服务器的 IP 地址为 127.0.0.1 ， 端口号为 6379 ， 而将这个主服务器判断为失效至少需要 2 个 Sentinel 同意 （只要同意 Sentinel 的数量不达标，自动故障迁移就不会执行）。

  不过要注意， 无论你设置要多少个 Sentinel 同意才能判断一个服务器失效， 一个 Sentinel 都需要获得系统中多数（majority） Sentinel 的支持， 才能发起一次自动故障迁移， 并预留一个给定的配置纪元 （configuration Epoch ，一个配置纪元就是一个新主服务器配置的版本号）。

  换句话说， 在只有少数（minority） Sentinel 进程正常运作的情况下， Sentinel 是不能执行自动故障迁移的。

- down-after-milliseconds 选项指定了 Sentinel 认为服务器已经断线所需的毫秒数。

如果服务器在给定的毫秒数之内， 没有返回 Sentinel 发送的 PING 命令的回复， 或者返回一个错误， 那么 Sentinel 将这个服务器标记为主观下线（subjectively down，简称 SDOWN ）。

不过只有一个 Sentinel 将服务器标记为主观下线并不一定会引起服务器的自动故障迁移： 只有在足够数量的 Sentinel 都将一个服务器标记为主观下线之后， 服务器才会被标记为客观下线（objectively down， 简称 ODOWN ）， 这时自动故障迁移才会执行。

将服务器标记为客观下线所需的 Sentinel 数量由对主服务器的配置决定。

- parallel-syncs 选项指定了在执行故障转移时， 最多可以有多少个从服务器同时对新的主服务器进行同步， 这个数字越小， 完成故障转移所需的时间就越长。

如果从服务器被设置为允许使用过期数据集（参见对 redis.conf 文件中对 slave-serve-stale-data 选项的说明）， 那么你可能不希望所有从服务器都在同一时间向新的主服务器发送同步请求， 因为尽管复制过程的绝大部分步骤都不会阻塞从服务器， 但从服务器在载入主服务器发来的 RDB 文件时， 仍然会造成从服务器在一段时间内不能处理命令请求： 如果全部从服务器一起对新的主服务器进行同步， 那么就可能会造成所有从服务器在短时间内全部不可用的情况出现。

你可以通过将这个值设为 1 来保证每次只有一个从服务器处于不能处理命令请求的状态。

#### 2.3.5 启动sentinel

线上一般是不同的机器, 我们这里使用的是一个机器的不同端口

```shell
./redis-sentinel sentinel-26380.conf &
./redis-sentinel sentinel-26381.conf &
./redis-sentinel sentinel-26382.conf &
```

#### 2.3.6 sentinel的工作原理

1. 每个Sentinel以每秒钟一次的频率向它所知的Master，Slave以及其他 Sentinel 实例发送一个 PING 命令 
2. 如果一个实例（instance）距离最后一次有效回复 PING 命令的时间超过 down-after-milliseconds 选项所指定的值， 则这个实例会被 Sentinel 标记为主观下线。 
3. 如果一个Master被标记为主观下线，则正在监视这个Master的所有 Sentinel 要以每秒一次的频率确认Master的确进入了主观下线状态。 
4. 当有足够数量的 Sentinel（大于等于配置文件指定的值）在指定的时间范围内确认Master的确进入了主观下线状态， 则Master会被标记为客观下线 
5. 在一般情况下， 每个 Sentinel 会以每 10 秒一次的频率向它已知的所有Master，Slave发送 INFO 命令 
6. 当Master被 Sentinel 标记为客观下线时，Sentinel 向下线的 Master 的所有 Slave 发送 INFO 命令的频率会从 10 秒一次改为每秒一次 
7. 若没有足够数量的 Sentinel 同意 Master 已经下线， Master 的客观下线状态就会被移除。 
   若 Master 重新向 Sentinel 的 PING 命令返回有效回复， Master 的主观下线状态就会被移除。

### 2.4 redis cluster

#### 2.4.1 什么是redis cluster

Redis Cluster 是 Redis 的分布式解决方案，在 Redis 3.0 版本正式推出 的，有效解决了 Redis 分布式方面的需求。当遇到单机内存、并发、流 量等瓶颈时，可以采用 Cluster 架构达到负载均衡的目的。

redis-cluster的优势:

1. 官方推荐，毋庸置疑。

2. 去中心化，集群最大可增加1000个节点，性能随节点增加而线

   性扩展。

3. 管理方便，后续可自行增加或摘除节点，移动分槽等等。

4. 简单，易上手。

#### 2.4.2数据分布理论与redis的数据分区

分布式数据库首要解决把整个数据集按照分区规则映射到多个节点 的问题，即把数据集划分到多个节点上，每个节点负责整个数据的一个 子集。常见的分区规则有哈希分区和顺序分区。**Redis Cluster** 采用哈希 分区规则。

虚拟槽分区巧妙地使用了哈希空间，使用分散度良好的哈希函数把 所有的数据映射到一个固定范围内的整数集合，整数定义为槽(slot)。比如 **Redis Cluster** 槽的范围是 **0** ~ **16383**。槽是集群内数据管理和迁移 的基本单位。

Redis Cluster 采用虚拟槽分区，所有的键根据哈希函数映射到 0 ~16383，计算公式:slot = CRC16(key)&16383。每一个节点负责维护一部 分槽以及槽所映射的键值数据。

redis-cluster把所有的物理节点映射到[0-16383] 上,cluster 负责维护node <->slot <-> value

####2.4.3 redis cluster的体系架构

我们以 **6** 个节点为例，来介绍 Redis Cluster 的体系架构。其中:三个为

master 节点，另外三个为 slave 节点。

![image-20200211222401311](/Users/lingjing/Library/Application Support/typora-user-images/image-20200211222401311.png)

####2.4.4 redis cluster一致性保证(官网)

Redis 并不能保证数据的**强一致性**. 这意味这在实际中集群在特定的条件下可能会丢失写操作.

第一个原因是因为集群是用了异步复制. 写操作过程:

- 客户端向主节点B写入一条命令.
- 主节点B向客户端回复命令状态.
- 主节点将写操作复制给他得从节点 B1, B2 和 B3.

主节点对命令的复制工作发生在返回命令回复之后， 因为如果每次处理命令请求都需要等待复制操作完成的话， 那么主节点处理命令请求的速度将极大地降低 —— 我们必须在性能和一致性之间做出权衡。 注意：Redis 集群可能会在将来提供同步写的方法。 Redis 集群另外一种可能会丢失命令的情况是集群出现了网络分区， 并且一个客户端与至少包括一个主节点在内的少数实例被孤立。

举个例子 假设集群包含 A 、 B 、 C 、 A1 、 B1 、 C1 六个节点， 其中 A 、B 、C 为主节点， A1 、B1 、C1 为A，B，C的从节点， 还有一个客户端 Z1 假设集群中发生网络分区，那么集群可能会分为两方，大部分的一方包含节点 A 、C 、A1 、B1 和 C1 ，小部分的一方则包含节点 B 和客户端 Z1 .

Z1仍然能够向主节点B中写入, 如果网络分区发生时间较短,那么集群将会继续正常运作,如果分区的时间足够让大部分的一方将B1选举为新的master，那么Z1写入B中得数据便丢失了.

注意， 在网络分裂出现期间， 客户端 Z1 可以向主节点 B 发送写命令的最大时间是有限制的， 这一时间限制称为节点超时时间（node timeout）， 是 Redis 集群的一个重要的配置选项：

#### 2.4.5 安装redis cluster

Redis cluster最少需要三台主服务器, 三台从服务器(自己做实验的话, 可以使用一台服务器, 不同的端口)

1. 安装Ruby环境和Ruby Redis接口

由于创建和管理需要使用到 redis-trib 工具，该工具位于 Redis 源码的 src 文 件夹中，它是一个 Ruby 程序，这个程序通过向实例发送特殊命令来完成创建新 集群，检查集群，或者对集群进行重新分片(reshared)等工作，所以需要安装 Ruby环境和相应的 Redis 接口

下面是可以使用 yum 来安装 Ruby, 添加yum源, 然后yum安装

[media]

name=Red Hat Enterprise Linux 7.4 baseurl=file:///cdroom
enabled=1
gpgcheck=1 

gpgkey=file:///cdroom/RPM-GPG-KEY-redhat-release

```shell
yum -y install ruby ruby-devel rubygems rpm-build
gem install redis
```

如果在安装过程中出现ERROR:  Error installing redis redis requires Ruby version >= 2.2.2.

请参考该博客地址, 讲的十分清楚: https://blog.csdn.net/chenxinchongcn/article/details/78666374

2. 以6个节点为例, 安装和部署redis cluster

- 主节点: 6379, 6380, 6381
- 从节点: 6382, 6383, 6384
- 每个配置文件的地方都需要修改, 修改成端口所对应的

```shell
daemonize yes
#各个节点的端口不同
port 6379
#开启集群服务
cluster-enabled yes
#节点的配置文件名字, 需要更改成不同的端口
cluster-config-file nodes/nodes-6379.conf cluster-node-timeout 15000
# rdb 文件名字改成不同的端口
dbfilename dump6379.rdb
appendonly yes
#aof 文件名字改成不同的端口
appendfilename "appendonly6379.aof"
```

- 配置文件一共有6个
  - redis6379.conf
  - redis6380.conf
  - redis6381.conf
  - redis6382.conf
  - redis6383.conf
  - redis6384.conf

3. 启动redis实例

```shell
bin/redis-server conf/redis6379.conf
bin/redis-server conf/redis6380.conf
bin/redis-server conf/redis6381.conf
bin/redis-server conf/redis6382.conf
bin/redis-server conf/redis6383.conf
bin/redis-server conf/redis6384.conf
```

查看redis的进程

```shell
ps -ef |grep redis
```

![image-20200211224638308](/Users/lingjing/Library/Application Support/typora-user-images/image-20200211224638308.png)

4. 使用 redis-trib.rb 自动部署方式

```shell
bin/redis-trib.rb create --replicas 1 192.168.56.72:6379 192.168.56.72:6380
192.168.56.72:6381 192.168.56.72:6382 192.168.56.72:6383 192.168.56.72:6384
```

注意: –replicas 1 表示我们希望为集群中的每个主节点创建一个从节点。

![image-20200211224838996](/Users/lingjing/Library/Application Support/typora-user-images/image-20200211224838996.png)

开始配置集群

![image-20200211224915493](/Users/lingjing/Library/Application Support/typora-user-images/image-20200211224915493.png)

5. 测试redis cluster

- 使用客户端登陆:

```shell
bin/redis-cli -c -p 6379
```

-c: 表示登陆集群

可以使用cluster nodes 命令查看集群中的节点

![image-20200211225058590](/Users/lingjing/Library/Application Support/typora-user-images/image-20200211225058590.png)

#### 2.4.6 维护节点

1. 添加主节点
   1. 在终端打开一个新的标签页.
   2. 进入cluster-test 目录.
   3. 创建并进入 7006文件夹.
   4. 和其他节点一样，创建redis.conf文件,需要将端口号改成7006.
   5. 最后启动节点 ../redis-server ./redis.conf
   6. 如果正常的话，节点会正确的启动.

```shell
bin/redis-trib.rb add-node 127.0.0.1:7006 127.0.0.1:6379
```

```shell
redis 127.0.0.1:7006> cluster nodes
3e3a6cb0d9a9a87168e266b0a0b24026c0aae3f0 127.0.0.1:6380 master - 0 1385543178575 0 connected 5960-10921
3fc783611028b1707fd65345e763befb36454d73 127.0.0.1:6383 slave 3e3a6cb0d9a9a87168e266b0a0b24026c0aae3f0 0 1385543179583 0 connected
f093c80dde814da99c5cf72a7dd01590792b783b :0 myself,master - 0 0 0 connected
2938205e12de373867bf38f1ca29d31d0ddb3e46 127.0.0.1:6381 slave 3c3a0c74aae0b56170ccb03a76b60cfe7dc1912e 0 1385543178072 3 connected
a211e242fc6b22a9427fed61285e85892fa04e08 127.0.0.1:6382 slave 97a3a64667477371c4479320d683e4c8db5858b1 0 1385543178575 0 connected
97a3a64667477371c4479320d683e4c8db5858b1 127.0.0.1:6379 master - 0 1385543179080 0 connected 0-5959 10922-11422
3c3a0c74aae0b56170ccb03a76b60cfe7dc1912e 127.0.0.1:6384 master - 0 1385543177568 3 connected 11423-16383
```

新节点现在已经连接上了集群， 成为集群的一份子， 并且可以对客户端的命令请求进行转向了， 但是和其他主节点相比， 新节点还有两点区别：

a. 新节点没有包含任何数据， 因为它没有包含任何哈希槽.

b. 尽管新节点没有包含任何哈希槽， 但它仍然是一个主节点， 所以在集群需要将某个从节点升级为新的主节点时， 这个新节点不会被选中。

2. has槽重新分配(数据迁移)

   a. 先连接集群上任意一个节点

```shell
bin/redis-cli --cluster reshard 127.0.0.1:6379
```

​		b. 输入要分配的槽数量

```shell
bin/redis-trib.rb reshard 127.0.0.1:6379
#有个提示输入1-16384, 属于多少, 代表分配多少个槽
```

​		c. 输入要接收槽的节点id

```shell
通过cluster nodes 查看7006的节点id为: 3e3a6cb0d9a9a87168e266b0a0b24026c0aae3f0
输入到提示信息中
```

​		d. 输入源节点id

输入源节点id, 槽将从源节点中拿, 分配后的槽在源及诶单中就不存在了, 输入all, 就是把所有源节点中获取槽, 输入done取消分配

3. 添加从节点

```shell
./redis-trib.rb add-node --slave 127.0.0.1:7006 127.0.0.1:6379
```

4. 删除节点

```shell
bin/redis-trib del-node 127.0.0.1:6379 `<node-id>`
#可以通过cluster nodes 查看node-id
cluster nodes
```

## 3. redis的数据类型

### 3.1 string类型

####3.1.1 赋值

语法: 

```shell
# 一次设置一个key
set key value
# 一次设置多个key
mset key1 value1 key2 value2
```

示例: 

```shell
127.0.0.1:6379> set test 123
OK
```

####3.1.2 取值

语法: 

```shell
#获取一个key的值
get key
# 获取多个key的值
mget key1 key2
```

示例: 

```shell
127.0.0.1:6379> get test
"123“
```

####3.1.3 数值递增

语法:

```shell
# key 增加1
incr key
# key 增加n
incrby key n
```

示例: 

```shell
# 增加1
127.0.0.1:6379> incr num
(integer) 1
127.0.0.1:6379> incr num
(integer) 2
127.0.0.1:6379> incr num
(integer) 3
# 增加 n
127.0.0.1:6379> incrby num 2
(integer) 5
127.0.0.1:6379> incrby num 2
(integer) 7
127.0.0.1:6379> incrby num 2
(integer) 9
 
```

应用场景: 商品编号, 编号, 采用incr命令生成自增主键

####3.1.4 数值递减

语法: 

```shell
# 递减1
decr key
# 递减n
decrby key n
```

示例:

```shell
127.0.0.1:6379> decr num
(integer) 6
127.0.0.1:6379> decr num
(integer) 5
127.0.0.1:6379> decrby num 3
(integer) 2
127.0.0.1:6379> decrby num 3
(integer) -1
```

####3.1.5 仅当不存在赋值

该命令可以实现分布式锁的功能, 后面会讲解

语法: 

```shell
setnx key value
```

示例:

```shell
(integer) 0
redis> SETNX job "programmer"
(integer) 1
redis> SETNX job "code-farmer"
(integer) 0
redis> GET job
"programmer"
```

####3.1.5 向尾部追加值

语法: 

```shell
append key value
```

示例: 

```shell
127.0.0.1:6379> set str hello
OK
127.0.0.1:6379> append str " world!"
(integer) 12
127.0.0.1:6379> get str
"hello world!"
```

####3.1.6 获取字符串长度

语法: 

```shell
strlen key
```

示例:

```shell
127.0.0.1:6379> strlen str
(integer) 0
127.0.0.1:6379> set str hello
OK
127.0.0.1:6379> strlen str
(integer) 5
 
```

### 3.2 list类型

redis的列表类型可以存储一个有序的字符串列表, 常用的操作是向列表两端添加元素, 或者获得列表的某一个片段.

列表类型内部是使用双向链表(double linked list)实现的, 所以向列表两端添加元素的时间复杂度为o(1), 获取越接近两端的元素速度越快.

####3.2.1 插入元素

语法: 

```shell
# 左边插入元素
lpush key [value1, value2, value3]
# 右边插入元素
rpush key [value1, value2, value3]
```

示例:

```shell
127.0.0.1:6379> lpush list:1 1 2 3
(integer) 3
127.0.0.1:6379> rpush list:1 4 5 6
(integer) 3
```

####3.2.2 列表切片

语法: 

```shell
# 查看从start到stop之间的所有元素, 包含两端的元素, 索引从`0`开始。索引可以 是负数，如:“`-1`”代表最后边的一个元素。
lrange key start stop
```

示例:

注意: lpush是按照元素的先后顺序, 从左往右, rpush是按照元素的先后顺序, 从右往左

```shell
127.0.0.1:6379> lpush list1 1 2 3
(integer) 3
127.0.0.1:6379> lrange list1 0 -1
1) "3"
2) "2"
3) "1"
127.0.0.1:6379> rpush list1 4 5 6
(integer) 6
127.0.0.1:6379> lrange list1 0 -1
1) "3"
2) "2"
3) "1"
4) "4"
5) "5"
6) "6"
```

####3.2.3 list两端弹出元素

语法: 

```shell
# 左弹出元素
lpop key
# 右弹出元素
rpop key
```

示例: 

```shell
127.0.0.1:6379>lpop list:1
"3“
127.0.0.1:6379>rpop list:1
"6“
```

####3.2.4 获取列表长度

语法: 

```shell
# 获取列表中元素的个数
llen key
```

示例: 

```shell
127.0.0.1:6379> llen list:1
(integer) 2
```

####3.2.5 删除元素

语法: 

```shell
# 删除列表中指定个数的值
lrem key count value
# 当count > 0 时, 从表头开始向表尾搜索，移除与 VALUE 相等的元素，数量为 COUNT
# 当count < 0 时, 从表尾开始向表头搜索，移除与 VALUE 相等的元素，数量为 COUNT 的绝对值。
# 当count = 0 时, 移除表中所有与 VALUE 相等的值。
```

示例: 

```shell
redis> RPUSH mylist "hello"
(integer) 1
redis> RPUSH mylist "hello"
(integer) 2
redis> RPUSH mylist "foo"
(integer) 3
redis> RPUSH mylist "hello"
(integer) 4
redis> LREM mylist -2 "hello"
(integer) 2
redis> LRANGE mylist 0 -1
1) "hello"
2) "foo"
```

####3.2.6 获取指定索引的元素值

语法: 

```shell
lindex key index
```

示例: 

```shell
127.0.0.1:6379>lindex l:list 2
"1"
```

#### 3.2.7 列表中插入元素

语法: 

```shell
# 向列表中插入元素, 该命令首先会在列表从左到右查找值为target的元素, 然后根据第二个参数before或者after来决定value插入到该元素的前面还是后面
linsert key before|after target value
```

示例:

```shell
127.0.0.1:6379> lrange list 0 -1
1) "3"
2) "2"
3) "1"
127.0.0.1:6379> linsert list after 3 4
(integer) 4
127.0.0.1:6379> lrange list 0 -1
1) "3"
2) "4"
3) "2"
4) "1"

```

### 3.3 set类型

set类型即集合类型, 其中的数据是不重复且没有顺序的.

#### 3.3.1 添加元素

语法: 

```shell
sadd key member
```

示例: 

```shell
127.0.0.1:6379> sadd set a b c
(integer) 3
127.0.0.1:6379> sadd set a
(integer) 0
```

#### 3.3.2 删除元素

语法: 

```shell
srem key member
```

示例:

```shell
127.0.0.1:6379> srem set c d
(integer) 1
```

#### 3.3.3 获取集合所有元素

语法: 

```shell
sembers key
```

示例: 

```shell
127.0.0.1:6379> smembers set
1) "b"
2) "a”
```

#### 3.3.4 判断元素是否在集合中

语法:

```shell
sismember key member
```

示例:

```shell
127.0.0.1:6379>sismember set a
(integer)   1
127.0.0.1:6379>sismember set h
(integer)   0
```

#### 3.3.5 两个集合差集

语法:

```shell
# 结合key - key1 - key2 ....
sdiff key [key1, key2 ...]
```

示例:

```shell
127.0.0.1:6379> sadd setA 1 2 3
(integer) 3
127.0.0.1:6379> sadd setB 2 3 4
(integer) 3
127.0.0.1:6379> sdiff setA setB
1) "1"
127.0.0.1:63
```

#### 3.3.6 并集

语法:

```shell
# 集合的交集运算 A ∩ B:属于A且属于B的元素构成的集合。
sinter key [key1, key2, ...]
```

示例:

```shell
127.0.0.1:6379> sinter setA setB
1) "2"
2) "3"
```

#### 3.3.7 合集

语法:

```shell
# 集合的并集运算 A ∪ B:属于A或者属于B的元素构成的集合
sunion key [key1, key2, ...]
```

示例:

```shell
127.0.0.1:6379> sunion setA setB
1) "1"
2) "2"
3) "3"
4) "4"
```

#### 3.3.8 获取集合元素个数

语法: 

```shell
SCARD key
```

示例:

```shell
127.0.0.1:6379> smembers setA
1) "1"
2) "2"
3) "3"
127.0.0.1:6379> scard setA
(integer) 3
```

#### 3.3.9 弹出随机一个元素

注意: 因为集合是无序的, 所有spop会随机从集合中弹出一个元素

语法:

```shell
spop key
```

示例: 

```shell
127.0.0.1:6379> spop setA
"1“
```

### 3.4 hash类型

#### 3.4.1 赋值

语法:

```shell
# 设置一个字段值
hset key field value
# 设置多个字段值
hmset key field1 value1 field2 value2 [...]
```

示例:

```shell
127.0.0.1:6379> hset user username zhangsan
(integer) 1
127.0.0.1:6379> hmset user age 20 username lisi
OK
```

#### 3.4.2 当字段不存在时赋值

语法:

```shell
# 如果字段存在, 不进行任何操作, 没有进行设置
hsetnx key field value
```

语法: 

```shell
# 如果user中没有age字段则设置age值为30，否则不做任何操作
127.0.0.1:6379> hsetnx user age 30 
(integer) 0
```

#### 3.4.3 取值

语法:

```shell
# 获取单个字段
hget key field
# 获取多个字段
hget key field [field1, field2...]
```

示例:

```shell
127.0.0.1:6379> hget user username
"zhangsan“
127.0.0.1:6379> hget user username
"zhangsan“
```

#### 3.4.4 获取所有字段

语法:

```shell
hgetall key
```

示例:

```shell
127.0.0.1:6379> hgetall user
1) "age"
2) "20"
3) "username"
4) "lisi"
```

#### 3.4.5 删除字段

语法: 

```shell
hdel key field [field ...]
```

示例:

```shell
127.0.0.1:6379> hdel user age
(integer) 1
127.0.0.1:6379> hdel user age name
(integer) 0
127.0.0.1:6379> hdel user age username
(integer) 1
```

#### 3.4.6 增加数字

语法:

```shell
hincrby key field increment
```

示例:

```shell
127.0.0.1:6379> hincrby user age 2 # 将用户的年龄加2 
(integer) 22
127.0.0.1:6379> hget user age # 获取用户的年龄 
"22“
```

#### 3.4.5 判断字段是否存在

语法:

```shell
hexists key field
```

示例:

```shell
# 查看user中是否有age字段 
127.0.0.1:6379> hexists user age
(integer) 1
# 查看user中是否有name字段 
127.0.0.1:6379> hexists user name
(integer) 0
```

#### 3.4.6 获取所有的field和value

语法:

```shell
# 获取所有的field
hkeys key
# 获取所有的value
hvalues key
```

示例:

```shell
127.0.0.1:6379> hmset user age 20 name lisi
OK
127.0.0.1:6379> hkeys user
1) "age"
2) "name"
127.0.0.1:6379> hvals user
1) "20"
2) "lisi"
```

#### 3.4.7 获取所有字段

语法:

```shell
hgetall key
```

示例:

```shell
127.0.0.1:6379> hset hh a 1 b 2
(integer) 2
127.0.0.1:6379> hgetall hh
1) "a"
2) "1"
3) "b"
4) "2"
```

### 3.5 zset类型

在 set 集合类型的基础上，有序集合类型为集合中的每个元素都 关联一个分数 ，这使得我们不仅可以完成插入、删除 和判断元素是否存在在集合中，还能够获得分数最高或最低的前N个元素、获取指定分数范围内的元素等与分数有关 的操作

#### 3.5.1 增加元素

语法:

```shell
zadd key score member [score member ...]
```

示例:

```shell
127.0.0.1:6379> zadd top10 10 zhangsan 20 lisi
(integer) 2
127.0.0.1:6379> zadd top10 15 ling
(integer) 1
127.0.0.1:6379> 
```

#### 3.5.2 获取元素范围

语法:

```shell
# 分数从大到小
zrange key start stop [WITHSCORES]
# 分数从小到大
zrevrange key start stop [WITHSCORES]
```

示例:

```shell
127.0.0.1:6379> zrange top10 0 10
1) "zhangsan"
2) "ling"
3) "lisi"
127.0.0.1:6379> zrevrange top10 0 10
1) "lisi"
2) "ling"
3) "zhangsan"
127.0.0.1:6379>
```

如果需要获取元素的分数, 可以在命令尾部加上WITHSCORES参数

```shell
127.0.0.1:6379> zrevrange top10 0 10 WITHSCORES
1) "lisi"
2) "20"
3) "ling"
4) "15"
5) "zhangsan"
6) "10"

```

#### 3.5.3 获取元素分数

语法: 

```shell
zscore key member
```

示例:

```shell
127.0.0.1:6379> zscore top10 ling
"15"
```

####3.5.4 删除元素

语法:

```shell
zrem key member [memeber ...]
```

示例:

```shell
127.0.0.1:6379> zrem top10 ling
(integer) 1
127.0.0.1:6379> zrevrange top10 0 10
1) "lisi"
2) "zhangsan"
```

#### 3.5.5 获取指定分数范围的元素

语法:

```shell
zrangebyscore key min max [WITHSCORES]
```

示例:

```shell
127.0.0.1:6379> zadd top10 15 ling
(integer) 1
127.0.0.1:6379> zadd top10 99 zhangsan
(integer) 0
127.0.0.1:6379> zrevrange top10 0 10 WITHSCORES
1) "zhangsan"
2) "99"
3) "lisi"
4) "20"
5) "ling"
6) "15"
127.0.0.1:6379> zrangebyscore top10 19 100 WITHSCORES
1) "lisi"
2) "20"
3) "zhangsan"
4) "99"
```

#### 3.5.6 增加某个元素的分数

语法:

```shell
zincrby key increment member 
```

示例:

```shell
127.0.0.1:6379> zincrby top10 100 zhangsan 
"199"
127.0.0.1:6379> zincrby top10 -10 zhangsan 
"189"
127.0.0.1:6379> zrange top10 0 10 WITHSCORES
1) "ling"
2) "15"
3) "lisi"
4) "20"
5) "zhangsan"
6) "189"
127.0.0.1:6379> 
```

#### 3.5.7 获取集合中元素的个数

语法:

```shell
zcard key
```

示例:

```shell
127.0.0.1:6379> zcard top10
(integer) 3
```

#### 3.5.8 获取指定分数范围内的元素个数

语法:

```shell
zcount key min max
```

示例:

```shell
127.0.0.1:6379> zrange top10 0 10 WITHSCORES
1) "ling"
2) "15"
3) "lisi"
4) "20"
5) "zhangsan"
6) "189"
127.0.0.1:6379> zcount top10 19 30
(integer) 1
```

#### 3.5.9 按照排名范围删除元素

语法:

```shell
zremrangebyrank key start stop
```

示例:

```shell
127.0.0.1:6379> zcount top10 19 30
(integer) 1
127.0.0.1:6379> zrange top10 0 -1 WITHSCORES
1) "zhangsan"
2) "189"
```

#### 3.5.10 按照分数范围删除元素

语法:

```shell
zremrangebyscore key min max
```

示例:

```shell
127.0.0.1:6379> zadd top10 85 ajing 72 shang 53 kong
(integer) 3
127.0.0.1:6379> zrange top10 0 -1 WITHSCORES
1) "kong"
2) "53"
3) "shang"
4) "72"
5) "ajing"
6) "85"
127.0.0.1:6379> zremrangebyscore top10 60 100
(integer) 2
127.0.0.1:6379> zrange top10 0 -1 WITHSCORES
1) "kong"
2) "53"
3) "zhangsan"
4) "189"
```

#### 3.5.11 获取元素的排名

语法:

```shell
# 从小的到大
zrank key member
# 从大到小
zrevrank key member
```

示例:

```shell
# 从小到大排名第二
127.0.0.1:6379> zrank top10 zhangsan
(integer) 1
# 从大到小排名第一
127.0.0.1:6379> zrevrank top10 zhangsan
(integer) 0
```

- zset很多用在销售排名, 打赏排名等.但是zset要比list更消耗系统性能

### 3.6 其他常用命令

#### 3.6.1 查看key(支持正则)

语法:

```shell
keys pattern
```

示例:

```shell
127.0.0.1:6379> keys *
1) "top10"
2) "a"
3) "list1"
4) "list"
5) "hh"
```

#### 3.6.2 删除key

语法:

```shell
del key
```

示例:

```shell
127.0.0.1:6379> del a
(integer) 1
```

#### 3.6.3 判断key是否存在

语法:

```shell
exists key
```

示例:

```shell
127.0.0.1:6379> exists a
(integer) 0
127.0.0.1:6379> exists hh
(integer) 1
```

#### 3.6.4 设置过期时间(重要)

语法:

```shell
# 设置key的生存时间
exire key seconds
# 查看key的生存时间
ttl key
# 清除生存时间
persist key
# 生存时间设置单位为毫秒
pexpire key milliseconds
```

示例:

```shell
# 设置test的值为1
192.168.101.3:7002> set test 1
OK
# 获取test的值
192.168.101.3:7002> get test
"1"
# 设置test的生存时间为5秒
192.168.101.3:7002> EXPIRE test 5
(integer) 1
# 查看test的剩余生成时间还有1s删除
192.168.101.3:7002> TTL test
(integer) 1
192.168.101.3:7002> TTL test
(integer) -2
# 获取test的值, 已经删除了
192.168.101.3:7002> get test
(nil)
```

#### 3.6.5 改名字

语法:

```shell
rename oldkey newkey
```

#### 3.6.6 查看key类型

语法:

```shell
type key
```

#### 3.6.7 清空数据

语法:

```shell
flushdb
```

#### 3.6.8 查看redis信息详情

语法:

```shell
info
```



## 4. redis的消息模式

###4.1 队列模式

使用redis的list数据类型lpush和rpop实现消息队列

![redis1](/Users/lingjing/公众号/redis专题/redis1.png)

注意事项:

消息接收方如果不知道队列中是否有消息，会一直发送rpop命令，如果这样的话，会每一次都建立一次连接， 这样显然不好。可以使用brpop命令，它如果从队列中取不出来数据，会一直阻塞，在一定范围内没有取出则返回null

### 4.2 发布订阅模式

#### 4.2.1 订阅模式

订阅例子示意图：下图展示了频道 channel1 ， 以及订阅这个频道的三个客户端 —— client2 、 client5 和 client1 之间的关系.

####4.2.2 发布模式

**发布例子示意图：当有新消息通过 PUBLISH 命令发送给频道 channel1 时， 这个消息就会被发送给订阅它的三个客户端：**

#### 4.3.3 其它相关命令

```shell
# 订阅一个或多个符合给定模式的频道。
PSUBSCRIBE pattern [pattern ...]

# 查看订阅与发布系统状态。
PUBSUB subcommand [argument [argument ...]]

# 退订所有给定模式的频道。
PUNSUBSCRIBE [pattern [pattern ...]]

# 指退订给定的频道。
UNSUBSCRIBE [channel [channel ...]]

```

##5. redis持久化

Redis 提供了多种不同级别的持久化方式:

- **RDB** 持久化可以在指定的时间间隔内生成数据集的时间点快照(point-in-time snapshot)。

- **AOF** (**Append-only file**)持久化记录服务器执行的所有写操作命令，并在服务器启动时，通过重新执行这些命令来还原数据集。 AOF 文 件中的命令全部以 Redis 协议的格式来保存，新命令会被追加到文 件的末尾。 Redis 还可以在后台对 AOF 文件进行重写(rewrite)， 使得 AOF 文件的体积不会超出保存数据集状态所需的实际大小。

- Redis 还可以同时使用 AOF 持久化和 RDB 持久化。 在这种情况下， 当 Redis 重启时， 它会优先使用 AOF 文件来还原数据集， 因为AOF 文件保存的数据集通常比 RDB 文件所保存的数据集更完整。
- 你甚至可以关闭持久化功能，让数据只在服务器运行时存在。

### 5.1 rdb

####5.1.1 save策略

SNAPSHOTTING的持久化方式有多种save策略可供选择，而且支持混用，例如：

         ```shell
save 900 1
save 300 100
save 60  10000
         ```

上述配置的效果是：snapshotting会在3个条件中的**任何一个满足时被触发**：

a. 900s内至少1个key有变化；

b. 300s内至少100个key有变化；

c. 60s内至少有10000个key有变化

- 主动备份数据

```shell
redis 127.0.0.1:6379> SAVE 
OK
# 在后台执行备份
127.0.0.1:6379> BGSAVE
Background saving started
```

#### 5.1.2 优缺点

**RDB 的优点:**

- RDB是一种表示某个即时点的Redis数据的紧凑文件。RDB文件适合用于备份。例如，你可能想要每小时归档最近24小时的RDB文件，每天保存近30天的RDB快照。这允许你很容易的恢复不同版本的数据集以容灾。
- RDB非常适合于灾难恢复，作为一个紧凑的单一文件，可以被传输到远程的数据中心，或者是Amazon S3(可能得加密)。
- RDB最大化了Redis的性能，因为Redis父进程持久化时唯一需要做的是启动(fork)一个子进程，由子进程完成所有剩余工作。父进程实例不需要执行像磁盘IO这样的操作。
- RDB在重启保存了大数据集的实例时比AOF要快。

**RDB 的缺点**

- 当你需要在Redis停止工作(例如停电)时最小化数据丢失，RDB可能不太好。你可以配置不同的保存点(save point)来保存RDB文件(例如，至少5分钟和对数据集100次写之后，但是你可以有多个保存点)。然而，你通常每隔5分钟或更久创建一个RDB快照，所以一旦Redis因为任何原因没有正确关闭而停止工作，你就得做好最近几分钟数据丢失的准备了。
- RDB需要经常调用fork()子进程来持久化到磁盘。如果数据集很大的话，fork()比较耗时，结果就是，当数据集非常大并且CPU性能不够强大的话，Redis会停止服务客户端几毫秒甚至一秒。AOF也需要fork()，但是你可以调整多久频率重写日志而不会有损(trade-off)持久性(durability)。

### 5.2 aof

####5.2.1 配置aof

```shell
appendonly yes

appendfilename "6379.aof"

appendfsync everysec
```

配置说明:

no：redis不主动调用fsync,何时刷盘由os来调度

always：redis针对每个写入命令俊辉主动调用fsync刷磁盘

eversec：每秒调用一次fsync刷盘

####5.2.2 优缺点

**AOF 的优点:**

- 使用AOF Redis会更具有可持久性(durable)：你可以有很多不同的fsync策略：没有fsync，每秒fsync，每次请求时fsync。使用默认的每秒fsync策略，写性能也仍然很不错(fsync是由后台线程完成的，主线程继续努力地执行写请求)，即便你也就仅仅只损失一秒钟的写数据。
- AOF日志是一个追加文件，所以不需要定位，在断电时也没有损坏问题。即使由于某种原因文件末尾是一个写到一半的命令(磁盘满或者其他原因),redis-check-aof工具也可以很轻易的修复。
- 当AOF文件变得很大时，Redis会自动在后台进行重写。重写是绝对安全的，因为Redis继续往旧的文件中追加，使用创建当前数据集所需的最小操作集合来创建一个全新的文件，一旦第二个文件创建完毕，Redis就会切换这两个文件，并开始往新文件追加。
- AOF文件里面包含一个接一个的操作，以易于理解和解析的格式存储。你也可以轻易的导出一个AOF文件。例如，即使你不小心错误地使用FLUSHALL命令清空一切，如果此时并没有执行重写，你仍然可以保存你的数据集，你只要停止服务器，删除最后一条命令，然后重启Redis就可以。

**AOF 的缺点:**

- 对同样的数据集，AOF文件通常要大于等价的RDB文件。
- AOF可能比RDB慢，这取决于准确的fsync策略。通常fsync设置为每秒一次的话性能仍然很高，如果关闭fsync，即使在很高的负载下也和RDB一样的快。不过，即使在很大的写负载情况下，RDB还是能提供能好的最大延迟保证。
- 在过去，我们经历了一些针对特殊命令(例如，像BRPOPLPUSH这样的阻塞命令)的罕见bug，导致在数据加载时无法恢复到保存时的样子。这些bug很罕见，我们也在测试套件中进行了测试，自动随机创造复杂的数据集，然后加载它们以检查一切是否正常，但是，这类bug几乎不可能出现在RDB持久化中。为了说得更清楚一点：Redis AOF是通过递增地更新一个已经存在的状态，像MySQL或者MongoDB一样，而RDB快照是一次又一次地从头开始创造一切，概念上更健壮。但是，1)要注意Redis每次重写AOF时都是以当前数据集中的真实数据从头开始，相对于一直追加的AOF文件(或者一次重写读取老的AOF文件而不是读内存中的数据)对bug的免疫力更强。2)我们还没有收到一份用户在真实世界中检测到崩溃的报告。

#### 5.2.3 AOF持久性如何？

你可以配置 Redis 多久才将数据 fsync 到磁盘一次。有三个选项：

- 每次有新命令追加到 AOF 文件时就执行一次 fsync ：非常慢，也非常安全。
- 每秒 fsync 一次：足够快（和使用 RDB 持久化差不多），并且在故障时只会丢失 1 秒钟的数据。
- 从不 fsync ：将数据交给操作系统来处理。更快，也更不安全的选择。

推荐（并且也是默认）的措施为每秒 fsync 一次， 这种 fsync 策略可以兼顾速度和安全性。 总是 fsync 的策略在实际使用中非常慢， 即使在 Redis 2.0 对相关的程序进行了改进之后仍是如此 —— 频繁调用 fsync 注定了这种策略不可能快得起来。

## 6. redis事务

Redis 对事务的支持目前还比较简单。redis 只能保证一个 client 发起 的事务中的命令可以连续的执行，而中间不会插入其他 client 的命令。由 于 redis 是单线程来处理所有 client 的请求的所以做到这点是很容易的。 一般情况下 redis 在接受到一个 client 发来的命令后会立即处理并 返回 处理结果，但是当一个 client 在一个连接中发出 multi 命令有，这个连接 会进入一个事务上下文，该连接后续的命令并不是立即执行，而是先放 到一个队列中。当从此连接受到 exec 命令后，redis 会顺序的执行队列中 的所有命令。并将所有命令的运行结果打包到一起返回给 client.然后此 连接就 结束事务上下文。

### 6.1事务命令

```shell
#用于标记事物的开始
multi
# 在一个事务中执行所有先前放入队列的命令, 然后恢复正常的连接状态
exec
# 清楚所有先前在一个事物中放入队列的命令, 然后恢复到正常的连接状态
discard
# 当某个事物需要按条件执行时, 就要使用这个命令给设定的键为受监控状态
watch key [key ...]
# 清除所有先前为一个事物监控的键
unwatch
```

### 6.2 事务示例: 银行转账

```shell
127.0.0.1:6379> set tom 1000
OK
127.0.0.1:6379> set mike 1000
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379> decrby tom 100
QUEUED
127.0.0.1:6379> incrby mike 100
QUEUED
127.0.0.1:6379> exec
1) (integer) 900
2) (integer) 1100
127.0.0.1:6379> mget tom mike
1) "900"
2) "1100"
```

###6.4 watch

如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。

示例: 买票

客户端一:

```shell
127.0.0.1:6379> set ticket 1
OK
127.0.0.1:6379> set ling 1000
OK
127.0.0.1:6379> watch ticket
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379> decr ticket
QUEUED
127.0.0.1:6379> decrby tom 100
QUEUED

```

客户端二:

```shell
127.0.0.1:6379> get ticket
"1"
127.0.0.1:6379> decr ticket
(integer) 0
```

客户端一: 事务被打断

```shell
127.0.0.1:6379> exec
(nil)

```

###6.5 redis为什么不支持回滚

在了解事务的回滚的时候, 我们先要跳出事务的原子性来看待, redis为了性能的关系, 并不是支持事务的回滚.

我们知道事务的原子性, 就是事务里面如果全部成功, 要么全部执行失败.其实我们这里要说的, 就是在执行exec的时候, 如果在执行过程中有语法报错的, 或者中间有失败的, 那执行过的, 就执行过了, 并不进行回滚操作.

但是discard命令还是可以清楚到以前的所有命令的

## 7. redis的分布式锁

###7.1 锁的处理:

- 单应用中使用锁: (单进程多线程)

```shell
synchronize, ReentrantLock
```

- 分布式应用中使用锁: (多进程多线程)

分布式锁是控制分布式系统之间同步访问共享资源的一种方式

### 7.2 分布式锁的实现方式

- 基于数据库的乐观锁实现分布式锁
- 基于zookeeper的临时节点实现分布式锁
- 基于redis的分布式锁

### 7.3 实现分布式锁

- 获取锁:

在set命令中, 有很多选项可以用来修改命令的行为, 以下是set命令可用选项的基本语法

```shell
redis 127.0.0.1:6379>SET KEY VALUE [EX seconds] [PX milliseconds] [NX|XX]

	- EX seconds  设置指定的到期时间(单位为秒)
	- PX milliseconds 设置指定的到期时间(单位毫秒)
	- NX: 仅在键不存在时设置键
	- XX: 只有在键已存在时设置
```

方式1: 推介

```java
    private static final String LOCK_SUCCESS = "OK";
    private static final String SET_IF_NOT_EXIST = "NX";
    private static final String SET_WITH_EXPIRE_TIME = "PX";

		public static boolean getLock(JedisCluster jedisCluster, String lockKey, String requestId, int expireTime) {
        // NX: 保证互斥性
        String result = jedisCluster.set(lockKey, requestId, SET_IF_NOT_EXIST, SET_WITH_EXPIRE_TIME, expireTime);
        if (LOCK_SUCCESS.equals(result)) {
            return true;
        }
        return false;
    }
```

方式2:

```java
public static boolean getLock(String lockKey,String requestId,int expireTime) {
     Long result = jedis.setnx(lockKey, requestId);
     if(result == 1) {
         jedis.expire(lockKey, expireTime);
         return true;
     }
     return false;
 }
```

注意: 推介方式1, 因为方式2中setnx和expire是两个操作, 并不是一个原子操作, 如果setnx出现问题, 就是出现死锁的情况, 所以推荐方式1

- 释放锁:

del命令实现

```java
public static void releaseLock(String lockKey,String requestId) {
    if (requestId.equals(jedis.get(lockKey))) {
        jedis.del(lockKey);
    }
}
 
```



##8. redis的故障诊断与优化

### 8.1 常见缓存问题

#### 8.1.1 缓存穿透

- 什么叫缓存穿透?

一般的缓存系统，都是按照key去缓存查询，如果不存在对应的value，就应该去后端系统查找(比如DB)。如果key对应的value是一定不存在的，并且对该key并发请求量很大，就会对后端系统造成很大的压力。

也就是说，对不存在的key进行高并发访问，导致数据库压力瞬间增大，这就叫做【缓存穿透】。

- 如何解决?

1:对查询结果为空的情况也进行缓存，缓存时间设置短一点，或者该key对应的数据insert了之后清理缓存。

2:对一定不存在的key进行过滤。可以把所有的可能存在的key放到一个大的Bitmap中，查询时通过该bitmap过 滤。(布隆表达式)

#### 8.1.2 缓存雪崩

- 什么叫缓存雪崩

当缓存服务器重启或者大量缓存集中在某一个时间段失效，这样在失效的时候，也会给后端系统(比如DB)带来很大压 力。

- 如何解决

1:在缓存失效后，通过加锁或者队列来控制读数据库写缓存的线程数量。比如对某个key只允许一个线程查询数据和 写缓存，其他线程等待。

2:不同的key，设置不同的过期时间，让缓存失效的时间点尽量均匀。

3:做二级缓存，A1为原始缓存，A2为拷贝缓存，A1失效时，可以访问A2，A1缓存失效时间设置为短期，A2设置为长 期(此点为补充)

#### 8.1.3 缓存击穿

- 什么叫做缓存击穿

对于一些设置了过期时间的key，如果这些key可能会在某些时间点被超高并发地访问，是一种非常“热点”的数据。这 个时候，需要考虑一个问题:缓存被“击穿”的问题，这个和缓存雪崩的区别在于这里针对某一key缓存，前者则是很多key。

缓存在某个时间点过期的时候，恰好在这个时间点对这个Key有大量的并发请求过来，这些请求发现缓存过期一般都会 从后端DB加载数据并回设到缓存，这个时候大并发的请求可能会瞬间把后端DB压垮。

- 如何解决

使用redis的setnx互斥锁先进行判断，这样其他线程就处于等待状态，保证不会有大并发操作去操作数据库。

```java
if(redis.sexnx()==1){ 
  //先查询缓存
	//查询数据库
	//加入缓存
}

```

### 8.2 启动redis日志功能

redis默认不记录log文件, 需要在redis.conf文件修改logfile参数.如下:

- 日志级别 loglevel notic
- 日志路劲 logfile "/usr/local/redis/log/redis.log"

### 8.3 redis的监控状态

####8.3.1 RDB状态监控

```shell
bin/redis-cli info |grep rdb_
```

- rdb_changes_since_last_save表明上次RDB保存以后改变的key次数
- rdb_bgsave_in_progress 表示当前是否在进行 bgsave 操作，1 表示正在进行;0 表示没有进行
- rdb_last_save_time 上次保存 RDB 文件的时间戳
- rdb_last_bgsave_time_sec 上次保存的耗时
- rdb_last_bgsave_status 上次保存的状态
- rdb_current_bgsave_time_sec 目前保存 RDB 文件已花费的时间

#### 8.3.2 aof的监控状态

```shell
bin/redis-cli info |grep aof_
```

- aof_enabledAOF文件是否启用
- aof_rewrite_in_progress 表示当前是否在进行 AOF 日志的重写
- aof_rewrite_scheduled
- aof_last_rewrite_time_sec 上次写入的时间戳
- aof_current_rewrite_time_sec:-1
- aof_last_bgrewrite_status:ok 上次写入状态
- aof_last_write_status:ok 上次写入状态

####8.3.3 内存监控

```shell
bin/redis-cli info |grep mem
```

- used_memory:13490096 //数据占用了多少内存(字节)
- used_memory_human:12.87M //数据占用了多少内存(带单位的，可读性好)
- used_memory_rss:13490096 //redis 占用了多少内存
- used_memory_peak:15301192 //占用内存的峰值(字节)
- used_memory_peak_human:14.59M //占用内存的峰值(带单位的，可读性好)
- used_memory_lua:31744 //lua 引擎所占用的内存大小(字节)
- mem_fragmentation_ratio:1.00 //内存碎片率
- mem_allocator:libc //redis 内存分配器版本，在编译时指定的。有 libc、jemalloc、tcmalloc 这 3 种

### 8.4 redis慢查询

#### 8.4.1 慢查询日志

慢查询日志帮助开发和运维人员定位系统存在的慢操作。慢查询日志就是系统

在命令执行前后计算每条命令的执行时间，当超过预设阀值，就将这条命令的相关 信息(慢查询 ID，发生时间戳，耗时，命令的详细信息)记录下来。

Redis 客户端一条命令分为如下四部分执行:

![redis5](/Users/lingjing/公众号/redis专题/redis5.png)

需要注意的是，慢查询日志只是统计步骤 **3**)执行命令的时间，所以慢查询并不代 表客户端没有超时问题。需要注意的是，慢查询日志只是统计步骤 **3**)执行命令的时间， 所以慢查询并不代表客户端没有超时问题。

#### 8.4.2 慢查询参数

- 慢查询的预设阀值 ***slowlog-log-slower-than***
  - slowlog-log-slower-than参数就是预设阀值，1000，如果一条命令的执行时间超过 10000 微妙，那么它将被记录 在慢查询日志中。
  - 如果slowlog-log-slower-than的值是0，则会记录所有命令。
  - 如果slowlog-log-slower-than的值小于0，则任何命令都不会记录日志
  - 对于高流量的场景，如果执行命令的时间在 1 毫秒以上，那 么 redis 最多可支撑 OPS(每秒操作次数)不到 1000，因此高 OPS 场景的 REDIS 建议设置为 1 毫秒.

- 慢查询日志的长度***slowlog-max-len***

  - slowlog-max-len只是说明了慢查询日志最多存储多少条。Redis使用

    一个列表来存储慢查询日志，showlog-max-len 就是列表的最大长度。 当慢查询日志已经到达列表的最大长度时，又有慢查询日志要进入列 表，则最早插入列表的日志将会被移出列表，新日志被插入列表的末 尾。

  - slowlog-max-len的设置建议, 线上环境建议调大慢查询日志的列表，记录慢查询日志时 Redis 会对长命令做截断操作，并不会占用大量内存。增大慢查询列表可 以减缓慢查询被剔除出列表的可能性。例如线上可以设置为 1000 以 上

#### 8.4.3 慢查询日志的组成

慢查询日志由以下四个属性组成:
标识 ID，发生时间戳，命令耗时，执行命令和参数

### 8.5 redis的pipeline(管道)

简单来说，PipeLine(管道)就是“批处理”操作。 由于网络开销延迟，就算 redis server 端有很强的处理能力，也会由于收到的client 消息少，而造成吞吐量小。当 client 使用 pipelining 发送命令时，redis server 必须将部分请求放到队列中(使用内存)，执行完毕后一次性发送结果;如果发送 的命令很多的话，建议对返回的结果加标签，当然这也会增加使用的内存。 

Pipeline 在某些场景下非常有用，比如有多个 command 需要被“及时的”提 交，而且他们对相应结果没有互相依赖，对结果响应也无需立即获得，那么 pipeline 就可以充当这种“批处理”的工具;而且在一定程度上，可以较大的提升性能，性 能提升的原因主要是 TCP 连接中减少了“交互往返”的时间。 

应用场景: 特别是有for循环取值时, 建议使用pipeline

代码示例:

```java
# 自定义一个自己需要的类
List<Response<String>> resAll = new ArrayList();
// 获取一个管道对象
Pipeline pipeline = jedisUtil.getReis().pipelined();
List<String> ids = new ArrayList();
ids.add("str1");
ids.add("str2");
ids.add("str3");

ids.forEach(id->{
  Response<String> res = pipeline.get(id);
  // 管道的对象结果都存在resAll中
  resAll.add(res);
});
//pipeline.sync(); close内部有sync()方法调用
pipeline.close();
resAll.forEach(item -> {
  System.out.println(Integer.valueof(res) + 100);
});
```



### 8.6 redis的噩耗: 阻塞

#### 8.6.1 耗时长命令造成阻塞

- keys, sort等命令

当redis的数据量达到一定级别后（比如20G），阻塞操作对性能的影响尤为严重；keys命令用于查找所有符合给定模式 pattern 的 key，时间复杂度为O(N)， N 为数据库中 key 的数量。当数据库中的个数达到千万时，这个命令会造成读写线程阻塞数秒；
类似的命令有sunion sort等操作；
如果业务需求中一定要使用keys、sort等操作怎么办？

解决方案

在架构设计中，有“分流”一招，说的是将处理快的请求和处理慢的请求分离开来，否则，慢的影响到了快的，让快的也快不起来；这在redis的设计中体现的非常明显，redis的纯内存操作，epoll非阻塞IO事件处理，这些快的放在一个线程中搞定，而持久化，AOF重写、Master-slave同步数据这些耗时的操作就单开一个进程来处理，不要慢的影响到快的；同样，既然需要使用keys这些耗时的操作，那么我们就将它们剥离出去，比如单开一个redis slave结点，专门用于keys、sort等耗时的操作，这些查询一般不会是线上的实时业务，查询慢点就慢点，主要是能完成任务，而对于线上的耗时快的任务没有影响

- smembers命令

smembers命令用于获取集合全集，时间复杂度为O(N),N为集合中的数量；
如果一个集合中保存了千万量级的数据，一次取回也会造成事件处理线程的长时间阻塞；

解决方案

和sort，keys等命令不一样，smembers可能是线上实时应用场景中使用频率非常高的一个命令，这里分流一招并不适合，我们更多的需要从设计层面来考虑；
在设计时，我们可以控制集合的数量，将集合数一般保持在500个以内；
比如原来使用一个键来存储一年的记录，数据量大，我们可以使用12个键来分别保存12个月的记录，或者365个键来保存每一天的记录，将集合的规模控制在可接受的范围；

如果不容易将集合划分为多个子集合，而坚持用一个大集合来存储，那么在取集合的时候可以考虑使用SRANDMEMBER key [count]；随机返回集合中的指定数量，当然，如果要遍历集合中的所有元素，这个命令就不适合了；

- save命令

save命令使用事件处理线程进行数据的持久化；当数据量大的时候，会造成线程长时间阻塞（我们的生产上，reids内存中1个G保存需要12s左右），整个redis被block；
save阻塞了事件处理的线程，我们甚至无法使用redis-cli查看当前的系统状态，造成“何时保存结束，目前保存了多少”这样的信息都无从得知；

解决方案

我没有想到需要用到save命令的场景，任何时候需要持久化的时候使用bgsave都是合理的选择（当然，这个命令也会带来问题，后面聊到）；

推介两篇redis阻塞的文章:

https://blog.csdn.net/linbiaorui/article/details/79822318

http://colin115.iteye.com/blog/2263351

### 8.7 redis持久化故障诊断

1. 使用 Java 客户端，循环插入 20 个 200M 大小的数据，程序如下:
2. 检查 RDB 的状态信息

```shell
bin/redis-cli info |grep rdb_
```

3. 检查日志文件: redis.log

![redis7](/Users/lingjing/公众号/redis专题/redis7.png)

3. 解决问题:
   修改 vm.overcommit_memory 参数。关于 vm.overcommit_memory 不同的值说明:

   -  0 表示检查是否有足够的内存可用，如果是，允许分配;如果内存不够，拒绝该请求，并返回一个错误给应用程序。
   - 1 允许分配超出物理内存加上交换内存的请求
   -  2 内核总是返回 true

   由于 RDB 文件写的时候 fork 一个子进程。相当于复制了一个内存镜像。 当时系统的内存是 4G，而 redis 占用了近 3G 的内存，因此肯定会报内存无法 分配。如果 「vm.overcommit_memory」设置为 0，在可用内存不足的情况下， 就无法分配新的内存。如果 「vm.overcommit_memory」设置为 1。 那么 redis将使用交换内存。

   - 方法一: 修改内核参数 vi /etc/sysctl。设置 vm.overcommit_memory = 1 然后执行 sysctl -p
   - 方法二: 使用交换内存并不是一个完美的方案。最好的办法是扩大物 理内存。

### 8.8 redis内存淘汰策略

#### 8.8.1 最大缓存

在 redis 中，允许用户设置最大使用内存大小maxmemory，默认为0，没有指定最大缓存，如果有新的数据添 加，超过最大内存，则会使redis崩溃，所以一定要设置.

redis 内存数据集大小上升到一定大小的时候，就会实行数据淘汰策略

#### 8.8.2 淘汰策略

redis淘汰策略配置: maxmemory-policy voltile-lru，支持热配置 

Redis提供6种数据淘汰策略:

1. voltile-lru:从已设置过期时间的数据集(server.db[i].expires)中挑选最近最少使用的数据淘汰 
2.  volatile-ttl:从已设置过期时间的数据集(server.db[i].expires)中挑选将要过期的数据淘汰
3. volatile-random:从已设置过期时间的数据集(server.db[i].expires)中任意选择数据淘汰
4. allkeys-lru:从数据集(server.db[i].dict)中挑选最近最少使用的数据淘汰 
5. allkeys-random:从数据集(server.db[i].dict)中任意选择数据淘汰
6. no-enviction(驱逐):禁止驱逐数据 

#### 8.8.3 LRU原理

LRU( ，最近最少使用)算法根据数据的历史访问记录来进行淘汰数据，其核心思想是“如 果数据最近被访问过，那么将来被访问的几率也更高”。

## 9. redis的java客户端

### 9.1 Jedis

####9.1.1 maven配置

使用jedis需要引入jedis的jar包，下面提供了maven依赖

jedis.jar是封装的包，commons-pool2.jar是管理连接的包

```properties
<!-- https://mvnrepository.com/artifact/redis.clients/jedis 客户端-->
        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
            <version>2.9.3</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.apache.commons/commons-pool2 -->
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-pool2</artifactId>
            <version>2.5.0</version>
        </dependency>
```

#### 9.1.2 配置文件

```properties
abc.data.redis.connection.appRedis1.database = 0
abc.data.redis.connection.appRedis1.timeout = 20000
# master的ip地址
abc.data.redis.connection.appRedis1.host = 1.1.1.1
abc.data.redis.connection.appRedis1.port = 6410
abc.data.redis.connection.appRedis1.password = 8bH4Ft82P2JjwFiV
# 哨兵地址
abc.data.redis.connection.appRedis1.nodes = 1.1.1.1,1.1.1.2,1.1.1.3
abc.data.redis.connection.appRedis1.master = sentinel-1.1.1.1-6410
abc.data.redis.connection.appRedis1.minIdle = 10
abc.data.redis.connection.appRedis1.maxActive = 500
abc.data.redis.connection.appRedis1.maxWait = 20000
abc.data.redis.connection.appRedis1.maxIdle = 200
```

#### 9.1.3 建立配置文件对应的类

```java
@Component
@ConfigurationProperties(prefix = "abc.data.redis.connection.appRedis1")
@Data
public class RedisConfig {
    /** 节点名称 */
    private String nodes;
  
    /** master名称 */
    private String master;

    /** 密码 */
    private String password;

    /** 超时时长 */
    private Integer timeout;
    /** 最小空闲数量 */
    private Integer minIdle;

    /** 连接池的最大数据库连接数 */
    private Integer maxActive;

    /** 最大建立连接等待时间 */
    private Integer maxWait;

    /** 最大空闲数量 */
    private Integer maxIdle;
}
```

####9.1.4 编写连接池工具类

```java
package com.test.jedis;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class JedisUtils {
  
  	@Resource
    private RedisConfig redisConfig;
  
  	private JedisSentinelPool jedisSentinelPool;

    // 1、定义一个连接池对象
    private final static JedisPool POOL;

    static {
      try{
        // 初始化
        // 1、设置连接池的配置对象
        JedisPoolConfig config = new JedisPoolConfig();
    
        JedisPoolConfig config = new JedisPoolConfig();
        //设置最大空闲数量
        config.setMaxIdle(redisConfig.getMaxIdle());
        //设置最小空闲数量
        config.setMinIdle(redisConfig.getMinIdle());
        //设置最长等待时间
        config.setMaxWaitMillis(redisConfig.getMaxWait());
        //设置连接池的最大数据库连接数
        config.setMaxTotal(redisConfig.getMaxActive());

        //是否在从池中取出连接前进行检验,如果检验失败,则从池中去除连接并尝试取出另一个
        config.setTestOnBorrow(true);
        //是否进行有效性检查
        config.setTestOnReturn(true);
        //在空闲时检查有效性, 默认false
        config.setTestWhileIdle(true);

        // 2、设置连接池对象(连接的是哨兵redis)
      	String[] split = redisConfig.getNodes().split(",");
        Set<String> nodeSet = Sets.newHashSet(split);
        jedisSentinelPool = new JedisSentinelPool(redisConfig.getMaster(), nodeSet, jedisPoolConfig, redisConfig.getTimeout(), redisConfig.getPassword());
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    
    /**
     * 从连接池中获取连接
     */
    public synchronized static Jedis getJedis() {
      try {
        if (jedisSentinelPool != null) return jedisSentinelPool.getResource();
      } catch (Exception e) {
        e.printStackTrace();
      }
      return null;
        return POOL.getResource();
    }
}
```

#### 9.1.4 在开发过程中遇到的坑

java.net.SocketException: Broken pipe

原因: 在开发过程中, 混用了pipeline和jedis, 

推介博客解决地址:

https://blog.csdn.net/wabiaozia/article/details/64921520?fps=1&locationNum=6

### 9.2 redisTemplate

#### 9.2.1 maven 配置

```xml
 <!-- springboot整合redis -->  
        <dependency>  
            <groupId>org.springframework.boot</groupId>  
            <artifactId>spring-boot-starter-data-redis</artifactId>  
        </dependency> 
```

####9.2.2 application.properties配置Redis

```undefined
spring.redis.host=127.0.0.1
spring.redis.port=6379
spring.redis.password=123
```

#### 9.2.3 使用示例

```java
public class StudentServiceImpl implements StudentService {
  @Autowired
  private RedisTemplate<String,Object> redisTemplate;
  
  public List<Student> getAllStudent() {
        //查询缓存
        List<Student> studentList= (List<Student>)redisTemplate.opsForValue().get("allStudents");
        if(null == studentList) {
            //缓存为空，查询一遍数据库
            studentList = studentMapper.selectAllStudent();
            //把数据库查询出来数据，放入Redis中
            redisTemplate.opsForValue().set("allStudents",studentList);
        }
        return studentList;
    }
}
```

#### 9.2.4 redisTemplate方法

其实如果经常写程序, 简单看一下方法名字, 大概就知道做什么的啦!

推介使用博客地址:

https://blog.csdn.net/sinat_22797429/article/details/89196933