# java stream流

说起stream的流, 在平时的工作中, 很多同事都在用, 而且用的很牛逼, 代码的效率也是溜溜的, 真的牛逼的不行了, 自己一直想学习一下, 虽然在开发中也慢慢学习了一些, 但是感觉还是一直没有掌握其精髓, 今天有空, 赶紧总结一下吧, 也算是了结自己一个小小的心愿

# 1. stream流简介

Stream作为 Java 8的一大亮点，它与 java.io 包里的 InputStream和 OutputStream是完全不同的概念。它也不同于 StAX 对 XML 解析的 Stream，也不是 Amazon Kinesis 对大数据实时处理的Stream。Java 8 中的 Stream 是对集合（Collection）对象功能的增强，它专注于对集合对象进行各种非常便利、高效的聚合操作（aggregate operation），或者大批量数据操作 (bulk data operation)。Stream API 借助于同样新出现的Lambda表达式，极大的提高编程效率和程序可读性。同时它提供串行和并行两种模式进行汇聚操作，并发模式能够充分利用多核处理器的优势，使用fork/join并行方式来拆分任务和加速处理过程。通常编写并行代码很难而且容易出错, 但使用Stream API无需编写一行多线程的代码，就可以很方便地写出高性能的并发程序。所以说，Java 8 中首次出现的java.util.stream 是一个函数式语言+多核时代综合影响的产物。



Stream 不是集合元素，它不是数据结构并不保存数据，它是有关算法和计算的，它更像一个高级版本的 Iterator。原始版本的Iterator，用户只能显式地一个一个遍历元素并对其执行某些操作；高级版本的 Stream，用户只要给出需要对其包含的元素执行什么操作，比如 “过滤掉长度大于 10 的字符串”、“获取每个字符串的首字母”等，Stream 会隐式地在内部进行遍历，做出相应的数据转换。

Stream 就如同一个迭代器（Iterator），单向，不可往复，数据只能遍历一次，遍历过一次后即用尽了，就好比流水从面前流过，一去不复返。

而和迭代器又不同的是，Stream 可以并行化操作，迭代器只能命令式地、串行化操作。顾名思义，当使用串行方式去遍历时，每个 item 读完后再读下一个 item。而使用并行去遍历时，数据会被分成多个段，其中每一个都在不同的线程中处理，然后将结果一起输出。Stream 的并行操作依赖于 Java7 中引入的 Fork/Join 框架（JSR166y）来拆分任务和加速处理过程。Java 的并行 API 演变历程基本如下：

1.0-1.4 中的 java.lang.Thread
5.0 中的 java.util.concurrent
6.0 中的 Phasers 等
7.0 中的 Fork/Join 框架
8.0 中的 Lambda
Stream 的另外一大特点是，数据源本身可以是无限的。

# 2. 传统和stream的对比

我们先来看一个示例: 

```java
import java.util.ArrayList;
import java.util.List;

public class DemoForEach {
        public static void main(String[] args) {
            List<String> list = new ArrayList<>();
            list.add("你好");
            list.add("我好");
            list.add("大家好");
            list.add("hello world");
            list.add("thanks");
            for (String name : list) {
                System.out.println(name);
            }
        }
}
```

## Java8 之前的做法

```java
import java.util.ArrayList;
import java.util.List;
    public class DemoNormalFilter {
        public static void main(String[] args) {
            List<String> list = new ArrayList<>();
            list.add("你好");
            list.add("我好");
            list.add("大家好");
            list.add("hello world");
            list.add("thanks");
            List<String> haoList = new ArrayList<>();
            for (String name : list) {
                if (name.endWith("好")) {
                    haoList.add(name);
                }
            } 
            List<String> shortList = new ArrayList<>();
            for (String name : haoList) {
                if (name.length() == 3) {
                    shortList.add(name);
                }
            } 
            for (String name : shortList) {
                System.out.println(name);
            }
        }
    }
```

这段代码中含有三个循环，每一个作用不同： 

　　　　　　 ① 首先筛选出所有以"好"结尾的；

　　　　　　 ② 然后筛选三个字；

　　　　　　 ③ 最后进行对结果进行打印输出。

而我们每次都需要进行一个循环, 是不是感觉很麻烦啊, 那就没有更加简便的方法吗?

## stream的更优写法

```java
import java.util.ArrayList;
import java.util.List;

    public class DemoStreamFilter {
        public static void main(String[] args) {
            List<String> list = new ArrayList<>();
            list.add("你好");
            list.add("我好");
            list.add("大家好");
            list.add("hello world");
            list.add("thanks");
            list.stream()
                    .filter(s -> s.startsWith("张"))
                    .filter(s -> s.length() == 3)
                    .forEach(System.out::println);
        }
    }
```

# 3. 流式思想概述

整体来看，流式思想类似于工厂车间的“生产流水线”。

由上面的例子可以看出，java8的流式处理极大的简化了对于集合的操作，实际上不光是集合，包括数组、文件等，只要是可以转换成流，我们都可以借助流式处理，类似于我们写SQL语句一样对其进行操作。java8通过内部迭代来实现对流的处理，一个流式处理可以分为三个部分：转换成流、中间操作、终端操作。如下图:
![2](/Users/lingjing/公众号/java/stream/2.jpg)



当需要对多个元素进行操作（特别是多步操作）的时候，考虑到性能及便利性，应该首先拼好一个“模型”步骤方案，然后再按照方案去执行它。

![1](/Users/lingjing/公众号/java/stream/1.png)

这张图中展示了过滤、映射、跳过、计数等多步操作，这是一种集合元素的处理方案，而方案就是一种“函数模型”。

图中的每一个方框都是一个“流”，调用指定的方法，可以从一个流模型转换为另一个流模型。而最右侧的数字3是最终结果。

这里的 filter 、 map 、 skip 都是在对函数模型进行操作，集合元素并没有真正被处理。只有当终结方法 count执行的时候，整个模型才会按照指定策略执行操作。而这得益于Lambda的延迟执行特性 。

**注意**：“Stream流”其实是一个集合元素的函数模型，它并不是集合，也不是数据结构，其本身并不存储任何元素（或其地址值）。

Stream（流）是一个来自数据源的元素队列：

- 元素是特定类型的对象，形成一个队列。 Java中的Stream并不会存储元素，而是按需计算。
- 数据源 流的来源。 可以是集合，数组 等。

和以前的Collection操作不同， Stream操作还有两个基础的特征：

- Pipelining: 中间操作都会返回流对象本身。 这样多个操作可以串联成一个管道， 如同流式风格（fluentstyle）。 这样做可以对操作进行优化， 比如延迟执行(laziness)和短路( short-circuiting)。

- 内部迭代： 以前对集合遍历都是通过Iterator或者增强for的方式, 显式的在集合外部进行迭代， 这叫做外部迭代。 Stream提供了内部迭代的方式，流可以直接调用遍历方法。

当使用一个流的时候，通常包括三个基本步骤：

获取一个数据源（source）→ 数据转换→执行操作获取想要的结果，

每次转换原有 Stream 对象不改变，返回一个新的 Stream 对象（可以有多次转换），这就允许对其操作可以像链条一样排列，变成一个管道。

# 4. 获取流

java.util.stream.Stream<T> 是Java 8新加入的最常用的流接口。（这并不是一个函数式接口。）

　　获取一个流非常简单，有以下几种常用的方式：

- 所有的 Collection 集合都可以通过 stream 默认方法获取流；
- Stream 接口的静态方法 of 可以获取数组对应的流

## 1. 根据Collection获取流

```java
import java.util .*;
import java.util.stream.Stream;

    public class DemoGetStream {
        public static void main(String[] args) {
            List<String> list = new ArrayList<>();
            // ...
            Stream<String> stream1 = list.stream();
            Set<String> set = new HashSet<>();
            // ...
            Stream<String> stream2 = set.stream();
            Vector<String> vector = new Vector<>();
            // ...
            Stream<String> stream3 = vector.stream();
        }
    }
```

## 2. 根据Map获取流

java.util.Map 接口不是 Collection 的子接口，且其K-V数据结构不符合流元素的单一特征，所以获取对应的流需要分key、value或entry等情况：

```java
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

    public class DemoGetStream {
        public static void main(String[] args) {
            Map<String, String> map = new HashMap<>();
            // ...
            Stream<String> keyStream = map.keySet().stream();
            Stream<String> valueStream = map.values().stream();
            Stream<Map.Entry<String, String>> entryStream = map.entrySet().stream();
        }
    }
```

## 3. 根据数组获取流

如果使用的不是集合或映射而是数组，由于数组对象不可能添加默认方法，所以 Stream 接口中提供了静态方法of ，使用很简单：

```java
import java.util.stream.Stream;

    public class DemoGetStream {
        public static void main(String[] args) {
            String[] array = {"张无忌", "张翠山", "张三丰", "张一元"};
            Stream<String> stream = Stream.of(array);
        }
    }
```

# 5. 中间操作

我们先初始化一个学生类, 用作后面的使用

```java
public class Student {

    /** 学号 */
    private long id;

    private String name;

    private int age;

    /** 年级 */
    private int grade;

    /** 专业 */
    private String major;

    /** 学校 */
    private String school;

    // 省略getter和setter
}
```

初始化一个list

```java
/ 初始化
List<Student> students = new ArrayList<Student>() {
    {
        add(new Student(20160001, "孔明", 20, 1, "土木工程", "武汉大学"));
        add(new Student(20160002, "伯约", 21, 2, "信息安全", "武汉大学"));
        add(new Student(20160003, "玄德", 22, 3, "经济管理", "武汉大学"));
        add(new Student(20160004, "云长", 21, 2, "信息安全", "武汉大学"));
        add(new Student(20161001, "翼德", 21, 2, "机械与自动化", "华中科技大学"));
        add(new Student(20161002, "元直", 23, 4, "土木工程", "华中科技大学"));
        add(new Student(20161003, "奉孝", 23, 4, "计算机科学", "华中科技大学"));
        add(new Student(20162001, "仲谋", 22, 3, "土木工程", "浙江大学"));
        add(new Student(20162002, "鲁肃", 23, 4, "计算机科学", "浙江大学"));
        add(new Student(20163001, "丁奉", 24, 5, "土木工程", "南京大学"));
    }
};
```

## 1. 过滤

### filter

我们通过使用filter来进行筛选武汉大学的学生

```java
List<Student> whuStudents = students.stream()
           		.filter(student -> "武汉大学".equals(student.getSchool()))
              .collect(Collectors.toList());
```



### dinstinct

distinct类似我们sql中的`DISTINCT`关键字, distinct基于Object.equals(Object)实现

```java
List<Integer> evens = nums.stream()
                        .filter(num -> num % 2 == 0).distinct()
                        .collect(Collectors.toList());
```



### limit

limit类似我们sql中的`LIMIT`关键字, 不过相对功能较弱, limit返回包含当前n个元素的流

```java
List<Student> civilStudents = students.stream()
             .filter(student -> "土木工程".equals(student.getMajor()))
  					 .limit(2)
             .collect(Collectors.toList());
```

### sorted

该操作用于对流中元素进行排序，sorted要求待比较的元素必须实现`Comparable`接口，如果没有实现也不要紧，我们可以将比较器作为参数传递给`sorted(Comparator comparator)`，比如我们希望筛选出专业为土木工程的学生，并按年龄从小到大排序，筛选出年龄最小的两个学生，那么可以实现为：

```java
List<Student> sortedCivilStudents = students.stream()
                 .filter(student -> "土木工程".equals(student.getMajor())).sorted((s1, s2) -> s1.getAge() - s2.getAge())
                 .limit(2)
                 .collect(Collectors.toList());
```



### skip

skip操作与limit操作相反，如同其字面意思一样，是跳过前n个元素，比如我们希望找出排序在2之后的土木工程专业的学生，那么可以实现为：

```java
List<Student> civilStudents = students.stream()
                 .filter(student -> "土木工程".equals(student.getMajor()))
                 .skip(2)
                 .collect(Collectors.toList());
```



## 2. 映射

在SQL中, 我们接触`SELECT`关键字后面添加需要的字段名称, 可以仅输出我们需要的字段数据, 而流式处理的映射操作也是实现这一目的, 在java8的流式处理中, 主要包含两类映射操作: map和flatMap.

### map

举例说明，假设我们希望筛选出所有专业为计算机科学的学生姓名，那么我们可以在filter筛选的基础之上，通过map将学生实体映射成为学生姓名字符串，具体实现如下：

```java
List<String> names = students.stream()
             .filter(student -> "计算机科学".equals(student.getMajor()))
             .map(Student::getName).collect(Collectors.toList());
```

除了上面这类基础的map，java8还提供了`mapToDouble(ToDoubleFunction mapper)`，`mapToInt(ToIntFunction mapper)`，`mapToLong(ToLongFunction mapper)`，这些映射分别返回对应类型的流，java8为这些流设定了一些特殊的操作，比如我们希望计算所有专业为计算机科学学生的年龄之和，那么我们可以实现如下：

```java
int totalAge = students.stream()
                    .filter(student -> "计算机科学".equals(student.getMajor()))
                    .mapToInt(Student::getAge).sum();
```

通过将Student按照年龄直接映射为`IntStream`，我们可以直接调用提供的`sum()`方法来达到目的，此外使用这些数值流的好处还在于可以避免jvm装箱操作所带来的性能消耗。

### flatMap

flatMap与map的区别在于 **flatMap是将一个流中的每个值都转成一个个流，然后再将这些流扁平化成为一个流** 。举例说明，假设我们有一个字符串数组`String[] strs = {"java8", "is", "easy", "to", "use"};`，我们希望输出构成这一数组的所有非重复字符，那么我们可能首先会想到如下实现：

```java
List<String[]> distinctStrs = Arrays.stream(strs)
               .map(str -> str.split(""))  // 映射成为Stream<String[]>
               .distinct()
               .collect(Collectors.toList());
```

在执行map操作以后，我们得到是一个包含多个字符串（构成一个字符串的字符数组）的流，此时执行distinct操作是基于在这些字符串数组之间的对比，所以达不到我们希望的目的，此时的输出为：

```
[j, a, v, a, 8]  // 我们希望得到的是[j, a, v, 8]
[i, s]
[e, a, s, y]
[t, o]
[u, s, e]
```

distinct只有对于一个包含多个字符的流进行操作才能达到我们的目的，即对`Stream`进行操作。此时flatMap就可以达到我们的目的：

```java
List<String> distinctStrs = Arrays.stream(strs)
                                .map(str -> str.split(""))  // 映射成为Stream<String[]>
                                .flatMap(Arrays::stream)  // 扁平化为Stream<String>
                                .distinct()
                                .collect(Collectors.toList());
```

flatMap将由map映射得到的`Stream`，转换成由各个字符串数组映射成的流`Stream`，再将这些小的流扁平化成为一个由所有字符串构成的大流`Steam`，从而能够达到我们的目的。
与map类似，flatMap也提供了针对特定类型的映射操作：`flatMapToDouble(Function mapper)`，`flatMapToInt(Function mapper)`，`flatMapToLong(Function mapper)`。

# 6. 终端操作

## 1. 查找

终端操作是流式处理的最后一步，我们可以在终端操作中实现对流查找、归约等操作。

### allMatch

allMatch用于检测是否全部都满足指定的参数行为，如果全部满足则返回true，例如我们希望检测是否所有的学生都已满18周岁，那么可以实现为：

```java
boolean isAdult = students.stream().allMatch(student -> student.getAge() >= 18)
```

### anyMatch

anyMatch则是检测是否存在一个或多个满足指定的参数行为，如果满足则返回true，例如我们希望检测是否有来自武汉大学的学生，那么可以实现为：

```java
boolean hasWhu = students.stream().anyMatch(student -> "武汉大学".equals(student.getSchool()));
```



### noneMatch

noneMatch用于检测是否不存在满足指定行为的元素，如果不存在则返回true，例如我们希望检测是否不存在专业为计算机科学的学生，可以实现如下：

```java
boolean noneCs = students.stream().noneMatch(student -> "计算机科学".equals(student.getMajor()));
```



### findFirst

findFirst用于返回满足条件的第一个元素，比如我们希望选出专业为土木工程的排在第一个学生，那么可以实现如下：

```java
Optional<Student> optStu = students.stream().filter(student -> "土木工程".equals(student.getMajor())).findFirst();
```



### findAny

findAny相对于findFirst的区别在于，findAny不一定返回第一个，而是返回任意一个，比如我们希望返回任意一个专业为土木工程的学生，可以实现如下：

```java
Optional<Student> optStu = students.stream().filter(student -> "土木工程".equals(student.getMajor())).findAny();
```



## 2. 归约

前面的例子中我们大部分都是通过`collect(Collectors.toList())`对数据封装返回，如我的目标不是返回一个新的集合，而是希望对经过参数化操作后的集合进行进一步的运算，那么我们可用对集合实施归约操作。java8的流式处理提供了`reduce`方法来达到这一目的。

前面我们通过mapToInt将`Stream`映射成为`IntStream`，并通过`IntStream`的sum方法求得所有学生的年龄之和，实际上我们通过归约操作，也可以达到这一目的，实现如下：

```java
// 前面例子中的方法
int totalAge = students.stream()
                .filter(student -> "计算机科学".equals(student.getMajor()))
                .mapToInt(Student::getAge).sum();
// 归约操作
int totalAge = students.stream()
                .filter(student -> "计算机科学".equals(student.getMajor()))
                .map(Student::getAge)
                .reduce(0, (a, b) -> a + b);

// 进一步简化
int totalAge2 = students.stream()
                .filter(student -> "计算机科学".equals(student.getMajor()))
                .map(Student::getAge)
                .reduce(0, Integer::sum);

// 采用无初始值的重载版本，需要注意返回Optional
Optional<Integer> totalAge = students.stream()
                .filter(student -> "计算机科学".equals(student.getMajor()))
                .map(Student::getAge)
                .reduce(Integer::sum);  // 去掉初始值
```



## 3. 收集

单的收集操作，是对处理结果的封装，对应的还有`toSet`、`toMap`，以满足我们对于结果组织的需求。这些方法均来自于`java.util.stream.Collectors`，我们可以称之为收集器。

### 归约

收集器也提供了相应的归约操作，但是与reduce在内部实现上是有区别的，收集器更加适用于可变容器上的归约操作，这些收集器广义上均基于`Collectors.reducing()`实现。

例1:求学生的总人数

```java
long count = students.stream().collect(Collectors.counting());

// 进一步简化
long count = students.stream().count();
```

例2: 求年龄的最大值和最小值

```java
// 求最大年龄
Optional<Student> olderStudent = students.stream().collect(Collectors.maxBy((s1, s2) -> s1.getAge() - s2.getAge()));

// 进一步简化
Optional<Student> olderStudent2 = students.stream().collect(Collectors.maxBy(Comparator.comparing(Student::getAge)));

// 求最小年龄
Optional<Student> olderStudent3 = students.stream().collect(Collectors.minBy(Comparator.comparing(Student::getAge)));
```

例3: 求年龄总和

```java
int totalAge4 = students.stream().collect(Collectors.summingInt(Student::getAge));
```

对应的还有`summingLong`、`summingDouble`。

例4: 求年龄的平均值

```java
double avgAge = students.stream().collect(Collectors.averagingInt(Student::getAge));
```

例5: 一次性得到元素个数、总和、均值、最大值、最小值

```java
IntSummaryStatistics statistics = students.stream().collect(Collectors.summarizingInt(Student::getAge));
```

输出:

```java
IntSummaryStatistics{count=10, sum=220, min=20, average=22.000000, max=24}
```

对应的还有`summarizingLong`、`summarizingDouble`。

例6: 字符串拼接

```java
String names = students.stream().map(Student::getName).collect(Collectors.joining());
// 输出：孔明伯约玄德云长翼德元直奉孝仲谋鲁肃丁奉
String names = students.stream().map(Student::getName).collect(Collectors.joining(", "));
// 输出：孔明, 伯约, 玄德, 云长, 翼德, 元直, 奉孝, 仲谋, 鲁肃, 丁奉
```



### 分组

在数据库操作中，我们可以通过`GROUP BY`关键字对查询到的数据进行分组，java8的流式处理也为我们提供了这样的功能`Collectors.groupingBy`来操作集合。比如我们可以按学校对上面的学生进行分组：

```java
Map<String, List<Student>> groups = students.stream().collect(Collectors.groupingBy(Student::getSchool));
```

`groupingBy`接收一个分类器`Function classifier`，我们可以自定义分类器来实现需要的分类效果。

上面演示的是一级分组，我们还可以定义多个分类器实现 **多级分组**，比如我们希望在按学校分组的基础之上再按照专业进行分组，实现如下：

```java
Map<String, Map<String, List<Student>>> groups2 = students.stream().collect(
                Collectors.groupingBy(Student::getSchool,  // 一级分组，按学校
                Collectors.groupingBy(Student::getMajor)));  // 二级分组，按专业
```

实际上在`groupingBy`的第二个参数不是只能传递groupingBy，还可以传递任意`Collector`类型，比如我们可以传递一个`Collector.counting`，用以统计每个组的个数：

```java
Map<String, Long> groups = students.stream().collect(Collectors.groupingBy(Student::getSchool, Collectors.counting()));
```

如果我们不添加第二个参数，则编译器会默认帮我们添加一个`Collectors.toList()`。

### 分区

分区可以看做是分组的一种特殊情况，在分区中key只有两种情况：true或false，目的是将待分区集合按照条件一分为二，java8的流式处理利用`ollectors.partitioningBy()`方法实现分区，该方法接收一个谓词，例如我们希望将学生分为武大学生和非武大学生，那么可以实现如下：

```java
Map<Boolean, List<Student>> partition = students.stream().collect(Collectors.partitioningBy(student -> "武汉大学".equals(student.getSchool())));
```

# 7. 并行流式数据处理

流式处理中的很多都适合采用 **分而治之** 的思想，从而在处理集合较大时，极大的提高代码的性能，java8的设计者也看到了这一点，所以提供了 **并行流式处理**。上面的例子中我们都是调用`stream()`方法来启动流式处理，java8还提供了`parallelStream()`来启动并行流式处理，`parallelStream()`本质上基于java7的Fork-Join框架实现，其默认的线程数为宿主机的内核数。

启动并行流式处理虽然简单，只需要将`stream()`替换成`parallelStream()`即可，但既然是并行，就会涉及到多线程安全问题，所以在启用之前要先确认并行是否值得（并行的效率不一定高于顺序执行），另外就是要保证线程安全。此两项无法保证，那么并行毫无意义，毕竟结果比速度更加重要，以后有时间再来详细分析一下并行流式数据处理的具体实现和最佳实践。