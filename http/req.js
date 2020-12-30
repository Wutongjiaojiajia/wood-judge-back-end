const http = require('./http.js');

const req = ({method,url,params,timeout,notOriginalGET,extraConfig})=>{
    let options = {
        url,
        method,
        params,
        timeout,
        notOriginalGET,
        extraConfig
    };
    return http(options);
}

module.exports = req;