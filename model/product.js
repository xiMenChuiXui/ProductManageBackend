
let mongoose = require("mongoose");

let schema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:[true,"产品名字不能为空"]
    },
    price:{
        type:String,
        require:[true,"商品价格不能为空"]
    },
    stock:{
        type:Number,
        default:0
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        require:[true,"商品id不能为空"]
    },
    description:{
        type:String,
    },
    isOnSale:{
        type:Boolean,
        default:true
    },
    created:{
        type:Date,
        default:Date.now()
    }

});
module.exports=mongoose.model("products",schema);