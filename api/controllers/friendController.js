import User from '../models/User'
import Friend from '../models/Friend'
module.exports = {
    async getFriend(req, res) {
        try {
            let userData = req.user
            const user = await User.find({ _id: userData._id }).populate('friends')
            const friends = user.friends
            const friend = friends.filter((e)=>e.status===3)
            const requestSent = friends.filter((e)=>status===1)
            const requestRecieved = friends.filter((e)=>status===2)
            res.status(201).json({ "status": "success", "friends": friend,"requestsSent":requestSent,"requestRecieved":requestRecieved})
        } catch (err) {
            console.log(err)
            res.status(400).json({ "status": "failed", "message": err.message })
        }
    },
    async addFriend(req, res) {
        try {
            const { _id: UserA } = req.user;
            const UserB = req.params.recipientId;
            const docA = await Friend.findOneAndUpdate(
                { requester: UserA, recipient: UserB },
                { $set: { status: 1 } },
                { upsert: true, new: true }
            )
            const docB = await Friend.findOneAndUpdate(
                { recipient: UserA, requester: UserB },
                { $set: { status: 2 } },
                { upsert: true, new: true }
            )
            const updateUserA = await User.findOneAndUpdate(
                { _id: UserA },
                { $push: { friends: docA._id } }
            )
            const updateUserB = await User.findOneAndUpdate(
                { _id: UserB },
                { $push: { friends: docB._id } }
            )
            res.status(200).json({ response: 'Request Sent' })
        }
        catch (err) {
            res.status(400).json({ error: err.message })
        }
    },
    async acceptRequest(req, res) {
        try {
            const { _id: UserA } = req.user;
            const UserB = req.params.recipientId;
            Friend.findOneAndUpdate(
                { requester: UserA, recipient: UserB },
                { $set: { status: 3 } }
            )
            Friend.findOneAndUpdate(
                { recipient: UserA, requester: UserB },
                { $set: { status: 3 } }
            )
            res.status(200).json({ response: 'Friend Added' })
        }
        catch (err) {
            res.status(400).json({ error: err.message })
        }
    },
    async rejectRequest(req, res) {
        try {
            const { _id: UserA } = req.user;
            const UserB = req.params.recipientId;
            const docA = await Friend.findOneAndRemove(
                { requester: UserA, recipient: UserB }
            )
            const docB = await Friend.findOneAndRemove(
                { recipient: UserA, requester: UserB }
            )
            const updateUserA = await User.findOneAndUpdate(
                { _id: UserA },
                { $pull: { friends: docA._id } }
            )
            const updateUserB = await User.findOneAndUpdate(
                { _id: UserB },
                { $pull: { friends: docB._id } }
            )
            res.status(200).json({ response: 'Request Rejected' })
        }
        catch (err) {
            res.status(400).json({ error: err.message })
        }
    }
}