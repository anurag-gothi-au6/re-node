import { Router } from "express";
const router = Router();
import { authHeader } from '../middlewares/authenticate'
import { addcomment } from '../controllers/commentController'


//post comment on a particular post
router.post('/post/addComment/:postId',authHeader,addcomment)














module.exports=router