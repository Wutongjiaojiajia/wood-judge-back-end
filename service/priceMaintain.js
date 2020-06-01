const connection=require('../config/databaseConfig');
const resultUtils=require('../utils/resultUtils');
const sqlTmpl=require('../utils/crudUtils');
const publicUtils=require('../utils/publicUtils');
const tableName = 'tbl_priceMaintain';
module.exports={
    //查询全部板价信息或根据条件进行查询
    getPriceMaintainList: async (req,res,next)=>{
        try {
            let { queryResultsql,queryTotalsql } = await sqlTmpl.querySql(tableName,req.query);
            let { result } = await connection(queryResultsql);  //查询数据
            let totalInfo = await connection(queryTotalsql);    //查询总数
            let rows = JSON.parse(JSON.stringify(result));
            res.send(resultUtils.querySuccessResult(1,"查询成功",rows,totalInfo.result[0].Total));
        } catch (error) {
            switch (true) {
                case error == "":
                    res.send(resultUtils.queryFailureResult(0,"传参格式错误"));
                    break;
                case error.err:
                    res.send(resultUtils.queryFailureResult(0,`查询失败,${error.err.sqlMessage}`));
                    break;
            }
        }
    },
    //新增板价信息
    addPriceMaintainData: async (req,res,next)=>{
        try {
            let msg = "";
            // 校验
            switch (true) {
                case publicUtils.validateInteger(req.body.thickness):
                    msg = "板材厚度必须为正整数";
                    break;
                
                default:
                    break;
            }
            let validRepeatObj = {
                thickness:req.body.thickness
            }
            let sql = await sqlTmpl.addSql(tableName,req.body);
            await connection(sql);
            res.send(resultUtils.operateSuccessResult(1,"新增成功",null));
        } catch (error) {
            switch (true) {
                case error == "":
                    res.send(resultUtils.operateFailureResult(0,"传参格式错误"));
                    break;
                case error.err:
                    res.send(resultUtils.operateFailureResult(0,`新增失败,${err.sqlMessage}`));
                    break;
            }
        }
    },
    //更新板价信息
    updatePriceMaintainData: async (req,res,next)=>{
        try {
            let sql = await sqlTmpl.updateSql(tableName,req.body);
            await connection(sql);
            res.send(resultUtils.operateSuccessResult(1,"编辑成功",null));
        } catch (error) {
            switch (true) {
                case error == "":
                    res.send(resultUtils.operateFailureResult(0,"传参格式错误"));
                    break;
                case error.err:
                    res.send(resultUtils.operateFailureResult(0,`编辑失败,${err.sqlMessage}`));
                    break;
            }
        }
    },
    //删除板价信息
    deletePriceMaintainData: async (req,res,next)=>{
        try {
            let sql = await sqlTmpl.deleteSql(tableName,req.body);
            await connection(sql);
            res.send(resultUtils.operateSuccessResult(1,"删除成功",null));
        } catch (error) {
            switch (true) {
                case error == "":
                    res.send(resultUtils.operateFailureResult(0,"传参格式错误"));
                    break;
                case error.err:
                    res.send(resultUtils.operateFailureResult(0,`删除失败,${err.sqlMessage}`));
                    break;
            }
        }
    }
}