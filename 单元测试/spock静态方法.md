# spock静态方法单测, 初学者的痛点,耗时一天, 终于搞定

spock框架进行单元测试, 要比我们以前junit写单测方便快捷的多, spock框架是使用grovvy语言编写的, 如果没有一个很好的编码功底, 可能入门会稍微复杂一些, groovy语言有点像我们的javascript语言, 也有点像python语言, 如果你写过这些语言, 上手就非常快了, 推介大家使用spock框架来写单测.

如果你对spock框架和groovy不算太了解, 可以参考我原来写的文章, 希望对大家有帮助:

[单元测试一](https://mp.weixin.qq.com/s?__biz=MzIzNDg4NTA1MA==&tempkey=MTA1NV84TGk3S1M1MHhWLzZicEpLaFZ4eWNhTzBhZ1l4cXNnX1U2QVRmY1BBZGhNRzEwSnUtVVBhak1sOXlXVzVNWmJSVHlZWFNjMGp0c0UxazZiS1pyeE9iSXNaUm5zZVJMWDYtT0lrRjdQRkVmcTMtQy1jZmlCcWpoVTdGVVFaTjBzQTIzbndFeHlRQ1d4NnZubmQ3UWtkRVhlMUlsLXR0MktGY2wtRHFBfn4%3D&chksm=68eedb495f99525fdaa29fbca729e08de797a1563850591705c450c4be3970922fddc4b8687a#rd)

[单元测试二--groovy基本语法](https://mp.weixin.qq.com/s?__biz=MzIzNDg4NTA1MA==&tempkey=MTA1NV9aWTNOdXIvQko4YzZHWXpDaFZ4eWNhTzBhZ1l4cXNnX1U2QVRmY1BBZGhNRzEwSnUtVVBhak1sOXlXWGFRT3VXU29ZOUFBT0VNNWFDMmlFckswSWdmWUVBZzRMVGQ1eHhBOTl0bTl3VlBTME1CRHU4YjBYcEl6aEVlSEIyUTA2N0hHeXcyd0YwU0d4RkxYUmFlM2VGTGY2cDZxNHRYM1JBMDVETGdBfn4%3D&chksm=68eedb715f9952674ac37b940ec69d7f7d235ce82f88856ed7298143f112d1d8d1331d4c9c22#rd)

[单元测试三--spock框架](https://mp.weixin.qq.com/s?__biz=MzIzNDg4NTA1MA==&tempkey=MTA1NV8wZTlPUVI3ZThldUUvbEQwaFZ4eWNhTzBhZ1l4cXNnX1U2QVRmY1BBZGhNRzEwSnUtVVBhak1sOXlXVUxkNVVVVVpOWXBjMWh0b1RvVVBOZVhpbTJfYWRFQW5ySTlhUld4dWlNamhkLTE1Ukc1YnBmQV9ESTN3T1BVZ3FCejM2M25VT0U3elRCSW10UkxnMUZsRXJhMlNNVnRvY2d4VmV6Z2VPMTVBfn4%3D&chksm=68eedb7f5f995269ca4f8fd3ade6fc6d6993478fdafb1e9b7c41fa6c8c79b3c96e4757ba7e46#rd)

前面基本的知识, 大家有需要可以去脑补一下, 下面我们来说说我们的痛点吧

# 1. spock静态方法, 单测的难点

## 1. 静态方法

为什么说静态方法的单测是难点呢? 如果是经常写单测, 就明白了, 这个是最头疼的,首先我们先来说说打桩, 我们在调用静态方法的时候, 我们可能不需要进行测试静态方法的具体内容, 因为静态的方法, 应该有对应自己的单测实例, 我们只需要知道我们传进去了什么东西, 出来什么东西, 具体静态方法里面是怎么处理的, 我并不关心, 只需要把结果给我就好了.但是单测的核心是什么, 不管你任何环境, 任何地址, 我都可以正常的跑, 只需要单机就可以了, 不需要其他的外部环境的依赖. 那我们就需要虚拟一个静态方法呢? 后面我们在来说, 这个是比较棘手的

## 2. 公有方法

公有方法的, 这个相对来说是比较简单的, 因为spock框架提供了很好的api接口, 我们通过Mock()方法直接来创建就好了.下面我们来写个示例吧.

```groovy
@PrepareForTest([ServiceM])
class ServiceMTest extends Specification {
  ServiceM serviceM
	def a = Mock(ServiceA)
	def b = Mock(ServiceB)

  def setup() {
    serviceM = new ServiceMImpl(a : a, b : b)
  }
  
  def "add exec success"() {
    given:
      def x = 1
      def y = 2
    when:
      def result = serviceM.add(x, y)
    then:
      result == 3
  }

```

其实只要按照这个模板, 我们就可以写我们的单测了, 如果其他方法, 调用就可以了, 如果有其他Service要调用, 注入进来就好了

**注意: ** 在Mock()进来以后, 我们还需要注册到serviceM中, 否则你在下面的方法中无法进行调用

## 3. 私有方法

其实私有方法和公有方法相比, 私有方法就简单多, 这么跟你说吧, 如果不让你写私有方法, 你怎么写你的代码呢?ok, 答案还明显的, 你的所有方法肯定是都写在公有方法里面的, 那你的代码太过于臃肿了, 那这样对于公有方法, 你还告诉我不会写单测, 我就要打你啦(嘿嘿)

私有方法就是为了让我的代码更加好看, 易懂, 逻辑性更加好一些, 处理一些我们自己可以区分出来的逻辑.我这么一说, 你应该就会写私有方法了吧, 一个字, 写就完了.哈哈

# 2. spock自己的GroovyMock

其实spock是内置静态方法的的mock的, 只是对于我们这些java程序员来说不能使用, 为什么呢?

因为不能全局工作, java静态方法的问题在于, 当使用Groovy进行测试时, 它们是从java类调用的, 而这些调用类正式您要测试的类.Groovy提供的ExpandoMetaClass和GroovyMock方法将不能全局工作，而只能在本地工作。

示例:

Customer.groovy文件类: 

```java
class Customer {

 String getAccountType() {
  return Account.getType()
 } 
}

```

Account.groovy

```groovy
class Account {

 static String getType() {
  return "Personal"
 }
}
```

测试类: CustomerTest.groovy

```groovy
import spock.lang.*

class CustomerTest extends Specification {
 
 def "get account type"() {
   
  setup: 
   GroovyMock(Account, global: true)
   Account.getType() >> "Business"
   Customer cust = new Customer()
  
  when: "obtaining a customer's account type"
   def type = cust.getAccountType()

  then: "the type will be a Business account"
   type == "Business"
    
 }
}
```

如果都是groovy文件, 我们进行测试, 单测是没有问题, 我们可以参考官网给出的教程信息, 具体的链接地址如下:

http://spockframework.org/spock/docs/1.3/interaction_based_testing.html#_mocking_static_methods

### [模拟静态方法](http://spockframework.org/spock/docs/1.3/interaction_based_testing.html#_mocking_static_methods)

（在使用此功能之前，请三思。在规范下更改代码的设计可能会更好。）

全局模拟支持静态方法的模拟和存根：

```
RealSubscriber anySubscriber = GroovySpy(global: true)

1 * RealSubscriber.someStaticMethod("hello") >> 42
```

动态静态方法也是如此。

当全局模拟仅用于模拟构造函数和静态方法时，实际上不需要模拟的实例。在这种情况下，可以这样写：

```
GroovySpy(RealSubscriber, global: true)
```

# 3. 使用Powermock来进行静态方法测试

但是如果我们的Account.groovy类和Customer.groovy类变成了java类呢? 

Customer.java

```java
class Customer {

 String getAccountType() {
  return Account.getType();
 } 
}
```

Account.java

```java
class Account {

 static String getType() {
  return "Personal";
 }
}
```

我们在使用 CustomerTest.groovy进行测试, 我们发现我们就测试不通过了, 这个时候就是我们上面说的GroovyMock创建的不能全局工作, 这个时候我们就需要借助Powermock或JMockit之类的框架, 下面我们就通过Powermock集成到CustomerTestCase.groovy中

CustomerTestCase.groovy

```groovy
package groovy.com.longfor.minevar.fetcher.provider.test

import org.junit.runner.RunWith
import org.powermock.api.mockito.PowerMockito
import org.powermock.core.classloader.annotations.PrepareForTest
import org.powermock.modules.junit4.PowerMockRunner
import org.powermock.modules.junit4.PowerMockRunnerDelegate
import org.spockframework.runtime.Sputnik
import spock.lang.Specification

@RunWith(PowerMockRunner.class)
@PowerMockRunnerDelegate(Sputnik.class)
@PrepareForTest([Account])
class CustomerTestCase extends Specification {

    def "GetAccountType"() {
        setup:
        PowerMockito.mockStatic(Account.class);
        PowerMockito.when(Account.getType()).thenReturn("bb")
        Customer cust = new Customer();

        when:
        String ret = cust.getAccountType()

        then:
        ret == "bb"
    }
}
```

**注意: **

上面在文中的三个注解, 缺一不可, 否则都会报错, 没法执行

下面我们来说说这三个注解的作用吧:

- @RunWith(): 就是一个运行器, 指定使用什么什么来运行
  - @RunWith(PowerMockRunner.class)就是指用PowerMockRunner来运行
  - @RunWith(SpringJUnit4ClassRunner.class),让测试运行于Spring测试环境
  - @RunWith(Suite.class)的话就是一套测试集合
- @PowerMockRunnerDelegate(Sputnik.class): powermockRunner的代表类是Sputnik.class,
- @PrepareForTest的使用场景
  - 当使用PowerMockito.whenNew方法时，必须加注解@PrepareForTest和@RunWith。注解@PrepareForTest里写的类是需要mock的new对象代码所在的类。
  - 当需要mock final方法的时候，必须加注解@PrepareForTest和@RunWith。注解@PrepareForTest里写的类是final方法所在的类.
  - 当需要mock静态方法的时候，必须加注解@PrepareForTest和@RunWith。注解@PrepareForTest里写的类是静态方法所在的类。
  - 当需要mock私有方法的时候, 只是需要加注解@PrepareForTest，注解里写的类是私有方法所在的类
  - 当需要mock系统类的静态方法的时候，必须加注解@PrepareForTest和@RunWith。注解里写的类是需要调用系统方法所在的类

# 4. 测试私有方法

使用`powermock`的`Whitebox.invokeMethod()`方法可以调用对象的私有方法

```groovy
//第一个参数为对象，第二个参数为该对象的私有方法名，后面的可变参数为传入的参数
Whitebox.invokeMethod(demoRegisterService, "sendRegisterEvent", organizationDO, userDO, userDO, userDO)
```

