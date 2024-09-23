import Feedback from "../models/feedback.model.js";
import ApiError from "../utils/ApiError.js";
import ApiRespoance from "../utils/ApiResponse.js";
import Asynchandler from "../utils/Asynchandler.js";

const goodfeedback = Asynchandler(async (req, res) => {
    const data = await Feedback.find({ clientid: req.user._id, category: "good" });

    if (data.length === 0) {
        throw new ApiError(400, "no feedback found")
    }


    res.status(200).json(
        new ApiRespoance(200, data, "good feedback")
    )

})

const badfeedback = Asynchandler(async (req, res) => {
    const data = await Feedback.find({ clientid: req.user._id, category: "bad" });
    if (data.length === 0) {
        throw new ApiError(400, "no feedback found")
    }

    res.status(200).json(
        new ApiRespoance(200, data, "bad feedback")
    )
})

const neutralfeedback = Asynchandler(async (req, res) => {
    const data = await Feedback.find({ clientid: req.user._id, category: "neutral" });

    if (data.length === 0) {
        throw new ApiError(400, "no feedback found")
    }


    res.status(200).json(
        new ApiRespoance(200, data, "neutral feedback")
    )
})

const otherfeedback = Asynchandler(async (req, res) => {
    const data = await Feedback.find({ clientid: req.user._id, category: "other" });

    if (data.length === 0) {
        throw new ApiError(400, "no feedback found")
    }

    res.status(200).json(
        new ApiRespoance(200, data, "other feedback")
    )
})


export { goodfeedback, badfeedback , neutralfeedback, otherfeedback }