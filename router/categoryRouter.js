let category_service = require("../service/category_service");
let router=require("express").Router();

router.get("/",async(req,res)=>{
    let categories = await category_service.findCategoriesByPage(req.query.page);
    res.success(categories);
})
router.post("/",async(req,res)=>{
    let category =await category_service.addCategory(req.body);
    res.success(category);
})
router.delete("/:id",async(req,res)=>{
    await category_service.deleteById(req.params.id);
    res.success();
})
router.put("/:id",async(req,res)=>{
    await category_service.updateById(req.params.id,req.body);
    res.success();
})

module.exports=router