const connection=require('../config/databaseConfig');
const resultUtils=require('../utils/resultUtils');
const sqlTmpl=require('../utils/crudUtils');
const tableName = 'tbl_priceMaintain';
module.exports={
    //查询全部板价信息或根据条件进行查询
    getPriceMaintainList: async (req,res,next)=>{
        try {
            let sql = await sqlTmpl.querySql(tableName,req.query);
            connection(sql,(err,result,fields)=>{
                if(err){
                    res.send(resultUtils.queryFailureResult(0,`查询失败,${err.sqlMessage}`));
                }else{
                    let rows=JSON.parse(JSON.stringify(result));
                    res.send(resultUtils.querySuccessResult(1,"查询成功",rows,rows.length));
                }
            })
        } catch (error) {
            res.send(resultUtils.queryFailureResult(0,"传参格式错误"));
        }
    },
    //新增板价信息
    addPriceMaintainData: async (req,res,next)=>{
        try {
            let sql = await sqlTmpl.addSql(tableName,req.body);
            connection(sql,(err,result,fields)=>{
                if(err){
                    res.send(resultUtils.operateFailureResult(0,`新增失败,${err.sqlMessage}`));
                }else{
                    res.send(resultUtils.operateSuccessResult(1,"新增成功",null));
                }
            })
        } catch (error) {
            res.send(resultUtils.operateFailureResult(0,"传参格式错误"));
        }
    },
    //更新板价信息
    updatePriceMaintainData: async (req,res,next)=>{
        try {
            let sql = await sqlTmpl.updateSql(tableName,req.body);
            connection(sql,(err,result,fields)=>{
                if(err){
                    res.send(resultUtils.operateFailureResult(0,`编辑失败,${err.sqlMessage}`));
                }else{
                    res.send(resultUtils.operateSuccessResult(1,"编辑成功",null));
                }
            })
        } catch (error) {
            res.send(resultUtils.operateFailureResult(0,"传参格式错误"));
        }
    },
    //删除板价信息
    deletePriceMaintainData: async (req,res,next)=>{
        try {
            let sql = await sqlTmpl.deleteSql(tableName,req.body);
            connection(sql,(err,result,fields)=>{
                if(err){
                    res.send(resultUtils.operateFailureResult(0,`删除失败,${err.sqlMessage}`));
                }else{
                    res.send(resultUtils.operateSuccessResult(1,"删除成功",null));
                }
            })
        } catch (error) {
            res.send(resultUtils.operateFailureResult(0,"传参格式错误"));
        }
    }
}