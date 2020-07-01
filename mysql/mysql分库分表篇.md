# mysql分库分表篇

# 1. 分库分表介绍

## 1. 使用背景

- 当表的数量达到几百上千张表时， 众多的业务模块都访问这个数据库， 压力会非常的大， 考虑对其进行分库
- 当表的数据达到几千万级别， 在做很多操作的时候比较吃力， 考虑对其进行分库或者分表

## 2. 数据切分方案

数据气氛根据其切分规则的类型， 可以分为两种切分模式：

- 垂直切分： 按照业务模块进行切分， 将不同模块的表切分到不同的数据库中。

![55](55.png)

- 水平切分： 将一张大表按照一定的切分规则， 按照行切分成不同的表或者切分到不同的库中。

![56](56.png)

**水平切分的原则：**

- 按照ID取模： 对ID进行取模， 余数决定该行数据切分到哪个表或者库中
- 按照日期： 按照年月日， 将数据切分到不同的表或者库中
- 按照范围： 可以对某一列按照范围进行切分， 不同的范围切分到不同的表或者数据库中

## 3. 切分的原则

- 第一： 能不切分尽量不要切分
- 第二： 如果要切分一定要选择合适的切片规则， 提前规划好
- 第三： 数据切分尽量通过数据冗余或者表分组来降低扩库join的可能
- 第四： 由于数据库中间件对数据join实现的优劣难以把握， 而且实现高性能难度极大， 业务读取尽量少使用多表join



## 4. 分库分表需要解决的问题

### 1. 分布式事务的问题

强一直性事务

最终一致性事务

### 2. 分布式主键ID问题

- Redis incr命令
- 数据生成主键
- UUID
- snowflake算法

### 3. 跨库join问题

- 通过业务分析， 将不同的join查询拆分成多个select
- 建立全局表
- 冗余字段， 避免跨库查询
- E-R分片（将有ER关系的记录都存储在一个库中）
- 最多支持跨两张表跨库的join

### 4. 跨库count， order by， group by问题



## 5. 分库分表实现技术

- 阿里的TDDL， Cobar
- 基于阿里Cobar开发的mycat
- 当当网的sharding-jdbc



# 2. mycat介绍

## 1. 什么是mycat？

Mycat数据库分库分表中间件

活跃的、性能好的开源数据库中间件！

一个彻底开源的，面向企业应用开发的大数据库集群

支持事务、ACID、可以替代MySQL的加强版数据库

一个可以视为MySQL集群的企业级数据库，用来替代昂贵的Oracle集群

一个融合内存缓存技术、NoSQL技术、HDFS大数据的新型SQL Server

结合传统数据库和新型分布式数据仓库的新一代企业级数据库产品

一个新颖的数据库中间件产品



## 2. Mycat架构

![54](54.png)

## 3. mycat的关键特性

支持SQL92标准

支持MySQL、Oracle、DB2、SQL Server、PostgreSQL等DB的常见SQL语法

遵守Mysql原生协议，跨语言，跨平台，跨数据库的通用中间件代理。

基于心跳的自动故障切换，支持读写分离，支持MySQL主从，以及galera cluster集群。

支持Galera for MySQL集群，Percona Cluster或者MariaDB cluster

基于Nio实现，有效管理线程，解决高并发问题。

支持数据的多片自动路由与聚合，支持sum,count,max等常用的聚合函数,支持跨库分页。

支持单库内部任意join，支持跨库2表join，甚至基于caltlet的多表join。

支持通过全局表，ER关系的分片策略，实现了高效的多表join查询。

支持多租户方案。

支持分布式事务（弱xa）。

支持XA分布式事务（1.6.5）。

支持全局序列号，解决分布式下的主键生成问题。

分片规则丰富，插件化开发，易于扩展。

强大的web，命令行监控。

支持前端作为MySQL通用代理，后端JDBC方式支持Oracle、DB2、SQL Server 、 mongodb 、巨杉。

支持密码加密

支持服务降级

支持IP白名单

支持SQL黑名单、sql注入攻击拦截

支持prepare预编译指令（1.6）

支持非堆内存(Direct Memory)聚合计算（1.6）

支持PostgreSQL的native协议（1.6）

支持mysql和oracle存储过程，out参数、多结果集返回（1.6）

支持zookeeper协调主从切换、zk序列、配置zk化（1.6）

支持库内分表（1.6）

集群基于ZooKeeper管理，在线升级，扩容，智能优化，大数据处理（2.0开发版）。

## 4. mycat的原理

Mycat 的原理中最重要的一个动词是“拦截”，它拦截了用户发送过来的 SQL 语句，首先对 SQL 语句做了 一些特定的分析：如分片分析、路由分析、读写分离分析、缓存分析等，然后将此 SQL 发往后端的真实数据库， 并将返回的结果做适当的处理，最终再返回给用户。



# 3. mycat中的概念

## 1. 数据库中间件

前面讲了 Mycat 是一个开源的分布式数据库系统，但是由于真正的数据库需要存储引擎，而 Mycat 并没有 存储引擎，所以并不是完全意义的分布式数据库系统。 那么 Mycat 是什么？Mycat 是数据库中间件，就是介于数据库与应用之间，进行数据处理与交互的中间服务。 由于前面讲的对数据进行分片处理之后，从原有的一个库，被切分为多个分片数据库，所有的分片数据库集群构 成了整个完整的数据库存储。

![57](57.png)

如上图所表示，数据被分到多个分片数据库后，应用如果需要读取数据，就要需要处理多个数据源的数据。 如果没有数据库中间件，那么应用将直接面对分片集群，数据源切换、事务处理、数据聚合都需要应用直接处理， 原本该是专注于业务的应用，将会花大量的工作来处理分片后的问题，最重要的是每个应用处理将是完全的重复 造轮子。 

所以有了数据库中间件，应用只需要集中与业务处理，大量的通用的数据聚合，事务，数据源切换都由中间 件来处理，中间件的性能与处理能力将直接决定应用的读写性能，所以一款好的数据库中间件至关重要。

## 2. 逻辑库（schema）

前面一节讲了数据库中间件，通常对实际应用来说，并不需要知道中间件的存在，业务开发人员只需要知道 数据库的概念，所以数据库中间件可以被看做是一个或多个数据库集群构成的逻辑库。 



在云计算时代，数据库中间件可以以多租户的形式给一个或多个应用提供服务，每个应用访问的可能是一个 独立或者是共享的物理库，常见的如阿里云数据库服务器 RDS。

![59](59.png)

# 4. mycat的安装

**注意： 需要先安装jdk**

1. 下载mycat

```
wget http://dl.mycat.io/1.6-RELEASE/Mycat-server-1.6-RELEASE-20161028204710-
linux.tar.gz
```

2. 解压缩

```
tar -zxvf Mycat-server-1.6-RELEASE-20161028204710-linux.tar.gz
```

3. 启动mycat

```
- 启动命令:./mycat start
- 停止命令:./mycat stop
- 重启命令:./mycat restart - 查看状态:./mycat status
```

4. 访问mycat

```
使用mysql的客户端直接连接mycat服务。默认服务端口为【8066】
```



# 5. mycat分片配置

## 1. 配置schema.xml

schema.xml介绍 schema.xml作为Mycat中重要的配置文件之一，管理着Mycat的逻辑库、表、分片规则、DataNode以及

DataHost之间的映射关系。弄懂这些配置，是正确使用Mycat的前提。

schema 标签用于定义MyCat实例中的逻辑库
 Table 标签定义了MyCat中的逻辑表
 dataNode 标签定义了MyCat中的数据节点，也就是我们通常说所的数据分片。 dataHost标签在mycat逻辑库中也是作为最底层的标签存在，直接定义了具体的数据库实例、读写分离配置 和心跳语句。

schema.xml配置

```
<?xml version="1.0"?>
<!DOCTYPE mycat:schema SYSTEM "schema.dtd">
<mycat:schema xmlns:mycat="http://io.mycat/">
<schema name="TESTDB" checkSQLschema="false" sqlMaxLimit="100"> <!-- auto sharding by id (long) -->
<table name="item" dataNode="dn1,dn2,dn3" rule="mod-long" /> <!-- 一个库中拆成多个表 -->
        <table name="user" dataNode="dn1" rule="mod-long" subTables="user$1-3" />
    </schema>
    <!-- <dataNode name="dn1$0-743" dataHost="localhost1" database="db$0-743"
        /> -->
    <dataNode name="dn1" dataHost="localhost1" database="db1" />
    <dataNode name="dn2" dataHost="localhost1" database="db2" />
    <dataNode name="dn3" dataHost="localhost1" database="db3" />
    <dataHost name="localhost1" maxCon="1000" minCon="10" balance="0"
              writeType="0" dbType="mysql" dbDriver="native" switchType="1"
 slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="hostM1" url="192.168.10.135:3306" user="root"
                   password="111111" >
        </writeHost>
    </dataHost>
</mycat:schema>
```



## 2. 配置server.xml

server.xml几乎保存了所有mycat需要的系统配置信息。最常用的是在此配置用户名、密码及权限。

Server.xml配置

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mycat:server SYSTEM "server.dtd">
<mycat:server xmlns:mycat="http://io.mycat/">
     <system>
          <property name="defaultSqlParser">druidparser</property>
     </system>
     <user name="mycat">
          <property name="password">mycat</property>
          <property name="schemas">TESTDB</property>
     </user>
</mycat:server>
 
```



## 3. 配置rule.xml

配置rule.xml

rule.xml里面就定义了我们对表进行拆分所涉及到的规则定义。我们可以灵活的对表使用不同的分片算法，或者对 表使用相同的算法但具体的参数不同。这个文件里面主要有tableRule和function这两个标签。在具体使用过程中可 以按照需求添加tableRule和function。

此配置文件可以不用修改，使用默认即可。

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mycat:rule SYSTEM "rule.dtd">
<mycat:rule xmlns:mycat=”http://io.mycat/“ >
    <tableRule name="sharding-by-intfile">
       <rule>
           <columns>sharding_id</columns>
           <algorithm>hash-int</algorithm>
       </rule>
    </tableRule>
    <function name="hash-int" class="io.mycat.route.function.PartitionByFileMap">
         <property name="mapFile">partition-hash-int.txt</property>
     </function>
 </mycat:rule>
```

# 6. 十个常用的分片规则

## 1. 枚举法

```
<tableRule name="sharding-by-intfile">
    <rule>
        <columns>user_id</columns>
        <algorithm>hash-int</algorithm>
    </rule>
</tableRule>
<function name="hash-int"
    class="io.mycat.route.function.PartitionByFileMap">
    <property name="mapFile">partition-hash-int.txt</property>
    <property name="type">0</property>
    <property name="defaultNode">0</property>
</function>
```

配置说明：

- tableRule标签:

  columns :标识将要分片的表字段 

  algorithm :指定分片函数

- function标签:
   mapFile :指定分片函数需要的配置文件名称
   type :默认值为0，0表示Integer，非零表示String
   defaultNode :指定默认节点，小于0表示不设置默认节点，大于等于0表示设置默认节点，0代表节点1。

默认节点的作用:枚举分片时，如果碰到不识别的枚举值，就让它路由到默认节点。 如果不配置默认节点(defaultNode值小于0表示不配置默认节点)，碰到不识别的枚举值就会报错:

can't find datanode for sharding column:column_name val:ffffffff



partition-hash-int.txt 配置:

```
10000=0
10010=1
```



## 2. 固定分片hash算法

```
<tableRule name="rule1">
    <rule>
        <columns>user_id</columns>
        <algorithm>func1</algorithm>
    </rule>
</tableRule>
<function name="func1"
    class="io.mycat.route.function.PartitionByLong">
    <property name="partitionCount">2,1</property>
    <property name="partitionLength">256,512</property>
</function>
```

配置说明: tableRule标签:

columns :标识将要分片的表字段 algorithm :指定分片函数

function标签:
 partitionCount :指定分片个数列表
 partitionLength : 分片范围列表，分区长度:默认为最大2^n=1024 ,即最大支持1024分区

约束 :
 count,length 两个数组的长度必须是一致的。 1024 = sum((count[i]*length[i]))

