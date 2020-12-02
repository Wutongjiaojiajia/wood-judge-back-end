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
const https = require('https');
const http = require('http');
const fs = require('fs');
const httpsOption = {
	key:fs.readFileSync('./cert/4855634_node.wutongjiaojiajia.cn.key'),
	cert:fs.readFileSync('./cert/4855634_node.wutongjiaojiajia.cn.pem')
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//设置允许跨域访问该服务.
app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Content-Type', 'application/json;charset=utf-8');
	next();
})

//循环routes文件夹下文件，将路由容易挂载到app服务上
readFileName('routes',(fileName)=>{
	const basePath='./routes/';
	fileName.forEach(item =>{
		let fullPath=basePath+item;
		app.use(require(fullPath));
	});
})

// https.createServer(httpsOption,app).listen(3000,()=>{
// 	console.log('running at port 3000...');
// });

app.listen(3000,()=>{
	console.log('running at port 3000...');
})