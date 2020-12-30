const express=require('express');
const router=express.Router();

const user=require('../service/user');

// 添加用户到审核列表中
router.post('/user/addUserToPendCheck',(req,res,next)=>{
    user.addUserToPendCheck(req,res,next);
})
// 校验用户是否存在系统用户表中
router.get('/user/validateUserIsLegal',(req,res,next)=>{
    user.validateUserIsLegal(req,res,next);
})

module.exports = router;