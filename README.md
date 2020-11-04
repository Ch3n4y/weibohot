## 为什么要做？
微博热搜存档，仅作为自己学习开发一个的记录。这部分是前端，作为初学者，看着官方文档写的，代码有点混乱。  

## 技术栈
- 前端：技术主要使用的 Vue + Element-UI 
- 后端：采用 Python 爬虫、Fask-API 作为数据来源、使用 MonogoDB 存储，并采用 Docker-compose 一键式部署。  

## TODO
- [x] 首页搜索
- [ ] 显示详情

___
## 如何部署
### 下载代码
```
git clone https://github.com/Chaney1024/weibohot.git
```
### 安装环境包
```
cd weibohot && npm install
```
### 启动调试
```
npm run serve
```

### 编译发布
```
npm run build
```