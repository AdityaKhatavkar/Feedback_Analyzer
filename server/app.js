import express from "express"
import cookieParser from "cookie-parser"
const app=express();

app.use(express.json());

app.use(cookieParser());

import router from "./routes/user.route.js";

app.use('/user',router);

export {app};