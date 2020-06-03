# 1. ansible命令集

**ansible: ** 定义并运行简单任务。

**ansible-config: **查看、编辑、管理ansible配置。

**ansible-doc: **文档查看工具。

**ansible-galaxy:**共享和下载roles的工具。

**ansible-inventory:**查看inventory的信息。

**ansible-playbook:**执行playbook。

**ansible-pull: **从仓库中拉去playbook。

**ansible-vault: **文件加密工具。

**ansible-console: **repl控制台执行ansible任务。

# 2. ansible模块

ansible给我们提供了很多的常用模块, 我估计你自己想用的模块, 基本都可以找到, 我们在写功能的时候, 首先来查一下, 已经有很大大佬给我们写了很多模块了, 足够你使用了.

针对下面的模块, 我建议大家还是扫一眼, 万一以后用到呢, 其实找到下面的模块, 你知道它已经有了, 就没必要自己去写了.针对能用到的, 我都进行加粗处理了,大家扫一眼, 了解一下.

ansible 2.2.0.0
ansible-doc -l

add_host 将主机（以及组）添加到ansible-playbook内存库存中

apk 管理apk包

apt 管理apt-packages

assemble 从片段组装配置文件

capabilities 管理Linux功能

command 在远程节点上执行命令

composer Dependency Manager for PHP

consul 在consul集群中添加，修改和删除服务。

consul_acl 操纵领事密钥和规则

consul_kv 处理consul集群的键/值存储中的条目。

consul_session 操纵consul会话将

copy 文件复制到远程位置

cron 管理cron.d和crontab条目。

cronvar 用crontabs管理变量

crypttab 加密的Linux块设备

debug 打印语句

docker 管理docker容器

docker_container 管理docker容器

docker_image 管理docker镜像。

docker_image_facts 检查docker镜像

docker_login 登录Docker注册表。

docker_network 管理Docker网络

docker_service 管理docker服务和容器。

docker_swarm_service 管理Docker网络

easy_install 安装Python库

facter 在远程系统上运行发现程序'facter'

fail 使用自定义消息时失败

fetch 从远程节点获取文件

file 设置文件的属性

filesystem 使块设备上的文件系统

find 根据特定条件返回文件列表

firewalld 使用firewalld

gem 管理Ruby gems将

get_url 文件从HTTP，HTTPS或FTP下载到节点

git 从git checkouts部署软件（或文件）

git_config 读取和写入git配置

github_hooks 管理github服务挂钩。

github_key 管理GitHub访问密钥。

github_release 与GitHub版本互动

gitlab_group 创建/更新/删除Gitlab组

gitlab_project 创建/更新/删除Gitlab项目

gitlab_user 创建/更新/删除Gitlab用户

gluster_volume 管理GlusterFS卷

group 添加或删除

group_by 组根据事实创建Ansible组

homebrew Homebrew的包管理器

homebrew_cask 安装/卸载自制垃圾桶。

homebrew_tap 点击Homebrew存储库。

honeybadger_deployment 通知Honeybadger.io有关应用程序部署的信息

hostname 管理主机名

htpasswd 管理用户文件以进行基本身份验证

include 包括播放或任务列表。

include_role 加载并执行角色

include_vars 在任务中动态加载文件中的变量。

influxdb_database 管理InfluxDB数据库

influxdb_retention_policy 管理InfluxDB保留策略

iptables 修改系统iptables

jenkins_job 管理jenkins作业

jenkins_plugin 添加或删除Jenkins插件

jira 在JIRA实例中创建和修改问题在

mail 发送电子邮件

mssql_db 从远程主机添加或删除MSSQL数据库。

mysql_db 从远程主机添加或删除MySQL数据库。

mysql_replication 管理MySQL复制

mysql_user 在MySQL数据库中添加或删除用户。

mysql_variables 管理MySQL全局变量

npm 管理node.js软件包

pacemaker_docker_ocf 管理Docker网络

pacemaker_service 管理Docker网络

pacemaker_vip 管理Docker网络

package 通用OS包

patch 使用GNU修补程序工具应用修补程序文件。

pause 暂停playbook执行

ping 尝试连接到主机，验证可用的python并在成功时返回“pong”。

pip 管理Python库依赖项。

redis 各种redis命令，slave和flush

selinux 更改

service 管理服务。

set_fact 从任务中设置主机事实

setup 收集有关远程主机的事实

shell 在节点中执行命令。

slurp 从远程节点中刷新文件

snmp_facts 使用SNMP检索设备的事实。

synchronize 使用rsync可以快速轻松地在手册中同步文件路径。

sysctl 管理sysctl.conf中的条目。

systemd 管理服务。

template 将文件模板到远程服务器。

timezone 配置时区设置

twilio 通过Twilio向手机发送短信。

typetalk 发送消息到typetalk

user 管理用户帐户

wait_for 在继续之前等待条件。

yum 使用'yum'包管理器管理包

yum_repository 添加和删除YUM存储库

zabbix_group Zabbix主机组创建/删除

zabbix_host Zabbix主机创建/更新/删除

zabbix_hostmacro Zabbix主机宏创建/更新/删除

zabbix_maintenance 创建Zabbix维护窗口

zabbix_screen Zabbix屏幕创建/更新/删除

docker 管理docker容器 上启用加速模式

## windows相关

win_acl 为系统用户或组设置文件/目录权限。

win_acl_inheritance 更改ACL继承

win_chocolatey 使用chocolatey安装软件包

win_command 在远程Windows节点上执行命令将

win_copy 文件复制到Windows主机上的远程位置。

win_dotnet_ngen 在.NET更新后运行ngen以重新编译DLL

win_environment 在Windows主机上修改环境变量。

win_feature 在Windows Server上安装和卸载Windows功能

win_file 创建，触摸或删除文件或目录。

win_file_version 获取DLL或EXE文件构建版本

win_firewall_rule Windows防火墙自动化

win_get_url 从给定URL获取文件

win_group 添加和删除本地组

win_iis_virtualdirectory 在IIS中配置虚拟目录。

win_iis_webapplication 配置IIS Web应用程序。

win_iis_webapppool 配置IIS Web应用程序池。

win_iis_webbinding 配置IIS网站。

win_iis_website 配置IIS网站。

win_lineinfile 确保特定行位于文件中，或使用反向引用的正则表达式替换现有行。

win_msi 安装和卸载Windows MSI文件

win_nssm NSSM - 非吸吮服务管理器

win_owner 集所有者

win_package 从本地文件系统或URL安装/卸载可安装程序包

win_ping 经典ping模块的Windows版本。

win_reboot 重启Windows机器

win_regedit 添加，编辑或删除注册表项和值

win_regmerge 将注册表文件的内容合并到Windows注册表中

win_robocopy 使用Robocopy同步两个目录的内容。

win_scheduled_task 管理计划任务

win_service 管理Windows服务

win_share 管理Windows共享

win_shell 在目标主机上执行shell命令。

win_stat 返回有关Windows文件的信息将文件

win_template 模板发送到远程服务器。

win_timezone 设置Windows机器时区

win_unzip 在Windows节点上解压缩压缩文件和存档

win_updates 下载并安装Windows更新

win_uri 与webservices交互。

win_user 管理本地Windows用户帐户

win_webpicmd 使用Web Platform Installer安装程序包命令行

# 3. ansible自定义module

  Ansible提供了许多模块实用程序，它们提供了在开发自己的模块时可以使用的辅助功能。 basic.py模块为程序提供访问Ansible库的主要入口点，所有Ansible模块必须至少从basic.py导入:
 from ansible.module_utils.basic import *

**AnsibleModule** 提供和很多通用的函数来处理返回值, 分析参数并允许你检查输入:

-  成功返回

module.exit_json(changed=True, something_else=12345)

- 失败退出

module.fail_json(msg="Something fatal happened")



Ansible组成：                      

tree /etc/ansible/

/etc/ansible/

├── ansible.cfg  # ansible的配置文件

├── hosts  # ansible的主仓库 用来存储需要管理的远程主机的相关信息

└── roles

首先先创建一个存放ansible自定义模板的路径：

mkdir /usr/share/ansible    自定义可以根据自己的环境进行选择或创建

然后在ansible配置文件/etc/ansible/ansible.cfg开放自定义模板路径的配置：

Library=/usr/share/ansible



## 1. 不带参数

无参数ansible自定模块实例：an_demo.py

```
from ansible.module_utils.basic import *

module = AnsibleModule(argument_spec = dict())

result = dict(echo=‘pong’)

module.exit_json(**result)
```




作者：不动明王
链接：https://juejin.im/post/5e96a2e5f265da480f0fa9a7
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 2. 带参数

带参ansible自定义模块实例：an_param_demo.py

```python
from ansible.module_utils.basic import *
module =AnsibleModule(argument_spec = dict(arg = dict(required = True)))
param = module.params[‘arg’]
if param == ‘1’:    
  result = dict(echo = ‘success’)    
  module.exit_json(**result)
else:    
  result = dict(echo = ‘failed’，msg= 0)    
  module.fail_json(**result) 
```



## 3. playbook中自定义module

在当前目录下面创建一个library的目录, 会在本playbook中自动加载进入

