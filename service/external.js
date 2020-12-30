const resultUtils=require('../utils/resultUtils');
const request = require('../http/index');

module.exports = {
	wxLogin:(req,res,next)=>{
		let obj = {
			appid:'wx92e007217f3bff1b',	//小程序appId
			secret:'f69c26e2d128d2e09c26e99ed3d8e29c',	//小程序appSecret
			js_code:req.query.code,	//登录时获取的code
			grant_type:'authorization_code',	//授权类型
		};
		request.wxLogin(obj)
		.then((loginResult)=>{
			let { openid,session_key,errcode } = loginResult.data;
			let msg = "";
			if(errcode){
				switch (errcode) {
					// 系统繁忙
					case -1:
						msg = "系统繁忙，请稍后再试";
						break;
					// code无效
					case 40029:
						msg = "用户信息无效，请重试";
						break;
					// 频率限制
					case 45011:
						msg = "操作频率过高，请稍后再试";
						break;
				}
			}
			if(msg !== ""){
				res.send(resultUtils.operateFailureResult(errcode,mgs));
				return;
			}
			// 成功信息
			let successInfoObj = {
				openid,
				session_key
			};
			res.send(resultUtils.operateSuccessResult(0,successInfoObj,null));
		})
		.catch((error)=>{
			res.send(resultUtils.operateFailureResult(-99,"网络连接超时，请重试"));
		})
	}
}