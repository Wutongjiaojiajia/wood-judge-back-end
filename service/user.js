const connection=require('../config/databaseConfig');
const resultUtils=require('../utils/resultUtils');
const sqlTmpl=require('../utils/crudUtils');
const tableName = 'tbl_systemUser'; //系统用户表

module.exports = {
    // 存入登录用户到待审核用户表
    addUserToPendCheck:async (req,res,next)=>{
        try {
            // 校验是否有重复数据
            let validRepeatObj = {
                eqParams:{
                	openid:req.body.openid
                }
            };
            let { queryTotalsql } = await sqlTmpl.querySql(tableName,validRepeatObj);
            let { result } = await connection(queryTotalsql);
            if(result[0].Total === 0){
                let sql = await sqlTmpl.addSql(tableName,req.body);
                console.log("sql",sql);
                await connection(sql);
                res.send(resultUtils.operateSuccessResult(1,"新增用户到用户列表成功",null));
            }else{
                res.send(resultUtils.operateFailureResult(0,"当前用户已存在列表中"));
            }
        }catch(error) {
            switch (true) {
                case error == "":
                    res.send(resultUtils.operateFailureResult(0,"传参格式错误"));
                    break;
                case error.err:
                	res.send(resultUtils.operateFailureResult(0,`新增用户到用户列表失败`));
                    break;
            }
        }
    },
    // 校验用户是否存在系统用户表中
    validateUserIsLegal:async (req,res,next)=>{
        try {
            // 校验是否有重复数据
            let validLegalObj = {
                eqParams:{
					openid:req.query.openid,
					isValidate:1	//0-未授权 1-已授权
                }
            };
			let { queryTotalsql } = await sqlTmpl.querySql(tableName,validLegalObj);
			let { result } = await connection(queryTotalsql);	//查询总数
            if(result[0].Total === 0){
                res.send(resultUtils.operateFailureResult(0,"当前用户不合法"));
            }else{
                res.send(resultUtils.operateSuccessResult(1,"用户验证成功",null));
            }
        }catch(error) {
            switch (true) {
                case error == "":
                    res.send(resultUtils.operateFailureResult(0,"传参格式错误"));
                    break;
                case error.err:
                    res.send(resultUtils.operateFailureResult(0,`用户验证失败，请重新验证`));
                    break;
            }
        }
    }
}