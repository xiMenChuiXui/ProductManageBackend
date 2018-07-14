# ProductManageBackend
用nodejs写的后端的购物商城

#线上部署

####云主机选择

- 注册阿里云主机，最低配置
- 可以多人合买

####部署工作流

以ubuntu环境为例：

- 使用xshell客户端进行远程登录

####安装nodejs,npm,pm2
- 
  安装步骤:  
	1.   下载安装包

  	wget    https://npm.taobao.org/mirrors/node/v10.5.0/

	node-v10.5.0-linux-x64.tar.xz

  2.解压安装:

 	 tar -xvf  node-v10.5.0-linux-x64.tar.xz

  3.重命名:

  	mv node-v6.10.0-linux-x64 nodejs

  4.建立软连接:

  	ln -s /usr/local/nodejs/bin/npm /usr/local/bin/

  	ln -s /usr/local/nodejs/bin/node /usr/local/bin/

   (根据自己的npm和node的路径配)

  5.检查是否配置好

	    node -v
  		npm -v
   
  - (如果没有安装的成功就删除掉/usr/local/bin#路径中无效的npm和node文件重新建立软连接)
  
  - 使用pm2进行node进程管理  
  
  6.安装pm2：npm i pm2 -g

  如果在执行pm2命令的时候 显示 command not found 添加软连接就行
  
    ln -s /root/www/ProductManager/node_modules/pm2/bin/pm2 /usr/local/bin    

  	/root/www/ProductManager/node_modules/pm2/bin/pm2为你pm2的安装位置 

- Server端安装Git，用来同步代码
- 
  安装git 的步骤:

  	sudo apt-get install git

  如果不能安装则可以尝试以下代码  

  	 sudo apt-get update

 	 sudo apt-get upgrade

 	 sudo apt-get install -f

- linux安装mongodb步骤
- 
  1.导入包管理系统使用的公钥

 	 sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv

 	9DA31620334BD75D9DCB49F368818C72E52529D4   (和上面是一行代码)

  2.为mongodb创建列表文件

 	 vim   /etc/apt/sources.list.d/mongodb-org-4.0.list

  	创建后再执行下面一行代码

  	echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

  3.重新加载本地包数据

  	sudo apt-get update

  4.下载最新的mongodb包

      sudo apt-get install -y mongodb-org

  5.启动mongodb

      sudo service mongod start

工作流：本地代码更新->提交到远程git仓库->登录远程服务器更新代码，PM2会自动重启app程序

  在github上创建个人repository => 在桌面git clone 得到文件夹  =>  将里面的文件粘贴在项

目文件夹中  =>  在idea中 commit到本地仓库(ctrl+k)  =>  push到github上(ctrl+shift+k)

 => 在linux系统中指定目录中拉取github资源

  	git clone https://github.com/xiMenChuiXui/ProductManageBackend.git
  
#PM2集群搭建

由于NodeJs是单线程，无法利用多核CPU的优势。想要利用多核CPU，就要进行多进程。NodeJs的

cluster模块提供了多进程的支持，PM2又进一步增强了该模块的功能。

PM2能实现单机内的多进程集群，充分利用多核CPU的性能，提高网站的性能。如果是多机器的集群，需

要使用nginx来搭建。

编写PM2配置文件：

    apps:
      - script   : app.js  
        name: xxx			 //不取名字项目启动后默认名称是app
        instances: max
        exec_mode: cluster  
        watch  : true
        env:
          NODE_ENV: production

然后指定这个配置文件来运行:

    pm2 start xxxx.yml


