import Asynchandler from "../utils/Asynchandler.js";
import Feedback from "../models/feedback.model.js";
import ApiError from "../utils/ApiError.js";
import ApiRespoance from "../utils/ApiResponse.js";
import User from "../models/user.model.js";

//direct json data with array of object is send by the user
const feedbackcollection = Asynchandler(async (req, res) => {
   const  data  = req.body;
   const id=req.user._id;
   const dataarray=data.data;
  
   if(!dataarray || !data){
      throw new ApiError(400,"No data found")
   }

   const user=await User.findById(id).select("-password -RefreshToken -verficationcode");

   if(!user){
      throw new ApiError(400,"user not found")
   }

   const feedback=await Feedback.find({clientid:id});

   if(feedback){
      await Feedback.deleteMany({ clientid: id });
   }
   user.tokenid="";
   user.verficationcode="";
   await user.save();

   dataarray.map(async(element)=>{  
      await Feedback.create({
         clientid:id,
         email:element.email,
         feedback:element.feedback
      })
   }
   )


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
   if(!user){
      throw new ApiError(400,"user not found")
   }
   user.tokenid = "";
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

   if(!user){
      throw new ApiError(400,"user not found")
   }
   user.verficationcode = "";

   await user.save();

   const finaluser = await User.findById(user._id).select("-password -RefreshToken");

   res.status(200).json(
      new ApiRespoance(200, finaluser, "form deleted")
   )
})


//submitting the form
const formcollection = Asynchandler(async (req, res) => {
  
   const {id} = req.params;
   const {verficationcode} = req.params;
   const { feedback, email } = req.body;
  
   if (!verficationcode || !id) {
      throw new ApiError(400, "No form found")
   }

   const user=await User.findById(id).select("-password -RefreshToken ");
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
      clientid: id,
      email: email,
      feedback: feedback
   })
   
   if (!newfeedback) {
      throw new ApiError(400, "form not created")
   }

   res.status(200).json(
      new ApiRespoance(200, newfeedback, "form submitted")
   )
})

//generating token
const apigenerate = Asynchandler(async (req, res) => {

   const user = await User.findById(req.user._id).select("-password -RefreshToken ");
  
   if (!user) {
      throw new ApiError(400, "user not found")
   }

   await Feedback.deleteMany({ clientid: req.user._id });

   let token = Math.floor(100000 + Math.random() * 900000);

   while (await User.findOne({ tokenid: token })) {

      token = Math.floor(100000 + Math.random() * 900000);

   }
   user.verficationcode = "";
   user.tokenid = token;

   await user.save();

   res.status(200).json(
      new ApiRespoance(200, user, "token generated")
   )
})


//deleting token
const apidelete = Asynchandler(async (req, res) => {

   const user = await User.findById(req.user._id).select("-password -RefreshToken -verficationcode");
  
   if(!user){
      throw new ApiError(400,"user not found")
   }

   await Feedback.deleteMany({ clientid: req.user._id });

   user.tokenid = "";

   await user.save();

   res.status(200).json(
      new ApiRespoance(200, user, "token deleted")
   )
})


//submitting feedback
const apifeedback=Asynchandler(async(req,res)=>{
   const {id}=req.params;
   const {tokenid}=req.params;
   const {data}=req.body;
   const {emailfeildname,feedbackfeildname}=req.body;
   
   if(!id || !tokenid){
      throw new ApiError(400,"No url found");
   }
 
   if(!data){
      throw new ApiError(400,"Please provide data");
   }

   const user=await User.findById(id).select("-password -RefreshToken -verficationcode");
   
   if(!user){
      throw new ApiError(400,"user not found");
   }

   await Feedback.deleteMany({ clientid: user._id });
   
   if(user.tokenid!==tokenid){
      throw new ApiError(400,"invalid token");
   }
   const actualdata=data;
   if(!actualdata){
      throw new ApiError(400,"No data found");
   }
   if(actualdata.length===0){
      throw new ApiError(400,"No data found");
   }
   if(actualdata[0][emailfeildname]===undefined || actualdata[0][feedbackfeildname]===undefined){
      throw new ApiError(400,"Please provide valid data");
   }
   actualdata.map(async(element)=>{
      
      const feedback=await Feedback.create({
         clientid:user._id,
         email:element[emailfeildname],
         feedback:element[feedbackfeildname]
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