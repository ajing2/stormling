# Optional的用法

平时开发的工作中, 自己组内的很多大佬经常使用Optional的用法, 自己问他们, 这个到底有什么好处呢,他们说可以很好的规避好空指针的问题, 我们在平时写java代码的时候, 如果是一个新手, 肯定很多情况下都会出现空指针的报错, 而java8 以后提供的Optional的问题, 就可以很好地规避我们空指针的问题.

空指针异常是导致Java应用程序失败的最常见原因。以前，为了解决空指针异常，Google公司著名的Guava项目引入了Optional类，Guava通过使用检查空值的方式来防止代码污染，它鼓励程序员写更干净的代码。受到Google Guava的启发，Optional类已经成为Java 8类库的一部分。Optional实际上是个容器：它可以保存类型T的值，或者仅仅保存null。Optional提供很多有用的方法，这样我们就不用显式进行空值检测。

# 1. 在Optional之前

在Java 8之前，程序员将返回null而不是Optional。这种方法有一些缺点。一种是没有明确的方法来表示null可能是一个特殊值。相比之下，在API中返回Optional是明确的声明，其中可能没有值。如果我们要确保不会出现空指针异常，则需要对每个引用进行显式的空检查，如下所示，我们都同意这是很多样板。

```java
// Life before Optional
    private void getIsoCode( User user){
        if (user != null) {
            Address address = user.getAddress();
            if (address != null) {
                Country country = address.getCountry();
                if (country != null) {
                    String isocode = country.getIsocode();
                    if (isocode != null) {
                        isocode = isocode.toUpperCase();
                    }
                }
            }
        }
    }

```

为了简化此过程，让我们看一下如何使用Optional类，从创建和验证实例到使用它提供的不同方法并将其与返回相同类型的其他方法组合在一起，后者才是Optional的厉害之处。



Optional类提供了大约10种方法，我们可以使用它们来创建和使用Optional类，下面将介绍如何使用它们。

# 2. 创建一个Optional类

## 1. Optional.of()

```java
// 参数不能是null
Optional<Integer> optional1 = Optional.of(1);
 
```

## 2. Optional.ofNullable()

Optional.of()或者Optional.ofNullable()：创建Optional对象，差别在于of不允许参数是null，而ofNullable则无限制。

```java
// 参数可以是null
Optional<Integer> optional2 = Optional.ofNullable(null);
 
// 参数可以是非null
Optional<Integer> optional3 = Optional.ofNullable(2);


```

## 3. Optional.empty()

Optional.empty()：所有null包装成的Optional对象：

```java
Optional<Integer> o1 = Optional.<Integer>empty()
Optional<Integer> o2 = Optional.ofNullable(null)
print(o1 == o2) // true
```



# 3. 判断是否存在

## 1. isPresent()判断值是否存在

```java
Optional<Integer> optional1 = Optional.ofNullable(1);
Optional<Integer> optional2 = Optional.ofNullable(null);
 
// isPresent判断值是否存在
System.out.println(optional1.isPresent() == true);
System.out.println(optional2.isPresent() == false);
```

## 2. ifPresent(Consumer consumer)

ifPresent(Consumer consumer), 如果Optional对象保存的值不是null, 则调用consumer对象,否则不调用

```java
Optional<Integer> optional1 = Optional.ofNullable(1);
Optional<Integer> optional2 = Optional.ofNullable(null);
 
// 如果不是null,调用Consumer
optional1.ifPresent(new Consumer<Integer>() {
	@Override
	public void accept(Integer t) {
		System.out.println("value is " + t);
	}
});
 
// null,不调用Consumer
optional2.ifPresent(new Consumer<Integer>() {
	@Override
	public void accept(Integer t) {
		System.out.println("value is " + t);
	}
});
```

# 5. 获取Optional里面的对象

## 1. get()

**注意:**在调用get()方法之前, 一定要先进行isPresent()方法判断是否存在值

```java
//get
Optional<String> optional1 = Optional.of("javaone");
if (optional1.isPresent()){ 
  String value = optional1.get();
}
```

## 2. orElse(value)

返回值（如果存在）；反之，返回其他。

```java
//orElse
String nullName = null;
String name = Optional.ofNullable(nullName).orElse("default_name");
```

## 3. orElseGet(Supplier supplier)

返回值（如果存在）；否则，调用other并返回该调用的结果。

该orElseGet() 方法类似于 orElse()。但是，如果没有Optional值，则不采用返回值，而是采用供应商功能接口，该接口将被调用并返回调用的值：

```java
//orElseGet
String name = Optional.ofNullable(nullName).orElseGet(() -> "john");
```

那么，orElse() 和orElseGet()之间有什么区别。

乍一看，这两种方法似乎具有相同的效果。但是，事实并非如此。让我们创建一些示例，以突出两者之间的相似性和行为差异。

首先，让我们看看它们在对象为空时的行为：

```java
String text = null;
String defaultText = Optional.ofNullable(text).orElseGet(this::getDefaultValue);
defaultText = Optional.ofNullable(text).orElse(getDefaultValue());
public String getDefaultValue() {
    System.out.println("Getting Default Value");
    return "Default Value";
}
```

在上面的示例中，我们在Optional对象中包装了一个空文本，然后尝试使用两种方法中的每一种来获取包装后的值。副作用如下：

```
Getting Default Value
Getting Default Value
```

在每种情况下都会调用默认方法。碰巧的是，当不存在包装的值时，两者 orElse() 和的 orElseGet() 工作方式完全相同。

## 4. orElseThrow()

值不存在则抛出异常，存在则什么不做，有点类似Guava的Precoditions

```java
Optional<Integer> optional1 = Optional.ofNullable(1);
Optional<Integer> optional2 = Optional.ofNullable(null);
 
optional1.orElseThrow(()->{throw new IllegalStateException();});
 
try
{
	// 抛出异常
	optional2.orElseThrow(()->{throw new IllegalStateException();});
}
catch(IllegalStateException e )
{
	e.printStackTrace();
}
```

# 5. 流处理

## 1. filter(Predicate)

判断Optional对象中保存的值是否满足Predicate，并返回新的Optional。

```java
Optional<Integer> optional1 = Optional.ofNullable(1);
Optional<Integer> optional2 = Optional.ofNullable(null);
 
Optional<Integer> filter1 = optional1.filter((a) -> a == null);
Optional<Integer> filter2 = optional1.filter((a) -> a == 1);
Optional<Integer> filter3 = optional2.filter((a) -> a == null);
System.out.println(filter1.isPresent());// false
System.out.println(filter2.isPresent());// true
System.out.println(filter2.get().intValue() == 1);// true
System.out.println(filter3.isPresent());// false
```

## 2. map(Function)：

对Optional中保存的值进行函数运算，并返回新的Optional(可以是任何类型)

```java
Optional<Integer> optional1 = Optional.ofNullable(1);
Optional<Integer> optional2 = Optional.ofNullable(null);
 
Optional<String> str1Optional = optional1.map((a) -> "key" + a);
Optional<String> str2Optional = optional2.map((a) -> "key" + a);
 
System.out.println(str1Optional.get());// key1
System.out.println(str2Optional.isPresent());// false
```

## 3. flatMap()

功能与map()相似，差别请看如下代码。flatMap方法与map方法类似，区别在于mapping函数的返回值不同。map方法的mapping函数返回值可以是任何类型T，而flatMap方法的mapping函数必须是Optional。

```java
Optional<Integer> optional1 = Optional.ofNullable(1);
 
Optional<Optional<String>> str1Optional = optional1.map((a) -> {
	return Optional.<String>of("key" + a);
});
 
Optional<String> str2Optional = optional1.flatMap((a) -> {
	return Optional.<String>of("key" + a);
});
 
System.out.println(str1Optional.get().get());// key1
System.out.println(str2Optional.get());// key1
```

