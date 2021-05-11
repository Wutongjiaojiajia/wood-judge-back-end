const resultEntity=require('../model/resultEntity');


/**
 * @method querySuccessResult
 * @description 返回查询成功结果
 * @param {Number} code
 * @param {String} info
 * @param {Array} rows
 * @param {Number} total
 * @returns
 */
//返回查询成功结果
function querySuccessResult(code,info,rows,total) {
    let qse =new resultEntity.querySuccessEntity();
    qse.setCode(code);
    qse.setInfo(info);
    qse.setRows(rows);
    qse.setTotal(total);
    qse.setTimestamp(new Date().getTime());
    return qse;
}

//返回查询失败结果
function queryFailureResult(code,info){
    let qfe=new resultEntity.queryFailureEntity();
    qfe.setCode(code);
    qfe.setInfo(info);
    qfe.setRows([]);
    qfe.setTotal(0);
    qfe.setTimestamp(new Date().getTime());
    return qfe;
}

//返回操作成功结果
function operateSuccessResult(code,info,data) {
    let ose=new resultEntity.operateSuccessEntity();
    ose.setCode(code);
    ose.setInfo(info);
    ose.setData(data);
    ose.setTimestamp(new Date().getTime());
    return ose;
}

//返回操作失败结果
function operateFailureResult(code,info){
    let ofe=new resultEntity.operateFailureEntity();
    ofe.setCode(code);
    ofe.setInfo(info);
    ofe.setTimestamp(new Date().getTime());
    return ofe;
}

module.exports={
    querySuccessResult,  //查询成功结果
    queryFailureResult,  //查询失败结果
    operateSuccessResult,  //操作成功结果
    operateFailureResult   //操作失败结果
}
