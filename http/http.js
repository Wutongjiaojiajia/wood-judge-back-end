const axios = require('axios');

/**
 * url: 地址
 * method: 请求方法
 * params: 参数
 * timeout: 超时时间
 * isOriginalGET: 是否传统get传参
 * changeJwtCallback：换jwt回调
 * extraConfig: 其他 axios 配置项 ---10291211/v0.0.3
 */
const http = ({
	url,
	method,
	params,
	timeout,
	notOriginalGET,
	extraConfig
}) => {
	// axios 拦截器
	axios.interceptors.response.use(
		response => {
			return response;
		},
		// error => {
		// 	// 异常处理操作，用于上报到 Sentry ---20191224/v0.0.5
		// 	// 断网 或者 请求超时 状态
		// 	if (!error.response) {
		// 		// 请求超时状态
		// 		if (error.message.includes('timeout')) {
		// 			errorCallback('请求超时，请检查网络是否连接正常');
		// 		} else {
		// 		// 可以展示断网组件
		// 			errorCallback('请求失败，请检查网络是否已连接');
		// 		}
		// 		return;
		// 	}
		// 	return Promise.reject(error);
		// }
	);
	!params && (params = {});
	let config = {
		method: method,
		url: url,
		timeout: 20000,
		headers: {
			'Content-Type': 'application/json'   //base64 --v0.0.6
		}
	};
	// 用来覆盖默认的超时时间
	if (timeout) {
		config.timeout = timeout;
	}
	method = method.toUpperCase();
	if (method == 'GET') {
		if (!notOriginalGET) {
			config.params = params;
		} else {
			// 有参数才在地址后面拼字符串
			if(Object.keys(params).length > 0){
				config.url += `/${encodeURIComponent(JSON.stringify(params))}`;
			}
		}
	} else {
		config.data = params;
	}
	// 其他 axios 配置项 ---10291211/v0.0.3
	if(extraConfig) {
		config = Object.assign(config, extraConfig)
	}

	return axios(config);
}

module.exports = http;