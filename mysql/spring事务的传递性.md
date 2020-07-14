spring事务的传递性

# 1. 概念介绍

**本地事务**

数据库事务， 默认事务为自动提交， 因此如果一个业务逻辑类中有多次数据库操作将无法保证事务的一致性。

**spring事务**

对本地事务操作的一次封装， 相当于把使用jdbc代码开启， 提交， 回滚事务进行了封装。



# 2. spring事务的传递性介绍

事务传播行为， 所谓事务的传播行为是指， 如果在开始当前事务之前， 一个事物上线文已经存在， 此时有若干选项可以指定一个事物性方法的执行行为。 在TransactionDefinition定义中包括了如下几个标识传播行为的常量：

TranscationDefinition.PROPAGATION_REQUIRED: 如果当前存在事务， 则加入该事务；如果当前没有事务， 则创建一个新的事务

TranscationDefinition.PROPAGATION_REQUIRES_NEW：创建一个新的事务， 如果当前存在事务， 则把当前事务挂起。

TranscationDefiniton.PROPAGATION_SUPPORTS： 如果当前存在事务， 则加入该事务； 如果当前没有事务， 则以非事务的方式继续运行。

TransactionDefinition.PROPAGATION_NOT_SUPPORTED: 以非事务方式运行， 如果当前存在事务， 则把当前事务挂起。

TransactionDefinition.PROPAGATION_NEVER: 以非事务方式运行， 如果当前存在事务， 则抛出异常。

TransactionDefinition.PROPAGATIOIN_MANDATORY：如果当前存在事务， 则加入该事务； 如果当前没有事务， 则抛出异常。

TransactionDefinition.PROPAGATION_NESTED：如果当前存在事务， 则创建一个事务作为当前事务的嵌套事务来运行， 如果当前没有事务， 则该取值等价TransactionDefinition.PROPAGATION_REQUIRED。



这里需要指出的是， 前面的六种事务传播行为是Spring从EJB中引入的， 他们共享相同的概念。 而PROPAGATION_NESTED是Spring所特有的。 以PROPAGATION_NESTED启动的事务内嵌于外部事务中（如果存在外部事务的话）， 此时，内嵌事务并不是一个独立的事务，它依赖于外部事务的存在，只有通过外部的事务提交，才能引起内部事务的提交，嵌套的子事务不能单独提交。如果熟悉 JDBC 中的保存点（SavePoint）的概念，那嵌套事务就很容易理解了，其实嵌套的子事务就是保存点的一个应用，一个事务中可以包括多个保存点，每一个嵌套子事务。另外，外部事务的回滚也会导致嵌套子事务的回滚。



# 3. 示例

原始数据：

| id   | name | catalog | description |
| ---- | ---- | ------- | ----------- |
| 2    | name | catalog | Null        |



## 1. 正常情况

调用方为Conumer,  调用ServiceA的methodA， methodA调用ServiceA的 methodB和ServiceA的methodC。

```java
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void modifyCommodityInfo(Commodity commodity) {
        updateCommodityCatalog1(commodity);
        updateCommodityCatalog2(commodity);
    }
 
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private void updateCommodityCatalog1(Commodity commodity) {
        commodity.setCatalog("catalog222222222");
        commodityDao.updateCommodity(commodity);
    }
 
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private void updateCommodityCatalog2(Commodity commodity) {
        commodity.setName("name222");
        commodityDao.updateCommodity(commodity);
    }
```

运行结果：

| id   | name    | catalog          | description |
| ---- | ------- | ---------------- | ----------- |
| 2    | name222 | catalog222222222 | Null        |

说明全部正常执行， 全部成功了。



## 2. 事务中一个方法抛出异常

```java
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void modifyCommodityInfo(Commodity commodity) {
        updateCommodityCatalog1(commodity);
        updateCommodityCatalog2(commodity);
    }
 
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private void updateCommodityCatalog1(Commodity commodity) {
        commodity.setCatalog("catalog222222222");
        commodityDao.updateCommodity(commodity);
    }
 
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private void updateCommodityCatalog2(Commodity commodity) {
        commodity.setName("name222");
        commodityDao.updateCommodity(commodity);
        throw new RuntimeException("222");
    }
```

运行结果：

| id   | name | catalog | description |
| ---- | ---- | ------- | ----------- |
| 2    | name | catalog | Null        |

结果没有发生变化， 说明整个事务有异常， 全部事务回滚



## 3. 捕获异常的情况

```java
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void modifyCommodityInfo(Commodity commodity) {
        updateCommodityCatalog1(commodity);
        try {
            updateCommodityCatalog2(commodity);
        } catch (Exception e) {
            
        }
       
    }
 
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private void updateCommodityCatalog1(Commodity commodity) {
        commodity.setCatalog("catalog222222222");
        commodityDao.updateCommodity(commodity);
    }
 
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private void updateCommodityCatalog2(Commodity commodity) {
        commodity.setName("name222");
        commodityDao.updateCommodity(commodity);
        throw new RuntimeException("222");
    }
```

运行结果：

| id   | name    | catalog          | description |
| ---- | ------- | ---------------- | ----------- |
| 2    | name222 | catalog222222222 | Null        |

说明程序正常执行， 并捕获到了异常， 但是数据库更新了



## 4. 跨服务事务

ServiceA的methodA 调用 ServiceA的methodB和ServiceA的methodC和ServiceB的methodD，代码如下：

```java
 @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void modifyCommodityInfo(Commodity commodity) {
        updateCommodityCatalog1(commodity);
        updateCommodityCatalog2(commodity);
        updateCommodityCatalog3(commodity);
    }
 
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private void updateCommodityCatalog1(Commodity commodity) {
        commodity.setCatalog("catalog222222222");
        commodityDao.updateCommodity(commodity);
    }
 
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private void updateCommodityCatalog2(Commodity commodity) {
        commodity.setName("name222");
        commodityDao.updateCommodity(commodity);
    }
    
    //另一个Service InnerService的方法
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void updateCommodityCatalog3(Commodity commodity) {
        commodity.setDescription("desc333");
        commodityDao.updateCommodity(commodity);
        throw new RuntimeException("333");
    }
```

运行结果：

| id   | name | catalog | description |
| ---- | ---- | ------- | ----------- |
| 2    | name | catalog | Null        |

假设MethodD抛出异常，则Consumer调用MethodA会发生怎样的情形？ 
    发现Consumer调用MethodA的时候出现了运行时异常,UnexpectedRollbackException: “Transaction rolled back because it has been marked as rollback-only”。这是为什么呢？

网上搜索了下，终于发现了一个合理的解释。当MethodA调用MethodD的时候，且两个方法都为required属性，根据事务传播级别，则methodA和methodD共享一个事务，当methodD抛出了异常，则共享事务回滚，但是被MethodA catch了，而MethodA又没有及时抛出异常，则MethodA正常执行到最后的时候，则会做提交事务的操作，但是事务已经被回滚了，所以才出现了上面的异常。



 既然这样，小弟就开始YY了一下，哪些情况会使调用方没有这个异常呢？经过与小伙伴们的思维碰撞，发现有以下几个方法。

   1) MethodA 不加事务，所以执行到最后就不会commit，SUPPORTS和NOT_SUPPORTED都可以实现这种功能。

   2) MethodD设置不共享事务，拥有自己单独的事务。验证发现，REQUIRES_NEW可以实现这种功能。



## 5. 跨服务事务抛异常

```
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void modifyCommodityInfo(Commodity commodity) {
        updateCommodityCatalog1(commodity);
        updateCommodityCatalog2(commodity);
        try {
	    commodityInnerService.updateCommodityCatalog3(commodity);
        } catch (Exception e) {
        }
    }
 
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private void updateCommodityCatalog1(Commodity commodity) {
        commodity.setCatalog("catalog222222222");
        commodityDao.updateCommodity(commodity);
    }
 
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private void updateCommodityCatalog2(Commodity commodity) {
        commodity.setName("name222");
        commodityDao.updateCommodity(commodity);
    }
    
    //另一个Service InnerService的方法
    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void updateCommodityCatalog3(Commodity commodity) {
        commodity.setDescription("desc333");
        commodityDao.updateCommodity(commodity);
        throw new RuntimeException("333");
    }
```



运行结果：

| id   | name    | catalog          | description |
| ---- | ------- | ---------------- | ----------- |
| 2    | name222 | catalog222222222 | Null        |

然后又YY了下，既然一个回滚的事务不能提交了，那么这个回滚的事务可以重复回滚吗？



## 6. 跨事务

ServiceA的methodA 调用 ServiceA的methodB和ServiceA的methodC和ServiceB的methodD和ServiceB的methodE。代码如下：

```
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void modifyCommodityInfo(Commodity commodity) {
        updateCommodityCatalog1(commodity);
        updateCommodityCatalog2(commodity);
        try {
	    ommodityInnerService.updateCommodityCatalog3(commodity);
        } catch (Exception e) {
        }
         try {
	    commodityInnerService.updateCommodityCatalog4(commodity);
        } catch (Exception e) {
        }
    }
 
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private void updateCommodityCatalog1(Commodity commodity) {
        commodity.setCatalog("catalog222222222");
        commodityDao.updateCommodity(commodity);
    }
 
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    private void updateCommodityCatalog2(Commodity commodity) {
        commodity.setName("name222");
        commodityDao.updateCommodity(commodity);
    }
    
    //另一个Service InnerService的方法
    @Transactional(propagation = Propagation.REQUIRES, rollbackFor = Exception.class)
    public void updateCommodityCatalog3(Commodity commodity) {
        commodity.setDescription("desc333");
        commodityDao.updateCommodity(commodity);
        throw new RuntimeException("333");
    }
    
     //另一个Service InnerService的方法
    @Transactional(propagation = Propagation.REQUIRES, rollbackFor = Exception.class)
    public void updateCommodityCatalog4(Commodity commodity) {
        commodity.setDescription("desc333");
        commodityDao.updateCommodity(commodity);
        throw new RuntimeException("333");
    }
```



运行结果：

   发现还是只抛出了一个Transaction rolled back because it has been marked as rollback-only

所以猜测一个被共享的事务抛出多个异常的时候只是标记下rollback-only，而在方法结束的时候判断是执行事务还是回滚事务。

 

   总结：

    1） 单个ServiceA 内部调用不存在事务传播，相当于把methodB和methodC的代码嵌套到methodA的代码中，即使定义了也无法生效。
    
    2） 跨Service调用存在事务传播级别，需要考虑共享事务，还是新事务调用，即跨Service的调用是否需要需要回滚本Servcie的代码。
