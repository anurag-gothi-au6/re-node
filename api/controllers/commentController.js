import Comment from '../models/Comment'
import Post from '../models/Post'

module.exports = {
    async addcomment(req, res) {
        try {
            let comment = req.body.comment;
            let postId = req.params.postId;
            let userData = req.user;
            let postData = await Post.findOne({ _id: postId });
            // console.log(postId)
            // console.log(postData)
            let commentData = {
                user: userData._id,
                comment,
                post: postId,
            }
            let comment_saved_data = await Comment.create(commentData)
            // await console.log(comment_saved_data)
            postData.comments.push(comment_saved_data._id)
            // console.log(postData)
            // let post_saved_data = await Post({...postData})
            // console.log(post_saved_data)
            await postData.save()
            console.log(postData)
            res.status(201).json({ 'status': 'success', 'message': 'comment added successfully', 'data': comment_saved_data })
        } catch (err) {
            console.log(err)
            res.status(400).json({ 'status': 'failed', 'message': 'server error' })
        }




    }
}