let express = require("express")
let cors=require("cors")
let mongoose =require("mongoose")
const userrouter = require("./App/router/web/userroutes")
require('dotenv').config()
let app=express()
app.use(cors())
app.use(express.json())



app.use("/api/user/routes",userrouter)






mongoose.connect(process.env.DBURL).then(()=>{
  console.log("Server successfully Connect")
  app.listen(process.env.PORT || 3000,()=>{
    console.log("Successfully app run on this port")
    // console.log("hello")
  })
}).catch((err)=>{
    console.log(err)
  })