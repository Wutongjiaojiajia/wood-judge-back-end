//基本成功类
class baseEntity{
    constructor(){

    }
    //操作代码
    setCode(code){
        this.code=code;
    }
    getCode(){
        return this.code;
    }
    //信息
    setInfo(info){
        this.info=info;
    }
    getInfo(){
        return this.info;
    }
    //时间戳
    setTimestamp(timestamp){
        this.timestamp=timestamp;
    }
    getTimestamp(){
        return this.timestamp;
    }
}

//查询成功类
class querySuccessEntity extends baseEntity{
    //数据
    setRows(rows){
        this.rows=rows;
    }
    getRows(){
        return this.rows;
    }
    //总数
    setTotal(total){
        this.total=total;
    }
    getTotal(){
        return this.total;
    }
}

//查询失败类
class queryFailureEntity extends baseEntity{
    //数据
    setRows(rows){
        this.rows=rows;
    }
    getRows(){
        return this.rows;
    }
    //总数
    setTotal(total){
        this.total=total;
    }
    getTotal(){
        return this.total;
    }
}

//操作成功类
class operateSuccessEntity extends baseEntity{
    //数据返回
    setData(data){
        this.data=data;
    }
    getData(){
        return this.data;
    }
}

//操作失败类
class operateFailureEntity extends baseEntity{

}

//导出
module.exports={
    querySuccessEntity:querySuccessEntity,
    queryFailureEntity:queryFailureEntity,
    operateSuccessEntity:operateSuccessEntity,
    operateFailureEntity:operateFailureEntity
}