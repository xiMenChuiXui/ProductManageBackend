// 负责检查当前用户的role，是否有权限操作当前的url
// 将每种role和它有权限操作的url进行一个映射，

let userService= require("../service/user_service");

let role_permission=[
    {role: 0,              //商家用户
     permissions: [
    /.*\/product/,        //  \:转义字符
    /.*\/category/,
    /.*\/order/
]},{
    role:100,              //超级管理员
    permissions:[
     /.*/
        ]}
]

module.exports=(req,res,next)=>{
    if(req.user){             // 对req.user对象不为空的才进行检查
        let isLetGo=false;
        //取出user的role，然后遍历数组，判断对应的role的权限是否包含当前请求的url
        role_permission.forEach(obj=>{
            if(req.user.role===obj.role){
                // 则遍历当前obj的permissions，看看是否能够访问req.url
                obj.permissions.forEach(permission=>{
                    if(permission.test(req.url)){
                        //说明能够访问req.url
                        isLetGo=true;
                    }
                })
            }
        });
        if(!isLetGo){    // 当循环结束后，如果isLetGo还是false，说明没有权限
            throw Error("当前用户权限不足");
        }
    }
    next();
}