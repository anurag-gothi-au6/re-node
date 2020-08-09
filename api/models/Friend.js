import mongoose from "mongoose";

const Schema = mongoose.Schema;

const friendsSchema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'user' },
    recipient: { type: Schema.Types.ObjectId, ref: 'user' },
    status: {
        type: Number,
        enums: [
            1,    //'requested',
            2,    //'pending',
            3     //'friends'
        ]
    }
}, { timestamps: true })

const Friend = mongoose.model('friend', friendsSchema);
module.exports = Friend;