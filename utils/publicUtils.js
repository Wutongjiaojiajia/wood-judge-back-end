//对象属性拆分
const splitObjAttr=(obj,arr)=>arr.reduce((iter,val)=>(val in obj && (iter[val]=obj[val]) && (delete obj[val]),iter),{});

//校验传入数字或字符串是否正整数
function validPositiveInteger(params) {
    return Number.isInteger(parseFloat(params)>0?parseFloat(params):false);
}

module.exports={
    splitObjAttr:splitObjAttr,
    validPositiveInteger:validPositiveInteger
}