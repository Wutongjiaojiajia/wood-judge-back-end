const req = require('./req');

module.exports = {
    wxLogin:(data)=> req({
        url:'https://api.weixin.qq.com/sns/jscode2session',
        method:'get',
        params:data
    })
}