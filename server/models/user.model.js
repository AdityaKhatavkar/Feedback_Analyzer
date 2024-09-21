import bcrypt from "bcrypt";
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
    },
    verficationcode:{
        type:String,
        default:""
    },
    RefreshToken: {
        type: String
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
       this.password=await bcrypt.hash(this.password,10);
    }
    
})
userSchema.methods.getJwtToken= function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRES
        }
    )
}

userSchema.methods.ispasswordcorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
 

export default mongoose.model("User",userSchema)