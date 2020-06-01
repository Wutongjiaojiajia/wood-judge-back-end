//对象属性拆分
const splitObjAttr=(obj,arr)=>arr.reduce((iter,val)=>(val in obj && (iter[val]=obj[val]) && (delete obj[val]),iter),{});

//校验传入数字或字符串是否正整数
function validPositiveInteger(params) {
    return Number.isInteger(parseFloat(params)>0?parseFloat(params):false);
}

// 校验金额正则表达式
const validateCorrectMoney = (num) => {
    let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
    return reg.test(num);
}


// 校验正整数正则表达式
const validateInteger = (num) => {
    let reg = /^[1-9]\d*$/;
    return reg.test(num);
}

module.exports={
    splitObjAttr,
    validPositiveInteger,
    validateCorrectMoney,
    validateInteger
}