import mongoose, { Mongoose } from "mongoose";

const SummarySchema = new mongoose.Schema({
    clientid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    goodsummary: {
        type: String,
        default: ''
    },
    badsummary: {
        type: String,
        default: ''
    },
    netrual: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 * 6
    }

},
    { timestamps: true });

const Summary = mongoose.model("Summary", SummarySchema);

export default Summary;