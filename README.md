# gallery-by-react
photo gallery project based on react !

在线演示：https://hwpepsi.github.io/gallery-by-react/

用yeoman脚手架安装react开发环境
"Web App的脚手架工具" --- Yeoman的目的是帮助用户更好的启动项目，提供最好的实践和工具使用户保持高生产率。

0、cd 目录！！！

1、安装node.js环境（如已安装，执行下一步）

2、安装ruby环境，淘宝NPM镜像（如已安装，执行下一步）
地址：http://npm.taobao.org/ 
由于NodeD的官方模块仓库网速太慢。

3、安装yeoman: npm install -g yo（如已安装，执行下一步）
使用以下命令查看是否安装成功
yo --version

4、安装生成器(generator): npm install -g generator-react-webpack（如已安装，执行下一步）

5、自动生成项目: yo react-webpack 项目名称（如果react在当前目录就不需要写名称）

6、安装项目所有的依赖类库: npm install

7、编辑 Main.js 开始项目

#发布项目

启动本地项目: npm start 或者 npm run serve

启动本地dist目录项目: npm run serve:start

打包到dist目录: npm run copy

清除dist文件：npm run clean

生成dist目录: npm run dist

删除dist目录中index.html中app.js的src中第一个斜杠

删除cfg目录中defaut.js中publicPath中的第一个斜杠

#git命令推送

将文件全部添加到git仓库: git add -A (git add dist)

提交代码: git commit -m‘文件描述’//提交到本地仓库

推送代码到github上: git push origin ‘要提交的分支名称’//将本地仓库推送到远程仓库里面

推送dist目录文件到githubPages: git subtree push --prefix=dist origin gh-pages

回滚: git --hard 版本号
