# TK mybatis的框架使用方法

# 1. 框架配置

```maven
<dependency>
    <groupId>tk.mybatis</groupId>
    <artifactId>mapper-spring-boot-starter</artifactId>
    <version>2.0.3-beta1</version>
</dependency>
 
<dependency>
    <groupId>tk.mybatis</groupId>
    <artifactId>mapper</artifactId>
    <version>4.0.0</version>
</dependency>
```

最新版本可以看这里: https://mvnrepository.com/artifact/tk.mybatis/mapper



创建一个BaseMapper

```
public interface BaseMapper<T> extends tk.mybatis.mapper.common.BaseMapper<T>, MySqlMapper<T>, IdsMapper<T>, ConditionMapper<T>,ExampleMapper<T> {

}
```

这5个Mapper待会我会详细讲解。

创建BaseService<T>继承自BaseMapper<T>

```
public interface BaseService<T> extends BaseMapper<T> {

}
```

以及BaseService的实现类BaseServiceImpl<T> implements BaseService<T>

```
public abstract class BaseServiceImpl<T> implements BaseService<T> {

}
```

Service里需实现部分方法，详细代码在后边。

这样我们就基本完成了配置。



# 2. 类配置方法

## 1. 实体类

创建一个实体类与数据库进行映射，此时我们使用JPA的注解：

```
package com.capol.entity;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import com.capol.base.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@EqualsAndHashCode(callSuper=false)
@Table(name="t_sys_user_role")//设置数据库中表名字
public class UserRole extends BaseEntity{
	/**
		 * 主键
	 */
	@Column(name = "f_id")
	@Id
	private String fId;

	/**
		 * 用户ID
	 */
	@Column(name = "f_user_id")
	private String fUserId;


	/**
		* 用户名
	*/
	@Transient
	private String fUserName;
	
}
```

其中@Table即数据表表名，@Column即列名，@Id作为主键，需要注意，@Id注解不可有多个，@Transient即冗余字段，不与数据库任何字段对应。



## 2. Service类

这里主要是实现了上边BaseMapper中继承的5个Mapper的方法，

### tk.mybatis.mapper.common.BaseMapper<T>

中有较多方法，均需要继承实现：

```java
 /**
	 * 保存一个实体，null属性也会保存
	 * 
	 * @param record
	 * @return
	 */
	int insert(T record);
 
	/**
	 * 保存一个实体，null属性不会保存
	 * 
	 * @param record
	 * @return
	 */
	int insertSelective(T record);
 
	/**
	 * 根据实体属性作为条件进行删除，查询条件使用等号
	 */
	int delete(T record);
 
	/**
	 * 根据主键更新属性不为null的值
	 */
	int updateByPrimaryKeySelective(T record);
 
	/**
	 * 根据实体中的属性值进行查询，查询条件使用等号
	 */
	List<T> select(T record);
 
	/**
	 * 查询全部结果，select(null)方法能达到同样的效果
	 */
	List<T> selectAll();
 
	/**
	 * 根据实体中的属性进行查询，只能有一个返回值，有多个结果是抛出异常，查询条件使用等号
	 */
	T selectOne(T record);
 
	/**
	 * 根据实体中的属性查询总数，查询条件使用等号
	 */
	int selectCount(T record);
```

以上所有方法的查询条件均为实体类record中的非空属性。

### MySqlMapper<T>中的方法如下：

```java
	/**
	 * 批量插入，支持批量插入的数据库可以使用，例如MySQL,H2等，另外该接口限制实体包含`id`属性并且必须为自增列
	 */
	public int insertList(List<T> recordList);
 
	/**
	 * 插入数据，限制为实体包含`id`属性并且必须为自增列，实体配置的主键策略无效
	 */
	public int insertUseGeneratedKeys(T record);
```

这两个方法就比较坑了，限制了主键必须为自增列，如果是自己生成主键则不能使用该方法。

### IdsMapper<T>中的方法如下：

```java
 /**
	 * 根据主键@Id进行查询，多个Id以逗号,分割
	 * @param id
	 * @return
	 */
	List<T> selectByIds(String ids);
	
	/**
	 * 根据主键@Id进行删除，多个Id以逗号,分割
	 * @param id
	 * @return
	 */
	int deleteByIds(String ids);
```



这两个方法就很好理解了，不再解释。

### ConditionMapper<T>中的方法如下：

```java
 /**
	 * 根据Condition条件进行查询
	 */
	public List<T> selectByCondition(Object condition);
 
	/**
	 * 根据Condition条件进行查询
	 */
	public int selectCountByCondition(Object condition);
 
	/**
	 * 根据Condition条件删除数据，返回删除的条数
	 */
	public int deleteByCondition(Object condition);
 
	/**
	 * 根据Condition条件更新实体`record`包含的全部属性，null值会被更新，返回更新的条数
	 */
	public int updateByCondition(T record, Object condition);
 
	/**
	 * 根据Condition条件更新实体`record`包含的全部属性，null值会被更新，返回更新的条数
	 */
	public int updateByConditionSelective(T record, Object condition);
```

传入的Object condition应为tk.mybatis.mapper.entity.Condition，具体使用方法后续会说明。

### ExampleMapper<T>中的方法如下：

```
 /**
	 * 根据Example条件进行查询
	 */
	public List<T> selectByExample(Object example);
 
	/**
	 * 根据Example条件进行查询，若有多条数据则抛出异常
	 */
	public T selectOneByExample(Object example);
 
	/**
	 * 根据Example条件进行查询总数
	 */
	public int selectCountByExample(Object example);
 
	/**
	 * 根据Example条件删除数据，返回删除的条数
	 */
	public int deleteByExample(Object example);
 
	/**
	 * 根据Example条件更新实体`record`包含的全部属性，null值会被更新，返回更新的条数
	 */
	public int updateByExample(T record, Object example);
 
	/**
	 * 根据Example条件更新实体`record`包含的不是null的属性值，返回更新的条数
	 */
	public int updateByExampleSelective(T record, Object example);
```

同上，传入的Object example应为tk.mybatis.mapper.entity.Example，具体使用方法后续会说明。



## 3. 实现类

各个方法的实现大同小异，此处以一个为例：

```
public abstract class BaseServiceImpl<T> implements BaseService<T> {
 
	protected abstract BaseMapper<T> getMapper();
 
	@Override
	public int insert(T record) {
		return getMapper().insert(record);
	}
}
```

getMapper()方法需要在具体的业务代码中实现，其余不再赘述。





# 3. 使用方法

## 1、tk.mybatis.mapper.common.BaseMapper<T>, IdsMapper<T>, MySqlMapper<T>内方法使用说明：

从接口中我们可以看到传入的方法基本均为T record，即实体类，查询时会根据实体类中的属性值进行where语句构建，查询条件为等号，这里没有什么特殊的。

不过需要注意，若传入实例化的实体类，且其中包含int属性，则构建sql语句中会将该属性包含进去，如下代码：

```
@Data
@EqualsAndHashCode(callSuper=false)
@Table(name="t_sys_user_role")//设置数据库中表名字
public class UserRole extends BaseEntity{
 
	/**
	 * 主键
	 */
	@Column(name = "f_id")
	@Id
	private String fId;
	
	/**
	 * 类型（1.系统管理员）
	 */
	@Column(name = "f_type")
	private int fType;
}
 
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes=StartApp.class)
@WebAppConfiguration
public class TestService {
	
	@Autowired
	private IUserRoleService userRoleService;
 
        @Test
	public void testUserRole() throws Exception{
		UserRole userRole = new UserRole();
		List<UserRole> userRoleList = userRoleService.select(userRole);
		System.out.println(userRoleList);
	}
}
```

## 2、ExampleMapper<T>内方法使用说明：

所有方法均需要传入tk.mybatis.mapper.entity.Example，

首先进行实例化：

```
Example example = new Example(UserRole.class);//实例化
Example.Criteria criteria = example.createCriteria();
```

Criteria是Example中的一个内部类，在最终sql构建时以括号呈现，Criteria里带了较多构建查询条件的方法，如

andEqualTo(String property, Object value)，

orEqualTo(String property, Object value),

andGreaterThan(String property, Object value),

orGreaterThan(String property, Object value)

**传入的property为实体类中的属性名，非数据度字段名。**

举例说明，如orEqualTo(String property, Object value)，代码如下

```
Example example = new Example(UserRole.class);//实例化
Example.Criteria criteria = example.createCriteria();
criteria.orEqualTo("fUserId", "15693a6e509ee4819fcf0884ea4a7c9b");
criteria.orEqualTo("fUserId", "15ccaf3e89376f7b109eec94d10b7988");
List<UserRole> userRoleList = userRoleService.selectByExample(example);
```

最终的where语句则为:

( f_user_id = "15693a6e509ee4819fcf0884ea4a7c9b" or f_user_id = "15ccaf3e89376f7b109eec94d10b7988" )

其余方法同理。 

其中andCondition(String condition)方法支持手写条件，传入的字符串为最终的查询条件，如：length(f_user_id)<5

以及likeTo()的方法是不带百分号%的，需要自己对传入参数进行构建（加左like或者右like等）。

其余方法自行见源码，不再赘述。



## 3. ConditionMapper<T>内方法使用说明：

所有方法均需要传入tk.mybatis.mapper.entity.Condition，Condition实际上继承自tk.mybatis.mapper.entity.Example，

源码中只有三个方法：

```
public Condition(Class<?> entityClass) {
    super(entityClass);
}
 
public Condition(Class<?> entityClass, boolean exists) {
    super(entityClass, exists);
}
 
public Condition(Class<?> entityClass, boolean exists, boolean notNull) {
    super(entityClass, exists, notNull);
}
```



boolean exists, boolean notNull这两个参数的含义为：

若exists为true时，如果字段不存在就抛出异常，false时，如果不存在就不使用该字段的条件，

若notNull为true时，如果值为空，就会抛出异常，false时，如果为空就不使用该字段的条件

其使用方法与Example类似：

```
Condition condition = new Condition(UserRole.class);
Criteria criteria = condition.createCriteria();
criteria.orEqualTo("fUserId", "15693a6e509ee4819fcf0884ea4a7c9b");
criteria.orEqualTo("fUserId", "15ccaf3e89376f7b109eec94d10b7988");
List<UserRole> userRoleList = userRoleService.selectByCondition(condition);
```

毕竟是继承自Example。



## 4. Example.and()/or()和Condition.and()/or()方法说明：

两个都一样，我就挑一个说吧。

实例化方法跟上边略有不同：

```
Condition condition = new Condition(UserRole.class);
//Criteria criteria1 = condition.createCriteria();
Criteria criteria1 = condition.and();
```

上边说了，每个Criteria在最终结果中以括号形式展现，此时and()方法则表示 and (Criteria中的条件)，or()方法则表示 or （Criteria中的条件），默认createCriteria()等同于and()，测试结果如下：

```
2018-08-12 18:23:11.805 DEBUG 13760 --- [           main] c.c.m.UserRoleMapper.selectByCondition   : ==>  Preparing: SELECT f_id,f_user_id,f_type,f_status,f_description,f_creator_id,f_create_time,f_last_updator_id,f_last_update_time FROM t_sys_user_role WHERE ( f_user_id = ? and f_user_id = ? ) or ( f_description = ? or f_description = ? )
```

