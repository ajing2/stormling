# mock的单元测试

# 1. 什么是单元测试

单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。对于单元测试中单元的含义，一般来说，要根据实际情况去判定其具体含义，如C语言中单元指一个函数，Java里单元指一个类，图形化的软件中可以指一个窗口或一个菜单等。总的来说，单元就是人为规定的最小的被测功能模块。单元测试是在软件开发过程中要进行的最低级别的测试活动，软件的独立单元将在与程序的其他部分相隔离的情况下进行测试。

参考网址: http://softwaretestingfundamentals.com/unit-testing/

![test1](/Users/lingjing/公众号/单元测试/test1.png)

关键词: individual, smallest

# 2. 单元测试的目的

单元测试的目的是用来确保程式的逻辑如你预期的方式执行，而并不是用来验证是否符合客户的需求的！通过单元测试来建立一道坚实的保障，确保代码在日后的修改中不会被破坏掉。



是不是很失望？单元测试并不是用来验证代码是否符合需求的。

# 3. 单元测试的原则

参考阿里巴巴开发手册(详尽版)

![test2](/Users/lingjing/公众号/单元测试/test2.png)

![test3](/Users/lingjing/公众号/单元测试/test3.png)



#4. 常用的测试架构:

- JUnit [https](https://junit.org/junit5/)[://junit.org/](https://junit.org/)
- TestNG [https://](https://testng.org/)[testng.org](https://testng.org/)[/](https://testng.org/)
- Hamcrest http://hamcrest.org/
- Mockito [https://](https://site.mockito.org/)[site.mockito.org](https://site.mockito.org/)[/](https://site.mockito.org/)
- PowerMock [https://](https://github.com/powermock/powermock)[github.com](https://github.com/powermock/powermock)[/](https://github.com/powermock/powermock)[powermock](https://github.com/powermock/powermock)[/](https://github.com/powermock/powermock)[powermock](https://github.com/powermock/powermock)
- EasyMock http://easymock.org/
- Spock [http://](http://spockframework.org/)[spockframework.org](http://spockframework.org/)[/](http://spockframework.org/)

#5. JUnit

## 5.1 JUnit annotations

- @Before

- @After

- @BeforeClass

- @AfterClass

- @Ignore
- @RunWith
- @Test

##5.2 JUnit asset method

| **S.No.** |                      **Method**                      |                       **Description**                        |
| :-------: | :--------------------------------------------------: | :----------------------------------------------------------: |
|    1.     | void assertEquals(boolean expected,  boolean actual) | It checks whether two values are equals  similar to equals method of Object class |
|    2.     |         void assertFalse(boolean condition)          |    functionality is to check that a  condition is false.     |
|    3.     |          void assertNotNull(Object object)           | "assertNotNull" functionality  is to check that an object is not null. |
|    4.     |            void assertNull(Object object)            | "assertNull" functionality is  to check that an object is null. |
|    5.     |          void assertTrue(boolean condition)          | "assertTrue" functionality is  to check that a condition is true. |
|    6.     |                     void fail()                      | If you want to throw any assertion  error, you have fail() that always results in a fail verdict. |
|    7.     |           void assertSame([String message]           | "assertSame" functionality is  to check that the two objects refer to the same object. |
|    8.     |         void assertNotSame([String message]          | "assertNotSame" functionality is to check  that the two objects do not refer to the same object. |

## 5.3 JUint编写单元测试

```java
@Test(description="mask chinese name")
public void maskChineseName() {
  assertEquals(DesensitizedUtils.maskChinesName(null), null),
  assertEquals(DesensitizedUtils.maskChinesName("张三"), "张*"),
  assertEquals(DesensitizedUtils.maskChinesName("赵钱李"), "赵*李"),
}
@Test(descriptioin="mask email")
public void maskEmail() {
		assertEquals(DesensitizedUtils.maskEmail(null), null), 
  	assertEquals(DesensitizedUtils.maskEmail("test@qq.com"), "t***@qq.com"), 
}
```

#6. Groovy Spock使用介绍(推介)

## 6.1 maven配置

```maven
<dependency>
  <groupId>org.codehaus.groovy</groupId>
  <artifactId>groovy-all</artifactId>
  <version>2.4.15</version>
  <scope>test</scope>
</dependency>
 
<dependency>
  <groupId>org.spockframework</groupId>
  <artifactId>spock-core</artifactId>
  <version>1.0-groovy-2.4</version>
  <scope>test</scope>
</dependency>

```

## 6.2 相关的插件

```pom
<build>
  <finalName>${project.name}</finalName>
  <plugins>
    <plugin>
      <groupId>org.codehaus.gmavenplus</groupId>
      <artifactId>gmavenplus-plugin</artifactId>
      <executions>
        <execution>
          <goals>
            <goal>compile</goal>
          </goals>
        </execution>
     </executions>
    </plugin>
 
 
    <plugin>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>2.20.1</version>
        <configuration>
            <useFile>false</useFile>
            <includes>
                <include>**/*Test.java</include>
                <include>**/*Test.groovy</include>
            </includes>
        </configuration>
    </plugin>
     
    <plugin>
      <groupId>org.jacoco</groupId>
      <artifactId>jacoco-maven-plugin</artifactId>
    </plugin>
  </plugins>
</build>
```

## 6.3 Groovy单侧结构示例

![test4](/Users/lingjing/公众号/单元测试/test4.png)

## 6.4 spock单侧代码示例

```groovy
import spock.lang.Specification
 
class GitlabProjectRepoImplTest extends Specification{
 
   // 申明变量
    GitlabProjectRepo gitlabProjectRepo
 		// 通过Mock初始化对象, 类似@Resource或者@Autowired创建的实例, 不过是虚拟的
    def gitlabProjectClient = Mock(GitlabProjectClient)
 		// 类似于我们JUnit的@Before
    def setup(){
        gitlabProjectRepo = new GitlabProjectRepoImpl(gitlabProjectClient:gitlabProjectClient,githomeProjectClient:githomeProjectClient,ciGitlabProperties:ciGitlabProperties,ciGithomeProperties:ciGithomeProperties,pipelineMapper:pipelineMapper)
    }
 		// 具体的语法后面会介绍
    def "get GitlabProject By GitUrl success" (){
        given:
        def gitlabProjectDTO = new GitlabProjectDTO()
        gitlabProjectDTO.setName("test")
        def str = "http://www.baidu.com/git/xx"
        def response = new ResponseEntity<List<GitlabProjectDTO>>(new ArrayList<GitlabProjectDTO>(), HttpStatus.ACCEPTED)
 
        when:
        def result = gitlabProjectRepo.getGitlabProjectByGitUrl(str+".git")
 
        then:
        1 * gitlabProjectClient.findProjects(_,_,_,_,_) >> response
        result == Optional.EMPTY
    }
}
```

# Groovy 基本语法

官网学习链接地址: http://groovy-lang.org/syntax.html

groovy的语法和python有点相似

#1. 注释

## 1.1 单行注释

```groovy
// a standalone single line comment
println "hello" // a comment till the end of the line
```

## 1.2 多行注释

```groovy
/* a standalone multiline comment
   spanning two lines */
println "hello" /* a multiline comment starting
                   at the end of a statement */
println 1 /* one */ + 2 /* two */
```

## 1.3 Groovy文档注释

```groovy
/**
 * A Class description
 */
class Person {
    /** the name of the person */
    String name

    /**
     * Creates a greeting method for a certain person.
     *
     * @param otherPerson the person to greet
     * @return a greeting message
     */
    String greet(String otherPerson) {
       "Hello ${otherPerson}"
    }
}
```

#2. 关键字

- as

- assert

- break

- case

- catch

- class

- const

- continue

- def

- default

- do

- else

- enum

- extends

- false

- finally

- for

- goto

- if

- implements

- import

- in

- instanceof

- interface

- new

- null

- package

- return

- super

- switch

- this

- throw

- throws

- trait

- true

- try

- while

# 3. 标识符

## 3.1 普通标识符

- 标识符以字母，美元或下划线开头，不能以数字开头，接下来的字符可以包含字母和数字。
- 所有关键字在跟随 `.` 也是有效的标识符。

```groovy
// 正确
def name            
def item3
def with_underscore
def $dollarStart

// 错误
def 3tier
def a+b
def a#b

// 正确
foo.as
foo.assert
foo.break
foo.case
foo.catch
```

## 3.2 引号标识符

引号标识符出现在表达式 `.` 后面。 例如，person.name 表达式的名称部分可用引号引起。例如 person.“name” 或 person.'name'。
 当某些标识符包含被 Java 语言规范禁止的非法字符，但使用引号引起时在 Groovy 中是允许的。 例如，像破折号，空格，感叹号等字符。

```groovy
def map = [:]

map."an identifier with a space and double quotes" = "ALLOWED"
map.'with-dash-signs-and-single-quotes' = "ALLOWED"

assert map."an identifier with a space and double quotes" == "ALLOWED"
assert map.'with-dash-signs-and-single-quotes' == "ALLOWED"


map.'single quote'
map."double quote"
map.'''triple single quote'''
map."""triple double quote"""
map./slashy string/
map.$/dollar slashy string/$


def firstname = "Homer"
map."Simpson-${firstname}" = "Homer Simpson"
assert map.'Simpson-Homer' == "Homer Simpson"
```

# 4. 字符串

- java.lang.String // 不支持插值
- GStrings (groovy.lang.GString) // 支持插值

## 4.1 单引号字符串

单引号字符串为 java.lang.String，不支持插值。

```groovy
'ab' == 'a' + 'b' // 字符串拼接
```

## 4.2 三重单引号字符串

三重单引号字符串为 java.lang.String，不支持插值，三重单引号字符串是多行的，不要用换行符来换行。

```groovy
def startingAndEndingWithANewline = '''
line one
line two
line three
'''

def strippedFirstNewline = '''\   // 字符串包含换行符作为第一个字符，可以通过用反斜杠转义换行来剥离该字符？
line one
line two
line three
'''
assert !strippedFirstNewline.startsWith('\n')
```

## 4.3 特殊转换符

| **Escape** |                    **sequence Character**                    |
| :--------: | :----------------------------------------------------------: |
|    '\t'    |                          tabulation                          |
|    '\b'    |                          backspace                           |
|    '\n'    |                           newline                            |
|    '\r'    |                       carriage return                        |
|    '\f'    |                           formfeed                           |
|    '\\'    |                          backslash                           |
|    '''     | single quote (for single quoted and triple single quoted strings) |
|    '"'     | double quote (for double quoted and triple double quoted strings) |

## 4.4 双引号字符串

- 若没有插值表达式（interpolated expression），则双引号字符串为 java.lang.String，但若存在插值表达式，则为 groovy.lang.GString。

- 除了单引号和三引号字符串外，任何字符串支持插值。

- 插值是在对字符串进行评估时用其值替换字符串中的占位符的行为，占位符表达式由 `${}`。

- `${}` 占位符之间不仅允许表达式，语句也被允许。但语句的值只是 `null`，因此如果在该占位符中插入了几个语句，最后一个应该以某种方式返回一个有意义的值（不推荐插入语句）。

- 在 `.` 表达式使用 `$` 占位符，但表达式中若有方法调用，闭包的花括号或算术运算符将无效。

- 若在 `$` 使用转义符号 `\`，则不有会插值效果。

```groovy
def name = 'Guillaume' // a plain string
def greeting = "Hello ${name}"
assert greeting.toString() == 'Hello Guillaume'


def sum = "The sum of 2 and 3 equals ${2 + 3}"
assert sum.toString() == 'The sum of 2 and 3 equals 5'

${def a = 1; def b = 2; a + b}

def person = [name: 'Guillaume', age: 36]
assert "$person.name is $person.age years old" == 'Guillaume is 36 years old'

def number = 3.14
shouldFail(MissingPropertyException) {
    println "$number.toString()" // 语句将抛出一个 groovy.lang.MissingPropertyException，因为 Groovy 认为您正在尝试访问该数字的 toString 属性，该属性不存在，可以理解 Groovy 解析成 "${number.toString}()"。
}
```

## 4.5 反斜杠字符串

使用 `/` 作为分隔符的斜线字符串。 Slashy 字符串对于定义 **正则表达式** 特别有用，因为不需要转义反斜杠。

也是多行也能被插值。

一个空的斜线字符串不能用双正斜杠表示，因为 Groovy 解析器被理解为单行注释。

```groovy
def fooPattern = /.*foo.*/
assert fooPattern == '.*foo.*'

def escapeSlash = /The character \/ is a forward slash/
assert escapeSlash == 'The character / is a forward slash'

def multilineSlashy = /one
    two
    three/
assert multilineSlashy.contains('\n')

def color = 'blue'
def interpolatedSlashy = /a ${color} car/
assert interpolatedSlashy == 'a blue car'
```

## 4.6 美元转义符

- Dollar slashy string 是多行 GStrings，分隔以 `$/` 开头和以 `/$` 结尾。
- 使用转义符 `$` 可以转义 `$` 和正斜线 `/`。

```groovy
def name = "Guillaume"
def date = "April, 1st"

def dollarSlashy = $/
    Hello $name,
    today we're ${date}.

    $ dollar sign
    $$ escaped dollar sign
    \ backslash
    / forward slash
    $/ escaped forward slash
    $/$ escaped dollar slashy string delimiter
/$
assert [
    'Guillaume',
    'April, 1st',
    '$ dollar sign',
    '$ escaped dollar sign',
    '\\ backslash',
    '/ forward slash',
        '$/ escaped forward slash',
        '/$ escaped dollar slashy string delimiter'

        ].each { dollarSlashy.contains(it) }
```

## 4.7 字符

与 Java 不同，Groovy 没有明确的字符字面量。 但可以通过三种不同的方式明确地将 Groovy 字符串设置成字符类型。

```groovy
char c1 = 'A'
assert c1 instanceof Character

def c2 = 'B' as char
assert c2 instanceof Character

def c3 = (char)'C'
assert c3 instanceof Character
// 当字符被保存在一个变量中时，使用第一种方式好，而当一个 char 值必须作为方法调用的参数传递时使用另外两种方式好。
```

#5. 数字常量

## 5.1 常量类型

- `byte`
- `char`
- `short`
- `int`
- `long`
- `java.lang.BigInteger`

```groovy
// primitive types
byte  b = 1
char  c = 2
short s = 3
int   i = 4
long  l = 5

// infinite precision
BigInteger bi =  6
```

若使用 `def` 关键字声明，则类型取决于该值所兼容的类型。自动识别

```groovy
def a = 1
assert a instanceof Integer

// Integer.MAX_VALUE
def b = 2147483647
assert b instanceof Integer

// Integer.MAX_VALUE + 1
def c = 2147483648
assert c instanceof Long

// Long.MAX_VALUE
def d = 9223372036854775807
assert d instanceof Long

// Long.MAX_VALUE + 1
def e = 9223372036854775808
assert e instanceof BigInteger

def na = -1
assert na instanceof Integer

// Integer.MIN_VALUE
def nb = -2147483648
assert nb instanceof Integer

// Integer.MIN_VALUE - 1
def nc = -2147483649
assert nc instanceof Long

// Long.MIN_VALUE
def nd = -9223372036854775808
assert nd instanceof Long

// Long.MIN_VALUE - 1
def ne = -9223372036854775809
assert ne instanceof BigInteger
```

##5.2 小数

类型:

- `float`
- `double`
- `java.lang.BigDecimal`
- Groovy 使用 `BigDecimal` 是小数的默认值。 另外，`float` 和 `double` 都支持，但需要一个明确的类型声明、类型强制或后缀。
- 在方法或闭包中接受一个类型 `BigDecimal` 类型的值，即使方法参数类型是 `float` 和 `double`。
- 不能使用二进制，八进制或十六进制表示来表示小数。

## 5.3 下划线在数字常量中的应用

简单理解为为了方便区分, 容易分辨

```groovy
long creditCardNumber = 1234_5678_9012_3456L
long socialSecurityNumbers = 999_99_9999L
double monetaryAmount = 12_345_132.12
long hexBytes = 0xFF_EC_DE_5E
long hexWords = 0xFFEC_DE5E
long maxLong = 0x7fff_ffff_ffff_ffffL
long alsoMaxLong = 9_223_372_036_854_775_807L
long bytes = 0b11010010_01101001_10010100_10010010
```

# 6. 布尔

- `true` 和 `false` 是唯一的两个原始布尔值。
- Groovy 有一个特殊的规则（通常称为Groovy Truth），用于将非布尔对象强制为一个布尔值。

```groovy
def myBooleanVariable = true
boolean untypedBooleanVar = false
booleanField = true
```

# 7. 列表

- Groovy 使用 `,` 分隔的值，用 `[]` 括起来表示 lists。

- 因为 Groovy 没有定义自己的集合类，Groovy lists 是 JDK java.util.List，默认使用的实现类是 java.util.ArrayList，除非手动通过操作符 `as` 和声明类型指定。

- lists 可以存放多种类型元素。

```groovy
def numbers = [1, 2, 3]
assert numbers instanceof List  
assert numbers.size() == 3  

def heterogeneous = [1, "a", true]

def arrayList = [1, 2, 3]
assert arrayList instanceof java.util.ArrayList

def linkedList = [2, 3, 4] as LinkedList    
assert linkedList instanceof java.util.LinkedList

LinkedList otherLinked = [3, 4, 5]          
assert otherLinked instanceof java.util.LinkedList
```

- 可通过索引读取和设置值访问 list 中的元素，可用 `<<` leftShift 运算符将元素附加到 list 中。

- 索引范围的值：**[-list.size(), list.size() - 1]**，**小于最小索引获取元素报索引越界，大于最大索引获取元素是 `null`（这点不同 Java）**。

- list 元素可以是另一个 list。

```groovy
def letters = ['a', 'b', 'c', 'd']

assert letters[0] == 'a'     
assert letters[1] == 'b'

assert letters[-1] == 'd'    
assert letters[-2] == 'c'

letters[2] = 'C'             
assert letters[2] == 'C'

letters << 'e'                          // 添加元素到 list 尾部。              
assert letters[4] == 'e'
assert letters[-1] == 'e'               // 注意这个 索引 -1 上的值是最后一个元素

assert letters[1, 3] == ['b', 'd']      // 注意这个返回一个新的 list   
assert letters[2..4] == ['C', 'd', 'e'] // 注意这个返回一个新的 list

def multi = [[0, 1], [2, 3]]     
assert multi[1][0] == 2  
```

# 8. 数组

- 定义数组 Groovy 重用 list 定义方式，若要明确数组类型可通过 `as` 强制或类型声明。

```groovy
String[] arrStr = ['Ananas', 'Banana', 'Kiwi']  // 类型声明

assert arrStr instanceof String[]    
assert !(arrStr instanceof List)

def numArr = [1, 2, 3] as int[]                 // `as` 强制   

assert numArr instanceof int[]       
assert numArr.size() == 3
```

- 支持定义多维数组。
- Groovy 不支持 Java 数组初始化符号 `{}`，因为 `{}` 可能会被曲解成 Groovy 闭包的符号。

```groovy
def matrix3 = new Integer[3][3]         
assert matrix3.size() == 3

Integer[][] matrix2                     
matrix2 = [[1, 2], [3, 4]]
assert matrix2 instanceof Integer[][]

String[] names = ['Cédric', 'Guillaume', 'Jochen', 'Paul']
assert names[0] == 'Cédric'     

names[2] = 'Blackdrag'          
assert names[2] == 'Blackdrag'
```

# 8. Maps

- Groovy 具有 maps 关联键映射到值，使用冒号分隔键和值，并使用逗号分隔每个键/值对，以及由方括号包围的整个键和值。
- Groovy 创建的 map 使用的是 java.util.LinkedHashMap 的实例。

```groovy
def colors = [red: '#FF0000', green: '#00FF00', blue: '#0000FF']   

assert colors['red'] == '#FF0000'   // 取值   
assert colors.green  == '#00FF00'   // 取值  

colors['pink'] = '#FF00FF'          // 设值           
colors.yellow  = '#FFFF00'          // 设值          

assert colors.pink == '#FF00FF'
assert colors['yellow'] == '#FFFF00'

assert colors instanceof java.util.LinkedHashMap

assert colors.unknown == null       // 不存在 key 返回 null
```

可以使用其他类型值作为键。

```groovy
def numbers = [1: 'one', 2: 'two']
assert numbers[1] == 'one'

def key = 'name'
def persons = [key: 'Guillaume']      

assert !persons.containsKey('name')
assert persons.containsKey('key')

person = [(key): 'Guillaume']        

assert person.containsKey('name')    
assert !person.containsKey('key')
```

若变量或表达式作为 map 中的键使用，必须用括号括住变量或表达式

```groovy
def key = 'name'
def persons = [(key): 'Guillaume']        

assert persons.containsKey('name')    
assert !persons.containsKey('key')
```



# spock单元测试框架

推荐大家在写单侧的时候使用spock框架, 使用groovy语言进行编写单侧用例的时候, 要比JUnit简单, 而且方便的多, 会节省大家很多的代码.

官网学习地址:http://spockframework.org/spock/docs/1.3/index.html

# 1. 介绍

我们来看一下官网的介绍, 

![test5](/Users/lingjing/公众号/单元测试/test5.png)

# 2. spock 语法

## 2.1 导入包

```groovy
import spock.lang.*
```

## 2.2 Specification

所有的测试类, 都必须统一继承Specification类

```groovy
class MyFirstSpecification extends Specification {
  // fields
  // fixture methods
  // feature methods
  // helper methods
}
```

## 2.3 Fields(字段, 属性)

```groovy
def obj = new ClassUnderSpecification()
def coll = new Collaborator()

static final PI = 3.141592654
```

## 2.4 Fixture Methods

预先定义的几个固定的函数，与junit或testng中类似，不多解释了

```groovy
def setupSpec() {}    // runs once -  before the first feature method
def setup() {}        // runs before every feature method
def cleanup() {}      // runs after every feature method
def cleanupSpec() {}  // runs once -  after the last feature method
```

## 2.5 Feature Methods(单侧函数)

在写单侧的时候, 我们都需要定义函数, 以下是定义函数的示例:

```groovy
def "pushing an element on the stack"() {
  // blocks go here
}
```

## 2.6 Blocks

每个feture method 又被划分为不同的block, 不同的block处于测试执行的不同阶段, 在各个block 按照不同顺序和规则执行

### 2.6.1 setup blocks

在这个block中会放置测试函数初始化程序

```groovy
setup:
def stack = new Stack()
def elem = "push me"
```

### 2.6.2 given Blocks

given: 给定一个前提条件

```groovy
given:
def stack = new Stack()
def elem = "push me"
```

### 2.6.3 when and then blocks

语法:

```groovy
when:    // stimulus, 当执行改方法的时候, 
then:    // response, 类似于我们的断言
```

示例:

```groovy
given:
def stack = new Stack()
  
when:
stack.push(elem)

then:
!stack.empty
stack.size() == 1
stack.peek() == elem
```

### 2.6.4 Expect Blocks

```
expect:
Math.max(1, 2) == 2
```

相当于

```
when:
def x = Math.max(1, 2)

then:
x == 2
```

### 2.6.5 cleanup blocks

函数退出前做一些清理工作，如关闭资源等。

```
given:
def file = new File("/some/path")
file.createNewFile()

// ...

cleanup:
file.delete()
```

### 2.6.6 where blocks

做测试时最复杂的事情之一就是准备测试数据，尤其是要测试边界条件、测试异常分支等，这些都需要在测试之前规划好数据。但是传统的测试框架很难轻松的制造数据，要么依赖反复调用，要么用xml或者data provider函数之类难以理解和阅读的方式。比如说：

```
class MathSpec extends Specification {
    def "maximum of two numbers"() {
        expect:
        // exercise math method for a few different inputs
        Math.max(1, 3) == 3
        Math.max(7, 4) == 7
        Math.max(0, 0) == 0
    }
}
```

而在spock中，通过where block可以让这类需求实现起来变得非常优雅：

```
class DataDriven extends Specification {
    def "maximum of two numbers"() {
        expect:
        Math.max(a, b) == c

        where:
        a | b || c
        3 | 5 || 5
        7 | 0 || 7
        0 | 0 || 0
    }
}
```

上述例子实际会跑三次测试，相当于在for循环中执行三次测试，a/b/c的值分别为3/5/5,7/0/7和0/0/0。如果在方法前声明@Unroll，则会当成三个方法运行。

更进一步，可以为标记@Unroll的方法声明动态的spec名：

```
class DataDriven extends Specification {
    @Unroll
    def "maximum of #a and #b should be #c"() {
        expect:
        Math.max(a, b) == c

        where:
        a | b || c
        3 | 5 || 5
        7 | 0 || 7
        0 | 0 || 0
    }
}
```

运行时，名称会被替换为实际的参数值。

除此之外，where block还有两种数据定义的方法，并且可以结合使用，如：

```
# a相当于 3    7    0     其他是占位符
where:
a | _
3 | _
7 | _
0 | _
# b相当于5    0     0  这三个值
b << [5, 0, 0]

c = a > b ? a : b
```



## 2.7 断言

### 2.7.1 == 断言

```
when:
stack.push(elem)

then:
!stack.empty
stack.size() == 1
stack.peek() == elem
```

### 2.7.2 关键字assert断言

```
def setup() {
  stack = new Stack()
  assert stack.empty
}
```

### 2.7.3 异常断言

- 方式一:

```
when:
stack.pop()

then:
thrown(EmptyStackException)
stack.empty
```

## 2.8 交互测试(Interaction)

对于测试来说，除了能够对输入-输出进行验证之外，还希望能验证模块与其他模块之间的交互是否正确，比如“是否正确调用了某个某个对象中的函数”；或者期望被调用的模块有某个返回值，等等。

各类mock框架让这类验证变得可行，而spock除了支持这类验证，并且做的更加优雅。如果你还不清楚mock是什么，最好先去简单了解一下，网上的资料非常多，这里就不展开了。

### 2.8.1 mock

在spock中创建一个mock对象非常简单：

```
class PublisherSpec extends Specification {
    Publisher publisher = new Publisher()
    Subscriber subscriber = Mock()
    Subscriber subscriber2 = Mock()

    def setup() {
        publisher.subscribers.add(subscriber)
        publisher.subscribers.add(subscriber2)
    }
}
```

而创建了mock对象之后就可以对它的交互做验证了：

```groovy
def "should send messages to all subscribers"() {
    when:
    publisher.send("hello")
 
    then:
    1 * subscriber.receive("hello")
    1 * subscriber2.receive("hello")
}
```

上面的例子里验证了：在publisher调用send时，两个subscriber都应该被调用一次receive(“hello”)。

示例中，表达式中的次数、对象、函数和参数部分都可以灵活定义：

```
1 * subscriber.receive("hello")      // exactly one call 一次
0 * subscriber.receive("hello")      // zero calls 0次
(1..3) * subscriber.receive("hello") // between one and three calls (inclusive) 1-3次
(1.._) * subscriber.receive("hello") // at least one call 最少一次
(_..3) * subscriber.receive("hello") // at most three calls 最多三次
_ * subscriber.receive("hello")      // any number of calls, including zero 调用任意次
1 * subscriber.receive("hello")     // an argument that is equal to the String "hello" 
1 * subscriber.receive(!"hello")    // an argument that is unequal to the String "hello"
1 * subscriber.receive()            // the empty argument list (would never match in our example)
1 * subscriber.receive(_)           // any single argument (including null)
1 * subscriber.receive(*_)          // any argument list (including the empty argument list)
1 * subscriber.receive(!null)       // any non-null argument
1 * subscriber.receive(_ as String) // any non-null argument that is-a String
1 * subscriber.receive({ it.size() > 3 }) // an argument that satisfies the given predicate
                                          // (here: message length is greater than 3)
1 * subscriber._(*_)     // any method on subscriber, with any argument list
1 * subscriber._         // shortcut for and preferred over the above
1 * _._                  // any method call on any mock object
1 * _                    // shortcut for and preferred over the above
```

得益于groovy脚本语言的特性，在定义交互的时候不需要对每个参数指定类型，如果用过java下的其它mock框架应该会被这个特性深深的吸引住。

### 2.8.2 stubbing

对mock对象定义函数的返回值可以用如下方法：

```groovy
subscriber.receive(_) >> "ok"
```

符号代表函数的返回值，执行上面的代码后，再调用subscriber.receice方法将返回ok。如果要每次调用返回不同结果，可以使用：

```groovy
subscriber.receive(_) >>> ["ok", "error", "error", "ok"]
```

如果要做额外的操作，如抛出异常，可以使用：

```groovy
subscriber.receive(_) >> { throw new InternalError("ouch") }
```

而如果要每次调用都有不同的结果，可以把多次的返回连接起来：

```groovy
subscriber.receive(_) >>> ["ok", "fail", "ok"] >> { throw new InternalError() } >> "ok"
```



## 2.9 spock对比JUnit

| Spock               | JUnit                              |
| :------------------ | :--------------------------------- |
| Specification       | Test class                         |
| `setup()`           | `@Before`                          |
| `cleanup()`         | `@After`                           |
| `setupSpec()`       | `@BeforeClass`                     |
| `cleanupSpec()`     | `@AfterClass`                      |
| Feature             | Test                               |
| Feature method      | Test method                        |
| Data-driven feature | Theory                             |
| Condition           | Assertion                          |
| Exception condition | `@Test(expected=…)`                |
| Interaction         | Mock expectation (e.g. in Mockito) |

# 3. Spock测试框架中的注解使用

- @Share: 在测试类中，Share标记的变量可以在不同的测试方法中使用。
- @Ignore: 忽略测试方法
- @IgnoreRest: 忽略其他测试方法
- @Unroll: 展开数据管道的测试用例
- @FailsWith(ArithmeticException.class) : 记录已经标记的bug, 标记让方法执行失败的测试用例
- @TimeOut(value=10, unit=TimeUnit.MILLISECONDS) 超时时间设计
- @Ignorelf: 根据条件忽略
- @Requires: 根据条件执行
- @Retry(count = 5) 重试