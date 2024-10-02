import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app=express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieParser());

import router from "./routes/user.route.js";

app.use('/user',router);



app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500;
    const errorMessage=err.message || "Something went wrong";
    
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})

export {app};