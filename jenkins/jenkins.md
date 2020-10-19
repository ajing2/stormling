# 1. 流水线

## 1. 什么是jenkins的流水线

Jenkins 流水线 (或简单的带有大写"P"的"Pipeline") 是一套插件，它支持实现和集成 *continuous delivery pipelines* 到Jenkins。

_continuous delivery (CD) pipeline_是你的进程的自动表达，用于从版本控制向用户和客户获取软件。 你的软件的每次的变更 (在源代码控制中提交)在它被释放的路上都经历了一个复杂的过程 on its way to being released. 这个过程包括以一种可靠并可重复的方式构建软件, 以及通过多个测试和部署阶段来开发构建好的软件 (c成为 "build") 。

流水线提供了一组可扩展的工具，通过 [Pipeline domain-specific language (DSL) syntax](https://www.jenkins.io/zh/doc/book/pipeline/syntax). [[1](https://www.jenkins.io/zh/doc/book/pipeline/#_footnotedef_1)]对从简单到复杂的交付流水线 "作为代码" 进行建模。

对Jenkins 流水线的定义被写在一个文本文件中 (成为 [`Jenkinsfile`](https://www.jenkins.io/zh/doc/book/pipeline/jenkinsfile))，该文件可以被提交到项目的源代码的控制仓库。 [[2](https://www.jenkins.io/zh/doc/book/pipeline/#_footnotedef_2)] 这是"流水线即代码"的基础; 将CD 流水线作为应用程序的一部分，像其他代码一样进行版本化和审查。 创建 `Jenkinsfile`并提交它到源代码控制中提供了一些即时的好处:

- 自动地为所有分支创建流水线构建过程并拉取请求。
- 在流水线上代码复查/迭代 (以及剩余的源代码)。
- 对流水线进行审计跟踪。
- 该流水线的真正的源代码 [[3](https://www.jenkins.io/zh/doc/book/pipeline/#_footnotedef_3)], 可以被项目的多个成员查看和编辑。

While定义流水线的语法, 无论是在 web UI 还是在 `Jenkinsfile` 中都是相同的, 通常认为在`Jenkinsfile` 中定义并检查源代码控制是最佳实践。

## 2. 流水线的概念

下面的概念是Jenkins流水线很关键的一方面 , 它与流水线语法紧密相连 (参考 [overview](https://www.jenkins.io/zh/doc/book/pipeline/#pipeline-syntax-overview) below).

### 流水线

流水线是用户定义的一个CD流水线模型 。流水线的代码定义了整个的构建过程, 他通常包括构建, 测试和交付应用程序的阶段 。

另外 ， `pipeline` 块是 [声明式流水线语法的关键部分](https://www.jenkins.io/zh/doc/book/pipeline/#declarative-pipeline-fundamentals).

### 节点

节点是一个机器 ，它是Jenkins环境的一部分 and is capable of执行流水线。

另外, `node`块是 [脚本化流水线语法的关键部分](https://www.jenkins.io/zh/doc/book/pipeline/#scripted-pipeline-fundamentals).

### 阶段

 `stage` 块定义了在整个流水线的执行任务的概念性地不同的的子集(比如 "Build", "Test" 和 "Deploy" 阶段), 它被许多插件用于可视化 或Jenkins流水线目前的 状态/进展. [[6](https://www.jenkins.io/zh/doc/book/pipeline/#_footnotedef_6)]

### 步骤

 本质上 ，一个单一的任务, a step 告诉Jenkins 在特定的时间点要做_what_ (或过程中的 "step")。 举个例子,要执行shell命令 ，请使用 `sh` 步骤: `sh 'make'`。当一个插件扩展了流水线DSL, [[1](https://www.jenkins.io/zh/doc/book/pipeline/#_footnotedef_1)] 通常意味着插件已经实现了一个新的 *step*。

### 声明式流水线基础

  在声明式流水线语法中, `pipeline` 块定义了整个流水线中完成的所有的工作。 

```jenkinsfile
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any //1
    stages {
        stage('Build') { //2
            steps {
                // 3
            }
        }
        stage('Test') { //4 
            steps {
                // 5
            }
        }
        stage('Deploy') { //6 
            steps {
                // 7
            }
        }
    }
}
```

1.  在任何可用的代理上，执行流水线或它的任何阶段 
2.  定义 "Build" 阶段 
3.  执行与 "Build" 阶段相关的步骤。 
4.  定义"Test" 阶段。 
5.  执行与"Test" 阶段相关的步骤 
6.  定义 "Deploy" 阶段
7.  执行与 "Deploy" 阶段相关的步骤 

# 2. jenkinsFile

从上面的知识， 我们知道了， 在构建devops平台中， 最常使用的就是jenkins的流水线， 但是流水线进行自动化构建， 测试， 部署， 就是通过jenkinsFile来实现的。那接下来， 我们就来学习一下jenkinsFile的语法吧

## 1. 流水线语法

### 声明式流水线

声明式流水线是最近添加到 Jenkins 流水线的 [[1](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#_footnotedef_1)]，它在流水线子系统之上提供了一种更简单，更有主见的语法。

所有有效的声明式流水线必须包含在一个 `pipeline` 块中, 比如:

```
pipeline {
    /* insert Declarative Pipeline here */
}
```

在声明式流水线中有效的基本语句和表达式遵循与 [Groovy的语法](http://groovy-lang.org/syntax.html)同样的规则， 有以下例外:

- 流水线顶层必须是一个 *block*, 特别地: `pipeline { }`
- 没有分号作为语句分隔符，，每条语句都必须在自己的行上。
- 块只能由 [节段](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#declarative-sections), [指令](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#declarative-directives), [步骤](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#declarative-steps), 或赋值语句组成。 *属性引用语句被视为无参方法调用。 例如, input被视为 input()

------

### 节段 

声明式流水线中的节段通常包含一个或多个 [指令](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#declarative-directives) 或 [步骤](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#declarative-steps)。

#### 代理

 `agent` 部分指定了整个流水线或特定的部分, 将会在Jenkins环境中执行的位置，这取决于 `agent` 区域的位置。该部分必须在 `pipeline` 块的顶层被定义, 但是 stage 级别的使用是可选的。

| Required   | Yes                                                          |
| :--------- | ------------------------------------------------------------ |
| Parameters | [Described below](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#agent-parameters) |
| Allowed    | In the top-level `pipeline` block and each `stage` block.    |

##### 参数

为了支持作者可能有的各种各样的用例流水线, `agent` 部分支持一些不同类型的参数。这些参数应用在`pipeline`块的顶层, 或 `stage` 指令内部。

- any

  在任何可用的代理上执行流水线或阶段。例如: `agent any`

- none

  当在 `pipeline` 块的顶部没有全局代理， 该参数将会被分配到整个流水线的运行中并且每个 `stage` 部分都需要包含他自己的 `agent` 部分。比如: `agent none`

- label

  在提供了标签的 Jenkins 环境中可用的代理上执行流水线或阶段。 例如: `agent { label 'my-defined-label' }`

- node

  `agent { node { label 'labelName' } }` 和 `agent { label 'labelName' }` 一样, 但是 `node` 允许额外的选项 (比如 `customWorkspace` )。

- docker

  使用给定的容器执行流水线或阶段。该容器将在预置的 [node](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#../glossary#node)上，或在匹配可选定义的`label` 参数上，动态的供应来接受基于Docker的流水线。 `docker` 也可以选择的接受 `args` 参数，该参数可能包含直接传递到 `docker run` 调用的参数, 以及 `alwaysPull` 选项, 该选项强制 `docker pull` ，即使镜像名称已经存在。 比如: `agent { docker 'maven:3-alpine' }` 或

  ```
  agent {
      docker {
          image 'maven:3-alpine'
          label 'my-defined-label'
          args  '-v /tmp:/tmp'
      }
  }
  ```

  

- dockerfile

  执行流水线或阶段, 使用从源代码库包含的 `Dockerfile` 构建的容器。为了使用该选项， `Jenkinsfile` 必须从多个分支流水线中加载, 或者加载 "Pipeline from SCM." 通常，这是源代码仓库的根目录下的 `Dockerfile` : `agent { dockerfile true }`. 如果在另一个目录下构建 `Dockerfile` , 使用 `dir` 选项: `agent { dockerfile {dir 'someSubDir' } }`。如果 `Dockerfile` 有另一个名称, 你可以使用 `filename` 选项指定该文件名。你可以传递额外的参数到 `docker build ...` 使用 `additionalBuildArgs` 选项提交, 比如 `agent { dockerfile {additionalBuildArgs '--build-arg foo=bar' } }`。 例如, 一个带有 `build/Dockerfile.build` 的仓库,期望一个构建参数 `version`:

  ```
  agent {
      // Equivalent to "docker build -f Dockerfile.build --build-arg version=1.0.2 ./build/
      dockerfile {
          filename 'Dockerfile.build'
          dir 'build'
          label 'my-defined-label'
          additionalBuildArgs  '--build-arg version=1.0.2'
      }
  }
  ```

  

##### 常见选项

有一些应用于两个或更多 `agent` 的实现的选项。他们不被要求，除非特别规定。

- label

  一个字符串。该标签用于运行流水线或个别的 `stage`。该选项对 `node`, `docker` 和 `dockerfile` 可用, `node`要求必须选择该选项。

- customWorkspace

  一个字符串。在自定义工作区运行应用了 `agent` 的流水线或个别的 `stage`, 而不是默认值。 它既可以是一个相对路径, 在这种情况下，自定义工作区会存在于节点工作区根目录下, 或者一个绝对路径。比如:

  ``````
  agent {
      node {
          label 'my-defined-label'
          customWorkspace '/some/other/path'
      }
  }
  ``````

  该选项对 `node`, `docker` 和 `dockerfile` 有用 。

- reuseNode

  一个布尔值, 默认为false。 如果是true, 则在流水线的顶层指定的节点上运行该容器, 在同样的工作区, 而不是在一个全新的节点上。这个选项对 `docker` 和 `dockerfile` 有用, 并且只有当 使用在个别的 `stage` 的 `agent` 上才会有效。

示例

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent { docker 'maven:3-alpine' } // 1 
    stages {
        stage('Example Build') {
            steps {
                sh 'mvn -B clean verify'
            }
        }
    }
}
```

1.  在一个给定名称和标签(`maven:3-alpine`)的新建的容器上执行定义在流水线中的所有步骤 。 

 阶段级别的 `agent` 部分 

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent none 
    stages {
        stage('Example Build') {
            agent { docker 'maven:3-alpine' } 
            steps {
                echo 'Hello, Maven'
                sh 'mvn --version'
            }
        }
        stage('Example Test') {
            agent { docker 'openjdk:8-jre' } 
            steps {
                echo 'Hello, JDK'
                sh 'java -version'
            }
        }
    }
}
```

1.  在流水线顶层定义 `agent none` 确保 [an Executor](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#../glossary#executor) 没有被分配。 使用 `agent none` 也会强制 `stage` 部分包含他自己的 `agent` 部分。 
2.  使用镜像在一个新建的容器中执行该阶段的该步骤。 
3.  使用一个与之前阶段不同的镜像在一个新建的容器中执行该阶段的该步骤 .

------

### post

`post` 部分定义一个或多个[steps](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#declarative-steps) ，这些阶段根据流水线或阶段的完成情况而 运行(取决于流水线中 `post` 部分的位置). `post` 支持以下 [post-condition](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#post-conditions) 块中的其中之一: `always`, `changed`, `failure`, `success`, `unstable`, 和 `aborted`。这些条件块允许在 `post` 部分的步骤的执行取决于流水线或阶段的完成状态。

| Required   | No                                                        |
| :--------- | --------------------------------------------------------- |
| Parameters | *None*                                                    |
| Allowed    | In the top-level `pipeline` block and each `stage` block. |

##### Conditions

- `always`

  无论流水线或阶段的完成状态如何，都允许在 `post` 部分运行该步骤。

- `changed`

  只有当前流水线或阶段的完成状态与它之前的运行不同时，才允许在 `post` 部分运行该步骤。

- `failure`

  只有当前流水线或阶段的完成状态为"failure"，才允许在 `post` 部分运行该步骤, 通常web UI是红色。

- `success`

  只有当前流水线或阶段的完成状态为"success"，才允许在 `post` 部分运行该步骤, 通常web UI是蓝色或绿色。

- `unstable`

  只有当前流水线或阶段的完成状态为"unstable"，才允许在 `post` 部分运行该步骤, 通常由于测试失败,代码违规等造成。通常web UI是黄色。

- `aborted`

  只有当前流水线或阶段的完成状态为"aborted"，才允许在 `post` 部分运行该步骤, 通常由于流水线被手动的aborted。通常web UI是灰色。

示例

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any
    stages {
        stage('Example') {
            steps {
                echo 'Hello World'
            }
        }
    }
    post { 
        always { 
            echo 'I will always say Hello again!'
        }
    }
}
```

1.  按照惯例, `post` 部分应该放在流水线的底部。 

2.  [Post-condition](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#post-conditions) 块包含与 [steps](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#steps) 部分相同的[steps](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#declarative-steps)。 

------

#### stages

包含一系列一个或多个 [stage](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#stage) 指令, `stages` 部分是流水线描述的大部分"work" 的位置。 建议 `stages` 至少包含一个 [stage](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#stage) 指令用于连续交付过程的每个离散部分,比如构建, 测试, 和部署。

| Required   | Yes                                     |
| :--------- | --------------------------------------- |
| Parameters | *None*                                  |
| Allowed    | Only once, inside the `pipeline` block. |


 示例

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any
    stages { 
        stage('Example') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
```

1. steps部分必须包含一个或者多个步骤

------

## 指令

#### environment

`environment` 指令制定一个 键-值对序列，该序列将被定义为所有步骤的环境变量，或者是特定于阶段的步骤， 这取决于 `environment` 指令在流水线内的位置。

该指令支持一个特殊的助手方法 `credentials()` ，该方法可用于在Jenkins环境中通过标识符访问预定义的凭证。对于类型为 "Secret Text"的凭证, `credentials()` 将确保指定的环境变量包含秘密文本内容。对于类型为 "SStandard username and password"的凭证, 指定的环境变量指定为 `username:password` ，并且两个额外的环境变量将被自动定义 :分别为 `MYVARNAME_USR` 和 `MYVARNAME_PSW` 。

| Required   | No                                                         |
| :--------- | ---------------------------------------------------------- |
| Parameters | *None*                                                     |
| Allowed    | Inside the `pipeline` block, or within `stage` directives. |

示例 

```
enkinsfile (Declarative Pipeline)
pipeline {
    agent any
    environment { //1
        CC = 'clang'
    }
    stages {
        stage('Example') {
            environment {//2 
                AN_ACCESS_KEY = credentials('my-prefined-secret-text') //3
            }
            steps {
                sh 'printenv'
            }
        }
    }
}
```

1.  顶层流水线块中使用的 `environment` 指令将适用于流水线中的所有步骤。
2.  在一个 `stage` 中定义的 `environment` 指令只会将给定的环境变量应用于 `stage` 中的步骤 
3.  `environment` 块有一个 助手方法 `credentials()` 定义，该方法可以在 Jenkins 环境中用于通过标识符访问预定义的凭证。 

------

### options

`options` 指令允许从流水线内部配置特定于流水线的选项。 流水线提供了许多这样的选项, 比如 `buildDiscarder`,但也可以由插件提供, 比如 `timestamps`.

| Required   | No                                      |
| :--------- | --------------------------------------- |
| Parameters | *None*                                  |
| Allowed    | Only once, inside the `pipeline` block. |

##### 可用选项

- buildDiscarder

  为最近的流水线运行的特定数量保存组件和控制台输出。例如: `options { buildDiscarder(logRotator(numToKeepStr: '1')) }`

- disableConcurrentBuilds

  不允许同时执行流水线。 可被用来防止同时访问共享资源等。 例如: `options { disableConcurrentBuilds() }`

- overrideIndexTriggers

  允许覆盖分支索引触发器的默认处理。 如果分支索引触发器在多分支或组织标签中禁用, `options { overrideIndexTriggers(true) }` 将只允许它们用于促工作。否则, `options { overrideIndexTriggers(false) }` 只会禁用改作业的分支索引触发器。

- skipDefaultCheckout

  在`agent` 指令中，跳过从源代码控制中检出代码的默认情况。例如: `options { skipDefaultCheckout() }`

- skipStagesAfterUnstable

  一旦构建状态变得UNSTABLE，跳过该阶段。例如: `options { skipStagesAfterUnstable() }`

- checkoutToSubdirectory

  在工作空间的子目录中自动地执行源代码控制检出。例如: `options { checkoutToSubdirectory('foo') }`

- timeout

  设置流水线运行的超时时间, 在此之后，Jenkins将中止流水线。例如: `options { timeout(time: 1, unit: 'HOURS') }`

- retry

  在失败时, 重新尝试整个流水线的指定次数。 For example: `options { retry(3) }`

- timestamps

  预谋所有由流水线生成的控制台输出，与该流水线发出的时间一致。 例如: `options { timestamps() }`

Example

  ```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any
    options {
        timeout(time: 1, unit: 'HOURS') //1
    }
    stages {
        stage('Example') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
  ```

1.  指定一个小时的全局执行超时, 在此之后，Jenkins 将中止流水线运行。 

阶段选项

`stage` 的 `options` 指令类似于流水线根目录上的 `options` 指令。然而， `stage` -级别 `options` 只能包括 `retry`, `timeout`, 或 `timestamps` 等步骤, 或与 `stage` 相关的声明式选项，如 `skipDefaultCheckout`。

在`stage`, `options` 指令中的步骤在进入 `agent` 之前被调用或在 `when` 条件出现时进行检查。

###### 可选的阶段选项

- skipDefaultCheckout

  在 `agent` 指令中跳过默认的从源代码控制中检出代码。例如: `options { skipDefaultCheckout() }`

- timeout

  设置此阶段的超时时间, 在此之后， Jenkins 会终止该阶段。 例如: `options { timeout(time: 1, unit: 'HOURS') }`

- retry

  在失败时, 重试此阶段指定次数。 例如: `options { retry(3) }`

- timestamps

  预谋此阶段生成的所有控制台输出以及该行发出的时间一致。例如: `options { timestamps() }`

 示例  

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any
    stages {
        stage('Example') {
            options {
                timeout(time: 1, unit: 'HOURS') 
            }
            steps {
                echo 'Hello World'
            }
        }
    }
}
```

------

### 参数

`parameters` 指令提供了一个用户在触发流水线时应该提供的参数列表。这些用户指定参数的值可通过 `params` 对象提供给流水线步骤, 了解更多请参考[示例](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#parameters-example)。

| Required   | No                                      |
| :--------- | --------------------------------------- |
| Parameters | *None*                                  |
| Allowed    | Only once, inside the `pipeline` block. |

##### 可用参数

- string

  字符串类型的参数, 例如: `parameters { string(name: 'DEPLOY_ENV', defaultValue: 'staging', description: '') }`

- booleanParam

  布尔参数, 例如: `parameters { booleanParam(name: 'DEBUG_BUILD', defaultValue: true, description: '') }`

示例 

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any
    parameters {
        string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
    }
    stages {
        stage('Example') {
            steps {
                echo "Hello ${params.PERSON}"
            }
        }
    }
}
```

------

### 触发器

`triggers` 指令定义了流水线被重新触发的自动化方法。对于集成了源（ 比如 GitHub 或 BitBucket）的流水线, 可能不需要 `triggers` ，因为基于 web 的集成很肯能已经存在。 当前可用的触发器是 `cron`, `pollSCM` 和 `upstream`。

| Required   | No                                      |
| :--------- | --------------------------------------- |
| Parameters | *None*                                  |
| Allowed    | Only once, inside the `pipeline` block. |

- cron

  接收 cron 样式的字符串来定义要重新触发流水线的常规间隔 ,比如: `triggers { cron('H */4 * * 1-5') }`

- pollSCM

  接收 cron 样式的字符串来定义一个固定的间隔，在这个间隔中，Jenkins 会检查新的源代码更新。如果存在更改, 流水线就会被重新触发。例如: `triggers { pollSCM('H */4 * * 1-5') }`

- upstream

  接受逗号分隔的工作字符串和阈值。 当字符串中的任何作业以最小阈值结束时，流水线被重新触发。例如: `triggers { upstream(upstreamProjects: 'job1,job2', threshold: hudson.model.Result.SUCCESS) }`
    `pollSCM` 只在Jenkins 2.22 及以上版本中可用 

示例

```
enkinsfile (Declarative Pipeline)
pipeline {
    agent any
    triggers {
        cron('H */4 * * 1-5')
    }
    stages {
        stage('Example') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
```

------

#### stage

`stage` 指令在 `stages` 部分进行，应该包含一个 实际上, 流水巷所做的所有实际工作都将封装进一个或多个 `stage` 指令中。

| Required   | At least one                                                 |
| :--------- | ------------------------------------------------------------ |
| Parameters | One mandatory parameter, a string for the name of the stage. |
| Allowed    | Inside the `stages` section.                                 |

示例 

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any
    stages {
        stage('Example') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
```

#### 工具

定义自动安装和放置 `PATH` 的工具的一部分。如果 `agent none` 指定，则忽略该操作。

| Required   | No                                              |
| :--------- | ----------------------------------------------- |
| Parameters | *None*                                          |
| Allowed    | Inside the `pipeline` block or a `stage` block. |

##### 支持工具

- maven
- jdk
- gradle


 示例

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any
    tools {
        maven 'apache-maven-3.0.1' 
    }
    stages {
        stage('Example') {
            steps {
                sh 'mvn --version'
            }
        }
    }
}
```

#### input

`stage` 的 `input` 指令允许你使用 [`input` step](https://jenkins.io/doc/pipeline/steps/pipeline-input-step/#input-wait-for-interactive-input)提示输入。 在应用了 `options` 后，进入 `stage` 的 `agent` 或评估 `when` 条件前， `stage` 将暂停。 如果 `input` 被批准, `stage` 将会继续。 作为 `input` 提交的一部分的任何参数都将在环境中用于其他 `stage`。

##### 配置项

- message

  必需的。 这将在用户提交 `input` 时呈现给用户。

- id

  `input` 的可选标识符， 默认为 `stage` 名称。

- ok

  `input`表单上的"ok" 按钮的可选文本。

- submitter

  可选的以逗号分隔的用户列表或允许提交 `input` 的外部组名。默认允许任何用户。

- submitterParameter

  环境变量的可选名称。如果存在，用 `submitter` 名称设置。

- parameters

  提示提交者提供的一个可选的参数列表。 更多信息参见 [[parameters\]](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#parameters)。


 示例

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any
    stages {
        stage('Example') {
            input {
                message "Should we continue?"
                ok "Yes, we should."
                submitter "alice,bob"
                parameters {
                    string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
                }
            }
            steps {
                echo "Hello, ${PERSON}, nice to meet you."
            }
        }
    }
}
```

#### when

`when` 指令允许流水线根据给定的条件决定是否应该执行阶段。 `when` 指令必须包含至少一个条件。 如果 `when` 指令包含多个条件, 所有的子条件必须返回True，阶段才能执行。 这与子条件在 `allOf` 条件下嵌套的情况相同 (参见下面的[示例](https://www.jenkins.io/zh/doc/book/pipeline/syntax/#when-example))。

使用诸如 `not`, `allOf`, 或 `anyOf` 的嵌套条件可以构建更复杂的条件结构 can be built 嵌套条件刻意潜逃到任意深度。

| Required   | No                         |
| :--------- | -------------------------- |
| Parameters | *None*                     |
| Allowed    | Inside a `stage` directive |

##### 内置条件

- branch

  当正在构建的分支与模式给定的分支匹配时，执行这个阶段, 例如: `when { branch 'master' }`。注意，这只适用于多分支流水线。

- environment

  当指定的环境变量是给定的值时，执行这个步骤, 例如: `when { environment name: 'DEPLOY_TO', value: 'production' }`

- expression

  当指定的Groovy表达式评估为true时，执行这个阶段, 例如: `when { expression { return params.DEBUG_BUILD } }`

- not

  当嵌套条件是错误时，执行这个阶段,必须包含一个条件，例如: `when { not { branch 'master' } }`

- allOf

  当所有的嵌套条件都正确时，执行这个阶段,必须包含至少一个条件，例如: `when { allOf { branch 'master'; environment name: 'DEPLOY_TO', value: 'production' } }`

- anyOf

  当至少有一个嵌套条件为真时，执行这个阶段,必须包含至少一个条件，例如: `when { anyOf { branch 'master'; branch 'staging' } }`

##### 在进入 `stage` 的 `agent` 前评估 `when`

默认情况下, 如果定义了某个阶段的代理，在进入该`stage` 的 `agent` 后该 `stage` 的 `when` 条件将会被评估。但是, 可以通过在 `when` 块中指定 `beforeAgent` 选项来更改此选项。 如果 `beforeAgent` 被设置为 `true`, 那么就会首先对 `when` 条件进行评估 , 并且只有在 `when` 条件验证为真时才会进入 `agent` 。


 示例

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            when {
                branch 'production'
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}
```

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            when {
                branch 'production'
                environment name: 'DEPLOY_TO', value: 'production'
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}

```

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            when {
                allOf {
                    branch 'production'
                    environment name: 'DEPLOY_TO', value: 'production'
                }
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}
```

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            when {
                expression { BRANCH_NAME ==~ /(production|staging)/ }
                anyOf {
                    environment name: 'DEPLOY_TO', value: 'production'
                    environment name: 'DEPLOY_TO', value: 'staging'
                }
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}
```

```
Jenkinsfile (Declarative Pipeline)
pipeline {
    agent none
    stages {
        stage('Example Build') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Example Deploy') {
            agent {
                label "some-label"
            }
            when {
                beforeAgent true
                branch 'production'
            }
            steps {
                echo 'Deploying'
            }
        }
    }
}
```

