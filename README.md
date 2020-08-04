# wood-judge-back-end
### 技术栈

Node.js + Express + Mysql + Docker + Github Actions

### 本地启动项目

```
node index.js
```

### 项目结构说明

```
.
├── Dockerfile  docker构建文件
├── LICENSE
├── README.md  项目说明
├── config
│   └── databaseConfig.js  数据库配置文件
├── dao
│   └── userSqlMapping.js  模块SQL文件
├── index.js  项目入口文件
├── model
│   └── resultEntity.js  返回结果构造
├── package-lock.json
├── package.json  项目描述文件
├── routes
│   └── priceMaintain.js  接口路由地址
├── service
│   └── priceMaintain.js  接口逻辑
└── utils
    ├── crudUtils.js  增删查改工具函数
    ├── publicUtils.js  公共方法封装
    ├── readFilesName.js  读取文件名方法
    └── resultUtils.js  返回结果实例函数
```

