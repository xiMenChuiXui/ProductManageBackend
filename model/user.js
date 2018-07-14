let mongoose = require("mongoose");

let schema=new mongoose.Schema({
    username:{
      type:String,
        unique: true,
      require:[true,"用户名不能为空"]
    },
    password:{
        type:String,
        unique:true,
        require:[true,"密码不能为空"]
    },
    age:{
        type:Number,
        min:[0,"年龄不能小于0岁"],
        max:[120,"年龄不能超过120岁"]
    },
    role:{
        type:Number,
        default:0
    },
    created:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model("users",schema);