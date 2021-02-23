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
