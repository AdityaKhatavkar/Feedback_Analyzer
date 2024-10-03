import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    clientid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    feedback:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,  
    },
    catagry:{
        type:String,
        enum:["good","bad","neutral","other"],
        default:"other",  
    }
},
{timestamps:true}
)

const Feedback = mongoose.model("Feedback",feedbackSchema);

export default Feedback