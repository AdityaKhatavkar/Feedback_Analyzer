import Asynchandler from "../utils/Asynchandler.js";
import Feedback from "../models/feedback.model.js";
import ApiError from "../utils/ApiError.js";
import ApiRespoance from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import analyzeFeedback from "../controllers/python.controller.js";
import Summary from "../models/Summary.model.js";
import summarizeFeedback from "../controllers/summarizeFeedback.js";


const analyzingfeedback = Asynchandler(async (req, res) => {

   const feedbacks = await Feedback.find({ clientid: req.user._id, catagry: "other" }).select("feedback _id");

   if (!feedbacks || !Array.isArray(feedbacks)) {
      return res.status(400).json({ error: 'Feedbacks must be an array.' });
   }

   try {
      const result = await analyzeFeedback(feedbacks);

      const { positive, negative } = result;

      // Handle positive feedbacks
      const positivePromises = positive.map(async (element) => {
         const feedback = await Feedback.findById(element._id);
         feedback.catagry = "good"; // Corrected the spelling of 'category'
         return feedback.save();
      });

      // Handle negative feedbacks
      const negativePromises = negative.map(async (element) => {
         const feedback = await Feedback.findById(element._id);
         feedback.catagry = "bad"; // Corrected the spelling of 'category'
         return feedback.save();
      });

      // Wait for all feedback saves to complete
      await Promise.all([...positivePromises, ...negativePromises]);

      res.status(200).json({
         status: 200,
         message: "Feedback analyzed successfully",
         data: { positive, negative },
      });
   } catch (error) {
      res.status(500).json({ error: error.toString() });
   }
});


const summarizingfeedback = Asynchandler(async (req, res) => {
   //uncommit when actual code is ready

   // const check=await Feedback.findOne({clientid:req.user._id,catagry:"other"});
   // if(check){
   //    throw new ApiError(400,"Please analyze the feedback first")
   // }
   
   const goodfeedbacks = await Feedback.find({ clientid: req.user._id,catagry:"good" }).select("feedback _id");
   const badfeedbacks = await Feedback.find({ clientid: req.user._id,catagry:"bad" }).select("feedback _id");

   if (!goodfeedbacks || !Array.isArray(goodfeedbacks)) {
      return res.status(400).json({ error: 'Feedbacks must be an array.' });
   }

   if (!badfeedbacks || !Array.isArray(badfeedbacks)) {
      return res.status(400).json({ error: 'Feedbacks must be an array.' });
   }

   try {
      // Process feedbacks using summarizeFeedback function
      const goodsummary = await summarizeFeedback(goodfeedbacks);
      const badsummary = await summarizeFeedback(badfeedbacks);
      const { sentence } = goodsummary;
      const {sentence: sentence1} = badsummary;
      
      console.log( sentence);
      const newsummary = await Summary.findOne({ clientid: req.user._id });
      if (!newsummary) {
         await Summary.create({
            clientid: req.user._id,
            goodsummary: sentence,
            badsummary: sentence1,
            neutralsummary: "",
         });
      } else {
         newsummary.goodsummary = sentence;
         newsummary.badsummary = sentence1;
         await newsummary.save();
      }
      
      res.status(200).json({
         status: 200,
         message: "Feedback summarized successfully",
         data: { good: sentence, bad: sentence1 },
      });
   } catch (error) {
      // Send error response
      res.status(500).json({ error: error.toString() });
   }
});


const feedbackcollection = Asynchandler(async (req, res) => {
   const data = req.body;
   const id = req.user._id;
   const dataarray = data.data;

   if (!dataarray || !data) {
      throw new ApiError(400, "No data found");
   }

   const user = await User.findById(id).select("-password -RefreshToken -verficationcode");

   if (!user) {
      throw new ApiError(400, "User not found");
   }

   // Trigger the Python script
   // let pythonResult;
   // try {
   //     pythonResult = await handletrigger();
   //     console.log("Python script output:", pythonResult);
   // } catch (error) {
   //     throw new ApiError(500, `Error executing Python script: ${error}`);
   // }

   // Remove old feedbacks
   const feedback = await Feedback.find({ clientid: id });
   if (feedback) {
      await Summary.updateOne({ clientid: req.user._id }, { goodsummary: "", badsummary: "", neutralsummary: "" });
      await Feedback.deleteMany({ clientid: id });
   }

   // Reset user details
   user.tokenid = "";
   user.verficationcode = "";
   await user.save();

   // Create new feedbacks
   await Promise.all(
      dataarray.map(async (element) => {
         await Feedback.create({
            clientid: id,
            email: element.email,
            feedback: element.feedback,
         });
      })
   );

   // Respond with success
   res.status(200).json(
      new ApiRespoance(200, [], "Feedback submitted successfully")
   );
});


//creating the form for the user
const feedbackformcreation = Asynchandler(async (req, res) => {

   await Feedback.deleteMany({ clientid: req.user._id });
   await Summary.updateOne({ clientid: req.user._id }, { goodsummary: "", badsummary: "", neutralsummary: "" });
   let token = Math.floor(100000 + Math.random() * 900000);

   while (await User.findOne({ verficationcode: token })) {
      token = Math.floor(100000 + Math.random() * 900000);
   }

   const user = await User.findById(req.user._id);
   if (!user) {
      throw new ApiError(400, "user not found")
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
   await Summary.updateOne({ clientid: req.user._id }, { goodsummary: "", badsummary: "", neutralsummary: "" });
   const user = await User.findById(req.user._id);

   if (!user) {
      throw new ApiError(400, "user not found")
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

   const { id } = req.params;
   const { verficationcode } = req.params;
   const { feedback, email } = req.body;

   if (!verficationcode || !id) {
      throw new ApiError(400, "No form found")
   }

   const user = await User.findById(id).select("-password -RefreshToken ");
   if (!user) {
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
   await Summary.updateOne({ clientid: req.user._id }, { goodsummary: "", badsummary: "", neutralsummary: "" });
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

   if (!user) {
      throw new ApiError(400, "user not found")
   }

   await Feedback.deleteMany({ clientid: req.user._id });
   await Summary.updateOne({ clientid: req.user._id }, { goodsummary: "", badsummary: "", neutralsummary: "" });
   user.tokenid = "";

   await user.save();

   res.status(200).json(
      new ApiRespoance(200, user, "token deleted")
   )
})


//submitting feedback
const apifeedback = Asynchandler(async (req, res) => {
   const { id } = req.params;
   const { tokenid } = req.params;
   const { data } = req.body;
   const { emailfeildname, feedbackfeildname } = req.body;

   if (!id || !tokenid) {
      throw new ApiError(400, "No url found");
   }

   if (!data) {
      throw new ApiError(400, "Please provide data");
   }

   const user = await User.findById(id).select("-password -RefreshToken -verficationcode");

   if (!user) {
      throw new ApiError(400, "user not found");
   }

   await Feedback.deleteMany({ clientid: user._id });
   await Summary.updateOne({ clientid: user._id }, { goodsummary: "", badsummary: "", neutralsummary: "" });
   if (user.tokenid !== tokenid) {
      throw new ApiError(400, "invalid token");
   }
   const actualdata = data;
   if (!actualdata) {
      throw new ApiError(400, "No data found");
   }
   if (actualdata.length === 0) {
      throw new ApiError(400, "No data found");
   }
   if (actualdata[0][emailfeildname] === undefined || actualdata[0][feedbackfeildname] === undefined) {
      throw new ApiError(400, "Please provide valid data");
   }
   actualdata.map(async (element) => {

      const feedback = await Feedback.create({
         clientid: user._id,
         email: element[emailfeildname],
         feedback: element[feedbackfeildname]
      })
   })

   res.status(200).json(
      new ApiRespoance(200, [], "feedback submitted")
   )

})


export {
   feedbackcollection, feedbackformcreation, summarizingfeedback,
   feedbackformdelete, formcollection, apigenerate, apidelete, apifeedback, analyzingfeedback
};