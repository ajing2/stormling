# netty其实也没那么难， 知道一些套路， 手撕一个实例

# 1. netty的概念

## 1. netty简介

netty到底是一个什么东西嗯? 反正我知道的一点就是面试的时候都会问， 简而言之， 就是非常的重要， 要想拿到牛逼的工资， 不会netty是不行的。下面我们来看看官网的权威的解释吧。

![1](images/1.jpg)

我们来简单翻译一下上面的话：

>
>
>- netty是一个异步事件驱动的网络应用程序框架， 用于快速开发可维护的高性能服务器和客户端。
>- netty是一个NIO客户端和服务端框架， 他支持快速， 简单的开发网络应用程序的服务端和客户端。它大大简化了网络编程如TCP和UDP套接字服务。
>- 快速和简单并不意味着生成应用程序将会受到可维护性或性能问题的影响。netty经过精心设计， 并积累了许多协议（如： ftp， smtp， http）的实验， 以及各种二进制和基于文本的遗留协议。因此netty成功的找到了一种方法， 在不妥协的情况下实现了易于开发， 性能， 稳定性和灵活性。



## 2. netty的应用范围

Dubbo， zk， rocketmq， elasticsearch， spring5（对http协议）， grpc， spark等大型开源项目都在使用netty作为底层通信框架



# 2. netty中的核心概念

## 1. Channel

管道， 其实是多socket的封装， 其中包含了一组api， 大大简化了我们直接进行socket编程的复杂性

## 2. EventLoopGroup

EventLoopGroup是一个EventLoop池， 包含很多的EventLoop.

Netty 为每个 Channel 分配了一个 EventLoop，用于处理用户连接请求、对用户请求的处 理等所有事件。EventLoop 本身只是一个线程驱动，在其生命周期内只会绑定一个线程，让 该线程处理一个 Channel 的所有 IO 事件。

一个 Channel 一旦与一个 EventLoop 相绑定，那么在 Channel 的整个生命周期内是不能 改变的。一个 EventLoop 可以与多个 Channel 绑定。即 Channel 与 EventLoop 的关系是 n:1， 而 EventLoop 与线程的关系是 1:1。

**<u>画外音： 一个线程可以处理多个Channel</u>**



## 3. ServerBootStrap

用于配置整个 Netty 代码，将各个组件关联起来。服务端使用的是 ServerBootStrap，而

客户端使用的是则 BootStrap。

## 4. ChannelHandler与ChannelPipeline

ChannelHandler 是对 Channel 中数据的处理器，这些处理器可以是系统本身定义好的编 解码器，也可以是用户自定义的。这些处理会被统一添加到一个 ChannelPipeline 的对象中， 然后按照添加的顺序对 Channel 中的数据进行依次处理。

## 5. ChannelFuture

Netty 中所有的 I/O 操作都是异步的，即操作不会立即得到返回结果，所以 Netty 中定义 了一个 ChannelFuture 对象作为这个异步操作的“代言人”，表示异步操作本身。如果想获取 到该异步操作的返回值，可以通过该异步操作对象的 addListener()方法为该异步操作添加监听器，为其注册回调:当结果出来后马上调用执行。

Netty 的异步编程模型都是建立在 Future 与回调概念之上的。

# 3. netty的执行流程图

![netty通信流程](images/netty通信流程.jpg)

# 4. 代码示例：

github代码地址： 

https://github.com/ajing2/stormling/tree/master/netty/netty-studty

## 1. 创建工程

创建maven工程， 添加maven依赖

```maven
				<!-- netty-all 依赖 -->
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-all</artifactId>
            <version>4.1.36.Final</version>
        </dependency>

        <!--lombok 依赖-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.6</version>
            <scope>provided</scope>
        </dependency>

```

## 2. 定义服务端启动类

```java
package com.ajing;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.string.StringDecoder;
import io.netty.handler.codec.string.StringEncoder;
import io.netty.util.CharsetUtil;

// 定义服务端启动类
public class SomeServer {
    public static void main(String[] args) throws InterruptedException {
        EventLoopGroup parentGroup = new NioEventLoopGroup();
        EventLoopGroup childGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap serverBootstrap = new ServerBootstrap();
            serverBootstrap.group(parentGroup, childGroup)
                    // 指定要创建的Channel类型
                    .channel(NioServerSocketChannel.class)
                    // 管道初始化器， 当前类的实例在pipeline初始化完毕以后就会被GC
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        // 当Channel初始创建完毕后就会触发该方法的执行， 用于初始化Channel
                        @Override
                        protected void initChannel(SocketChannel socketChannel) throws Exception {
                            ChannelPipeline pipeline = socketChannel.pipeline();
                            // 请求解码器， 将Channel中的ByteBuf数据解码为String
                            pipeline.addLast(new StringDecoder(CharsetUtil.UTF_8));
                            // 相应编码器， 将String对象编码为Channel中发送的ByteBuf数据
                            pipeline.addLast(new StringEncoder(CharsetUtil.UTF_8));
                            // 定义自己的处理类， 要放在最后
                            pipeline.addLast(new SomeSocketServerHandler());
                        }
                    });
            // 指定当前服务器锁监听的端口号
            // bind() 方法的执行是异步的
            ChannelFuture future = serverBootstrap.bind(8888).sync();
            System.out.println("服务器监听的端口为： 8888");
            // closeFuture() 是异步的
            future.channel().closeFuture().sync();
        } finally {
            parentGroup.shutdownGracefully();
            childGroup.shutdownGracefully();
        }
    }
}
```

## 3. 自定义服务端处理器

```java
package com.ajing;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

public class SomeSocketServerHandler extends ChannelInboundHandlerAdapter {


    /**
     * 当Channel中有来自客户端的数据时就会触发该方法的执行
     * @param ctx 上下文
     * @param msg 来自客户端的数据
     * @throws InterruptedException
     */
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws InterruptedException {
        // 打印客户端的地址和发送的数据
        System.out.println(ctx.channel().remoteAddress() + ", " + msg);
        //想客户端发送数据
        ctx.channel().writeAndFlush("from server: " + UUID.randomUUID());
        TimeUnit.MICROSECONDS.sleep(3000000);
    }


    /**
     * 当Channel中的数据在处理过程中出现异常时会触发该方法的执行
     * @param ctx 上下文
     * @param cause 发生异常的对象
     * @throws Exception
     */
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        cause.printStackTrace();
        // 关闭Channel
        ctx.close();
    }
}
```

## 4. 定义客户端启动类

```java
package com.ajing;

import io.netty.bootstrap.Bootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.string.StringDecoder;
import io.netty.handler.codec.string.StringEncoder;
import io.netty.util.CharsetUtil;

public class SomeClient {
    public static void main(String[] args) throws InterruptedException {
        NioEventLoopGroup eventLoopGroup = new NioEventLoopGroup();
        try {
            Bootstrap bootStrap = new Bootstrap();
            bootStrap.group(eventLoopGroup)
                    .channel(NioSocketChannel.class)
                    .handler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel socketChannel) throws Exception {
                            ChannelPipeline pipeline = socketChannel.pipeline();
                            pipeline.addLast(new StringDecoder(CharsetUtil.UTF_8));
                            pipeline.addLast(new StringEncoder(CharsetUtil.UTF_8));
                            // 自定义处理器
                            pipeline.addLast(new SomeSocketClientHandler());
                        }
                    });
            ChannelFuture future = bootStrap.connect("localhost", 8888).sync();
            future.channel().closeFuture().sync();
        } finally {
            if (eventLoopGroup != null) {
                eventLoopGroup.shutdownGracefully();
            }
        }
    }
}
```

## 5. 自定义客户端处理器

```java
package com.ajing;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

public class SomeSocketClientHandler extends SimpleChannelInboundHandler<String> {

    /**
     * msg的消息类型与类中的泛型类型是一样的
     * @param channelHandlerContext
     * @param s
     * @throws Exception
     */
    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, String s) throws Exception {
        System.out.println(channelHandlerContext.channel().remoteAddress() + "," + s);
        channelHandlerContext.writeAndFlush("from client: "  + LocalDateTime.now());
        TimeUnit.MICROSECONDS.sleep(3000000);
    }


    /**
     * 当Channel被激活后会触发该方法的执行
     * @param ctx
     */
    @Override
    public void channelActive(ChannelHandlerContext ctx) {
        ctx.channel().writeAndFlush("from client: begin talking");
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }

}
```

## 6. 两个处理器的区别

SimpleChannelInboundHandler 中的 channelRead()方法会自动释放接收到的来自于对方的 msg 所占有的所有资源。
 ChannelInboundHandlerAdapter 中的 channelRead()方法不会自动释放接收到的来自于对方的 msg

- 若对方没有向自己发送数据，则自定义处理器建议继承自 ChannelInboundHandlerAdapter。因为若继承自 SimpleChannelInboundHandler 需要重写 channelRead0()方法。而重写该方法的目的是对来自于对方的数据进行处理。因为对方 根本就没有发送数据，所以也就没有必要重写 channelRead0()方法。

- 若对方向自己发送了数据，而自己又需要将该数据再发送给对方，则自定义处理器建议继承自 ChannelInboundHandlerAdapter。因为 write()方法的执行是异步的，且 SimpleChannelInboundHandler 中的 channelRead()方法会自动释放掉来自于对方的 msg。 若 write()方法中正在处理 msg，而此时 SimpleChannelInboundHandler 中的 channelRead() 方法执行完毕了，将 msg 给释放了。此时就会报错。



# 5. 结束语

其实Netty说白了就是把复杂的socket编程改成了可用的， 高性能的nio的框架， 因为java中有很多I/O模型， BIO, NIO, AIO, 同步， 异步， 阻塞， 非阻塞， 一些非常枯燥的概念理解起来和操作起来， 是非常的麻烦的， 后期会专门写一篇IO模型的一篇文章， 自己重新梳理一下知识体系！