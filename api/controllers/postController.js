import Post from '../models/Post'
import fs from 'fs'
import cloudinary from '../utils/cloudinary'

module.exports = {
   // get only public posts in home page
   async getPost_Public(req, res) {
      try {
         let postData = await Post.find({ privacy_status: 'public' })
         res.status(201).json({ "status": "success", "message": postData })

      } catch (err) {
         console.log(err)
         res.status(400).json({ "status": "failed", "message": "server error" })
      }
   },
   // get only posts which has been created by you
   async getPost_Private(req, res) {
      try {
         let userData = req.user
         let postData = await Post.find({ creator: userData._id })
         res.status(201).json({ "status": "success", "message": postData })
      } catch (err) {
         console.log(err)
         res.status(400).json({ "status": "failed", "message": "server error" })
      }
   },
   // get only posts which has been created by you and aur public usefull to show different user your profile or timeline
   async getPost_Public_usermade(req, res) {  // please suggest a cool variable name here
      try {
         let userData = req.user
         let postData = await Post.find({ creator: userData._id })
         let publicPost = postData.filter(element => element.privacy_status !== 'private')
         res.status(201).json({ "status": "success", "message": publicPost })
      } catch (err) {
         console.log(err)
         res.status(400).json({ "status": "failed", "message": "server error" })
      }
   },
   // to create a new post
   async addPost(req, res) {
      try {
         let temp1 = req.body
         let userData = req.user
         //  console.log(temp1)
         //  console.log(userData)
         let media_url = [];
         let postData = () => {
            temp1.media = media_url
            temp1.creator = userData._id
            console.log(temp1)
            let newuser = Post({ ...temp1 })
            let data159 = async () => {
               let val159 = await newuser.save()
               res.json({ "status": "success", "message": val159 })
            }
            data159();
         }
         if (userData !== '') {
            //--------------------- function to upload media in cloudinary

            fs.readdir('api/uploads/', async (err, data) => {
               if (err) { throw err }
               let temp = data
               media_url.length = 0;
               for (let i = 0; i < temp.length; i++) {
                  if (/.jpg$/.test(temp[i])) {
                     await cloudinary.uploader.upload(`api/uploads/${temp[i]}`, (err, result) => {
                        if (err) { throw err }
                        else {
                           media_url.push(result.secure_url)
                           fs.unlink(`api/uploads/${temp[i]}`, (err) => {
                              if (err) { throw err } else {
                                 console.log('deleted')
                                 // postData()
                              }
                           })
                        }
                     });
                  }
                  else if (/.jpeg$/.test(temp[i])) {
                     await cloudinary.uploader.upload(`api/uploads/${temp[i]}`, (err, result) => {
                        if (err) { throw err }
                        else {
                           media_url.push(result.secure_url)
                           fs.unlink(`uploads/${temp[i]}`, (err) => {
                              if (err) { throw err } else {
                                 console.log('deleted')
                                 // postData() 
                              }
                           })
                        }
                     });
                  }
                  else if (/.png$/.test(temp[i])) {
                     await cloudinary.uploader.upload(`api/uploads/${temp[i]}`, (err, result) => {
                        if (err) { throw err }
                        else {
                           media_url.push(result.secure_url)
                           fs.unlink(`api/uploads/${temp[i]}`, (err) => {
                              if (err) { throw err } else {
                                 console.log('deleted')
                                 // postData() 
                              }
                           })
                        }
                     });
                  }
                  else if (/.webp$/.test(temp[i])) {
                     await cloudinary.uploader.upload(`api/uploads/${temp[i]}`, (err, result) => {
                        if (err) { throw err }
                        else {
                           media_url.push(result.secure_url)
                           fs.unlink(`api/uploads/${temp[i]}`, (err) => {
                              if (err) { throw err } else {
                                 console.log('deleted')
                                 // postData()  
                              }
                           })
                        }
                     });
                  }
                  else if (/.gif$/.test(temp[i])) {
                     await cloudinary.uploader.upload(`api/uploads/${temp[i]}`, (err, result) => {
                        if (err) { throw err }
                        else {
                           media_url.push(result.secure_url)
                           fs.unlink(`api/uploads/${temp[i]}`, (err) => {
                              if (err) { throw err } else {
                                 console.log('deleted')
                                 // postData() 
                              }
                           })
                        }
                     });
                  }
                  else if (/.mp4$/.test(temp[i])) {
                     await cloudinary.uploader.upload(`api/uploads/${temp[i]}`, { resource_type: "video" }, (err, result) => {
                        if (err) { throw err }
                        else {
                           media_url.push(result.secure_url)
                           fs.unlink(`api/uploads/${temp[i]}`, (err) => {
                              if (err) { throw err } else {
                                 console.log('deleted')
                                 // postData() 
                              }
                           })
                        }
                     });
                  }
                  else if (/.ogg$/.test(temp[i])) {
                     await cloudinary.uploader.upload(`api/uploads/${temp[i]}`, { resource_type: "video" }, (err, result) => {
                        if (err) { throw err }
                        else {
                           media_url.push(result.secure_url)
                           fs.unlink(`api/uploads/${temp[i]}`, (err) => {
                              if (err) { throw err } else {
                                 console.log('deleted')
                                 // postData() 
                              }
                           })
                        }
                     });
                  }
                  else if (/.webm$/.test(temp[i])) {
                     await cloudinary.uploader.upload(`api/uploads/${temp[i]}`, { resource_type: "video" }, (err, result) => {
                        if (err) { throw err }
                        else {
                           media_url.push(result.secure_url)
                           fs.unlink(`api/uploads/${temp[i]}`, (err) => {
                              if (err) { throw err } else {
                                 console.log('deleted')
                                 // postData() 
                              }
                           })
                        }
                     });
                  }

               }
               // await console.log(media_url)
               await postData()
            })

            //----------------------------------- end -----------------------------------                                 

         }
         else res.json({ "status": "failed", "message": "Kindly login first" })
      } catch (err) {
         console.log(err)
         res.json({ "status": "failed", "message": err.message })
      }
   },
   async deletePost(req, res) {
      try {
         let userData = req.user
         let postid = req.params.postId
         //  console.log(userData)
         let postdata = await Post.find({ _id: postid })
         if (postdata.creator === userData._id) {
            Post.deleteOne({ _id: postid }, (err) => {
               if (err) {
                  console.log(err)
               }
               else {
                  res.status(200).json({ 'status': 'success', 'message': 'post deleted successfully' })
               }
            })
         }
         else {
            throw new Error('Not Authorized')
         }
      }
      catch (err) {
         if (err.message === 'Not Authorized') {
            res.status(403).json({ status: "failed", error: err.message })
         }
         else {
            res.status(400).json({ status: "failed", error: err.message })
         }
      }

   },
   async newsFeed(req, res) {
      try {
         let userData = req.user
         let friends = await Friends.find({
            $and: [
               { "requester": userData._id },
               { "status": 3 }
            ]
         })
         const friendsId = []
         friends.forEach(el => {
            friendsId.push(el.recipient)
         });
         let posts = await Post.find({ creator: { $in: [...friendsId, userData._id] }, privacy_status: { $in: ['public', 'friends', 'FoF'] } }).sort({ "created_at": -1 });

         let FoF = Friends.find({ requester: { $in: friendsId }, recipient: { $ne: userData._id }, status: 3 })
         const FoFId = []
         FoF.forEach(el => FoFId.push(el.recipient))
         const uniqueFofId = [...new Set(FoFId)]
         let FoFs = Friends.find({requester:{$in:uniqueFofId},recipient:{$in:friendsId},status: 3})
         const finalFof = []
         FoFs.forEach(el=>finalFof.push(el.requester))
         const uniqueFinalFofId = [...new Set(finalFof)]
         let fofPost = await Post.find({creator: { $in: uniqueFinalFofId }, privacy_status: { $in: ['public','FoF'] } }).sort({ "created_at": -1 });
         res.status(200).json({status:'sucess',posts:posts,fofPost:fofPost})
      }
      catch (err) {
         res.status(400).json({status: "failed", error: err.message})
      }
   }
}  