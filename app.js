let db = require("./db");
require("express-async-errors");
let express = require("express");
let bodyParser = require("body-parser");
let morgan = require("morgan");


let config = require("./config");
let app = express();

//用于打印log时显示请求信息
app.use(morgan("combined"));
//用于解析body请求json格式
app.use(bodyParser.json());


app.use(require("./middleware/res_md"));        //捕捉全局的异常的中间件
app.use(require("./middleware/token_md")) ;      // token认证的中间件
app.use(require("./middleware/permission_md"));  // 权限检查的中间件,需要放在token中间件的下面

//*******异常中间件必须放在路由的上方*******
//路由
app.use("/user",require("./router/userRouter"));
app.use("/category",require("./router/categoryRouter"));
app.use("/product",require("./router/productRouter"));
app.use("/order",require("./router/orderRouter"));
app.use((err,req,res,next)=>{
    res.fail(err.toString());
});
app.listen(config.PORT);


