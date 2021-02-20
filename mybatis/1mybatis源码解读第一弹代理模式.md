# mybatis源码解读， 动态代理

**先提个问题**

我们在使用mybatis的时候， 经常是写一个Dao接口， 然后写一个对应的mapper文件， 和Dao类中的函数名一一对应上， 就完事了。

而Dao只是一个接口， mapper只是一个xml文件， 最后肯定是会转换为sql语句执行的。那mybatis又是如何实现每一个Dao接口， 最终去执行xml文件呢？其实mybatis就是通过动态代理帮助我们实现的sql语句。那到底什么才是代理模式呢？ 我们先来了解一下代理模式。

# 1. 设计模式

其实代理模式是23种设计模式的其中一种， 我们先来看一下设计模式都有哪些：

总体来说， 设计模式分为三类23种：

创建型： 工厂模式， 抽象工厂模式， 单例模式， 原型模式， 构建者模式

结构型： 适配器模式， 代理模式， 装饰模式， 外观模式， 桥接模式， 组合模式， 享元模式

行为型： 模板方法模式， 策略模式， 观察者模式， 中介者模式， 状态模式， 责任链模式， 命令模式， 迭代器模式， 访问者模式， 解释器模式， 备忘录模式



# 2. 代理模式

代理模式， 通俗一些， 就是并不是真正自己直接干活， 中间有一个proxy， 会帮助我们去干活。

代理模式中又分为： 静态代理和动态代理

而动态代理又分为两个：

1. 通过接口的方式实现 --->JDK动态代理（JDK内部自带的， 即使JDK升级， 也不会有什么影响和改动）
2. 通过继承类的方式实现 --->CGLIB动态代理（需要引入CGLIB的jar包）

# 3. 静态代理

我们先来看个简单的例子:

```java
package com.example.demo.proxy;

public interface UserService {
    void select();
    void update();
}
```

```
package com.example.demo.proxy;

public class UserServivceimpl implements UserService {
    @Override
    public void select() {
        System.out.println("select");
    }

    @Override
    public void update() {
        System.out.println("update");
    }
}
```



现在我们要对UserServiceImpl的功能进行增强， 在方法调用的前后增加时间日志， 我们来写一个UserServiceProxy

```java
package com.example.demo.proxy;

import java.util.Date;

public class UserServiceProxy implements UserService {
    private UserService userService;

    public UserServiceProxy(UserService userService) {
        this.userService = userService;
    }
    @Override
    public void select() {
        before();
        userService.select();
        after();
    }

    @Override
    public void update() {
        before();
        userService.update();
        after();
    }

    private void before() {
        System.out.println("---start---: " + new Date());
    }

    private void after() {
        System.out.println("---end---: " + new Date());
    }
}
```

编写测试类：

```java
package com.example.demo.proxy;

public class Test {
    public static void main(String[] args) {
        UserServivceimpl userServivceimpl = new UserServivceimpl();
        UserServiceProxy userServiceProxy = new UserServiceProxy(userServivceimpl);
        userServiceProxy.select();
        userServiceProxy.update();

    }
}
```

输出结果：

```
---start---: Sat Feb 20 12:20:09 CST 2021
select
---end---: Sat Feb 20 12:20:09 CST 2021
---start---: Sat Feb 20 12:20:09 CST 2021
update
---end---: Sat Feb 20 12:20:09 CST 2021
```

通过静态代理， 我们达到了增强功能的目的， 没有侵入源代码， 这个是静态代理模式的优点。但是它的缺点也特别的明显:

>
>
>静态代理模式的缺点：
>
>1. 当需要代理多个类的时候， 就需要为每个代理类新建一个代理对象， 要写很多的代码
>2. 当接口中需要增加， 删除， 修改的时候， 目标对象和代理对象都需要修改， 可维护性差。



那有没有什么改进方案呢? 当然有了， 就是我们的动态代理。



# 4. 类如何动态生成呢？

类如何动态生成呢？ 这个我就设计到java虚拟机的类加载机制， 推荐翻看《深入理解java虚拟机》7.3节类加载过程。

Java虚拟机类加载过程主要分为五个阶段：加载、验证、准备、解析、初始化。其中加载阶段需要完成以下3件事情：

1. 通过一个类的全限定名来获取定义此类的二进制字节流
2. 将这个字节流所代表的静态存储结构转化为方法区的运行时数据结构
3. 在内存中生成一个代表这个类的 `java.lang.Class` 对象，作为方法区这个类的各种数据访问入口

由于虚拟机规范对这3点要求并不具体，所以实际的实现是非常灵活的，关于第1点，**获取类的二进制字节流**（class字节码）就有很多途径：

- 从ZIP包获取，这是JAR、EAR、WAR等格式的基础
- 从网络中获取，典型的应用是 Applet
- **运行时计算生成**，这种场景使用最多的是动态代理技术，在 java.lang.reflect.Proxy 类中，就是用了ProxyGenerator.generateProxyClass 来为特定接口生成形式为 `*$Proxy` 的代理类的二进制字节流
- 由其它文件生成，典型应用是JSP，即由JSP文件生成对应的Class类
- 从数据库中获取等等

所以，动态代理就是想办法，根据接口或目标对象，计算出代理类的字节码，然后再加载到JVM中使用。但是如何计算？如何生成？情况也许比想象的复杂得多，我们需要借助现有的方案。

## 常见的字节码操作类库

> 这里有一些介绍：https://java-source.net/open-source/bytecode-libraries
>
> - Apache BCEL (Byte Code Engineering Library)：是Java classworking广泛使用的一种框架，它可以深入到JVM汇编语言进行类操作的细节。
> - ObjectWeb ASM：是一个Java字节码操作框架。它可以用于直接以二进制形式动态生成stub根类或其他代理类，或者在加载时动态修改类。
> - CGLIB(Code Generation Library)：是一个功能强大，高性能和高质量的代码生成库，用于扩展JAVA类并在运行时实现接口。
> - Javassist：是Java的加载时反射系统，它是一个用于在Java中编辑字节码的类库; 它使Java程序能够在运行时定义新类，并在JVM加载之前修改类文件。
> - ...

# 5. 动态代理

## 1. JDK动态代理

jdk动态代理， 是JDK中自带的类， 不需要依赖其他jar包， jdk升级也不会有什么影响

JDK动态代理主要涉及两个类：`java.lang.reflect.Proxy` 和 `java.lang.reflect.InvocationHandler`，我们仍然通过案例来学习

UserServiceHandler类主要是来增强原类中需要增强的方法

```
package com.example.demo.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.util.Date;

public class UserServiceHandler implements InvocationHandler {
    // 被代理的对象，实际的方法执行者
    Object target;

    public UserServiceHandler(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        before();
        // 调用 target 的 method 方法
        Object result = method.invoke(target, args);
        after();
        return result;
    }

    private void before() {
        System.out.println("--handler--start---: " + new Date());
    }

    private void after() {
        System.out.println("--handler--end---: " + new Date());
    }
}
```



HandlerProxy类我自己的猜测是通过反射来实现我们类的字节码流， 然后进行创建对象.

```
package com.example.demo.proxy;

import java.lang.reflect.Proxy;

public class HandlerProxy {
    public static void main(String[] args) {
        UserServivceimpl userServivceimpl = new UserServivceimpl();
        // 获取对应的classLoader
        ClassLoader classLoader = userServivceimpl.getClass().getClassLoader();
        // 获取所有接口的类，这里的UserServiceImpl只实现了一个接口UserService
        Class[] interfaces = userServivceimpl.getClass().getInterfaces();

        UserServiceHandler userServiceHandler = new UserServiceHandler(userServivceimpl);
        
        /**
         * 根据上面提供的信息，创建代理对象 在这个过程中，
         * a.JDK会通过根据传入的参数信息动态地在内存中创建和.class 文件等同的字节码
         * b.然后根据相应的字节码转换成对应的class，
         * c.然后调用newInstance()创建代理实例
         */
        UserService proxy = (UserService)Proxy.newProxyInstance(classLoader, interfaces, userServiceHandler);
        proxy.select();
        proxy.update();
    }
}
```

运行结果：

```
--handler--start---: Sat Feb 20 14:27:37 CST 2021
select
--handler--end---: Sat Feb 20 14:27:37 CST 2021

--handler--start---: Sat Feb 20 14:27:37 CST 2021
update
--handler--end---: Sat Feb 20 14:27:37 CST 2021
```





## 2. CGLIB动态代理

### 1. 添加maven依赖

```maven
<!-- https://mvnrepository.com/artifact/cglib/cglib -->
<dependency>
    <groupId>cglib</groupId>
    <artifactId>cglib</artifactId>
    <version>3.3.0</version>
</dependency>

```



### 2. 创建一个UserDao类

```
package com.example.demo.proxy.cglib;

public class UserDao {
    public void select() {
        System.out.println("select");
    }

    public void update() {
        System.out.println("update");
    }
}

```

### 3. 拦截方法的回调

```
package com.example.demo.proxy.cglib;

import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;
import java.util.Date;

public class UserInterceptor implements MethodInterceptor {

    /**
     *
     * @param o 要增强的对象
     * @param method 表要是拦截的方法
     * @param objects 数组表示参数列表
     * @param methodProxy 表示对方法的代理， invokeSuper方法表示对被代理对象的调用
     * @return
     * @throws Throwable
     */
    @Override
    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        before();
        // 注意这里是调用 invokeSuper 而不是 invoke，否则死循环，methodProxy.invokesuper执行的是原始类的方法，method.invoke执行的是子类的方法
        Object result = methodProxy.invokeSuper(o, objects);
        after();
        return result;
    }

    private void before() {
        System.out.println("----start---- " + new Date());
    }

    private void after() {
        System.out.println("-----end------- " + new Date());
    }
}

```

### 4. 测试

```
package com.example.demo.proxy.cglib;

import net.sf.cglib.proxy.Enhancer;

public class CglibTest {
    public static void main(String[] args) {
        UserInterceptor userInterceptor = new UserInterceptor();
        Enhancer enhancer = new Enhancer();
        // 设置超类，cglib是通过继承来实现的
        enhancer.setSuperclass(UserDao.class);
        enhancer.setCallback(userInterceptor);

        // 创建代理类
        UserDao userDao = (UserDao)enhancer.create();
        userDao.select();
        userDao.update();
    }
}

```

结果：

```
----start---- Sat Feb 20 15:20:25 CST 2021
select
-----end------- Sat Feb 20 15:20:25 CST 2021
----start---- Sat Feb 20 15:20:25 CST 2021
update
-----end------- Sat Feb 20 15:20:25 CST 2021
```



# 6. JDK动态代理和CGLIB动态代理对比

JDK动态代理：基于Java反射机制实现，必须要实现了接口的业务类才能用这种办法生成代理对象。

cglib动态代理：基于ASM机制实现，通过生成业务类的子类作为代理类。

JDK Proxy 的优势：

- 最小化依赖关系，减少依赖意味着简化开发和维护，JDK 本身的支持，可能比 cglib 更加可靠。
- 平滑进行 JDK 版本升级，而字节码类库通常需要进行更新以保证在新版 Java 上能够使用。
- 代码实现简单。

基于类似 cglib 框架的优势：

- 无需实现接口，达到代理类无侵入
- 只操作我们关心的类，而不必为其他相关类增加工作量。
- 高性能



# 7. 结束语

如果搞明白了动态代理， 并且理解其主要作用， 是不是就已经理解了mybatis中最主要的模块了， 接下来， 我们将继续进行手写一个mybatis的简单框架。

