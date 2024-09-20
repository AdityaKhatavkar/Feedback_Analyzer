import bcrypt from "bcryptjs/dist/bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    username:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    emailverfied:{
        type:Boolean,
        default:false,
    }

},
{
    timestamps:true
})

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        // return next()
    }
    else{
       this.password=await bcrypt.hash(this.password,process.env.HASHKEY);
    }
    
})
userSchema.method.getJwtToken= function(){
    return jwt.sign(
        {
            id:this._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRES
        }
    )
}
userSchema.method.verifypassword=async function(password){
    return await bcrypt.compare(password,this.password);
}


export default mongoose.model("User",userSchema)