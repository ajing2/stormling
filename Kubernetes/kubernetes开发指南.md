# kubernetes开发指南

上一节， 我们已经知道kubernetes的常用术语和一些思想， 那接下来， 我们是不是应该来一个简单的例子， 跑起来试试呢？

kubernetes要想进行二次开发， 或者简单的说跑起来， 运行一个小实例， 那就要求我们需要对ta的常用操作相当的熟悉， 那入手了解kubectl, 是非常快速的可以玩起来的一个方式， 下面， 我们就先来看看kubectl的命令行操作的常用方式。

# 1. kubectl用法详解

## 1. kubectl语法

```
kubectl [command] [Type] [NAME] [flags]
```

- command: 子命令， 用于操作kubernetes集群资源对象的命令， 例如： create, delete, describe, get, apply等等
- TYPE: 资源对象的类型， 区分大小写， 能以单数，复数或者简写形式表示。 例如以下3中TYPE是等价的。

```
kubectl get pod pod1
kubectl get pods pod1
kubectl get po pod1
```

- NAME： 资源对象的名称， 区分大小写。 如果不指定名称， 系统则将返回属于TYPE的全部对象的列表，例如： kubectl get pods 将返回所有pod的列表
- flags: kubectl 子命令的可选参数， 例如使用 -s  指定api server的url地址而不用默认值。



kubectl可操作的资源对象类型以及缩写

|         资源类型         |  缩写  |                             说明                             |
| :----------------------: | :----: | :----------------------------------------------------------: |
|         clusters         |        |                             集群                             |
|    componentstatuses     |   cs   |                        查看各组件信息                        |
|        configmaps        |   cm   |       ConfigMap是用来存储配置文件的kubernetes资源对象        |
|        daemonsets        |   ds   | DaemonSet只管理Pod对象，通过nodeAffinity和Toleration两个调度器，保证每个节点上只有一个Pod<br/>集群动态加入了新Node，DaemonSet中的Pod也会添加在新加入Node上<br/>删除一个DaemonSet也会级联删除所有其创建的Pod。 |
|       deployments        | deploy | Deployment为pod和ReplicaSet提供了一个声明式定义方法， 用来替代以前的ReplicationController来方便的管理应用 |
|        endpoints         |   ep   |                             节点                             |
|          events          |   ev   | Events  它是Kubelet负责用来记录多个容器运行过程中的事件，命名由被记录的对象和时间戳构成 |
| horizontalpodautoscalers |  hpa   |                                                              |
|        ingresses         |  ing   |                                                              |
|           jobs           |        |                                                              |
|       limitranges        | limits |                                                              |
|        namespaces        |   ns   |                                                              |
|     networkpolicies      |        |                                                              |
|       statefulsets       |        |                                                              |
|  persistentvolumeclaims  |  pvc   |                                                              |
|    persistentvolumes     |   pv   |                                                              |
|           pods           |   po   |                                                              |
|   podsecuritypolicies    |  psp   |                                                              |
|       podtemplates       |        |                                                              |
|       replicasets        |   rs   |                                                              |
|  replicationcontrollers  |   rc   |                                                              |
|      resourcequotas      | quota  |                                                              |
|          conjob          |        |                                                              |
|         secrets          |        |                                                              |
|     serviceaccounts      |        |                                                              |
|         services         |  svs   |                                                              |
|      storageclasses      |   sc   |                                                              |
|   thirdpartyresources    |        |                                                              |



在一个命令行中也可以同时对多个资源对象进行操作， 以多个TYPE和NAME的组合表示， 示例如下：

获取多个pod的信息

```
kubectl get pods pod1 pod2
```

获取多种对象的信息：

```
kubectl get pod/pod1  rc/rc1
```

同时应用多个YAML文件， 以多个-f file参数表示

```
kubectl get pod -f pod1.yaml -f pod2.yaml
kubectl create -f pod1.yaml -f rc1.yaml -f service1.yaml
```



## 2. kubectl 子命令详解 

kebectl的子命令非常丰富， 涵盖了对kubernetes集群的主要操作， 包括资源对象的创建， 删除， 查看， 修改， 配置， 运行等， 详细的子命令如表2.10表示：



|     子命令     |                             语法                             |                             说明                             |
| :------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|    annotate    | kubectl annotate (-f Filename \| type name \| type/name)<br />k1=v1, k2=v2.... |              添加或更新资源对象的annotation信息              |
|  api-version   |                 kubectl api-version [flags]                  |    列出当前系统支持的api版本列表， 格式为“group/version”     |
|     apply      |              kubectl apply -f filename [flags]               |          从配置文件或stdin中对资源对象进行配置更新           |
|     attach     |           kubectl attach POD -c container [flags]            |                  附着到一个正在运行的容器上                  |
|      auth      |               kubectl auth [flags] [optioins]                |                       检测RBAC权限设置                       |
|   autoscale    |  kubectl antoscale (-f filename \| type name \| type/name)   | 对deployment， replicaSet或replicationController进行水平自动扩容和缩容的设置 |
|  cluster-info  |                 kubectl cluster-info [flags]                 |                显示集群master和内置服务的信息                |
|   completion   |               kubectl completion shell [flags]               |            输出shell命令的执行结果吗（bash或zsh）            |
|     config     |              kubectl config subcommand [flags]               |                      修改kebeconfig文件                      |
|    convert     |             kubectl convert -f filename [flags]              |                 转换配置文件为不同的api版本                  |
|     cordon     |                 kubectl cordon node [flags]                  |       将node标记为unschedulable，即隔离出集群调度范围        |
|     create     |              kubectl create -f filename [flags]              |               从配置文件或stdin中创建资源对象                |
|     delete     | kubectl delete  (-f filename \| type name \| -l label) [flags] |  从配置文件， stdin， 资源名称或label selector 删除资源对象  |
|    describe    |     kubectl describe (-f filename \| type name) [flags]      |               描述一个或多个资源对象的详细信息               |
|      diff      |              kubectl diff -f filename [options]              |       查看配置文件与当前系统中正在运行的资源对象的差异       |
|     drain      |                  kubectl drain node [flags]                  | 首先将node设置为unschedulable, 然后删除在该node上运行的所有pod， 但不会删除不由api server管理的pod |
|      edit      | kubectl edit (-f filename \| type name \| type/name) [flags] |                编辑资源对象的属性， 在线更新                 |
|      exec      | kubectl exec pod [-c container] [-i] [-t] [flags] [-- command [args...]] |                     执行一个容器中的命令                     |
|    explain     | kubectl explain [--include-extended-apis=true] [--recursive=false] [flags] |                   对资源对象属性的详细说明                   |
|     expose     | kubectl expose (-f filename \| type name) [--port=port] [--protocol=TCP\|UDP] [--target-port=number-or-name] [--name=name] [----external-ip=external-ip-of-service] [--type=type] | 将已经存在的的一个rc， service, deployment 或pod暴露为一个新的service |
|      get       | kubect get (-f filename \| type name \| -l label) [--watch] [--sort-by-FIELD] [[-o \| --output]=OUTPUT_FORMAT] [flags] |              显示一个或者多个资源对象的概要信息              |
|     label      | kubect label (-f filename \| type name) k1=v1...kn=vn [--overwrite] [--all] [--resource-version=version] [flags] |                   设置或者资源对象的label                    |
|      logs      |      kubectl logs pod [-c container] [--follow] [flags]      |                  在屏幕上打印一个容器的日志                  |
|     patch      | kubectl patch kubectl patch (-f filename \| type name) --patch patch [flags] |        以merge形式对资源对象的那部分字段的值进行修改         |
|     plugin     |              kubectl plugin [flags] [optioins]               |             在kubectl命令行适用用户自定义的插件              |
|  port-forward  | kubectl port-forward pod [local_port:] remote_port [...[local_port_n:]remote_port_n] [flags] |      将本机的某个端口映射到到pod的端口号， 通常用于测试      |
|     porxy      | kubectl porxy [--port=port] [--www=static-dir] [--www-prefix=prefix] [--api-prefix=prefix] [flags] |               将本机某个端口号映射到api server               |
|    replace     |             kubectl replace -f filename [flags]              |                从配置文件或stdin替换资源对象                 |
| rolling-update | kubectl rolling-update old_controller_name ([new_controller_name] --image=new_container_image \| -f new_controller_spec) [flags] |                       对rc进行滚动升级                       |
|    rollout     |              kubectl rollout subcommand [flags]              | 对deployment进行管理， 可用操作包括： history, pause, resume, undo, status |
|      run       | kubectl run name --image=image [--env="key=value"] [--port=port] [--replicas=replicas] [--dry-run=bool] [--overrides=inline-json] [flags] |       基于一个镜像在kubernetes集群上启动一个deployment       |
|     scale      | kubectl scale (-f filename \| type name) --replicas=count [--resource-version=version] [--current-replicas=count] [flags] |  扩容， 缩容一个deployment， replicaset, RC或job中pod的数量  |
|      set       |                kubectl set subcommand [flags]                |    设置资源对象的某个特定信息， 目前仅支持修改容器的镜像     |
|     taint      | kubect taint node name k1=v1: taint_effect_1...kv=vn:taint_effect_n [flags] | 设置node的taint信息， 用于将特定的pod调度到特定的node的操作， 为alpha版本的功能 |
|      top       |                       kubectl top node                       | 查看node或pod的资源使用情况， 需要在集群中运行metics server  |
|    uncordon    |                    kubectl uncordon Node                     |                                                              |
|    version     |                       kubectl version                        |                      打印系统的版本信息                      |

## 

## 3. kubectl参数列表

库被辞退了命令行的公共启动参数如下所示：

