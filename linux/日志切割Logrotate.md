# 运维老司机又翻车， 居然没用过日志切割Logrotate

作为一个运维老司机， 这次又翻车了。只能说明一个原因， 就是菜， 所有才要多学习。

说起日志切割， 自己可以说是溜的一批。基本的套路就是在crontab中写一个定时任务，脚本去切割日志文件

纵观所有日志切割的方法， 都和linux中crontab脚本定时执行编写好的日志切割脚本， 其本质就是相同的

其实Logrotate也是默认使用了linux系统中的crontab， 并且使用的比较高级而已， 所以老司机就翻车了。那这个大型翻车现场， 凌神要复盘一下啊， 更好的走好接下来的路。

# 1. logrotate介绍

logrotate是linux系统自带的一个日志切割利器， 使用者只需要指定日志名称， 切割规则， 其他的你就瞧好吧， linux服务器肯定把你伺候的服服帖帖。 享五星超值服务。

logrotate是基于crond服务来运行的，其crond服务的脚本是/etc/cron.daily/logrotate，日志转储是系统自动完成的。

实际运行时，logrotate会调用主配置文件 /etc/logrotate.conf，可以在 /etc/logrotate.d 目录里放置自定义好的配置文件（及你需要切割的日志名字和切割规则），用来覆盖logrotate的缺省值。

定时执行/etc/cron.daily目录下的文件的设置，则在/etc/anacrontab里定义的,那anacrontab怎么知道上次成功执行脚本的具体时间呢?后面说详细剖析。凌神出马了， 就给你掰扯明白了。

通过查看/etc/cron.daily/logrotate得知有 /var/lib/logrotate/logrotate.status这样的一个文件,此文件的作用就是记录最近一次成功运行日志分割脚本的具体时间.

所以logrotate执行脚本的命令其实是/usr/sbin/logrotate -s /var/lib/logrotate/logrotate.status /etc/logrotate.conf。



# 2. logrotate执行流程

- crond服务加载/etc/cron.d/0hourly ---> 

- 在每小时的01分执行/etc/cron.hourly/0anacron ---> 

- 执行anacron ---> 

- 根据/etc/cron.daily/logrotate获得上次运行logrotate的时间 ---> 

- 根据/etc/anacrontab的配置执行/etc/cron.daily，/etc/cron.weekly，/etc/cron.monthly ---> 

- 执行/etc/cron.daily/下的logrotate脚本 ---> 

- 执行logrotate ---> 

- 根据/etc/logrotate.conf配置执行脚本/etc/logrotate.d/nginx ---> 

- 转储nginx日志成功



# 3. logrotate使用

## 1. 示例

在/etc/logrotate.d/下面新建文件nginxLogrotate

`vim /etc/logrotate.d/nginxLogrotate`

添加如下:

```
/home/APPDeploy/nginx-1.16.0/logs/*.log {               #日志文件所在的路径
        daily                                           #每天进行日志分割
        missingok                                       #在日志转储期间,任何错误将被忽略
        rotate 30                                       #保留30个备份
        compress                                        #通过gzip压缩转储以后的日志
        delaycompress                                   #delaycompress和compress一起使用时，转储的日志文件到下一次转储时才压缩，即这次切割的日志不压缩
        dateext                                         #日志后面带时间,如:nginx.access.log-20190516
        #dateformat -%Y%m%d%s                           #日志时间格式
        #dateyesterday                                  #如果定时任务时间设置的是0点就要配置此项,不然切割的内容是昨天的但是日志名却是当天的.
        notifempty                                      #当日志文件为空时，不进行轮转
        create 644 APPDeploy APPDeploy                  #轮转时指定创建新文件的属性
        sharedscripts                                   #运行postrotate脚本，作用是在所有日志都轮转后统一执行一次脚本。如果没有配置这个，那么每个日志轮转后都会执行一次脚本
        postrotate                                      #在logrotate转储之后需要执行的指令，下面的脚本作用是让nginx将日志内容存储在新的日志文件中.
                if [ -f /home/APPDeploy/nginx-1.16.0/run/nginx.pid ]; then
                        kill -USR1 `cat /home/APPDeploy/nginx-1.16.0/run/nginx.pid`
                fi
        endscript
}
```

- 测试是否生效





## 2. 配置文件说明

| **配置参数**                 | **说明**                                                     |
| ---------------------------- | ------------------------------------------------------------ |
| **monthly**                  | 日志文件将按月轮循。其它可用值为'daily'，'weekly'或者'yearly'。 |
| **rotate 5**                 | 一次将存储5个归档日志。对于第六个归档，时间最久的归档将被删除。 |
| **compress**                 | 在轮循任务完成后，已轮循的归档将使用gzip进行压缩。           |
| **delaycompress**            | 总是与compress选项一起用，delaycompress选项指示logrotate不要将最近的归档压缩，压缩将在下一次轮循周期进行。这在你或任何软件仍然需要读取最新归档时很有用。 |
| **missingok**                | 在日志轮循期间，任何错误将被忽略，例如“文件无法找到”之类的错误。 |
| **notifempty**               | 如果日志文件为空，轮循不会进行。                             |
| **create 644 root root**     | 以指定的权限创建全新的日志文件，同时logrotate也会重命名原始日志文件。 |
| **postrotate/endscript**     | 在所有其它指令完成后，postrotate和endscript里面指定的命令将被执行。在这种情况下，rsyslogd 进程将立即再次读取其配置并继续运行。 |
| 以上信息来源 "man logrotate" |                                                              |



## 3. 手动运行logrotate

logrotate可以在任何时候从命令行手动调用。要调用为/etc/lograte.d/下配置的所有日志调用logrotate：

```shell
[root@clsn6 ~]# logrotate /etc/logrotate.conf
```

要为某个特定的配置调用logrotate,执行一次切割任务测试：

`logrotate -vfd /etc/logrotate.d/nginxAccessLog` # 以debug测试是否生效,不会真的切割日志

`logrotate -fv /etc/logrotate.d/nginxAccessLog` # 强制生效并显示详细的输出信息

详细信息请用man logrotate查看

即使轮循条件没有满足，我们也可以通过使用‘-f’选项来强制logrotate轮循日志文件，‘-v’参数提供了详细的输出。



# 4. logrotate的生效时间

要想知道logrotate什么时候执行日志分割操作,需要关注`/etc/anacrontab`及`/var/lib/logrotate/logrotate.status`这两个文件.

上文中已介绍过`/var/lib/logrotate/logrotate.status`这里就不在赘述了.

而`/etc/anacrontab`是使logrotate按时执行脚本的主要配置文件,我们来仔细看下anacrontab的主要内容:

```
sudo cat /etc/anacrontab
# /etc/anacrontab: configuration file for anacron

# See anacron(8) and anacrontab(5) for details.

SHELL=/bin/sh
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root
# the maximal random delay added to the base delay of the jobs
RANDOM_DELAY=45
# the jobs will be started during the following hours only
START_HOURS_RANGE=03-22

#period in days   delay in minutes   job-identifier   command
1       5       cron.daily              nice run-parts /etc/cron.daily
7       25      cron.weekly             nice run-parts /etc/cron.weekly
@monthly 45     cron.monthly            nice run-parts /etc/cron.monthly
```

从上面的内容可以看出:如果机器没有关机，默认的logrotate（配置文件里设置的是cron.daily）一般会在每天的3点05分到3点50分之间执行,真实的延迟时间是 `RANDOM_DELAY + delay in minutes`.

如果在3-22这个时间段内服务器处于关机状态,则logrotate会在机器开机5分钟后执行分割日志的操作.

注意

不建议直接修改此文件,如果想修改logrotate默认的执行时间，可通过crontab执行自定义的logrotate配置文件,但这时就不能将自定义的配置文件放置在 /etc/logrotat.d/下了,应该放置在/etc/logrotat.d/下层目录或者另外的路径,否则就会执行两遍日志分割的操作,执行时间分别是你在crontab中定义的时间以及anacrontab默认的执行时间即3:05-3:50。



# 5. 自定义logrotate执行时间

正常的日志分割都是按天进行的,即每个日志只记录0-24点之间的内容,如果是按默认的anacrontab设定的执行时间那肯定是不行的,下面看一下吧。

1: 在/etc/logrotate.d创建下层目录,`mkdir -p /etc/logrotate.d/nginx` ,当然也可在非/etc/logrotate.d/下创建此目录,例如我是在`/etc/logrotate.daily.0`下创建了nginxLogrotate文件.

2: 移除之前自定义的配置文件,`sudo mv /etc/logrotate.d/nginxLogrotate ~/bak/`，这样做的作用就是防止执行两次日志分割脚本的操作.

3: 添加crontab计划任务, `sudo echo "59 23 * * * /usr/sbin/logrotate -f /etc/logrotate.daily.0/nginxLogrotate >/dev/null 2>&1" > /etc/crontab`

当然也可直接在root用户下执行`crontab -e`然后添加上面的内容.

如果用非root用户则会报错`error: error creating output file /var/lib/logrotate/logrotate.status.tmp: 权限不够`

4: 重启crontab,`service crond restart`，其实可以不用重启.



其实最后， 凌神掌握的还是最高逼格的自定义的contab， 想什么时候执行， 就什么执行， 想执行什么脚本， 自己写就好了， 更自由。

如果你已经知道或者了解过logrotate， 抓紧在下面的评论区碰凌神吧， （凌神这个菜狗......）

如果你没有学过， 凌神带你脱坑， 不香吗？ 不值得点个赞吗？

