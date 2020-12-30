const express=require('express');
const router=express.Router();

const user = require('../service/external');

// wx小程序登陆
router.get('/external/wxLogin',(req,res,next)=>{
    user.wxLogin(req,res,next);
})

module.exports = router;