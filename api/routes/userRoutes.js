import { Router } from "express";
const router = Router();
import * as authenticate from '../middlewares/authenticate'
import { check } from "express-validator"
import { userRegister, userLogin, userLogout, forgotPassword, userChangePassword, updateForgotPassword, verifyUserEmail } from '../controllers/userController'

//---------------------USER Routes --------------------------------------------//

// User Registration
//creation
router.post('/user/register',
    [
        check('email').isEmail(),
        check('password')
            .isLength({ min: 8, max: 100 })
            .withMessage('Password must be between 8-100 characters long.')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
            .withMessage('Password must include one lowercase character, one uppercase character, a number, and a special character.'),
    ]
    , userRegister);

// Confirming the User after registration
router.get('/confirm/:token', verifyUserEmail);

// User Login
router.post('/user/login', userLogin);

// User Logout
router.delete('/user/logout/:token', authenticate.authToken, userLogout);

// Changepassword 
router.patch('/user/changepassword/:token', [
    check('newpassword')
        .isLength({ min: 8, max: 100 })
        .withMessage('Password must be between 8-100 characters long.')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
        .withMessage('Password must include one lowercase character, one uppercase character, a number, and a special character.'),
    authenticate.authToken],
    userChangePassword);

// Forgot Password
router.post("/user/forgotpassword", forgotPassword);

// Update the Forgot Password
router.patch("/reset/:resetToken", [
    check('newpassword')
        .isLength({ min: 8, max: 100 })
        .withMessage('Password must be between 8-100 characters long.')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
        .withMessage('Password must include one lowercase character, one uppercase character, a number, and a special character.')], updateForgotPassword);

module.exports = router;