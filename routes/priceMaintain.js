const express=require('express');
const router=express.Router();

const user=require('../service/priceMaintain');

//查询所有板价信息
router.get('/priceMaintain/queryList',(req,res,next)=>{
    user.getPriceMaintainList(req,res,next);
})

//新增板价信息
router.post('/priceMaintain/addData',(req,res,next)=>{
    user.addPriceMaintainData(req,res,next);
})

//更新板价信息
router.post('/priceMaintain/updateData',(req,res,next)=>{
    user.updatePriceMaintainData(req,res,next);
})

//删除板价信息
router.post('/priceMaintain/deleteData',(req,res,next)=>{
    user.deletePriceMaintainData(req,res,next);
})

module.exports=router;