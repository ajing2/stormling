# 在linux下，git clone, git pushh等免密操作

## 1. 通过ssh密钥实现

ssh-keygen -t rsa -C "你的邮箱" -f "自己定义的目录" 

打开: id_rsa.pub ,将文件内容复制到 gitlab 设置页：ssh密钥配置。



## 2. 通过配置.git-credential配置免密输入

可以进行设置，这样在输入过一次密码之后，以后就不需要每次都输入密码了。

打开终端：

输入：

touch ~/.git-credentials

如果手工在其中加入：

https:{username}:{password}@***.com

那么第一次访问git地址，也不用输入密码了。

再输入：

git config --global credential.helper store

这一步会在用户目录下的.gitconfig文件最后添加：

[credential]

helper = store



## 3. git 版本原因git clone 无法输入密码问题

git出现error: The requested URL returned error: 401 Unauthorized while accessing得到原因是因为服务器的git版本是 git version 1.7.1

- 可以使用如下操作：

git clone https://username:password@url/project.git

如果这样设置，下次密码变更时，需要重定向git仓库地址：

git remote set-url origin url  #同样需要再url中定义账号和密码



## 4. 其他：清除记住的用户、密码

git config --system --unset credential.helper