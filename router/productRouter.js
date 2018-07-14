let product_service = require("../service/product_service");
let router = require("express").Router();

router.get("/",async(req,res)=>{
    let products = await product_service.findProductsByPage(req.query.page);
    res.success(products);
})

router.get("/:id",async(req,res)=>{
    let product=await product_service.getProductById(req.params.id)
    res.success(product);
})

router.post("/",async(req,res)=>{
    let product = await product_service.addProduct(req.body);
    res.success(product);
})

router.put("/:id",async(req,res)=>{
  await product_service.updateById(req.params.id,req.body);
  res.success();
})

router.delete("/:id",async(req,res)=>{
    await product_service.deleteById(req.params.id);
    res.success();
})

module.exports=router;