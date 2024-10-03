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
    }

},
    { timestamps: true });

const Summary = mongoose.model("Summary", SummarySchema);


export default Summary;