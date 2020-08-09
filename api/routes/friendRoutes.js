import { Router } from "express";
const router = Router();
import * as authenticate from '../middlewares/authenticate'
import { addFriend, acceptRequest, rejectRequest, getFriend } from '../controllers/friendController'

//---------------------Friend Routes --------------------------------------------//

// Get Friend Request Details
router.get('/user/getfriend/:token',authenticate.authToken, getFriend);

// Add Friend
router.post('/user/addfriend/:recipientId/:token', authenticate.authToken, addFriend);

//Accept Request
router.post('/user/accept_request/:recipientId/:token', authenticate.authToken, acceptRequest);

//Reject Request
router.delete('/user/reject_request/:recipientId/:token', authenticate.authToken, rejectRequest);
module.exports = router;