const express=require('express');
const router=express.Router();

const user=require('../service/user');

//查询所有
router.get('/user/getUserList',(req,res,next)=>{
    user.getUserList(req,res,next);
})

//新增用户
router.post('/user/addUser',(req,res,next)=>{
    user.addUser(req,res,next);
})

//更新用户信息
router.put('/user/editUser',(req,res,next)=>{
    user.editUser(req,res,next);
})

//删除用户信息
router.delete('/user/deleteUser',(req,res,next)=>{
    user.deleteUser(req,res,next);
})

module.exports=router;