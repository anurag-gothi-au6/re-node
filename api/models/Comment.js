import mongoose from "mongoose";

const Schema = mongoose.Schema;
    
// comment Schema
const commentSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        comment:{
            type:String,
            trim: true,
            required: true
        },
        post:{
            type: Schema.Types.ObjectId,
            ref: "post",
            required: true
        },
        replies:[{
            type: Schema.Types.ObjectId,
            ref: "reply"
        }]
    },
    { timestamps: true}
);


const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;