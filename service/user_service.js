let User = require("../model/user");
let crypto = require("lxj-crypto");
let config = require("../config");
/**
 * 获取用户信息
 * @param username
 * @returns {Promise<*>}
 */
async function findByUsername(username) {
    let res=await User.findOne({username:username}).select("-__v");
    if(!res){
        throw Error(`用户名为${username}的用户不存在`);
    }
    return res;
}
/**
 * 根据username来判断用户是否存在
 * @param username
 * @returns {Promise<void>}
 */
async function isUserExist(username) {
    let res=await User.findOne({username:username}).select("-__v");
    console.log("res:"+res)
    if(!res){
        throw Error(`用户名为${username}的账号不存在`)
    }
}
//删除用户
async function deleteUser(username) {
    await isUserExist(username);
    let res=await User.deleteOne({username:username});
    console.log("删除成功")
    if(res.n<1){
        throw Error(`用户名为${username}的用户删除失败`)
    }
}
//注册
async function register(user) {
    let res=await User.findOne({username:user.username});
    if(res){
       throw Error(`用户名为${user.username}的用户已存在`)
    }
    if(user.username==="西门吹雪"&&user.password==="12345"){
        user.role = 100; // 默认是超级用户
    }else{
        user.role = 0; // 默认是商家用户
    }
    user.password=crypto.sha1Hmac(user.password,user.username);

    user.created=Date.now();
    let result = await User.create(user);
    result.password="";
    return result;
}
//登录
async function loginUser(user) {
    //对用户密码进行加密
    user.password=crypto.sha1Hmac(user.password,user.username);
    //判断用户名字和密码是否正确
    let res=await  User.findOne({username:user.username,password:user.password})
    if(!res){
        throw Error(`用户名或密码错误`)
    }
    //给用户生成一个token,可以用aes算法生成
    let tokenData={
        username:user.username,
        expire: Date.now() + config.TokenExpire
    }
    let token =crypto.aesEncrypt(JSON.stringify(tokenData),config.TokenKey);
    return token;
}
module.exports={
    findByUsername,register,deleteUser,loginUser
}