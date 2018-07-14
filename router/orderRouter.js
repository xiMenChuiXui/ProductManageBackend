let order_service = require("../service/order_service");
let router=require("express").Router();

router.get("/",async(req,res)=>{
    let orders =await order_service.getOrdersByPage(req.query.page);
    res.success(orders);
})

router.get("/:id",async(req,res)=>{
   let order= await order_service.getOrderById(req.params.id)
    res.success(order);
})

router.post("/",async(req,res)=>{
    let order = await order_service.addOrder(req.body);
    res.success(order);
})

module.exports=router;