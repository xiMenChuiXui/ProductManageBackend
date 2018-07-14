let product_service = require("../model/product");
let config = require("../config");

async function findProductsByPage(page=1) {
   return await product_service.find().skip(config.pageCount*(page-1)).limit(config.pageCount).sort("-created").select("-__v");
}

async function addProduct(product) {
    return await product_service.create(product);
}

async function isIdExist(id) {
    let res = await product_service.findOne({_id:id});
    if(!res){
        throw Error(`id为${id}的产品不存在`);
    }
}
async function  updateById(id,update) {
    isIdExist(id);
    let res=await product_service.updateOne({_id:id},update);
    if(res.n<1){
        throw Error("更新失败");
    }
}
async function deleteById(id) {
    isIdExist(id);
    let res=await product_service.deleteOne({_id:id});
    if(res.n<1){
        throw Error("删除失败");
    }
}
async function getProductById(id) {
    isIdExist(id);
    let res=await product_service.findOne({_id:id})
    console.log("res==="+res)
    if(res.n<1){
        throw Error("查询失败");
    }
    return res;
}

module.exports={
    findProductsByPage,
    getProductById,
    addProduct,
    updateById,
    deleteById
}