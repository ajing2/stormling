# mongodb的聚合操作

# 1. 什么是聚合

聚合是MongoDB的高级查询语言，它允许我们通过转化合并由多个文档的数据来生成新的在单个文档里不存在的文档信息。MongoDB中聚合(aggregate)主要用于处理数据(诸如统计平均值，求和等)，并返回计算后的数据结果，有点类似sql语句中的 count(*)。

在MongoDB中，有两种方式计算聚合：**Pipeline 和 MapReduce**。Pipeline查询速度快于MapReduce，但是MapReduce的强大之处在于能够在多台Server上并行执行复杂的聚合逻辑。MongoDB不允许Pipeline的单个聚合操作占用过多的系统内存。

# 2. mongodb的聚合语法

```
>db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
```

# 3. mongodb的聚合示例

集合中的数据如下:

```
{
  _id: ObjectId(7df78ad8902c)
   title: 'MongoDB Overview', 
   description: 'MongoDB is no sql database',
   by_user: 'runoob.com',
   url: 'http://www.runoob.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 100
},
{
   _id: ObjectId(7df78ad8902d)
   title: 'NoSQL Overview', 
   description: 'No sql database is very fast',
   by_user: 'runoob.com',
   url: 'http://www.runoob.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 10
},
{
   _id: ObjectId(7df78ad8902e)
   title: 'Neo4j Overview', 
   description: 'Neo4j is no sql database',
   by_user: 'Neo4j',
   url: 'http://www.neo4j.com',
   tags: ['neo4j', 'database', 'NoSQL'],
   likes: 750
}
```

现在我们通过以上集合计算每个作者所写的文章数，使用aggregate()计算结果如下：

```
> db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}])
{
   "result" : [
      {
         "_id" : "runoob.com",
         "num_tutorial" : 2
      },
      {
         "_id" : "Neo4j",
         "num_tutorial" : 1
      }
   ],
   "ok" : 1
}
>
```

以上实例类似sql语句：

```
 select by_user, count(*) from mycol group by by_user
```

# 4. mongodb的聚合表达式

| 表达式    |                      描述                      |                             实例                             |
| --------- | :--------------------------------------------: | :----------------------------------------------------------: |
| $sum      |                   计算总和。                   | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}]) |
| $avg      |                   计算平均值                   | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}]) |
| $min      |       获取集合中所有文档对应值得最小值。       | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}]) |
| $max      |       获取集合中所有文档对应值得最大值。       | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}]) |
| $push     |        在结果文档中插入值到一个数组中。        | db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}]) |
| $addToSet | 在结果文档中插入值到一个数组中，但不创建副本。 | db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}]) |
| $first    |     根据资源文档的排序获取第一个文档数据。     | db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}]) |
| $last     |     根据资源文档的排序获取最后一个文档数据     | db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}]) |

# 5. mongodb的管道

管道在Unix和Linux中一般用于将当前命令的输出结果作为下一个命令的参数。

MongoDB的聚合管道将MongoDB文档在一个管道处理完毕后将结果传递给下一个管道处理。管道操作是可以重复的。

表达式：处理输入文档并输出。表达式是无状态的，只能用于计算当前聚合管道的文档，不能处理其它的文档。

这里我们介绍一下聚合框架中常用的几个操作：

| 常用管道 | 含义                                                         |
| :------- | :----------------------------------------------------------- |
| $project | 修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。 |
| $match   | 用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。 |
| $limit   | 用来限制MongoDB聚合管道返回的文档数。                        |
| $skip    | 在聚合管道中跳过指定数量的文档，并返回余下的文档。           |
| $unwind  | 将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。 |
| $group   | 将集合中的文档分组，可用于统计结果。                         |
| $sort    | 将输入文档排序后输出。                                       |
| $geoNear | 输出接近某一地理位置的有序文档。                             |

# 6. 使用MongoTemplate操作Aggregation

```
    Aggregation agg = Aggregation.newAggregation(    
            Aggregation.match(criteria),//条件  
            Aggregation.group("a","b","c","d","e").count().as("f"),//分组字段    
            Aggregation.sort(sort),//排序  
            Aggregation.skip(page.getFirstResult()),//过滤  
            Aggregation.limit(pageSize)//页数  
         );    
    AggregationResults<Test> outputType=mongoTemplate.aggregate(agg,"test",Test.class);    
    List<Test> list=outputType.getMappedResults(); 
```

shell命令:

```
    db.getCollection('test').aggregate( [  
                                         { $match : { score : { $gt : 70, $lte : 90 } } },  
                                         { $group: { _id: null, count: { $sum: 1 } } },  
                                         { $sort:a},  
                                         { $skip:10},  
                                         { $limit:10}  
                                         ] ); 
```

类似sql:

```
select a,b,c,count(1) from test where ... group by (...)
```

