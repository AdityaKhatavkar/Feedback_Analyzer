import Feedback from "../models/feedback.model.js";
import ApiError from "../utils/ApiError.js";
import ApiRespoance from "../utils/ApiResponse.js";
import Asynchandler from "../utils/Asynchandler.js";
import Summary from "../models/Summary.model.js";

const allfeedback=Asynchandler(async(req,res)=>{
    const _id=req.user._id;

    const feedback=await Feedback.find({clientid:_id});

    if(!feedback){
        throw new ApiError(400,"feedback not found")
    }
    
    res.status(200).json(
        new ApiRespoance(200,feedback,"all feedback")
    )
})


const allsummary=Asynchandler(async(req,res)=>{

    const _id=req.user._id;

    const summary=await Summary.findOne({clientid:_id});
  
    if(!summary){
        throw new ApiError(400,"summary not found")
    }

    res.status(200).json(
        new ApiRespoance(200,summary,"all summary")
    )

})
export  {allfeedback,allsummary};