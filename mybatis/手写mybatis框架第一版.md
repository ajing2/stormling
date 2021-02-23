# 手写mybatis框架第一版

# 1. 先来一些思考

如果说让我们手写一个中间件，我们应该会有哪些考量呢？下面是我的一些思考

1. 业内是否有成熟的东西是否可以借鉴。
2. 要适配大家最基础的使用规范和使用规则
3. 我们应该尽量的减少业务开发人员的代码， 通用的代码功能可以抽象出来， 提取成公共的方式使用
4. 简单好用， 接入也要简单， 最好是有傻瓜式的操作。

等等吧， 其实还有好多， 比如稳定性，扩展性等。

那如果让我们来手下一个mybatis的框架， 我们应该如何做嗯？如果能手写出来， 那就是贴近源码， 或者源码要比我们考虑的更加全面

# 2. 从jdbc入手

jdbc想必大家都用过，没用过也应该听说过， 说白了就是一个非常底层的一个链接数据的工具， 那我们是否可以在jdbc的基础上记性改造呢？

我们先来看看使用jdbc来连接mysql的代码:

```java
package com.ajing;

import org.junit.Test;

import java.sql.*;

public class JdbcDemo {
    /**
     * 数据库驱动
     */
    private final String DRIVER = "com.mysql.jdbc.Driver";

    /**
     * 数据库连接url
     */
    private final String URL = "jdbc:mysql://localhost:3306/mybatis?characterEncoding=utf-8";

    /**
     * 数据库连接用户名
     */
    private final String USER = "root";

    /**
     * 数据库连接密码
     */
    private final String PASSWORD = "123456";

    @Test
    public void test() {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet rs = null;

        try {
            // 加载数据库驱动
            Class.forName(DRIVER);

            // 通过驱动管理类获取数据库链接
            connection = DriverManager.getConnection(URL, USER, PASSWORD);

            // 定义sql语句 ？表示占位符
            String sql = "select * from t_user where name = ?";

            // 获取预处理statement
            preparedStatement = connection.prepareStatement(sql);

            // 设置参数， 第一个参数为sql语句中参数的序号（从1开始）， 第二个参数为设置的
            preparedStatement.setString(1, "张三");

            // 向数据库发送sql执行请求， 查询出结果
            rs = preparedStatement.executeQuery();

            // 遍历出查询的结果
            while (rs.next()) {
                System.out.println(rs.getString("id")  + " " + rs.getString("name"));
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 释放资源
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (preparedStatement != null) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                }
            }
        }
    }
}
```

结果：

```
1 张三
```



# 3. 思考如何从jdbc到mybatis

我们先来想mybatis的最终本质其实就是把对应的接口， 通过动态代理， 找到对应的mapper.xml， 最终转换成sql语句进行执行。 

那jdbc有哪些硬伤呢？ 

1. 关于所有的数据库驱动， URL, 用户名， 密码都是定义在代码中的， 如果有修改， 我们就需要修改代码
2. sql语句不够灵活， 参数如何保证顺序性
3. 入参和出参如何保证能自动实现

针对以上的一下思考， 我们其实可以做一些如下的优化：

>
>
>1. 所有数据库的配置， 我们可以放在配置文件中
>2. 针对负载的sql语句， 其实我们是可以通过动态代理来解析sql的，我们暂时不做考虑， 先把sql定义在配置文件中
>3. 针对入参和出参， 我们可以定义泛型， 通过反射的机制， 获取类的值和属性.（获取类的属性比较麻烦， 我们暂且都定义在配置文件中）

好啊， 那我们的第一版本其实就主要实现这些功能， 解决这些问题， 一步步的来实现mybatis的框架。



# 4. 代码实现

代码地址： 

配置文件

jdbc.properties

```
db.driver = com.mysql.jdbc.Driver
db.url = jdbc:mysql://localhost:3306/mybatis?characterEncoding=utf-8
db.user = root
db.password = 123456
db.sql.queryUserById = select * from t_user where name = ? and age = ?
db.sql.queryUserById.resultClassName = com.ajing.po.UserPO
db.sql.queryUserById.paramesClassName = com.ajing.vo.UserVO
db.sql.queryUserById.parames = name, age
```

参数输入类：

```
package com.ajing.vo;

public class UserVO {
    private Integer id;
    private String name;
    private Integer age;
    private String address;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
```



输出类

```
package com.ajing.po;

public class UserPO {
    private Integer id;
    private String name;
    private Integer age;
    private String address;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}

```





>
>
>代码主要实现的思路：
>
>1. 先加载配置文件
>2. 通过反射， 把入参的值放入到map中
>3. 通过反射， 把jdbc查询到的结果映射到出参的数据类型中



下面是主要的版本：

```java
package com.ajing;

import com.ajing.po.UserPO;
import com.ajing.vo.UserVO;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.sql.*;
import java.util.*;

/**
 * @author 故事凌
 */
public class MybatisV1 {


    /**
     * 数据库驱动
     */
    private final String DRIVER = "com.mysql.jdbc.Driver";

    /**
     * 数据库连接url
     */
    private final String URL = "jdbc:mysql://localhost:3306/mybatis?characterEncoding=utf-8";

    /**
     * 数据库连接用户名
     */
    private final String USER = "root";

    /**
     * 数据库连接密码
     */
    private final String PASSWORD = "123456";


    private Properties properties = new Properties();

    @Test
    public void test() {
        // 加载properties配置文件
        loadProperties("jdbc.properties");
        UserVO userVO = new UserVO();
        userVO.setName("张三");
        userVO.setAge(18);

        // 反射生成入参
         Map<String, Object> params = getParams("queryUserById", userVO);
         if (null != params) {
             // 反射生产出参
            List<UserPO> users = selectList("queryUserById", params);
             System.out.println(users);
             System.out.println("id = " + users.get(0).getId());
             System.out.println("name = " + users.get(0).getName());
             System.out.println("age = " + users.get(0).getAge());
             System.out.println("address = " + users.get(0).getAddress());
         }

    }

    /**
     * 反射得出查询结果
     */
    private <T> List<T> selectList(String statementId, Map<String, Object> maps) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet rs = null;

        List<T> results = new ArrayList<>();

        try {
            // 加载数据库驱动
            Class.forName(DRIVER);

            // 通过驱动管理类获取数据库链接
            connection = DriverManager.getConnection(URL, USER, PASSWORD);

            // 定义sql语句 ？表示占位符
            String sql = properties.getProperty("db.sql." + statementId);

            // 获取预处理statement
            preparedStatement = connection.prepareStatement(sql);


            String[] ps = properties.getProperty("db.sql." + statementId + ".parames").split(",");

            // 设置参数， 第一个参数为sql语句中参数的序号（从1开始）， 第二个参数为设置的
            // 循环设置参数
            for (int i = 0; i < ps.length; i++) {
                Object value = maps.get(ps[i].trim());
                preparedStatement.setObject(i + 1, value);
            }

            // 向数据库发送sql执行请求， 查询出结果
            rs = preparedStatement.executeQuery();


            // 遍历查询结果
            String resultClassName = properties.getProperty("db.sql." + statementId + ".resultClassName");
            Class<?> clazz = Class.forName(resultClassName);


            // 遍历出查询的结果
            while (rs.next()) {
                // 反射创建映射结果对象
                Object res = clazz.newInstance();

                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();
                for (int i = 1; i <= columnCount; i++) {
                    // 获取的结果集中列的名称
                    String columnName = metaData.getColumnName(i);
                    // 列的名称和属性的名称必须一致
                    Field field = clazz.getDeclaredField(columnName);
                    field.setAccessible(true);
                    field.set(res, rs.getObject(i));
                }
                results.add((T)res);
            }
            return results;

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 释放资源
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (preparedStatement != null) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                }
            }
        }

        return null;

    }


    /**
     * 通过反射获取入参
     */
    private Map<String, Object> getParams(String statementId, UserVO userVO) {
        // 入参
        String paramesClassName = properties.getProperty("db.sql." + statementId + ".paramesClassName");
        String[] params = properties.getProperty("db.sql." + statementId + ".parames").split(",");
        Map<String, Object> map = new HashMap<>();

        try {
            Class<?> clazz = Class.forName(paramesClassName);
            for (int i = 0; i< params.length; i++) {
                // 实现驼峰， 通过get方法获取到值
                String methModName = "get" + params[i].trim().substring(0, 1).toUpperCase() + params[i].trim().substring(1);
                Method method = clazz.getDeclaredMethod(methModName);
                Object value = method.invoke(userVO);
                map.put(params[i].trim(), value);
            }
            return map;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 加载jdbc的配置文件
     * @param file
     */
    private void loadProperties(String file) {
        InputStream inputStream = null;
        try {
            inputStream = this.getClass().getClassLoader().getResourceAsStream(file);
            properties.load(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 释放流
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

}

```

执行结果：

```
[com.ajing.po.UserPO@270421f5]
id = 1
name = 张三
age = 18
address = 北京
```

