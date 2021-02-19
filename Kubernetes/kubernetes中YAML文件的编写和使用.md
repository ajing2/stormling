# kubernetes中YAML文件的编写和使用

# 1. YAML基础

yaml的基本语法规则：

1. 大小写敏感
2. 所用缩进标识层级关系
3. 缩进时不允许使用tab键， 只允许使用空格键
4. 缩进的空格数目不重要， 只要相同层级的元素左侧对齐即可
5. 使用#标识注释， 从这个字符一直到行尾， 都会被解析器忽略

# 2. YAML主要的两种数据结构

## 1. Maps

Map就是一个key:value的键值对， 例如:

```
---
apiVersion: v1
kind: Pod
```

第一行的---是分隔符，是可选的，在单一yaml文件中，可用连续三个连字号---区分多个文件。这里我们可以看到，我们有两个键：kind 和 apiVersion，他们对应的值分别是：v1 和Pod。

创建一个相对复杂一点的 YAML 文件，一个 KEY 对应的值不是字符串而是一个 Maps：

```
---
apiVersion: v1
kind: Pod
metadata:
  name: kube100-site
  labels:
    app: web
```

上面的 YAML 文件，metadata 这个 KEY 对应的值就是一个 Maps 了，而且嵌套的 labels 这个 KEY 的值又是一个 Map，你可以根据你自己的情况进行多层嵌套。

上面我们也提到了 YAML 文件的语法规则，YAML 处理器是根据行缩进来知道内容之间的关联性的。比如我们上面的 YAML 文件，我用了两个空格作为缩进，空格的数量并不重要，但是你得保持一致，并且至少要求一个空格（什么意思？就是你别一会缩进两个空格，一会缩进4个空格）。

我们可以看到 name 和 labels 是相同级别的缩进，所以 YAML 处理器就知道了他们属于同一个 MAP，而 app 是 labels 的值是因为 app 的缩进更大。



## 2. Lists

Lists说白了就是类似python中的列表， 在YAML文件中我们可以这样定义：

```
args
  - Cat
  - Dog
  - Fish
```

当然，list 的子项也可以是 Maps，Maps 的子项也可以是list如下所示：
 比如这个 YAML 文件，我们定义了一个叫 containers 的 List 对象，每个子项都由 name、image、ports 组成，每个 ports 都有一个 key 为 containerPort 的 Map 组成。

```ruby
---
apiVersion: v1
kind: Pod
metadata:
  name: kube100-site
  labels:
    app: web
spec:
  containers:
    - name: front-end
      image: nginx
      ports:
      - containerPort: 80
    - name: flaskapp-demo
      image: jcdemo/flaskapp
      ports:
      - containerPort: 5000
```



# 3. 现实中的应用场景

在我们现在的平台中， 目前使用到jar包和war包发布， 并不是我们熟悉kubernetes中所使用的images， 如果要把我们现在的业务中， 接入到Kubernetes中， 我们可以有两种方案：

1. 在我们进行打包的过程中， 在达成jar包的时候， 在运行images进行的命令， 通过模板的形式， 打包成images的形式， 这样可以直接上传到我们自己私有的harbor
2. 我们可以不改变现在的目前的逻辑， 反正在生成镜像这个目标是是脱离于CI这个流程之外的， 我们在可以CD的时候， 在通过dockerFile的形式， 生成images, 在传入到私有仓库中， 然后在通过K8S的形式进行发布。