let mongoose = require("mongoose");
let config = require("./config");
mongoose.connect(`mongodb://127.0.0.1/${config.DB}`);

let db = mongoose.connection;

db.on("error",(err)=>{
    console.log(err.toString())
})
db.once("open",()=>{
    console.log("database connects successfully!~")
})