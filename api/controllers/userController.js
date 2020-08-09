import User from '../models/User'
import bcrypt from 'bcryptjs'
import { verify } from 'jsonwebtoken'
import { validationResult } from 'express-validator'


module.exports = {
    //@desc:For registering user
    //@access:PUBLIC
    async userRegister(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        try {
            const { name, email, password } = req.body;
            const createUser = await User.create({ name, email, password });
            await createUser.generateAuthToken("confirm");
            res.status(201).json({
                statusCode: 201,
                createUser,
                expiresIn: "24h"
            });
        } catch (err) {
            console.log(err)
            if (err.code === 11000) {
                if (err.keyValue.hasOwnProperty('email')) {
                   return res.status(403).json({"status":"failed","message":"Email already occupied"});
                }
             }
             else return res.status(500).json({"status":"failed","message":"Server Error"});
        }
    },

    //@desc:For Confirming the Registration
    //@access:Private
    async verifyUserEmail(req, res) {
        try {
            const confirmToken = req.params.token;
            const user = await User.findByToken(confirmToken);
            res.json(user);
        } catch (err) {
            console.log(err.message);
            res.status(500).send("server error");
        }
    },

    //@desc:For Login user
    //@access:PUBLIC
    async userLogin(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).json({ statusCode: 400, message: 'Invalid Credentials' });
            const user = await User.findByEmailAndPassword(email, password);
            if (user.verified_email === false) {
                throw new Error('Please Verify Your account')
            }
            else {
                const accessToken = await user.regenerateAuthToken();
                res.status(200).json({
                    statusCode: 200,
                    loginUser: user,
                    accessToken: accessToken,
                    expiresIn: "24h"
                });
            }

        } catch (err) {
            if (err.message == 'Invalid Credentials') {
                res.status(400).json({ statusCode: 400, message: 'Invalid Credentials' });
            }
            else if (err.message == 'Please Verify Your account') {
                res.status(400).json({ statusCode: 400, message: err.message });
            }
            else if (err.name === 'AuthError') {
                res.json({ message: err.message })
            }
            else {
                res.status(500).json({ statusCode: 500, message: 'Sever error' });
            }
        }
    },

    //@desc:For user logout
    //@access:Private
    async userLogout(req, res) {
        try {
            const token = req.params.token
            const user = await User.nullifyToken(token);
            res.json({ 'status':'success', 'message': 'Logout successfully','data':user });

        } catch (err) {
            console.log(err.message);
            res.status(500).json({'status':'failed','message':'Server Error'});
        }

    },

    //@desc:For Changing Password of user
    //@access:PRIVATE
    async userChangePassword(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ 'status':'failed','message': `errors: ${errors.array()}` })
        }
        try {
            const accessToken = req.params.token
            const { oldpassword, newpassword, confirmpassword } = req.body;
            const password = await User.findByPassword(accessToken, oldpassword);

            if (password === 'Invalid Credentials') {
                res.status(401).json({'status':'failed','message':'Bad Request'})
            } else {
                if (newpassword === confirmpassword) {
                    const hashedpassword = await bcrypt.hash(newpassword, 10);
                    const resetPassword = await User.updateOne({ accessToken: accessToken }, { password: hashedpassword }, { new: true });
                    res.status(200).json({"status":"success","message":resetPassword})
                }
                else {
                    res.status(401).json({"status":"failed","message":"Bad Request"})
                }
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).send({"status":"failed","message":'Server Error'})
        }
    },

    //@desc:For Forgot Password
    //@access:PUBLIC
    async forgotPassword(req, res) {
        const { email } = req.body;
        if (!email) return res.status(400).send("Email is required");
        const user = await User.findByEmail(email);
        if (user[0].verified_email === false) {
            return res.json({ "message": "please verify your email first" });
        }
        try {
            if (!user) {
                res.status(401).json({"message":'There is no user present. Kindly register'});
            }
            else {
                await user[0].generateAuthToken("reset");
                res.send("Email sent Successfully. check your inbox");
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).json({"message":"Server Error"});
        }
    },

    //@desc:For Update the Forgot Password
    //@access:PRIVATE
    async updateForgotPassword(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        const { resetToken } = req.params;
        const { newpassword, confirmpassword } = req.body;
        if (newpassword !== confirmpassword) return res.json({"status":"failed","message":"password doesn't match"});
        try {
            const payload = await verify(resetToken, process.env.JWT_SECRET_KEY);
            if (payload) {
                const user = await User.find({ resetToken: resetToken });
                user[0].password = newpassword
                user[0].save()
                res.json({"status":"success","message":"password successfully changed"});
            }
        } catch (err) {
            console.log(err.message);
            res.json({"status":"failed","message":"Server Error"});
        }
    },
}