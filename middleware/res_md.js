module.exports = (req, res, next)=>{
    // 给res对象安装success方法
    res.success = (data)=>{
        console.log("data:"+JSON.stringify(data))
        res.send({
            code: 0,
            data: data,
            msg: "操作成功"
        });
    };
    // 给res对象安装fail方法
    res.fail = (msg)=>{
        res.send({
            code: -1,
            msg: msg
        })
    };

    next();
}