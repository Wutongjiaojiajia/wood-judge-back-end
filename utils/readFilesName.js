const fs=require('fs');
const path=require('path');
const join=path.join;

//设置文件夹名字
function setPath(pathName,callback){
    let jsonFilesName=[];
    function findJsonFile(dirName){
        let files=fs.readdirSync(dirName);
        files.forEach(item => { 
            let fPath=join(dirName,item);   // routes\user.js
            let stat=fs.statSync(fPath);    //获取文件的内容信息
            // 是否需要打开下一级文件
            // if(stat.isDirectory()) {
            //     findJsonFile(fPath);
            // }
            if (stat.isFile() && path.extname(item)==='.js') {
                jsonFilesName.push(item);
            }
        });
    }
    findJsonFile(pathName);
    return callback(jsonFilesName);
}

module.exports=setPath;