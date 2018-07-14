let userService = require("../service/user_service");
let config = require("../config");
let crypto = require("lxj-crypto");
// 用来判断当前的用户是否是合法认证的用户
// 具体做法：
//1. 从header中取token，如果没有，则直接拒绝
//2. 如果有token，则校验token的正确性，如果解码解密失败，则直接拒绝

/**
 * 判断url是否是排除检查的url
 * @param url
 */
 function isExcludeUrl(url) {
    let excludeUrls=[
        /.*\/user\/login/,
        /.*\/user\/register/
    ];
    let isExclude=false;
    excludeUrls.forEach(item=>{
        if(item.test(url)){
            isExclude=true;
        }
    })
    return isExclude;
}

// 先判断当前的url是否是需要token验证，登录和注册的接口是不需要token的
module.exports=async(req,res,next)=>{
    if(!isExcludeUrl(req.url)){
        console.log("req.url::::;"+req.url)
        // 1. 从header中取出token
        let token=req.get('token');
        if(!token){
            throw Error("缺少token");
        }
        // 2. 对token进行解码，看是否是伪造的token
        let tokenData;
        try{
            tokenData=JSON.parse(crypto.aesDecrypt(token,config.TokenKey));
            console.log("tokenData:"+tokenData)
        }catch(e){
            throw Error("token不合法")
        }
        //3. 判断token是否过期
        if(token.expire<Date.now()){
            throw Error("token已过期,请重新登录");
        }
        //4. 可以根据tokenData中的username取出用户信息，为了给后续的请求使用
        let userInfo=await userService.findByUsername(tokenData.username);
        req.user=userInfo;  //提供userInfo方便用户后续操作
        // 给req对象安装一个userInfo变量，目的是给后面的中间件来用
    }


    next();
}






