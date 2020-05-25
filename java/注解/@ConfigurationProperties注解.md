# 读取配置文件属性

在我们的项目开发中, 很多情况下, 我们都需要从配置文件中提取配置属性, 然后进行java的开发工作.下面我们就来介绍一下我们读取配置文件时经常遇到的两个注解.

#1. @Value注解

@Value注解主要是读取单行配置文件.

@Value注解有**@Value(“${}”)**和**@Value(“#{}”)**两种方式，区别之后介绍

注意: 我们举得例子都是spring boot搭建的项目来说的

##1.1. @Value(“${}”)

我们在我们的配置文件application.properties中有如下配置:

```properties
server.port=8080
spring.datasource.userName=root
```

我们通过下面的代码示例来读取配置文件中的端口号, 我们来写一个controller吧

```java
@RestController
@RequestMapping("/test")
public class TestController {
  	@Value("${server.port}")
  	private String port;
  
		@GetMapping("/port1")
    public String getPort1(){
        return port;
    }
}
```

以上就是读取配置文件成功了.

## 1.2 @Value("#{}")

当我们把上面的代码改成如下时:

```java
@RestController
@RequestMapping("/test")
public class TestController {
  	@Value("#{server.port}")
  	private String port;
  
		@GetMapping("/testSendMsg")
    public String getPort(){
        return port;
    }
}
```

启动程序的时候居然报错了, 报错信息如下: 

org.springframework.expression.spel.SpelEvaluationException: EL1008E: Property or field ‘server’ cannot be found on object of type ‘org.springframework.beans.factory.config.BeanExpressionContext’ - maybe not public?

@Value的值有两类：
① ${ property : default_value }
② #{ obj.property? :default_value }
第一个注入的是外部配置文件对应的property.

第二个则是SpEL表达式对应的内容.

注意二者的不同，#{}里面那个obj代表对象。

既然我们知道两个差别, 我们来改进一下代码, 先准备一个实体类, 并且注册到spring中.

```java
@Component
@Data
public class TestBean implentments Serializable {
  @Value("${server.port}")
  private String port;
  
}
```

这个时候我们在使用@Value("#{}"), 代码如下:

```java
@RestController
@RequestMapping("/test")
public class TestController {
  	@Value("#{testBean.port}")
  	private String port;
  
		@GetMapping("/port2")
    public String getPort2(){
        return port;
    }
}
```



#2. @ConfigurationProperties 注解

在我们的项目开发中, 很多情况要求配置模块化, java使用最多的对象就是类, 所以我们通常是把配置属性自动转换成java类, 就可以直接使用了.

##2.1 @ConfigurationProperties的用法

示例:

application.properties文件如下:

```properties
myapp.userName=stromling
myapp.password=123456
myapp.hostName=127.0.0.1
myapp.port=6666
```

对应的java类

```java
@Data
@Component
@ConfigurationProperties(prefix = "myapp", ignoreInvalidFields=true)
public classs Config {
  	private String userName;
  	private String password;
  	private String hostName;
  	private Integer port;
}
```



其中, prefix代表的是配置文件中的前缀, 就比如我们上边统一的前缀是myapp, prefix就是统一的前缀

ignoreInvalidFields: 忽略无效的字段. 当属性中的值不能被正确解析, 就会发生报错, 如果我们不想在转换或者启动的时候报错, 我们可以设置 `ignoreInvalidFields` 属性为 true (默认为 false), 就可以解决这个问题.



@ConfigurationProperties的用法很简单, 我们根据配置中的属性, 创建对象并字段和属性一一对应即可.但是请注意一下几点: 

- 前缀定义了哪些外部属性将绑定到类的字段上
- 根据 Spring Boot 宽松的绑定规则，类的属性名称必须与外部属性的名称匹配
- 我们可以简单地用一个值初始化一个字段来定义一个默认值
- 类本身可以是包私有的
- 类的字段必须有公共 setter 方法

## 2.2 spring的宽松绑定规则(relaxed binding)

因为我们java字段的命名规则都是通过驼峰的形式进行命名的, 以下列举的都可以绑定:

将注解@ConfigurationProperties(prefix="my")中的前缀“my”与MyProperties类的属性firstName可能存在的情况进行穷举（共28种情况，如下表）

```properties
0	my.first-name
1	my_first-name
2	my.first_name
3	my_first_name
4	my.firstName
5	my_firstName
6	my.firstname
7	my_firstname
8	my.FIRST-NAME
9	my_FIRST-NAME
10	my.FIRST_NAME
11	my_FIRST_NAME
12	my.FIRSTNAME
13	my_FIRSTNAME
14	MY.first-name
15	MY_first-name
16	MY.first_name
17	MY_first_name
18	MY.firstName
19	MY_firstName
20	MY.firstname
21	MY_firstname
22	MY.FIRST-NAME
23	MY_FIRST-NAME
24	MY.FIRST_NAME
25	MY_FIRST_NAME
26	MY.FIRSTNAME
27	MY_FIRSTNAME
```

## 2.3 复杂类型

list和set

application.properties

```properties
myapp.server[0]=127.0.0.1
myapp.server[1]=1.1.1.1
```

application.yml

```yml
myapp:
	server:
		- 127.0.0.1
		- 1.1.1.1
```



