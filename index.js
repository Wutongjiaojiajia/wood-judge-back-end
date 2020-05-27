/**
 * index.js 入口文件
 * 职责:
 *  1.启动服务
 *  2.服务相关配置
 *  3.提供静态资源服务
 *  4.挂载路由
 *  5.监听端口启动服务
 */
const express=require('express');
const app=express();
const readFileName=require('./utils/readFilesName');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//循环routes文件夹下文件，将路由容易挂载到app服务上
readFileName('routes',(fileName)=>{
    const basePath='./routes/';
    fileName.forEach(item =>{
        let fullPath=basePath+item;
        app.use(require(fullPath));
    });
})


app.listen(3000,()=>{
    console.log('running at port 3000...');
})