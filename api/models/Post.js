import mongoose from "mongoose";
const Schema = mongoose.Schema;
    
// post Schema
const postSchema = new Schema(
    {
        creator:{
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        status:{
            type: String,
            trim: true
        },
        privacy_status:{
            type:String,
            trim: true,
            enum:['public', 'friends', 'FoF', 'private'],
            default:'public'
        },
        activity:{
            type: String,
            trim: true,
            enum:['feeling ']
        },
        taggedUser:[
            {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        ],
        location:{
            type: String,
            trim: true
        },
        media:[{
            type: String,
            trim: true
        }],
        reactions:[{
            type: Schema.Types.ObjectId,
            ref: "reaction"
        }],
        comments:[{
            type: Schema.Types.ObjectId,
            ref: "comment"
        }]

    },
    { timestamps: true}
);


const Post = mongoose.model("post", postSchema);

module.exports = Post;