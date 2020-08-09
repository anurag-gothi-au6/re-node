import mongoose from "mongoose";
const Schema = mongoose.Schema;
    
// reaction Schema
const reactionSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        type:{
            type:String,
            trim: true,
            enum:['like', 'haha', 'angry', 'sad', 'love'],
            required: true
        },
        post:{
            type: Schema.Types.ObjectId,
            ref: "post",
            required: true
        }
    },
    { timestamps: true}
);


const Reaction = mongoose.model("reaction", reactionSchema);

module.exports = Reaction;