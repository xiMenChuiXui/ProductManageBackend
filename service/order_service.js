let order_service = require("../model/order");
let config = require("../config");
let product_service= require("../service/product_service");
let big = require("big.js");

async function getOrdersByPage(page=1) {
     return await order_service.find({}).skip(config.pageCount*(page-1)).limit(config.pageCount).sort("-created").select("-__v");
}

async function getOrderById(id) {
    return await order_service.findOne({_id:id});
}

async function addOrder(order) {
//1. 根据商品id查询出商品
let product=await product_service.getProductById(order.productId);
console.log("product:"+product )
/*if(!product){
    throw Error("未找到商品");
}*/
    //判断库存够不够
    if(product.stock<order.count){
    throw Error("该商品库存不足");
    }

    order.productName=product.name;
    order.productPrice=product.price;
    order.totalMoney=big(order.productPrice).times(order.count);
    order.created=Date.now();

    let res = await order_service.create(order);
    //2. 减去库存
    let update={stock:product.stock-order.count}
    await product_service.updateById({_id:order.productId},update);
    return res;

}
module.exports={
    getOrderById,
    getOrdersByPage,
    addOrder
}