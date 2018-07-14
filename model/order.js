
let mongoose = require("mongoose");

let schema=new mongoose.Schema({
  productId:{
      type:mongoose.Schema.Types.ObjectId,
      require:[true,"商品id不能为空"]
  },
    productName:{
      type:String,
        require:[true,"商品名不能为空"]
    },
    productPrice:{
      type:String,
        require:[true,"商品价格不能为空"]
    },
    count:{
      type:Number,
        require:[true,"商品数量不能为空"],
        min:[1,"商品数量不能小于1"]
    },
    totalMoney:{
      type:Number
    },
    created:{
      type:Date,
        default:Date.now()
    },
    status:{
      type:String,
        default:"unpay"  //订单状态: unpay success cancel
    },
    payTime:{
      type:Date
    },
    cancelTime:{
      type:Date
    }

});
module.exports=mongoose.model("orders",schema);