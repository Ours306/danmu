# danmu

## 介绍
> 网络即时弹幕
> 使用到的技术栈：

----------
 1. html、js、css -----------------------------  前端
 2. java          -----------------------------  后端
 3. websocket     -----------------------------  通信协议

## **代码提交说明**
> 使用git pull request工作流
> 1. 每位开发人员fork项目到自己的仓库
> 2. 自己负责的模块确定无误后提交到自己的仓库，然后使用new pull request
> 3. 团队测试通过后才将代码合并到源仓库
> 4. 每天离开实验室前提交代码

## 目录结构
```shell
├── out                       // 输出文件
├── src                       // 后端
│   ├── controller            // 连接层
│   ├── tools                 // 工具
├── web                       // 前端资源
│   ├── display               // 页面、js
│   ├── WEB-INF               // 安全目录
```

## 构建
### 推荐使用yarn
> yarn安装依赖速度快于npm
``` bash
# install dependencies
yarn/npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```