let Category_service = require("../model/category");
let config = require("../config");

async function findCategoriesByPage(page=0) {
    let categories = await Category_service.find({}).skip(config.pageCount*page).limit(config.pageCount).sort("-created").select("-__v");
    return categories;  //find({})中大括号里可以填筛选条件
}
async function addCategory(category) {
   return await Category_service.create(category)
}
async function isIdExist(id) {
    let res =await Category_service.findOne({_id:id});
    if(!res){
        throw Error(`号码为${id}的分类不存在`)
    }
}
async function deleteById(id) {
    isIdExist(id);
    let res = await Category_service.deleteOne({_id: id});
    console.log("res===="+res.toString())
    if(res.n<1){
        throw Error("删除失败");
    }
}
async function updateById(id,update) {
    await isIdExist(id);
    let res=await Category_service.updateOne({_id:id},update)
    if(res.n<1){
        throw Error("更新失败");
    }
}

module.exports={
    findCategoriesByPage,
    addCategory,
    deleteById,
    updateById
}