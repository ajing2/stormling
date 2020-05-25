# mongoDB

# 1. mongoDB介绍

官网： https://www.mongodb.com/ 

MongoDB是一个基于分布式文件存储 [1] 的数据库。由[C++](https://baike.baidu.com/item/C%2B%2B)语言编写。旨在为WEB应用提供可扩展的高性能数据存储解决方案。

MongoDB是一个介于[关系数据库](https://baike.baidu.com/item/关系数据库)和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。它支持的数据结构非常松散，是类似[json](https://baike.baidu.com/item/json)的[bson](https://baike.baidu.com/item/bson)格式，因此可以存储比较复杂的数据类型。Mongo最大的特点是它支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立[索引](https://baike.baidu.com/item/索引)。

mongdb是一个文档型的nosql数据库， 也是由key-value组成

# 2. mongodb的应用场景

### 适用场景

### 更高的写入负载

默认情况下, mongodb更侧重高数据写入性能, 而非事务安全, mongodb很适合业务系统中有大量"低价值"数据的场景, 但是应当避免在高事务安全性的系统中使用mongodb, 除非能从架构设计上保证事务的安全

### 高可用性

mongodb的(master-slave)配置非常简洁方便, 此外, mongodb可以快速响应的处理单节点故障, 自动, 安全的完成故障转移, 这些特性使得mongodb能在一个相对不稳定的环境中, 保持高可用性

### 数据量很大或者未来会变得很大

依赖数据库(MySQL)自身的特性，完成数据的扩展是较困难的事，在mysql中, 当一个单表达到5-10gb时会出现明显的性能降级 ，此时需要通过数据的水平和垂直拆分、库的拆分完成扩展，使用MySQL通常需要借助驱动层或代理层完成这类需求。而MongoDB内建了多种数据分片的特性，可以很好的适应大数据量的需求。

### 基于位置的数据查询

mongodb支持二维空间索引, 因此可以快速及精确的从指定位置获取数据

### 表结构不明确, 且数据在不断变大

在一些传统的rdbms中, 增阿一个字段会锁住整个数据库/表, 或者在执行一个重负载的请求时会铭心啊造成其他请求的性能降级,通常发生在数据库大于1G(当大于1TB时更甚)的时候, 因mongodb是文档型数据库, 为非结构化的文档增阿基也给新的字段是很快的操作, 并且不会影响到已有数据, 另外一个好处当业务数据变化时, 是将不需要dba修改表结构

### 没有dba

如果没有专职的DBA, 并且准备不使用标准的关系型思想(结构化, 连接等)来处理数据, 那么mongdoDB将会是你首选, mongdodb对于对象数据的存储非常方便, 类可以支持序列化成json存储到mongodb中, 但是需要先了解一些最佳实践, 避免当数据变大后, 由于文档设计问题而造成的性能缺陷

## 不适用场景

在某些场景下, mongodb作为一个非关系型数据库有其局限性, mongodb不支持事务操作, 所以需要用到事务的应用不用mongodb, 另外mongodb目前不支持join操作, 需要复杂查询的应用不建议使用mongodb

# 3. mongodb的安装

## 1. 下载安装

下载地址：  https://www.mongodb.com/download-center/community 

选择合适自己的版本进行下载

![](/Users/lingjing/公众号/mongodb/1.png)







```linux
# 下载
curl -o https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel62-4.2.6.tgz

tar -xzvf mongodb-linux-x86_64-rhel62-4.2.6.tgz

mv mongodb-linux-x86_64-rhel62-4.2.6.tgz /usr/local/mongodb

```

 MongoDB 的可执行文件位于 bin 目录下，所以可以将其添加到 **PATH** 路径中： 

```linux
export PATH=<mongodb-install-directory>/bin:$PATH
```

 <mongodb-install-directory>为你 MongoDB 的安装路径。如本文的 **/usr/local/mongodb**  

启动

```bash
mkdir -p /data/db
mongod --config 配置文件路径

# 或者 
mongod -f 配置文件路径
```

-f是--config的缩写

配置文件，需要手动创建，参考以下配置即可。

创建mongodb.cfg配置文件

```
#数据库文件位置 dbpath=/data/servers/mongodb/data
#日志文件位置 logpath=/data/servers/mongodb/logs/mongodb.log # 以追加方式写入日志
logappend=true
# 是否以守护进程方式运行
fork=true
#绑定客户端访问的ip
bind_ip=192.168.10.135
# 默认27017
port=27017
```

创建数据和日志目录:

```
mkdir -p /data/servers/mongodb/data
mkdir -p /data/servers/mongodb/logs
```

通过配置文件方式启动:

```
mongod -f /data/servers/mongodb/mongodb.cfg
```



## 2. MongoDb web用户界面

MongoDB 提供了简单的 HTTP 用户界面。 如果你想启用该功能，需要在启动的时候指定参数 --rest 。

> **注意**：该功能只适用于 MongoDB 3.2 及之前的早期版本。

```
./mongod --dbpath=/data/db --rest
```

![](/Users/lingjing/公众号/mongodb/2.jpeg)

## 3. mongodb主从搭建

mongodb的主从集群模式, 其实官方已经不推荐了, 但是要理解主从集群的一些特性, 默认从机是不可操作的, 只是作为数据备份, 如果需要从机对外提供读的操作, 需要单独发指令

![5](/Users/lingjing/公众号/mongodb/5.jpg)



伪分布式搭建:在同一台机器，使用多个不同的端口，去启动多个实例。组成一个分布式系统。
真正的分布式搭建:在不同机器，使用相同的端口，分别启动实例。如果是真正的分布式搭建，一定要保证网络畅通和防火墙问题。

### 主机配置

mongodb.cfg

```
#数据库文件位置 
dbpath=/root/mongodb/ms/master/data
#日志文件位置 
logpath=/root/mongodb/ms/master/logs/mongodb.log # 以追加方式写入日志
logappend=true
# 是否以守护进程方式运行
fork=true
#绑定客户端访问的ip
bind_ip=192.168.10.135
# 默认27017
port=27001
# 主从模式下，指定我自身的角色是主机 
master=true
# 主从模式下，从机的地址信息 
source=192.168.10.135:27002
```

### 从机配置

```
# 数据库文件位置 
dbpath=/root/mongodb/ms/slave/data
#日志文件位置 
logpath=/root/mongodb/ms/slave/logs/mongodb.log # 以追加方式写入日志
logappend=true
# 是否以守护进程方式运行
fork = true
bind_ip=192.168.10.135
# 默认27017
port = 27002
slave = true
# 主从模式下，从机的地址信息 
source=192.168.10.135:27001
```

### 测试

启动服务

```
mongod -f /root/mongodb/ms/master/mongodb.cfg
mongod -f /root/mongodb/ms/slave/mongodb.cfg
```

连接测试

```
mongo localhost:27001
mongo localhost:27002
```

测试命令

```
db.isMaster()
```

### 读写分离

MongoDB副本集对读写分离的支持是通过Read Preferences特性进行支持的，这个特性非常复杂和灵活。设置读写 分离需要先在从节点SECONDARY 设置

```
rs.slaveOk()
```

## 4. mongodb副本集集群

副本集中有三种角色:主节点、从节点、仲裁节点
仲裁节点不存储数据，主从节点都存储数据。

优点:
 主如果宕机，仲裁节点会选举从作为新的主
 如果副本集中没有仲裁节点，那么集群的主从切换依然可以进行。
缺点:
 如果副本集中拥有仲裁节点，那么一旦仲裁节点挂了，集群中就不能进行主从切换了。

![6](/Users/lingjing/公众号/mongodb/6.jpg)

### 节点1配置

```
# 数据库文件位置 
dbpath=/root/mongodb/rs/rs01/node01/data
#日志文件位置 
logpath=/root/mongodb/rs/rs01/node01/logs/mongodb.log # 以追加方式写入日志
logappend=true
# 是否以守护进程方式运行
fork = true
bind_ip=192.168.10.135
# 默认27017
port = 27003 
#注意:不需要显式的去指定主从，主从是动态选举的 #副本集集群，需要指定一个名称，在一个副本集下，名称是相同的 
replSet=rs001
```

### 节点2配置

```
# 数据库文件位置 
dbpath=/root/mongodb/rs/rs01/node02/data
#日志文件位置 
logpath=/root/mongodb/rs/rs01/node02/logs/mongodb.log # 以追加方式写入日志
logappend=true
# 是否以守护进程方式运行
fork = true
bind_ip=192.168.10.135
# 默认27017
port = 27004 
#注意:不需要显式的去指定主从，主从是动态选举的 #副本集集群，需要指定一个名称，在一个副本集下，名称是相同的 replSet=rs001
```

### 节点3配置

```
# 数据库文件位置 
dbpath=/root/mongodb/rs/rs01/node03/data
#日志文件位置 
logpath=/root/mongodb/rs/rs01/node03/logs/mongodb.log # 以追加方式写入日志
logappend=true
# 是否以守护进程方式运行
fork = true
bind_ip=192.168.10.135
# 默认27017
port = 27005 
#注意:不需要显式的去指定主从，主从是动态选举的 #副本集集群，需要指定一个名称，在一个副本集下，名称是相同的 replSet=rs001
```

### 配置主备和仲裁

需要登录到mongodb的客户端进行配置主备和仲裁角色。

```
mongo 192.168.10.135:27003
use admin
cfg={_id:"rs001",members: [
{_id:0,host:"192.168.10.135:27003",priority:2},
{_id:1,host:"192.168.10.135:27004",priority:1},
{_id:2,host:"192.168.10.135:27005",arbiterOnly:true}
]}
rs.initiate(cfg);
```

说明:
 cfg中的_id的值是【副本集名称】 

priority:数字越大，优先级越高。优先级最高的会被选举为主库 

arbiterOnly:true，如果是仲裁节点，必须设置该参数

### 测试

```
rs.status
```

![7](/Users/lingjing/公众号/mongodb/7.jpg)

### 无仲裁副本集

和有仲裁的副本集基本上完全一样，只是在admin数据库下去执行配置的时候，不需要指定优先级和仲裁节点。这种 情况，如果节点挂掉，那么他们都会进行选举。

```
mongo 192.168.10.135:27006
use admin
cfg={_id:"rs002",members: [
{_id:0,host:"192.168.10.135:27006"},
{_id:1,host:"192.168.10.135:27007"},
{_id:2,host:"192.168.10.135:27008"}
]}
rs.initiate(cfg);
```

## 5. 副本集与分片混合部署

Mongodb的集群部署方案有三类角色: 实际数据存储节点, 配置文件存储节点和路由接入节点.

- 实际数据存储节点: 就是存储数据的
- 路由接入节点: 在分片的情况下起到负载均衡的作用
- 存储配置存储节点: 其实存储的是片键于chunk以及chunk与server的映射关系. 用上面的数据表示的配置节点存储的数据模型如下表:

map1

|         |        |
| ------- | ------ |
| [0,10}  | chunk1 |
| [10,20} | chunk2 |
| [20,30} | chunk3 |
| [30,40} | chunk4 |
| [40,50} | chunk5 |

map2

|        |        |
| ------ | ------ |
| chunk1 | shard1 |
| chunk2 | shard2 |
| chunk3 | shard3 |
| chunk4 | shard4 |
| chunk5 | shard5 |

​	![](/Users/lingjing/公众号/mongodb/11.jpg)

### 副本集与分片混合部署方式如图:

![](/Users/lingjing/公众号/mongodb/8.jpg)

相同的副本集中的节点存储的数据是一样的，副本集中的节点是分为主节点、从节点、仲裁节点(非必须)三种角色。
【这种设计方案的目的，主要是为了高性能、高可用、数据备份。】
不同的副本集中的节点存储的数据是不一样，【这种设计方案，主要是为了解决高扩展问题，理论上是可以无限扩展的。】

每一个副本集可以看成一个shard(分片)，多个副本集共同组成一个逻辑上的大数据节点。通过对shard上面进行逻 辑分块chunk(块)，每个块都有自己存储的数据范围，所以说客户端请求存储数据的时候，会去读取config server中的映射信息，找到对应的chunk(块)存储数据。

混合部署下mongodb写数据流程图

![](/Users/lingjing/公众号/mongodb/9.jpg)

混合部署方式下读mongodb的数据流程图

![](/Users/lingjing/公众号/mongodb/10.jpg)

### 数据服务器配置

我们实验, 值部署副本集1

在副本集中每个数据节点的mongodb.cfg配置文件【追加】以下内容( ):

```
# 数据库文件位置 
dbpath=/root/mongodb/datasvr/rs1/node01/data
#日志文件位置 
logpath=/root/mongodb/datasvr/rs1/node01/logs/mongodb.log # 以追加方式写入日志
logappend=true
# 是否以守护进程方式运行
fork = true
bind_ip=192.168.10.136
# 默认27017
port = 27003 
#注意:不需要显式的去指定主从，主从是动态选举的 #副本集集群，需要指定一个名称，在一个副本集下，名称是相同的 replSet=rs001
shardsvr=true
```

```
# 数据库文件位置 
dbpath=/root/mongodb/datasvr/rs1/node02/data
#日志文件位置 
logpath=/root/mongodb/datasvr/rs1/node02/logs/mongodb.log # 以追加方式写入日志
logappend=true
# 是否以守护进程方式运行
fork = true
bind_ip=192.168.10.136
# 默认27017
port = 27004
#注意:不需要显式的去指定主从，主从是动态选举的 #副本集集群，需要指定一个名称，在一个副本集下，名称是相同的 replSet=rs001
shardsvr=true
```

```
# 数据库文件位置 
dbpath=/root/mongodb/datasvr/rs1/node03/data
#日志文件位置 
logpath=/root/mongodb/datasvr/rs1/node03/logs/mongodb.log # 以追加方式写入日志
logappend=true
# 是否以守护进程方式运行
fork = true
bind_ip=192.168.10.136
# 默认27017
port = 27005 
#注意:不需要显式的去指定主从，主从是动态选举的 #副本集集群，需要指定一个名称，在一个副本集下，名称是相同的 replSet=rs001
shardsvr=true
```

### 配置服务器配置

配置三个配置服务器，配置信息如下，端口和path单独指定:

```
# 数据库文件位置 
dbpath=/root/mongodb/bin/cluster/configsvr/node01/data
#日志文件位置 
logpath=/root/mongodb/bin/cluster/configsvr/node01/logs/mongodb.log # 以追加方式写入日志
logappend=true
# 是否以守护进程方式运行
fork = true
bind_ip=192.168.10.135
# 默认28001
port = 28001
# 表示是一个配置服务器
configsvr=true
#配置服务器副本集名称
replSet=configsvr
```

```
# 数据库文件位置 
dbpath=/root/mongodb/bin/cluster/configsvr/node02/data
#日志文件位置 
logpath=/root/mongodb/bin/cluster/configsvr/node02/logs/mongodb.log # 以追加方式写入日志
logappend=true
# 是否以守护进程方式运行
fork = true
bind_ip=192.168.10.135
# 默认28001
port = 28002
# 表示是一个配置服务器
configsvr=true
#配置服务器副本集名称
replSet=configsvr
```

```
dbpath=/root/mongodb/bin/cluster/configsvr/node03/data
#日志文件位置 logpath=/root/mongodb/bin/cluster/configsvr/node03/logs/mongodb.log # 以追加方式写入日志
logappend=true
# 是否以守护进程方式运行 fork = true bind_ip=192.168.10.135 # 默认28001
port = 28003
# 表示是一个配置服务器 configsvr=true #配置服务器副本集名称 replSet=configsvr
```

注意创建dbpath和logpath

```
mongod -f /root/mongodb/bin/cluster/configsvr/node01/mongodb.cfg
mongod -f /root/mongodb/bin/cluster/configsvr/node02/mongodb.cfg
mongod -f /root/mongodb/bin/cluster/configsvr/node03/mongodb.cfg
```

#### 配置副本集

配置服务器是不存储服务器的, 需要在配置服务器上指定副本集

```
mongo 192.168.10.135:28001
use admin
cfg={_id:"configsvr",members: [
{_id:0,host:"192.168.10.136:28001"},
{_id:1,host:"192.168.10.136:28002"},
{_id:2,host:"192.168.10.136:28003"}
]}
rs.initiate(cfg);
```

### 路由服务器配置

#### 1. 启动路由服务

```
configdb=configsvr/192.168.10.135:28001,192.168.10.135:28002,192.168.10.135:28003 #日志文件位置
logpath=/root/mongodb/bin/cluster/routersvr/node01/logs/mongodb.log
# 以追加方式写入日志
logappend=true
# 是否以守护进程方式运行 fork = true bind_ip=192.168.10.135 # 默认28001
port=30000
```

路由服务器启动(注意这里是mongos命令而不是mongod命令 )

```
mongos -f /root/mongodb/bin/cluster/routersvr/node01/mongodb.cfg
```

#### 2. 关联切片和路由

登录到路由服务器中，执行关联切片和路由的相关操作。

```
#查看shard相关的命令 
sh.help()

sh.addShard("切片名称/地址") 
sh.addShard("rs001/192.168.10.135:27003");
sh.addShard("rs002/192.168.10.135:27006");
use abc
sh.enableSharding("abc");
sh.shardCollection("abc.mycollection",{name:"hashed"});
for(var i=1;i<=100;i++) db.mycollection.insert({name:"AABBCC"+i,age:i});
```



# 4. mongodb中的概念

mongdb是文档型数据库， 其中包括文档， 集合， 数据等， 我们先通过和常用的sql记性对比，来更好的帮助我们理解mongodb中的概念

| SQL概念     | Mongdb概念  | 解释说明                              |
| ----------- | ----------- | ------------------------------------- |
| database    | database    | 库名                                  |
| table       | collection  | 表/集合                               |
| row         | document    | 行/文档                               |
| column      | field       | 字段/域                               |
| index       | index       | 索引                                  |
| table joins |             | 表连接， Mongodb不支持                |
| primary key | primary key | 主键， mongodb自动将_id字段设置为主键 |

![](/Users/lingjing/公众号/mongodb/3.png)



## 1. 数据库

一个mongodb中可以建立多个数据库

mongodb的默认数据库为db， mongodb的单个实例可以容纳多个独立的数据库， 么一个都有自己的集合和权限， 不同的数据库放置不同的文件中。

### 1. show dbs 命令可以显示所有的数据库列表

```
mongo
MongoDB shell version v4.2.6
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("fb7781ef-41e6-4e76-a0bd-1ef98aedb802") }
MongoDB server version: 4.2.6
---

> show dbsshow dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> 
```

### 2. db 命令可以显示当前数据库对象或者集合

```
> dbdb
test
> 
```

### 3. use命令可以连接到一个指定的数据库

```
> dbdb
test
> use localuse local
switched to db local
> dbdb
local
```

### 4. 基本的数据库讲解：

- admin: 从权限的角度来看， 这是“root”数据库， 要是将一个用户添加到这个数据库， 这个用户自动继承所有数据库的权限， 一些特定的服务器端命令也只能从这个数据库运行， 比如列出所有的数据库或者关闭服务器
- local： 这个数据永远不会被复制， 可以用来存储限于本地单台服务器的任意集合
- config：当mongo用于分片设置时， config数据库在内部使用， 用于保存分片的相关信息

## 2. 文档

文档是一组键值对（及：key-value）。 mongodb的文档不需要设置相同的字段， 并且相同的字段不需要相同的数据类型， 这与关系型数据库有很大的区别。 也是mongodb非常突出的特点

**注意：**

1. 文档的键值对是有序的
2. 文档的值不仅可以是在双引号里面的额字符串， 还可以是其他几种数据类型， 甚至可以是文档
3. mongodb区分类型和大小写。
4. mongodb的文档不能有重复的键
5. 文档的键一般是字符串。 

## 3. 集合

集合就是mongodb文档, 类似于关系数据库系统中的表格

集合存在于数据库中, 集合没有固定的结构, 这意味着你咋对集合可以插入不同格式和类型的数据, 单通常情况下我们插入集合的数据都会有一定的关联性

比如: 我们可以把以下不同数据结构的文档插入到集合中:

```mongodb
{"site": "www.baidu.com"}
{"sit": "www.google.com", "name": "Google"}
```

一个collection中的所有域是collection中所有document中包含的field的并集

### 合法的集合名

- 集合名不能是空字符串""。
- 集合名不能含有\0字符（空字符)，这个字符表示集合名的结尾。
- 集合名不能以"system."开头，这是为系统集合保留的前缀。
- 用户创建的集合名字不能含有保留字符。有些驱动程序的确支持在集合名里面包含，这是因为某些系统生成的集合中包含该字符。除非你要访问这种系统创建的集合，否则千万不要在名字里出现$。　

如下实例：

```
db.col.findOne()
```

### capped collections

Capped collections 就是固定大小的collection。

它有很高的性能以及队列过期的特性(过期按照插入的顺序). 有点和 "RRD" 概念类似。

Capped collections 是高性能自动的维护对象的插入顺序。它非常适合类似记录日志的功能和标准的 collection 不同，你必须要显式的创建一个capped collection，指定一个 collection 的大小，单位是字节。collection 的数据存储空间值提前分配的。

Capped collections 可以按照文档的插入顺序保存到集合中，而且这些文档在磁盘上存放位置也是按照插入顺序来保存的，所以当我们更新Capped collections 中文档的时候，更新后的文档不可以超过之前文档的大小，这样话就可以确保所有文档在磁盘上的位置一直保持不变。

由于 Capped collection 是按照文档的插入顺序而不是使用索引确定插入位置，这样的话可以提高增添数据的效率。MongoDB 的操作日志文件 oplog.rs 就是利用 Capped Collection 来实现的。

要注意的是指定的存储大小包含了数据库的头信息。

```
db.createCollection("mycoll", {capped:true, size:100000})
```

- 在 capped collection 中，你能添加新的对象。
- 能进行更新，然而，对象不会增加存储空间。如果增加，更新就会失败 。
- 使用 Capped Collection 不能删除一个文档，可以使用 drop() 方法删除 collection 所有的行。
- 删除之后，你必须显式的重新创建这个 collection。
- 在32bit机器中，capped collection 最大存储为 1e9( 1X109)个字节。

## 4. 元数据

数据库的信息是存储在集合中的, 他们使用了系统的命名空间:

```
dbname.system.*
```

在mongodb数据库中名字空间 .system.*是多包含多种系统信心的特殊集合, 如下:

| 集合命名空间             | 描述                                  |
| ------------------------ | ------------------------------------- |
| dbname.system.namespaces | 列出所有名字空间                      |
| dbname.system.indexes    | 列出所有索引                          |
| dbname.system.profile    | 包含数据库概要信息                    |
| dbname.system.users      | 列出所有可访问数据库的用户            |
| dbname.local.source      | 包含复制对端(slave)的服务器信息和状态 |

对于修改系统集合中的对象有如下限制。

在{{system.indexes}}插入数据，可以创建索引。但除此之外该表信息是不可变的(特殊的drop index命令将自动更新相关信息)。

{{system.users}}是可修改的。 {{system.profile}}是可删除的。

## 5. mongodb数据类型

下表为MongoDB中常用的几种数据类型。

| 数据类型           | 描述                                                         |
| :----------------- | :----------------------------------------------------------- |
| String             | 字符串。存储数据常用的数据类型。在 MongoDB 中，UTF-8 编码的字符串才是合法的。 |
| Integer            | 整型数值。用于存储数值。根据你所采用的服务器，可分为 32 位或 64 位。 |
| Boolean            | 布尔值。用于存储布尔值（真/假）。                            |
| Double             | 双精度浮点值。用于存储浮点值。                               |
| Min/Max keys       | 将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比。 |
| Array              | 用于将数组或列表或多个值存储为一个键。                       |
| Timestamp          | 时间戳。记录文档修改或添加的具体时间。                       |
| Object             | 用于内嵌文档。                                               |
| Null               | 用于创建空值。                                               |
| Symbol             | 符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。 |
| Date               | 日期时间。用 UNIX 时间格式来存储当前日期或时间。你可以指定自己的日期时间：创建 Date 对象，传入年月日信息。 |
| Object ID          | 对象 ID。用于创建文档的 ID。                                 |
| Binary Data        | 二进制数据。用于存储二进制数据。                             |
| Code               | 代码类型。用于在文档中存储 JavaScript 代码。                 |
| Regular expression | 正则表达式类型。用于存储正则表达式。                         |

下面说明下几种重要的数据类型。

### ObjectId

ObjectId 类似唯一主键，可以很快的去生成和排序，包含 12 bytes，含义是：

- 前 4 个字节表示创建 **unix** 时间戳,格林尼治时间 **UTC** 时间，比北京时间晚了 8 个小时
- 接下来的 3 个字节是机器标识码
- 紧接的两个字节由进程 id 组成 PID
- 最后三个字节是随机数

![](/Users/lingjing/公众号/mongodb/4.jpeg)

MongoDB 中存储的文档必须有一个 _id 键。这个键的值可以是任何类型的，默认是个 ObjectId 对象

由于 ObjectId 中保存了创建的时间戳，所以你不需要为你的文档保存时间戳字段，你可以通过 getTimestamp 函数来获取文档的创建时间:

```
> var newObject = ObjectId()
> newObject.getTimestamp()
ISODate("2017-11-25T07:21:10Z")
```

ObjectId 转为字符串

```
> newObject.str
5a1919e63df83ce79df8b38f
```

### 字符串

**BSON 字符串都是 UTF-8 编码。**

### 时间戳

BSON 有一个特殊的时间戳类型用于 MongoDB 内部使用，与普通的 日期 类型不相关。 时间戳值是一个 64 位的值。其中：

- 前32位是一个 time_t 值（与Unix新纪元相差的秒数）
- 后32位是在某秒中操作的一个递增的`序数`

在单个 mongod 实例中，时间戳值通常是唯一的。

在复制集中， oplog 有一个 ts 字段。这个字段中的值使用BSON时间戳表示了操作时间。

> BSON 时间戳类型主要用于 MongoDB 内部使用。在大多数情况下的应用开发中，你可以使用 BSON 日期类型。

### 日期

表示当前距离 Unix新纪元（1970年1月1日）的毫秒数。日期类型是有符号的, 负数表示 1970 年之前的日期。

```
> var mydate1 = new Date()     //格林尼治时间
> mydate1
ISODate("2018-03-04T14:58:51.233Z")
> typeof mydate1
object
> var mydate2 = ISODate() //格林尼治时间
> mydate2
ISODate("2018-03-04T15:00:45.479Z")
> typeof mydate2
object
```

这样创建的时间是日期类型，可以使用 JS 中的 Date 类型的方法。

返回一个时间类型的字符串：

```
> var mydate1str = mydate1.toString()
> mydate1str
Sun Mar 04 2018 14:58:51 GMT+0000 (UTC) 
> typeof mydate1str
string
```

或者

```
> Date()
Sun Mar 04 2018 15:02:59 GMT+0000 (UTC)  
```

## 6. 常用客户端

自带命令行客户端

Navicat for mongodb MongoVUE
 Studio 3T
 Robo 3T

RockMongo

# 5. mongodb常用命令

## 1. 数据库

### 1. 创建数据库

#### 语法

```
use database_name
```

#### 示例

```
> show dbs;
admin   0.000GB
config  0.000GB
local   0.000GB
> use ajing
switched to db ajing
> show dbs;
admin   0.000GB
config  0.000GB
local   0.000GB
> db.mycollection.insert({"name": "ajing"})
WriteResult({ "nInserted" : 1 })
> show dbs;
admin   0.000GB
ajing   0.000GB
config  0.000GB
local   0.000GB
> 

```



### 2. 删除数据库

#### 语法

```
db.dropDatabase()
```

#### 示例

```
> show dbs;
admin   0.000GB
ajing   0.000GB
config  0.000GB
local   0.000GB
> use ajing
switched to db ajing
> db.dropDatabase()
{ "dropped" : "ajing", "ok" : 1 }
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> 

```

## 2. 集合

### 1. 创建并查看集合

#### 语法

```
# 创建集合
db.createCollection(name, options)
# 查看集合
show collecitons
# 或者
show tables
```

参数说明:

- name: 要创建的集合名称

- options: 可选参数, 指定有关内存大小及索引的选项 options 可以是如下参数:

|    字段     | 类型  |                             描述                             |
| :---------: | :---: | :----------------------------------------------------------: |
|   capped    | 布 尔 | (可选)如果为 true，则创建固定集合。固定集合是指有着固定大小的集 合，当达到最大值时，它会自动覆盖最早的文档。 **当该值为** **true** **时，必 须指定** **size** **参数。** |
| autoIndexId | 布 尔 |   (可选)如为 true，自动在 _id 字段创建索引。默认为 false。   |
|    size     | 数 值 | (可选)为固定集合指定一个最大值(以字节计)。 **如果** **capped** **为** **true****，也需要指定该字段。** |
|     max     | 数 值 |         `(可选)指定固定集合中包含文档的最大数量。 `          |

在插入文档时，MongoDB 首先检查固定集合的 size 字段，然后检查 max 字段。

#### 示例

```
> use test
switched to db test
> show collections
> show tables
> db.createCollection("mycollection")
{ "ok" : 1 }
> show tables
mycollection
> show collections
mycollection
```



### 2. 删除集合

#### 语法

```
db.collection_name.drop()
```

#### 示例

```
> use test
switched to db test
> show tables
mycollection
> db.mycollection.drop()
true
> show collections
> 
```



## 3. 文档

### 1. 插入文档

#### 语法

```
db.colleciton_name.insert(document)
```

#### 示例

```
> var document = { "name": "ajing", "age": 18, "address": "beijing" }
> document
{ "name" : "ajing", "age" : 18, "address" : "beijing" }
> db.mycollection.insert(document)
WriteResult({ "nInserted" : 1 })
```

### 2. 查询文档

#### 语法

```
db.collection_name.find(query, projection)
```

**query** :可选，使用查询操作符指定查询条件
 **projection** :可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参 数即可(默认省略)。

如果你需要以易读的方式来读取数据，可以使用 pretty() 方法，语法格式如下:

```
db.collection_name.find().pretty()
```

#### 示例

```
> show tables;
mycollection
> db.mycollection.find()
{ "_id" : ObjectId("5ebf25b8bbc6542a50be8234"), "name" : "ajing", "age" : 18, "address" : "beijing" }
> db.mycollection.find().pretty()
{
	"_id" : ObjectId("5ebf25b8bbc6542a50be8234"),
	"name" : "ajing",
	"age" : 18,
	"address" : "beijing"
}

```

### 3. 删除文档

#### 语法

```
# 删除一条后者多条
db.collection_name.remove(<query>, <justOne>)
# 清空
db.collection_name.remove({})
```

如果你的 MongoDB 是 2.6 版本以后的，语法格式如下

```
db.collection_name.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
} )
```

**参数说明:**

**query** :(可选)删除的文档的条件。
 **justOne** : (可选)如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
 **writeConcern** :(可选)抛出异常的级别。

#### 示例

```

> db.mycollection.find().pretty()
{
	"_id" : ObjectId("5ebf25b8bbc6542a50be8234"),
	"name" : "ajing",
	"age" : 18,
	"address" : "beijing"
}
> var document1 = { "name": "hello world", "age": 1, "address": "tianjin" }
> db.mycollection.insert(document1)
WriteResult({ "nInserted" : 1 })
> db.mycollection.find().pretty()
{
	"_id" : ObjectId("5ebf25b8bbc6542a50be8234"),
	"name" : "ajing",
	"age" : 18,
	"address" : "beijing"
}
{
	"_id" : ObjectId("5ebf2836bbc6542a50be8235"),
	"name" : "hello world",
	"age" : 1,
	"address" : "tianjin"
}
> db.mycollection.remove({"name": "ajing"}, 1)
WriteResult({ "nRemoved" : 1 })
> db.mycollection.find().pretty()
{
	"_id" : ObjectId("5ebf2836bbc6542a50be8235"),
	"name" : "hello world",
	"age" : 1,
	"address" : "tianjin"
}
> 
```



## 4. limit()和skip()方法

### limit()方法

#### 语法

```
db.collection_name.find().limit(number)
```

类似sql的limit用法, 读取记录的条数

### skip()方法

#### 语法

```
db.collection_name.find.skip(number)
```

跳过指定数量的数据

## 5. 文档排序

#### 语法

```
db.collection_name.find().sort({KEY: 1/-1})
```

在 MongoDB 中使用 sort() 方法对数据(文档)进行排序，sort() 方法可以通过参数指定排序的字段， 并使用 1 和 -1 来指定排序的方式，**其中** **1** **为升序排列，而** **-1** **是用于降序排列。**

## 6. mongodb索引

索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。
这种扫描全集合的查询效率是非常低的，特别在处理大量的数据时，查询可以要花费几十秒甚至几分
钟，这对网站的性能是非常致命的。
索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列
的值进行排序的一种结构

### 1. 创建索引

MongoDB使用 createIndex() 方法来创建索引。

>
>  注意在 3.0.0 版本前创建索引方法为 db.collection.ensureIndex()，之后的版本使用了
>
> db.collection.createIndex() 方法，ensureIndex() 还能用，但只是 createIndex() 的别名。 



#### 语法

```
db.collection_name.createIndex(keys, options)
```

Key: 你要创建的索引字段, 1为升序, -1为降序创建索引

createIndex() 接收可选参数，可选参数列表如下:

| **Parameter**      | **Type**      | **Description**                                              |
| ------------------ | ------------- | ------------------------------------------------------------ |
| background         | Boolean       | 建索引过程会阻塞其它数据库操作，background可指定 以后台方式创建索引，即增加 "background" 可选参数。 "background" 默认值为**false**。 |
| unique             | Boolean       | 建立的索引是否唯一。指定为true创建唯一索引。默认值 为**false**. |
| name               | string        | 索引的名称。如果未指定，MongoDB的通过连接索引的 字段名和排序顺序生成一个索引名称。 |
| dropDups           | Boolean       | **3.0+****版本已废弃。**在建立唯一索引时是否删除重复记录, 指定 true 创建唯一索引。默认值为 **false**. |
| sparse             | Boolean       | 对文档中不存在的字段数据不启用索引;这个参数需要特 别注意，如果设置为true的话，在索引字段中不会查询出 不包含对应字段的文档.。默认值为 **false**. |
| expireAfterSeconds | integer       | 指定一个以秒为单位的数值，完成 TTL设定，设定集合的 生存时间。 |
| v                  | index version | 索引的版本号。默认的索引版本取决于mongod创建索引 时运行的版本。 |
| weights            | document      | 索引权重值，数值在 1 到 99,999 之间，表示该索引相对 于其他索引字段的得分权重。 |
| default_language   | string        | 对于文本索引，该参数决定了停用词及词干和词器的规则 的列表。 默认为英语 |
| language_override  | string        | 对于文本索引，该参数指定了包含在文档中的字段名，语 言覆盖默认的language，默认值为 language. |

#### 实例:

```
db.test.createIndex({"name": 1, "age": -1}, {background: true})
```

test集合中, 那么字段正序, age反序创建索引, 并在后台创建索引

### 2. 查看集合索引

#### 查看集合索引

```
db.colletion_name.getIndexes()
```

#### 查看集合索引大小

```
db.collection_name.totalIndexSize()
```

### 3. 删除集合索引

#### 删除集合所有索引

```
db.collection_name.dropIndexes()
```

#### 删除集合指定索引

```
db.collection_name.dropIndex("索引名称")


> db.mycollection.getIndexes()
[
	{
		"v" : 2,
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "test.mycollection"
	},
	{
		"v" : 2,
		"key" : {
			"name" : 1
		},
		"name" : "name_1",
		"ns" : "test.mycollection"
	}
]
> db.mycollection.dropIndex("name_1")
{ "nIndexesWas" : 2, "ok" : 1 }
```

索引名称就是上面中name的对应名字

## 7. 聚合查询

MongoDB中聚合(aggregate)主要用于处理数据(诸如统计平均值,求和等)，并返回计算后的数据结果。 有点类似sql语句中的 count(*)。利用Aggregate聚合管道可以完成。MongoDB的聚合管道将 MongoDB文档在一个管道处理完毕后将结果传递给下一个管道处理。管道操作是可以重复的。表达式:处理输入文档并输出。表达式是无状态的，只能用于计算当前聚合管道的文档，不能处理其它
的文档。

基本语法为:

```
db.collection_name.aggregate(AGGREGATE_OPTIOIN)
```



为了便于理解，先将常见的mongo的聚合操作和mysql的查询做下类比:

|     **表达式**      |  **SQL**操作   | **描述**                              |
| :-----------------: | :------------: | ------------------------------------- |
|       $group        |    group by    | 分组                                  |
|        $sum         | count()、sum() | 计算总和。                            |
|        $avg         |     avg()      | 计算平均值                            |
|        $min         |     min()      | `获取集合中所有文档对应值得最小值。 ` |
|        $max         |     max()      | `获取集合中所有文档对应值得最大值。 ` |
|       $match        | where、having  | 查询条件                              |
|        $sort        |    order by    | 排序                                  |
|       $limit        |     limit      | 取条数                                |
|      $project       |     select     | 选择                                  |
| $lookup (v3.2 新增) |      join      | 连接                                  |

### 1. 数据准备

```
> db.list1.find().pretty()
{
	"_id" : ObjectId("5ec22afc42b300f01671543f"),
	"name" : "zhaoyun1",
	"age" : 1,
	"city" : "BJ"
}
{
	"_id" : ObjectId("5ec22b0a42b300f016715440"),
	"name" : "zhaoyun2",
	"age" : 2,
	"city" : "BJ"
}
{
	"_id" : ObjectId("5ec22b1242b300f016715441"),
	"name" : "zhaoyun3",
	"age" : 3,
	"city" : "BJ"
}
{
	"_id" : ObjectId("5ec22b1a42b300f016715442"),
	"name" : "zhaoyun4",
	"age" : 4,
	"city" : "BJ"
}
{
	"_id" : ObjectId("5ec22b2242b300f016715443"),
	"name" : "zhaoyun5",
	"age" : 5,
	"city" : "BJ"
}
{
	"_id" : ObjectId("5ec22bff42b300f016715444"),
	"name" : "zhaoyun6",
	"age" : 6,
	"city" : "TJ"
}
{
	"_id" : ObjectId("5ec22c0b42b300f016715445"),
	"name" : "zhaoyun7",
	"age" : 7,
	"city" : "TJ"
}
> 
```

### 1. $group

城市分组

第一个列必须是_id, 否则报错

```
> db.list1.aggregate([{$group: {_id : "$city"}}])
{ "_id" : "BJ" }
{ "_id" : "TJ" }
> 
```



### 2. $sum

按照城市分组获得每组年龄总和

```
> db.list1.aggregate([{$group: {_id : "$city", ageNumbers: {$sum : "$age"}}}])
{ "_id" : "TJ", "ageNumbers" : 13 }
{ "_id" : "BJ", "ageNumbers" : 15 }
> 

```

### 3.$avg

按照城市分组获得每组平均年龄

```
> db.list1.aggregate([{$group: {_id : "$city", avg: {$avg : "$age"}}}])
{ "_id" : "BJ", "avg" : 3 }
{ "_id" : "TJ", "avg" : 6.5 }
```

### 4.$min

按照城市分组获得每组最小年龄

```
> db.list1.aggregate([{$group: {_id : "$city", min: {$min : "$age"}}}])
{ "_id" : "TJ", "min" : 6 }
{ "_id" : "BJ", "min" : 1 }
```

### 5.$max

按照城市分组获得每组最大年龄

```
> db.list1.aggregate([{$group: {_id : "$city", max: {$max : "$age"}}}])
{ "_id" : "TJ", "max" : 7 }
{ "_id" : "BJ", "max" : 5 }
```

### 6.$match

年龄大于2, 小于等于5

```
> db.list1.aggregate([{$match:{age:{$gt : 2, $lte : 5}}}])
{ "_id" : ObjectId("5ec22b1242b300f016715441"), "name" : "zhaoyun3", "age" : 3, "city" : "BJ" }
{ "_id" : ObjectId("5ec22b1a42b300f016715442"), "name" : "zhaoyun4", "age" : 4, "city" : "BJ" }
{ "_id" : ObjectId("5ec22b2242b300f016715443"), "name" : "zhaoyun5", "age" : 5, "city" : "BJ" }
> 
```



### 7.$sort

年龄呢从大到小排序

```
> db.list1.aggregate([{$sort:{age:-1}}])
{ "_id" : ObjectId("5ec22c0b42b300f016715445"), "name" : "zhaoyun7", "age" : 7, "city" : "TJ" }
{ "_id" : ObjectId("5ec22bff42b300f016715444"), "name" : "zhaoyun6", "age" : 6, "city" : "TJ" }
{ "_id" : ObjectId("5ec22b2242b300f016715443"), "name" : "zhaoyun5", "age" : 5, "city" : "BJ" }
{ "_id" : ObjectId("5ec22b1a42b300f016715442"), "name" : "zhaoyun4", "age" : 4, "city" : "BJ" }
{ "_id" : ObjectId("5ec22b1242b300f016715441"), "name" : "zhaoyun3", "age" : 3, "city" : "BJ" }
{ "_id" : ObjectId("5ec22b0a42b300f016715440"), "name" : "zhaoyun2", "age" : 2, "city" : "BJ" }
{ "_id" : ObjectId("5ec22afc42b300f01671543f"), "name" : "zhaoyun1", "age" : 1, "city" : "BJ" }
> 
```

### 8. $limit

求age最大的两个

```
> db.list1.aggregate([{$sort:{age:-1}}, {$limit: 2}])
{ "_id" : ObjectId("5ec22c0b42b300f016715445"), "name" : "zhaoyun7", "age" : 7, "city" : "TJ" }
{ "_id" : ObjectId("5ec22bff42b300f016715444"), "name" : "zhaoyun6", "age" : 6, "city" : "TJ" }
> 

```



### 9. $project

```
> db.list1.aggregate([{$project: {_id: 0, name: 1, city: 1, age: 1}}])
{ "name" : "zhaoyun1", "age" : 1, "city" : "BJ" }
{ "name" : "zhaoyun2", "age" : 2, "city" : "BJ" }
{ "name" : "zhaoyun3", "age" : 3, "city" : "BJ" }
{ "name" : "zhaoyun4", "age" : 4, "city" : "BJ" }
{ "name" : "zhaoyun5", "age" : 5, "city" : "BJ" }
{ "name" : "zhaoyun6", "age" : 6, "city" : "TJ" }
{ "name" : "zhaoyun7", "age" : 7, "city" : "TJ" }
```



### 10. $lookup

#### 语法

```
{
   $lookup:
     {
       from: <collection to join>,
       localField: <field from the input documents>,
       foreignField: <field from the documents of the "from" collection>,
       as: <output array field>
     }
}
```

 **语法的解释说明**

|   **语法值**   |                         **解释说明**                         |
| :------------: | :----------------------------------------------------------: |
|     `from`     |               同一个数据库下等待被Join的集合。               |
|  `localField`  | 源集合中的match值，如果输入的集合中，某文档没有 localField这个Key（Field），在处理的过程中，会默认为此文档含有 localField：null的键值对。 |
| `foreignField` | 待Join的集合的match值，如果待Join的集合中，文档没有foreignField 值，在处理的过程中，会默认为此文档含有 foreignField：null的键值对。 |
|      `as`      | 为输出文档的新增值命名。如果输入的集合中已存在该值，则会覆盖掉， |

用于多文档关联, 类似sql的多表关联

#### 示例

以上的语法介绍有些枯燥，不易理解，我们直接分析品味案例好了。

假设 有 **订单集合**， 存储的测试数据 如下：

```
db.orders.insert([
   { "_id" : 1, "item" : "almonds", "price" : 12, "quantity" : 2 },
   { "_id" : 2, "item" : "pecans", "price" : 20, "quantity" : 1 },
   { "_id" : 3  }
])
```

其中 item 对应 数据为 **商品名称**。

另外 一个 就是就是 **商品库存集合** ，存储的测试数据 如下：

```
db.inventory.insert([
   { "_id" : 1, "sku" : "almonds", description: "product 1", "instock" : 120 },
   { "_id" : 2, "sku" : "bread", description: "product 2", "instock" : 80 },
   { "_id" : 3, "sku" : "cashews", description: "product 3", "instock" : 60 },
   { "_id" : 4, "sku" : "pecans", description: "product 4", "instock" : 70 },
   { "_id" : 5, "sku": null, description: "Incomplete" },
   { "_id" : 6 }
])
```

此集合中的 sku 数据等同于 订单 集合中的 **商品名称**。

在这种模式设计下，如果要查询订单表对应商品的库存情况，应如何写代码呢？

**很明显这需要两个集合Join。**

场景简单，不做赘述，直送答案 。其语句 如下：

```
db.orders.aggregate([
   {
     $lookup:
       {
         from: "inventory",
         localField: "item",
         foreignField: "sku",
         as: "inventory_docs"
       }
  }
])
```

返回的执行结果如下：

```
{
    "_id" : NumberInt("1"),
    "item" : "almonds",
    "price" : NumberInt("12"),
    "quantity" : NumberInt("2"),
    "inventory_docs" : [
        {
            "_id" : NumberInt("1"),
            "sku" : "almonds",
            "description" : "product 1",
            "instock" : NumberInt("120")
        }
    ]
}


{
    "_id" : NumberInt("2"),
    "item" : "pecans",
    "price" : NumberInt("20"),
    "quantity" : NumberInt("1"),
    "inventory_docs" : [
        {
            "_id" : NumberInt("4"),
            "sku" : "pecans",
            "description" : "product 4",
            "instock" : NumberInt("70")
        }
    ]
}


{
    "_id" : NumberInt("3"),
    "inventory_docs" : [
        {
            "_id" : NumberInt("5"),
            "sku" : null,
            "description" : "Incomplete"
        },
        {
            "_id" : NumberInt("6")
        }
    ]
}
```

# 6. mongoDB的java客户端

## 1. springboot操作mongodb

### 1. maven配置

```maven
<dependency>       
  <groupId>org.springframework.boot</groupId>    
  <artifactId>spring-boot-starter-data-mongodb</artifactId> 
</dependency>
```

### 2. application.properties中添加配置

```
spring.data.mongodb.uri=mongodb://name:pass@localhost:27017/test
```

多个IP集群的可以采用下面的配置:

```
spring.data.mongodb.uri=mongodb://user:pwd@ip1:port1,ip2:port2/database
```

### 3. 创建数据库操作的实体类

```
 
import java.io.Serializable;
public class User implements Serializable {
        private static final long serialVersionUID = -3258839839160856613L;
        private Long id;
        private String userName;
        private String passWord;
 
        public Long getId() {
                return id;
        }
 
        public void setId(Long id) {
                this.id = id;
        }
 
        public String getUserName() {
                return userName;
        }
 
        public void setUserName(String userName) {
                this.userName = userName;
        }
 
        public String getPassWord() {
                return passWord;
        }
 
        public void setPassWord(String passWord) {
                this.passWord = passWord;
        }
 
        @Override
        public String toString() {
                return "UserEntity{" +
                        "id=" + id +
                        ", userName='" + userName + '\'' +
                        ", passWord='" + passWord + '\'' +
                        '}';
        }
}
```



### 4. 实体类相关的增删改查操作

```
import com.mongodb.client.result.UpdateResult;
import com.neo.repository.UserRepository;
import com.neo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;
 
@Component
public class UserRepositoryImpl implements UserRepository {
 
    @Autowired
    private MongoTemplate mongoTemplate;
 
    /**
     * 创建对象
     * @param user
     */
    @Override
    public void saveUser(User user) {
        mongoTemplate.save(user);
    }
 
    /**
     * 根据用户名查询对象
     * @param userName
     * @return
     */
    @Override
    public User findUserByUserName(String userName) {
        Query query=new Query(Criteria.where("userName").is(userName));
        User user =  mongoTemplate.findOne(query , User.class);
        return user;
    }
 
    /**
     * 更新对象
     * @param user
     */
    @Override
    public long updateUser(User user) {
        Query query=new Query(Criteria.where("id").is(user.getId()));
        Update update= new Update().set("userName", user.getUserName()).set("passWord", user.getPassWord());
        //更新查询返回结果集的第一条
        UpdateResult result =mongoTemplate.updateFirst(query,update,User.class);
        //更新查询返回结果集的所有
        // mongoTemplate.updateMulti(query,update,UserEntity.class);
        if(result!=null)
            return result.getMatchedCount();
        else
            return 0;
    }
 
    /**
     * 删除对象
     * @param id
     */
    @Override
    public void deleteUserById(Long id) {
        Query query=new Query(Criteria.where("id").is(id));
        mongoTemplate.remove(query,User.class);
    }
}
```

## 2. 多数据源MongoDB的使用

### 1. Maven配置

```
<dependency>       
  <groupId>org.springframework.boot</groupId>    
  <artifactId>spring-boot-starter-data-mongodb</artifactId> 
</dependency>
```

### 2. 配置两条数据源

```
mongodb:
  primary:
    host: localhost
    port: 27017
    database: test
  secondary:
    host: localhost
    port: 27017
    database: data
```

### 3. 创建文件实体类

```
import lombok.Data;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;

@Data //生成get、set方法等
public class MultipleMongoProperties {

    private MongoProperties primary = new MongoProperties();
    private MongoProperties secondary = new MongoProperties();

}
```

### 4. 配置两个数据库

数据库1

```
@Configuration
@EnableMongoRepositories(basePackages = "com.tedu.huawei.repository.primary",
        mongoTemplateRef = PrimaryMongoConfig.MONGO_TEMPLATE) //basePackages对应第一个库的repository所在的地址
public class PrimaryMongoConfig {
    protected static final String MONGO_TEMPLATE = "primaryMongoTemplate";
}
```

数据库2

```
@Configuration
@EnableMongoRepositories(basePackages = "com.tedu.huawei.repository.secondary",
        mongoTemplateRef = SecondaryMongoConfig.MONGO_TEMPLATE)
public class SecondaryMongoConfig {
    protected static final String MONGO_TEMPLATE = "secondaryMongoTemplate";
}
```

### 5. 构造对应的MongoTemplate

```
import com.mongodb.MongoClient;
import com.tedu.huawei.entity.MultipleMongoProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;

@Configuration
public class MultipleMongoConfig {

    @Autowired
    private MultipleMongoProperties mongoProperties;

    @Bean
    @ConfigurationProperties(prefix = "mongodb")
    public MultipleMongoProperties connectionSettings(){
        return new MultipleMongoProperties();

    }

    @Primary
    @Bean(name = PrimaryMongoConfig.MONGO_TEMPLATE)
    public MongoTemplate primaryMongoTemplate() throws Exception {
        return new MongoTemplate(primaryFactory(this.mongoProperties.getPrimary()));
    }

    @Bean
    @Qualifier(SecondaryMongoConfig.MONGO_TEMPLATE)
    public MongoTemplate secondaryMongoTemplate() throws Exception {
        return new MongoTemplate(secondaryFactory(this.mongoProperties.getSecondary()));
    }

    @Bean
    @Primary
    public MongoDbFactory primaryFactory(MongoProperties mongo) throws Exception {
        return new SimpleMongoDbFactory(new MongoClient(mongo.getHost(), mongo.getPort()),
                mongo.getDatabase());
    }

    @Bean
    public MongoDbFactory secondaryFactory(MongoProperties mongo) throws Exception {
        return new SimpleMongoDbFactory(new MongoClient(mongo.getHost(), mongo.getPort()),
                mongo.getDatabase());
    }
}
```

