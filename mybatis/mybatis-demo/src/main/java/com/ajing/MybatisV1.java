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
