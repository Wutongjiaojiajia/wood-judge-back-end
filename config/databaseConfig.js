let mysql=require('mysql');

process.env.NODE_ENV='dev';

const databaseConfig={
    dev:{
        host:'120.24.20.165',   //数据库地址
        port:'3306',
        user:'root',    //账户
        password:'Aa19961023.',  //密码
        database:'wood',    //数据名字
        acquireTimeout: 15000, // 连接超时时间
        connectionLimit:100,    //最大连接数
        waitForConnections:true,    //超过最大连接时排队
        queueLimit:0,   //排队最大数量(0 代表不做限制)
    }
}
let pool=mysql.createPool(databaseConfig[process.env.NODE_ENV]);

// 查询建立连接池 释放连接
function connection(sql) {
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connect)=>{
            if(err){
                reject({
                    err:err,
                    result:null,
                    fields:null
                });
            }
            connect.query(sql,(qerr,result,fields)=>{
                connect.release();
                resolve({
                    err:qerr,
                    result:result,
                    fields:fields
                });
            })
        })
    })
}

module.exports=connection;