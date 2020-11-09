# Kubernetes的接口认知

我们如果想对kubernetes进行常规操作， 或者是二次开发， 就需要对kubernetes的日常操作比较熟悉， 我们先来看看开发和运维的差别。

kubernetes二次开发， 其实就是通过http接口调用kubernetes的接口，然后进行封装， 而运维对kubernetes的操作， 其实是通过kubernetes自己的客户端进行对kubernetes进行操作， 他们本质上没有什么差别， 都是调用kubernetes的api进行操作或者调用kubernetes， 唯一的难点， 就是开发的时候， 我们可能需要多多考虑一下二次开发的一些架构问题。



# 1. kubernetes核心服务配置详解

kubernetes在服务器上给我们封装kube-apiserver, kube-controller-manager, kube-schuduler, kubelet , kube-proxy这些命令





































搞清楚本质的问题， 我们就心里有底了， 如果说最简单的入手， 我们还是需要先从非常简单hello world入手， 这个是我们所有程序员入门的第一个套路。