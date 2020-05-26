# mysql的on duplicate key update

今天get到一个新的技能, 觉得很是不错, 效率也很高, 分享给大家, 业务场景是这样的.

我们要统计一下jira里面最近各个项目(每个项目有一个唯一Id)两周的活跃度, 是一个大概的数字, 每次有jira操作的时候, 我们都可以通过webhook请求捕获该请求的信息, 然后进行数据库的操作.

我们设计的数据库表是这样的.

```
DROP TABLE IF EXISTS `t_jira_active_daily`;
CREATE TABLE `t_jira_active_daily` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `alm_id` varchar(30) NOT NULL COMMENT 'almId, 项目id',
  `record_date` varchar(20) NOT NULL COMMENT '记录日期yyyy-MM-dd',
  `begin_time` varchar(20) NOT NULL COMMENT '记录凌晨时间戳',
  `active_num` varchar(10) NOT NULL COMMENT '记录每日活跃度',
  `create_by` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '创建用户',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '更新用户',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `flag` tinyint(2) NOT NULL COMMENT '1:有效记录；0:无效记录',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_alm_record` (`alm_id`,`record_date`)
) ENGINE=InnoDB AUTO_INCREMENT=326 DEFAULT CHARSET=utf8mb4
```

项目ID和日期是一个唯一索引, 我们在数据库操作的时候, 需要先查询一下数据库, 即select操作, 看看该项目在今天是否有活跃度, 如果有, 进行update操作, 就是对数据库中表t_jira_active_daily的字段active_num + 1, 如果不存在该项目该天的数据,就需要进行insert操作, 

## 大概的逻辑应该是这样:

```
result = mysql_operation("select * from ...")
if (result) {
mysql_operation("update ...")
} else {
mysql_operation("insert ...")
}
```

**我一直以来就是这么做的, 感觉没有什么问题, 但是今天学习了一个新的方法, 但是这个方法时mysql的语法的特性, 并不是SQL的标准语法, 请大家知晓**

## 优化

那我们有什么优化的空间呢? 就是通过on duplicate key update 来进行操作, 那我们先来看看原来的操作有什么问题呢?

原来的弊端: 

1. 我们每次操作, 都需要执行连个sql, 要么是select以后进行update, 就是select以后进行insert
2. 如果搞并发情况下, 数据可能就会出问题了, 不能保证原子性, (其实你也可以以通过mysql的事物来实现原子操作)

那on duplicate key update是如何帮助我们达到目的的呢?

on duplicate key update, 通过向数据库中插入一条记录: 若该数据的主键值/UNIQUE KEY 已经在表中存在, 则执行跟新操作, 即update操作, 否则, 就是插入一条新的数据, 原来三部解决的事情, 现在一步就能到位, 真真是极好的啊!



## 如何是实现呢?

我们来时直接来看mybatis的sql语句吧

```sql
<insert id="initOrUpdateRecord" parameterType="com.test.minevar.client.fetcher.provider.dto.JiraActiveDailyDTO"  useGeneratedKeys="true" keyProperty="id">
    INSERT INTO `t_jira_active_daily`
    <trim prefix="(" suffix=")" suffixOverrides=",">
      `alm_id`,
      `record_date`,
      `begin_time`,
      `active_num`,
      `create_by`,
      `create_time`,
      `update_by`,
      `update_time`,
       `flag`
    </trim>
     VALUES
    <trim prefix="(" suffix=")" suffixOverrides=",">
      #{almId, jdbcType=VARCHAR},
      #{recordDate,jdbcType=VARCHAR},
      #{beginTime, jdbcType=VARCHAR},
      #{activeNum,jdbcType=INTEGER},
      #{createBy, jdbcType=VARCHAR},
      #{createTime,jdbcType=TIMESTAMP},
      #{updateBy, jdbcType=VARCHAR},
      #{updateTime,jdbcType=TIMESTAMP},
      #{flag, jdbcType=VARCHAR}
    </trim>
    ON DUPLICATE KEY UPDATE
    `active_num`=`active_num`+1,
    `update_by`=VALUES(`update_by`),
    `update_time`=VALUES(`update_time`)
  </insert>
 
```

上面的字段, 我们要特殊解释一下: 

```
`active_num`=`active_num`+1,  // 直接把库里的值+1, active_num就是代表可以直接取到数据库中的值
`update_by`=VALUES(`update_by`), // 从插入的值里面获取到，然后更新到新的列里面
`update_time`=VALUES(`update_time`) // 从插入的值里面获取到，然后更新到新的列里面
```

其实我们只需要在我们的insert语句后面加上 on duplicate key update, 注意, 在update后面,因为我们的almId + recored_date是唯一索引, 所以是不进行更新的

on duplicate key update 会帮助我们自动判断唯一索引是否重复, 如果重复, 直接进行updae, 不重复, 就进行insert

我们注意到: on duplicate key update 后面, 就是我们的赋值情况, 还有 **`active_num`=`active_num`+1**是进行了一个+1的操作

## 一次插入多行呢?

ON DUPLICATE KEY UPDATE 特别适用于多行插入。如:

 

INSERT INTO `table` (`a`, `b`, `c`) VALUES (1, 2, 3), (4, 5, 6) ON DUPLICATE KEY UPDATE `c`=VALUES(`a`)+VALUES(`b`);



 **Tips:** VALUES()函数只在INSERT…UPDATE语句中有意义，其它时候会返回NULL。

 ***<u>VALUES(列): 表示: 从插入的值里面获取到，然后更新到新的列里面</u>***



## 若多个索引都冲突, 则只有一条记录被修改

```
create table test(
id int not null primary key,
num int not null UNIQUE key,
tid int not null
)
```


为了测试两个唯一索引都冲突的情况，然后插入下面的数据


insert into test values(1,1,1), (2,2,2);
然后执行：

insert into test values(1,2,3) on duplicate key update tid = tid + 1;
因为a和b都是唯一索引，插入的数据在两条记录上产生了冲突，然而执行后只有第一条记录被修改

即: 执行为以后, 数据库总的数据为: (1, 1, 2), (2, 2, 2), 第二条数据不变