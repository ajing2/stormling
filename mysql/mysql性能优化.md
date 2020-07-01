# mysql性能优化

# 1. 服务器层优化

## 1. 将数据保存在内存中， 保证内存读取数据

- 设置足够大的innodb_buffer_pool_size, 将数据读取到内存中。

建议innodb_buffer_poll_size设置为总内存大小的3/4或者4/5

- 怎么确定innodb_buffer_pool_size 足够大。 数据是从内存读取而不是硬盘？

innodb_buffer_pool_pages_free  为0则表示buffer pool已经被用光。

## 2. 内存预热

将磁盘数据在mysql server启动的时候， 读取到内存中。

## 3. 降低磁盘读写次数

- 对于生产环境来说， 很多日志是不需要开启的， 比如： 通用查询日志， 慢查询日志， 错误日志
- 使用足够的写入缓存innodb_log_file_size, 推荐innodb_log_file_size设置为0.25 * innodb_buffer_pool_size
- 设置合适的innodb_flush_log_at_trx_commit, 和日志落盘有关系

## 4. 提高磁盘读写

可以考虑使用ssd硬盘， 不过得考虑成本是否合适



# 2. SQL设计层面优化

具体优化方案如下：

1. 设计中建表， 一般针对于系统分析功能， 或者实时性不高的需求
2. 为减少关联查询， 创建合理的冗余字段
3. 对于子弹太多的表， 考虑拆表（比如100个字段）
4. 对于表中不经常出现的字段或者存储数据比较多的字段， 考虑拆表
5. 每张表建议都要有一个主键（主键索引）， 而且主键类型最好是int类型， 建议自增主键



# 3. sql语句优化（开发人员）

## 1. 索引优化

- 为搜索字段（where）中的条件， 排序字段， select查询列， 创建合适的索引， 不过要考虑数据的业务场景， 查询多还是增删多
- 尽量建立组合索引并注意组合索引的创建顺序， 按照顺序组织查询条件， 尽量将筛选粒度大的查询条件放到最左边
- 尽量使用覆盖索引， select语句中尽量不用使用
- order by, group by语句尽量使用索引

## 2. limit优化

- 如果预计select语句的查询结果是一条， 最好使用limit 1， 可以停止全表扫描

```
select * from user where name = 'ajing';  -- name 没有建立唯一索引

select * from user where name = 'ajing' limit 1;
```

- 处理分页会使用到limit， 当翻页到非常靠后的页面的时候， 偏移量会非常大， 这时limit的效率会非常差。 Limit offset， size； limit的优化问题， 其实是offset的问题， 它会导致mysql扫描大量不需要的行然后在抛弃掉

解决方案1： 使用order by和索引覆盖

原sql（如果film表中的记录有10020条）：

```
select film_id, description from film limit 100, 20;
select film_id, description from film limit 100000, 20;
```

优化的sql：

```
select film_id, descriptioin from film order by 主键 limit 20;
```

解决方案2： 使用子查询

```
select * from film where id >= (select id from film order by id limit 100000, 1) limit 20;
```

解决方案3： 单表分页时， 使用自增主键排序之后， 先试用where条件id>offset值， limit后面只写rows

```
select * from film where id > offset limit 20;
```

## 3. 其他优化

- 尽量不使用count(*)， 尽量使用count(主键)

> Count(*):  查询行数， 是会遍历所有的行， 所有的列
>
> count(列)： 查询指定列不为null的行数（过虑null）， 如果列可以为空， 则count(*) 不等于count(列)， 除非指定的列是非空列才会让count(\*)等于count(列)
>
> count(伪列)： 比如count(1)



- join两张表的关联字段最好都建立索引， 而且最好字段类型是一样的。

> select * from orders o left join user u on o.user_id = u.id
>
> ds
>
> Orders表中的user_id和user表中的id， 类型要一致



- where条件中尽量不要使用1=1， not in 语句（建议使用not exists）
- 不用mysql内置的函数， 因为内置函数不会建立查询缓存

> sql查询语句和查询结果都会在第一次查询只会存储到mysql的查询缓存中， 如果需要获取到查询缓存中的查询结果， 查询的sql语句必须和第一次的查询sql语句一致
>
> select * from user where brithday = now();



- 合理利用慢查询日志， explain执行计划查询， show profile查看sql执行的资源使用情况