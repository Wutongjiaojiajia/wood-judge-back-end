const connection=require('../config/databaseConfig');
const publicUtils=require('./publicUtils');
/** 
 * 查询语句
 * params example
 * tableName: 表名
 * condition: 查询条件
 *  |-->example:{
 *          eqParams:{
 *              id:"1"
 *          },
 *          likeParams:{
 *              name:"mm"
 *          },
 *          inParams:{
 *              name:"jimmy,黄家豪",
 *          },
 *          notInParams:{
 *              age:"12,34"
 *          },
 *          orderBy:"name DESC,age",
 *          pageSize:30,
 *          currentPage:1
 *      }
 * */
function querySql(tableName,condition){
    return new Promise((resolve,reject)=>{
        let queryResultsql=`SELECT * FROM ${tableName} WHERE 1=1 `;
        let queryTotalsql=`SELECT COUNT(1) as Total FROM ${tableName} WHERE 1=1 `;
        //精确交集查询
        if(condition.eqParams){
            let tempObj=JSON.parse(condition.eqParams);     // {"name":"jimmy"}
            if(typeof(tempObj)==='object'){
                if(Object.keys(tempObj).length!=0){     //eqParams里有内容
                    Object.keys(tempObj).forEach(item => {      // item -> name
                        let tempStr="";
                        switch (typeof(tempObj[item])) {
                            case 'string':
                                tempStr=`\'${tempObj[item]}\'`;
                                break;
                            case 'object':
                                tempStr=`${JSON.stringify(tempObj[item])}`;
                                break;
                            default:
                                tempStr=`${tempObj[item]}`;
                                break;
                        }
                        queryResultsql+=`AND ${item}=${tempStr} `;
                        queryTotalsql+=`AND ${item}=${tempStr} `;
                    })
                }
            }else{
                reject("");
            }
        }
        //模糊查询
        if(condition.likeParams){
            let tempObj=JSON.parse(condition.likeParams);
            if(typeof(tempObj)==='object'){
                if(Object.keys(tempObj).length!=0){     //likeParams里有内容
                    Object.keys(tempObj).forEach(item=>{
                        let tempStr="";
                        switch (typeof(tempObj[item])) {
                            case 'object':
                                tempStr=`${JSON.stringify(tempObj[item])}`;
                                break;
                            default:
                                tempStr=`${tempObj[item]}`;
                                break;
                        }
                        queryResultsql+=`AND ${item} LIKE '%${tempStr}%' `;
                        queryTotalsql+=`AND ${item} LIKE '%${tempStr}%' `;
                    });
                }
            }else{
                reject("");
            }
        }
        //精确合集查询
        if(condition.inParams){
            let tempObj=JSON.parse(condition.inParams);
            if(typeof(tempObj)==='object'){
                if(Object.keys(tempObj).length!=0){     //inParams里有内容
                    Object.keys(tempObj).forEach(item => {
                        let valueArr=((tempObj[item]).toString()).split(",");  //{"age":"1,213"}
                        let tempStr="";
                        valueArr.forEach((vItem,vIndex) => {
                            tempStr+=vIndex===0?`\'${vItem}\'`:`,\'${vItem}\'`;
                        });
                        queryResultsql+=`AND ${item} IN (${tempStr}) `;
                        queryTotalsql+=`AND ${item} IN (${tempStr}) `;
                    });
                }
            }else{
                reject("");
            }
        }
        //精确差集查询
        if(condition.notInParams){
            let tempObj=JSON.parse(condition.notInParams);
            if(typeof(tempObj)==='object'){
                if(Object.keys(tempObj).length!=0){     //notInParams里有内容
                    Object.keys(tempObj).forEach(item => {
                        let valueArr=((tempObj[item]).toString()).split(",");  //{"age":"1,213"}
                        let tempStr="";
                        valueArr.forEach((vItem,vIndex) => {
                            tempStr+=vIndex===0?`\'${vItem}\'`:`,\'${vItem}\'`;                        
                        });
                        queryResultsql+=`AND ${item} NOT IN (${tempStr}) `;
                        queryTotalsql+=`AND ${item} NOT IN (${tempStr}) `;
                    });
                }
            }else{
                reject("");
            }
        }
        //排序
        if(condition.orderBy){      // {"orderBy":"name DESC,age"}
            if(typeof(condition.orderBy)==='string'){
                let tempStr=condition.orderBy.replace(/\"/g,"").replace(/\'/g,"");
                queryResultsql+=`ORDER BY ${tempStr} `;
                queryTotalsql+=`ORDER BY ${tempStr} `;
            }else{
                reject("");
            }
        }
        //分页查询 pageSize和currentPage需为数字或数字字符串
        if(condition.pageSize && condition.currentPage){    //{"pageSize":30,"currentPage":1}
            //校验是否为正整数
            if(publicUtils.validPositiveInteger(condition.pageSize) && publicUtils.validPositiveInteger(condition.currentPage)){
                let currentPage=Number(condition.currentPage);
                let pageSize=Number(condition.pageSize);
                queryResultsql+=`LIMIT ${(currentPage-1)*pageSize},${pageSize}`;
            }else{
                reject("");
            }
        }
        resolve({
            queryResultsql,
            queryTotalsql
        });
    })
}
/**
 * 生成新增语句 
 * 1. 批量新增
 *      condition=[
 *          {"name":"jimmy","age":12},
 *          {"name":"jimmy","age":12},
 *          {"name":"jimmy","age":12}
 *      ]
 * 2. 单条更新
 *      condition={
 *          "name":"jimmy",
 *          "age":12
 *      }
 */
function addSql(tableName,condition) {
    return new Promise(async (resolve,reject)=>{
        //查询当前表的所有字段
        let tableField=`SELECT COLUMN_NAME,EXTRA FROM information_schema.COLUMNS WHERE TABLE_NAME='${tableName}'`;    //查询表的字段
        try {
            let { result } = await connection(tableField);
            let autoIncreaseKey=[];
            let insertFieldArr=[];
            result.forEach(item => {
                if(item.EXTRA==='auto_increment'){
                    autoIncreaseKey.push(item.COLUMN_NAME); //自增列数组
                }else{
                    insertFieldArr.push(item.COLUMN_NAME);  //需要插入字段数组
                }
            });
            let insertFieldStr=insertFieldArr.join(",");    //需要插入字段字符串
            let sql=`INSERT INTO ${tableName}(${insertFieldStr}) VALUES `;
            //批量插入
            if(Array.isArray(condition)){
                //循环条件数组
                condition.forEach((cItem,cIndex) => {    //cItem -> obj
                    let valueStr="";    //插入内容字符串
                    insertFieldArr.forEach((iItem,iIndex) => {   //iItem -> string
                        let tempStr;
                        if(cItem[iItem]===undefined){
                            cItem[iItem]=null;
                        }
                        switch (typeof(cItem[iItem])) {
                            case 'string':
                                tempStr=`\'${cItem[iItem]}\'`;
                                break;
                            default:
                                tempStr=`${cItem[iItem]}`;
                                break;
                        }
                        valueStr+=iIndex===0?`${tempStr}`:`,${tempStr}`;
                    });
                    sql+=cIndex===0?`(${valueStr})`:`,(${valueStr})`;
                });
                resolve(sql);
            //单条插入
            }else{
                let valueStr="";
                insertFieldArr.forEach((item,index) => {
                    let tempStr;
                    if(condition[item]===undefined){
                        condition[item]="";
                    }
                    switch (typeof(condition[item])) {
                        case 'string':
                            tempStr=`\'${condition[item]}\'`
                            break;
                        default:
                            tempStr=`${condition[item]}`;
                            break;
                    }
                    valueStr+=index===0?`${tempStr}`:`,${tempStr}`;
                });
                sql+=`(${valueStr})`;
                resolve(sql);
            }
        } catch (error) {
            reject("");
        }
    })
}
/** 
 * 生成更新语句（根据主键）
 * 1. 单条更新
 *      condition={
 *          "id":12,
 *          "name":"黄家豪"
 *      }
 * 2. 批量更新相同字段
 *      condition={
 *          "id":"1,2,3,4",
 *          "state":0
 *      }
 * 3. 批量更新不同字段(未实现)
 *      condition=[
 *          {"id":1,"name":"jimmy"},
 *          {"id":2,"age":12},
 *          {"id":1,"state":0},
 *          {"id":1,"name":"黄家豪","state":1}           
 *      ]
*/
function updateSql(tableName,condition) {
    return new Promise(async (resolve,reject)=>{
        //查询当前表的主键
        let queryPrimaryKey=`SELECT COLUMN_NAME,COLUMN_KEY FROM information_schema.COLUMNS WHERE TABLE_NAME='${tableName}'`;
        try {
            let { result } = await connection(queryPrimaryKey);
            let primaryKeyArr=[];
            result.forEach(item => {
                if(item.COLUMN_KEY==="PRI"){
                    primaryKeyArr.push(item.COLUMN_NAME);   //获取到主键字段
                }
            });
            //批量更新不同字段
            if(Array.isArray(condition)){
                reject("");
            }else{
                let specifiedObject=publicUtils.splitObjAttr(condition,primaryKeyArr);  // where子句条件对象(主键的obj)
                let whereRowStr=""; //where子句
                let setRowStr="";   //set语句
                //传入条件中是否含有主键
                if(Object.keys(specifiedObject).length!=0){
                    Object.keys(specifiedObject).forEach(item => {
                        let valueArr=((specifiedObject[item]).toString()).split(",");
                        //批量更新相同字段
                        if(valueArr.length>1){
                            let tempStr = "";
                            valueArr.forEach((vItem,index) => {
                                tempStr+=index===0?`\'${vItem}\'`:`,\'${vItem}\'`;
                            });
                            whereRowStr+=`AND ${item} IN (${tempStr}) `;
                        //单条更新
                        }else{
                            let tempStr;
                            switch (typeof(specifiedObject[item])) {
                                case 'string':
                                    tempStr=`\'${specifiedObject[item]}\'`;
                                    break;
                                default:
                                    tempStr=`${specifiedObject[item]}`;
                                    break;
                            }
                            whereRowStr+=`AND ${item}=${tempStr} `;
                        }
                    });
                }else{
                    reject("");
                }
                //是否有传入更新条件
                if(Object.keys(condition).length!=0){
                    Object.keys(condition).forEach((item,index) => {
                        let tempStr;
                        switch (typeof(condition[item])) {
                            case 'string':
                                tempStr=`\'${condition[item]}\'`;
                                break;
                            default:
                                tempStr=`${condition[item]}`;
                                break;
                        }
                        setRowStr+=index===0?`${item}=${tempStr}`:`,${item}=${tempStr}`;
                    });
                }else{
                    reject("");
                }
                let sql=`UPDATE ${tableName} SET ${setRowStr} WHERE 1=1 ${whereRowStr}`;
                resolve(sql);
            }
        } catch (error) {
            reject("");
        }
    })
}
/** 
 * 生成删除语句
 * 1. 单条删除
 *    condition={
 *      "id":"1"
 *    }
 * 2. 批量删除
 *    condition={
 *      "id":"1,2,3,4"
 *    }
*/
function deleteSql(tableName,condition){
    return new Promise((resolve,reject)=>{
        if(Object.keys(condition).length!=0){
            let whereRowStr="";
            Object.keys(condition).forEach(item => {
                let tempStr="";
                let valueArr=((condition[item]).toString()).split(",");    //{"id":"1,2,3,4"}
                valueArr.forEach((vItem,vIndex) => {
                    tempStr+=vIndex===0?`\'${vItem}\'`:`,\'${vItem}\'`;                
                });
                whereRowStr+=` AND ${item} IN (${tempStr})`;
            });
            let sql=`DELETE FROM ${tableName} WHERE 1=1${whereRowStr}`;
            resolve(sql);
        }else{
            reject("");
        }
    })
}

module.exports={
    querySql,
    addSql,
    updateSql,
    deleteSql
}