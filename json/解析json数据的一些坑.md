# 解析json数据的一些坑

JSON，全称：JavaScript Object Notation，作为一个常见的轻量级的数据交换格式，应该在一个程序员的开发生涯中是常接触的。简洁和清晰的层次结构使得 JSON 成为理想的数据交换语言。 易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率。

Java是面向对象的语言，所以我们更多的在项目中是以对象的形式处理业务的，但是在传输的时候我们却要将对象转换为 JSON 格式便于传输，而且 JSON 格式一般能解析为大多数的对象格式，而不在乎编程语言。

在工作中, 我们不可避免的要使用json字符串, json已经成为我们resultful接口最常使用的数据格式, 相信大家也都不陌生了, 工作中或多或少也是用过的.今天我就是要来说说json数据处理时, 我们使用到的一些坑, 避免自己或者大家以后也落入到这线陷阱中, 特总结出来, 分享给大家, 希望对大家有帮助.

好吧, 我们进入正题, 大家在处理json字符串的时候, 最常使用的包和方法时什么嗯?

# 1. fastjson

## 1. 什么是fastjson

阿里官方给的定义是， fastjson 是阿里巴巴的开源JSON解析库，它可以解析 JSON 格式的字符串，支持将 Java Bean 序列化为 JSON 字符串，也可以从 JSON 字符串反序列化到 JavaBean。

## 2. fastjson的优点

- **速度快**
  fastjson相对其他JSON库的特点是快，从2011年fastjson发布1.1.x版本之后，其性能从未被其他Java实现的JSON库超越。
- **使用广泛**
  fastjson在阿里巴巴大规模使用，在数万台服务器上部署，fastjson在业界被广泛接受。在2012年被开源中国评选为最受欢迎的国产开源软件之一。
- **测试完备**
  fastjson有非常多的testcase，在1.2.11版本中，testcase超过3321个。每次发布都会进行回归测试，保证质量稳定。
- **使用简单**
  fastjson的 API 十分简洁。
- **功能完备**
  支持泛型，支持流处理超大文本，支持枚举，支持序列化和反序列化扩展。

## 3. 获取fastjson

你可以通过如下地方下载fastjson:

- maven中央仓库: http://central.maven.org/maven2/com/alibaba/fastjson/
- Sourceforge.net : https://sourceforge.net/projects/fastjson/files/
- 在maven项目的pom文件中直接配置fastjson依赖

fastjson最新版本都会发布到maven中央仓库，你可以直接依赖。

```properties
dependency>
     <groupId>com.alibaba</groupId>
     <artifactId>fastjson</artifactId>
     <version>x.x.x</version>
</dependency>
```

其中x.x.x是版本号，根据需要使用特定版本，建议使用最新版本。

### fastjson漏洞

#### 漏洞描述

常用JSON组件FastJson存在远程代码执行漏洞，攻击者可通过精心构建的json报文对目标服务器执行任意命令，从而获得服务器权限。此次爆发的漏洞为以往漏洞中autoType的绕过。

#### 影响范围

FastJson < 1.2.48

#### 漏洞描述

利用该0day漏洞，恶意攻击者可以构造攻击请求绕过FastJSON的黑名单策略。例如，攻击者通过精心构造的请求，远程让服务端执行指定命令（以下示例中成功运行计算器程序）。

![1](/Users/lingjing/公众号/json/1.jpg)

## 4. Fastjson主要的API

Fastjson入口类是 com.alibaba.fastjson.JSON，主要的 API 是 JSON.toJSONString 和 parseObject。

```java
package com.alibaba.fastjson;
public abstract class JSON {
      // Java对象转换为JSON字符串
      public static final String toJSONString(Object object);
      //JSON字符串转换为Java对象
      public static final <T> T parseObject(String text, Class<T> clazz, Feature... features);
}
```

序列化：

```java
String jsonString = JSON.toJSONString(obj);
```

反序列化

```java
VO vo = JSON.parseObject("...", VO.class);
```

## 5. Fastjson的性能

fastjson是目前java语言中最快的json库，比自称最快的jackson速度还要快，第三方独立测试结果看这里：https://github.com/eishay/jvm-serializers/wiki。

自行做性能测试时，需关闭循环引用检测的功能。

另外，Fastjson 比 Gson 快大约6倍

所以在工作中, 自己的同事或者很多同学都在使用fastjson.



# 2. @JsonProperty

好的, 上面的这些操作足够你使用fastjson了, 但是如果我们遇到一个比较复杂一些的例子时, 我们应该怎么解析呢?

比如我给一个字符串, 大家来看看如何解析呢?

```json
{
  "properties": {
    "sonar.analysis.buildNumber": "1555"
  }
}
```

如果你遇到这个例子, 应该怎么做呢? 因为sonar.analysis.buildNumber并不符合我们java属性的命名方式, 所以我们没法直接使用属性对他进行赋值, 那我们应该怎么办嗯?
在网上找了很多, 终于找到了答案, 就是我们可以通过@JsonProperty来进行注解的属性的赋值和设置

```java
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@ApiModel(value = "sonarQube webhook的提交条件， 只适用目前的版本")
public class ProviderSonarWebhookCondition {
		
  	@Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SonarProperties {
        @ApiModelProperty(value = "jenkins发起sonar扫描， 需要接受的build_id")
        @JsonProperty(value = "sonar.analysis.buildNumber")
        private String buildNumber;
    }
  
    @ApiModelProperty(value = "属性")
    private SonarProperties properties;
  
}
```

我们先来看一下这几个注解的作用吧:

- @JsonIgnore注解用来忽略某些字段，可以用在变量或者Getter方法上，用在Setter方法时，和变量效果一样。这个注解一般用在我们要忽略的字段上。
- @JsonIgnoreProperties(ignoreUnknown = true)，将这个注解写在类上之后，就会忽略类中不存在的字段。这个注解还可以指定要忽略的字段，例如@JsonIgnoreProperties({ “password”, “secretKey” }), password和secretKey就是我们的java成员变量

好吧, 上面的注解就顺利的帮我解决了这个问题, 把sonar.analysis.buildNumber给我自动转换成了buildNumber, 好吧, 很好的解决了我的问题.

# 3. 问题来了

当我进行编写单侧实例的时候, 突然发现了问题, 发现buildNumber就是怎么都转换不成功

其实我们发现: @JsonIgnoreProperties 是使用的jackson的注解, 但是我们在使用字符串转换的时候, 却使用的Fastjson, 所以不太能兼容, 特别是在单元测试中,

jackson的maven依赖

```
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.5.3</version>
</dependency>
```

@JsonProperty 此注解用于属性上，作用是把该属性的名称序列化为另外一个名称，如把trueName属性序列化为name，@JsonProperty(value="name")。

```java
import com.fasterxml.jackson.annotation.JsonProperty;

public class Student {

    @JsonProperty(value = "real_name")
    private String realName;

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    @Override
    public String toString() {
        return "Student{" +
                "realName='" + realName + '\'' +
                '}';
    }
}
```

测试

```java
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Main {
    public static void main(String[] args) throws JsonProcessingException {
        Student student = new Student();
        student.setRealName("zhangsan");
        System.out.println(new ObjectMapper().writeValueAsString(student));
    }
}
```

结果:

```
{"real_name":"zhangsan"}
```

***\*这里需要注意的是将对象转换成json字符串使用的方法是fasterxml.jackson提供的！！\****

如果使用fastjson呢？

```java
import com.alibaba.fastjson.JSON;

public class Main {
    public static void main(String[] args) {
        Student student = new Student();
        student.setRealName("zhangsan");
        System.out.println(JSON.toJSONString(student));
    }
}
```

结果:

```
{"realName":"zhangsan"}
```

可以看到，@JsonProperty(value = "real_name")没有生效，为啥？

***\*因为fastjson不认识@JsonProperty注解呀！所以要使用jackson自己的序列化工具方法！\****

@JsonProperty不仅仅是在序列化的时候有用，反序列化的时候也有用，比如有些接口返回的是json字符串，命名又不是标准的驼峰形式，在映射成对象的时候，将类的属性上加上@JsonProperty注解，里面写上返回的json串对应的名字

```java
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        String jsonStr = "{\"real_name\":\"zhangsan\"}";
        Student student = new ObjectMapper().readValue(jsonStr.getBytes(), Student.class);
        System.out.println(student);
    }
}
```

结果：

```
Student{realName='zhangsan'}
```

# 4. 思考在学习

既然fastjson号称最牛逼的json解析工具, 那不可能不考虑到这个特殊字符串的问题啊, 如果fastjson是自己开发的, 自己也应该考虑到这些情况啊, 大佬开的不会比自己开大的更差吧. 所以可能是自己还没有更好的掌握好fastjson的使用方法, 在升入学习一下fastjson, 果然还是支持这种操作的, 快来优惠我们的代码吧

## 6. fastjson定制序列化

### 1. 简介

fastjson支持多种方式的定制序列化

- 通过@JSONField定制序列化
- 通过@JSONType定制序列化
- 通过@SerializeFilter定制序列化
- 通过ParseProcess定制序列化

### 2. 使用@JSONField配置

#### 1. JSONField注解介绍

```java
package com.alibaba.fastjson.annotation;

public @interface JSONField {
    // 配置序列化和反序列化的顺序，1.1.42版本之后才支持
    int ordinal() default 0;

     // 指定字段的名称
    String name() default "";

    // 指定字段的格式，对日期格式有用
    String format() default "";

    // 是否序列化
    boolean serialize() default true;

    // 是否反序列化
    boolean deserialize() default true;
}
```

#### 2. JSONField配置方式

可把@JSONField配置在字段或者getter/setter方法上, 例如:

**配置在字段上**

```java
public class VO {
     @JSONField(name="ID")
     private int id;

     @JSONField(name="birthday",format="yyyy-MM-dd")
     public Date date;
}
```



配置在Getter/Setter上**

```java
public class VO {
    private int id;

    @JSONField(name="ID")
    public int getId() { return id;}

    @JSONField(name="ID")
    public void setId(int id) {this.id = id;}
}
```

#### 3. 使用format配置日期格式化

可以定制化配置各个日期字段的格式化

```java
public class A {
      // 配置date序列化和反序列使用yyyyMMdd日期格式
      @JSONField(format="yyyyMMdd")
      public Date date;
 }
```

#### 4. 使用serialize/deserialize指定字段不序列化

```java
public class A {
      @JSONField(serialize=false)
      public Date date;
 }

 public class A {
      @JSONField(deserialize=false)
      public Date date;
 }
```

#### 5. 使用ordinal指定字段的顺序

缺省Fastjson序列化一个java bean，是根据fieldName的字母序进行序列化的，你可以通过ordinal指定字段的顺序。这个特性需要1.1.42以上版本。

```java
public static class VO {
    @JSONField(ordinal = 3)
    private int f0;

    @JSONField(ordinal = 2)
    private int f1;

    @JSONField(ordinal = 1)
    private int f2;
}

```

#### 6. 使用serializeUsing指定属性的序列化类

在fa

stjson 1.2.16版本之后，JSONField支持新的定制化配置serializeUsing，可以单独对某一个类的某个属性定制序列化，比如：

```java
public static class Model {
    @JSONField(serializeUsing = ModelValueSerializer.class)
    public int value;
}

public static class ModelValueSerializer implements ObjectSerializer {
    @Override
    public void write(JSONSerializer serializer, Object object, Object fieldName, Type fieldType,
                      int features) throws IOException {
        Integer value = (Integer) object;
        String text = value + "元";
        serializer.write(text);
    }
}
```

测试代码

```java
Model model = new Model();
model.value = 100;
String json = JSON.toJSONString(model);
Assert.assertEquals("{\"value\":\"100元\"}", json);

```

### 3. 使用@JSONType配置

和JSONField类似，但JSONType配置在类上，而不是field或者getter/setter方法上。

### 4. 通过SerializeFilter定制序列化

#### 1. 简介

SerializeFilter是通过编程扩展的方式定制序列化. fastjson支持6种SerializeFilter, 用于不用场景的定制序列化

- PropertyPreFilter根据PropertyName判断是否序列化
- PropertyFilter根据PropertyName和PropertyValue来判断是否序列化
- NameFilter 修改Key，如果需要修改Key,process返回值则可
- ValueFilter 修改Value
- BeforeFilter 序列化时在最前添加内容
- AfterFilter 序列化时在最后添加内容

#### 2. PropertyFilter 根据PropertyName和PropertyValue来判断是否序列化

```java
public interface PropertyFilter extends SerializeFilter {
    boolean apply(Object object, String propertyName, Object propertyValue);
 }
```

可以通过扩展实现根据object或者属性名称或者属性值进行判断是否需要序列化。例如：

```java
PropertyFilter filter = new PropertyFilter() {

    public boolean apply(Object source, String name, Object value) {
        if ("id".equals(name)) {
            int id = ((Integer) value).intValue();
            return id >= 100;
        }
        return false;
    }
};

JSON.toJSONString(obj, filter); // 序列化的时候传入filter
```

#### 3. PropertyPreFilter 根据PropertyName判断是否序列化

和PropertyFilter不同只根据object和name进行判断，在调用getter之前，这样避免了getter调用可能存在的异常。

```java
public interface PropertyPreFilter extends SerializeFilter {
      boolean apply(JSONSerializer serializer, Object object, String name);
  }
```

#### 4. NameFilter 序列化时修改Key

如果需要修改Key,process返回值则可

```java
public interface NameFilter extends SerializeFilter {
    String process(Object object, String propertyName, Object propertyValue);
}
```

fastjson内置一个PascalNameFilter，用于输出将首字符大写的Pascal风格。 例如:

```java
import com.alibaba.fastjson.serializer.PascalNameFilter;

Object obj = ...;
String jsonStr = JSON.toJSONString(obj, new PascalNameFilter());
```

#### 5. ValueFilter 序列化时修改Value

```java
public interface ValueFilter extends SerializeFilter {
  Object process(Object object, String propertyName, Object propertyValue);
}

```

#### 6. BeforeFilter 序列化时在最前添加内容

在序列化对象的所有属性之前执行某些操作,例如调用 writeKeyValue 添加内容

```java
public abstract class BeforeFilter implements SerializeFilter {
   protected final void writeKeyValue(String key, Object value) { ... }
    // 需要实现的抽象方法，在实现中调用writeKeyValue添加内容
    public abstract void writeBefore(Object object);
}
```

#### 7. AfterFilter 序列化时在最后添加内容

在序列化对象的所有属性之后执行某些操作,例如调用 writeKeyValue 添加内容

```java
public abstract class AfterFilter implements SerializeFilter {
  protected final void writeKeyValue(String key, Object value) { ... }
    // 需要实现的抽象方法，在实现中调用writeKeyValue添加内容
    public abstract void writeAfter(Object object);
}
```

### 5. **通过ParseProcess定制反序列化**

#### 1. 简介

ParseProcess是编程扩展定制反序列化的接口。fastjson支持如下ParseProcess：

- ExtraProcessor 用于处理多余的字段
- ExtraTypeProvider 用于处理多余字段时提供类型信息

#### 2. 使用ExtraProcessor 处理多余字段

```java
public static class VO {
    private int id;
    private Map<String, Object> attributes = new HashMap<String, Object>();
    public int getId() { return id; }
    public void setId(int id) { this.id = id;}
    public Map<String, Object> getAttributes() { return attributes;}
}
    
ExtraProcessor processor = new ExtraProcessor() {
    public void processExtra(Object object, String key, Object value) {
        VO vo = (VO) object;
        vo.getAttributes().put(key, value);
    }
};
    
VO vo = JSON.parseObject("{\"id\":123,\"name\":\"abc\"}", VO.class, processor);
Assert.assertEquals(123, vo.getId());
Assert.assertEquals("abc", vo.getAttributes().get("name"));
```

#### 3. 使用ExtraTypeProvider 为多余的字段提供类型

```java
public static class VO {
    private int id;
    private Map<String, Object> attributes = new HashMap<String, Object>();
    public int getId() { return id; }
    public void setId(int id) { this.id = id;}
    public Map<String, Object> getAttributes() { return attributes;}
}
    
class MyExtraProcessor implements ExtraProcessor, ExtraTypeProvider {
    public void processExtra(Object object, String key, Object value) {
        VO vo = (VO) object;
        vo.getAttributes().put(key, value);
    }
    
    public Type getExtraType(Object object, String key) {
        if ("value".equals(key)) {
            return int.class;
        }
        return null;
    }
};
ExtraProcessor processor = new MyExtraProcessor();
    
VO vo = JSON.parseObject("{\"id\":123,\"value\":\"123456\"}", VO.class, processor);
Assert.assertEquals(123, vo.getId());
Assert.assertEquals(123456, vo.getAttributes().get("value")); // value本应该是字符串类型的，通过getExtraType的处理变成Integer类型了。
```



我相信上面这些例子方法足够你在工作中运用了吧!