let user_service = require("../service/user_service");
let router = require("express").Router();
// require("../middleware/res_md")

router.get("/:username",async (req,res)=>{
   let user=await user_service.findByUsername(req.params.username)
    res.success(user)
})

router.post("/register",async(req,res)=>{
    let user = await user_service.register(req.body);
    res.success(user)
})

router.delete("/:username",async(req,res)=>{
    await user_service.deleteUser(req.params.username);
    res.success();
})

router.post("/login",async (req,res)=>{
    let token = await user_service.loginUser(req.body);
    res.success({
        token
    });
})

module.exports=router