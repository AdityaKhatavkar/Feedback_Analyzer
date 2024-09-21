import Asynchandler from "../utils/Asynchandler";
import User from "../models/user.model.js";
import Asynchandler from "../utils/Asynchandler.js";
import jwt from "jsonwebtoken";

const authverfication=Asynchandler(async (req,res,next)=>{
    try{

      const token= await req.cookies?.RefreshToken || req.headers("Authorization")?.replace("Bearer ","") ;

      if(!token){
        throw new ApiError(401,"You are not authorized to access this route")
      }

      const decode=await jwt.verify(token,process.env.JWT_SECRET);

      if(!decode){
        throw new ApiError(401,"token is not verifed");
      }

      const user = await User.findById(decoded._id).select("-password -RefreshToken")
      if(!user){
        throw new ApiError(401,"user not found")
      }

      req.user=user;
      next();
    }
    catch{
        throw new ApiError(401,"auth verfication failed");
    }
})