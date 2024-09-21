import Asynchandler from "../utils/Asynchandler.js";
import Feedback from "../models/feedback.model.js";
import ApiError from "../utils/ApiError.js";
import ApiRespoance from "../utils/ApiResponse.js";

const feedbackcollection=Asynchandler(async(req,res)=>{
    const {data}=req.body;
     if(!data){
        throw new ApiError(400,"please provide data")
     }
      data.map(async(element)=>{
       const feedback = await Feedback.create({
            clientid:req.user._id,
            email:element.email,
            feedback:element.feedback
        })
        console.log(feedback)
        
      })
     res.status(200).json(
        new ApiRespoance(200,"feedback submitted")
     )

})

export {feedbackcollection};