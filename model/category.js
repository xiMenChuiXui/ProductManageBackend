
let mongoose = require("mongoose");

let schema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:[true,"分类名不能为空"]
    },
    created:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model("categorys",schema);