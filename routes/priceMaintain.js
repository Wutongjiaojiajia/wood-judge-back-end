const express=require('express');
const router=express.Router();

const user=require('../service/priceMaintain');

//查询所有
router.get('/priceMaintain/queryList',(req,res,next)=>{
    user.getPriceMaintainList(req,res,next);
})

//新增用户
router.post('/priceMaintain/addData',(req,res,next)=>{
    user.addPriceMaintainData(req,res,next);
})

//更新用户信息
router.put('/priceMaintain/updateData',(req,res,next)=>{
    user.updatePriceMaintainData(req,res,next);
})

//删除用户信息
router.delete('/priceMaintain/deleteData',(req,res,next)=>{
    user.deletePriceMaintainData(req,res,next);
})

module.exports=router;