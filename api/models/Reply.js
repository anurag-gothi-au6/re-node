import mongoose from "mongoose";
const Schema = mongoose.Schema;
    
// reply Schema
const replySchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        reply:{
            type:String,
            trim: true,
            required: true
        },
        comment:{
            type: Schema.Types.ObjectId,
            ref: "comment",
            required: true
        }
    },
    { timestamps: true}
);


const reply = mongoose.model("reply", replySchema);

module.exports = reply;