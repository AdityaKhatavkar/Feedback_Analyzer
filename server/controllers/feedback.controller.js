import Asynchandler from "../utils/Asynchandler.js";
import Feedback from "../models/feedback.model.js";
import ApiError from "../utils/ApiError.js";
import ApiRespoance from "../utils/ApiResponse.js";
import User from "../models/user.model.js";

//direct json data with array of object is send by the user
const feedbackcollection = Asynchandler(async (req, res) => {
   const { data } = req.body;
   if (!data) {
      throw new ApiError(400, "please provide data")
   }
   const checkdata = await Feedback.find({ clientid: req.user._id });

   if (checkdata.length > 0) {
      await Feedback.deleteMany({ clientid: req.user._id });
   }
   data.map(async (element) => {
      const feedback = await Feedback.create({
         clientid: req.user._id,
         email: element.email,
         feedback: element.feedback
      })
      //   console.log(feedback)

   })
   res.status(200).json(
      new ApiRespoance(200, [], "feedback submitted")
   )

})

//creating the form for the user
const feedbackformcreation = Asynchandler(async (req, res) => {

   await Feedback.deleteMany({ clientid: req.user._id });

   let token = Math.floor(100000 + Math.random() * 900000);

   while (await User.findOne({ verficationcode: token })) {
      token = Math.floor(100000 + Math.random() * 900000);
   }

   const user = await User.findById(req.user._id);

   user.verficationcode = token;

   await user.save();

   const finaluser = await User.findById(user._id).select("-password -RefreshToken");
   res.status(200).json(
      new ApiRespoance(200, finaluser, "form created")
   )
})

//deleting the form
const feedbackformdelete = Asynchandler(async (req, res) => {
   await Feedback.deleteMany({ clientid: req.user._id });

   const user = await User.findById(req.user._id);

   user.verficationcode = "";

   await user.save();

   const finaluser = await User.findById(user._id).select("-password -RefreshToken");

   res.status(200).json(
      new ApiRespoance(200, finaluser, "form deleted")
   )
})


//submitting the form
const formcollection = Asynchandler(async (req, res) => {
   const _id = req.params.id;
   const verficationcode = req.params.code;
   const { feedback, email } = req.body;

   if (!verficationcode || !_id) {
      throw new ApiError(400, "No form found")
   }

   const user=await User.findById(_id).select("-password -RefreshToken -verficationcode");
    if(!user){
       throw new ApiError(400, "user not found")
    }
   if (user.verficationcode !== verficationcode) {
      throw new ApiError(400, "Invalid form")
   }

   if (!feedback || !email) {
      throw new ApiError(400, "Please provide all fields")
   }
   const newfeedback = await Feedback.create({
      clientid: _id,
      email: email,
      feedback: feedback
   })

   if (!newfeedback) {
      throw new ApiError(400, "form not created")
   }
   res.status(200).json(
      new ApiRespoance(200, finalfeeback, "form submitted")
   )
})

//generating token
const apigenerate = Asynchandler(async (req, res) => {
   const user = await User.findById(req.user._id).select("-password -RefreshToken -verficationcode");
   await Feedback.deleteMany({ clientid: req.user._id });

   let token = Math.floor(100000 + Math.random() * 900000);

   while (await User.findOne({ tokenid: token })) {

      token = Math.floor(100000 + Math.random() * 900000);

   }
   user.tokenid = token;

   await user.save();

   res.status(200).json(
      new ApiRespoance(200, user, "token generated")
   )
})


//deleting token
const apidelete = Asynchandler(async (req, res) => {

   const user = await User.findById(req.user._id).select("-password -RefreshToken -verficationcode");

   await Feedback.deleteMany({ clientid: req.user._id });

   user.tokenid = "";

   await user.save();

   res.status(200).json(
      new ApiRespoance(200, user, "token deleted")
   )
})


//submitting feedback
const apifeedback=Asynchandler(async(req,res)=>{
   const _id=req.params.id;
   const tokenid=req.params.tokenid;
   const {data}=req.body;

   if(!_id || !tokenid){
      throw new ApiError(400,"No api found");
   }

   if(!data){
      throw new ApiError(400,"Please provide data");
   }

   const user=await User.findById(_id).select("-password -RefreshToken -verficationcode");

   if(!user){
      throw new ApiError(400,"user not found");
   }
   if(user.tokenid!==tokenid){
      throw new ApiError(400,"invalid token");
   }

   data.map(async(element)=>{
      const feedback=await Feedback.create({
         clientid:user._id,
         email:element.email,
         feedback:element.feedback
      })
   })

   res.status(200).json(
      new ApiRespoance(200,[],"feedback submitted")
   )

})


export {
   feedbackcollection, feedbackformcreation,
   feedbackformdelete, formcollection, apigenerate,apidelete,apifeedback
};