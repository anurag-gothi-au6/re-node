import User from '../models/User';
import { verify } from 'jsonwebtoken';

//Middleware to authenticate the user
module.exports = {
    authToken : async (req, res, next) => {
        try {
            const authToken = req.params.token;
            if (authToken) {
                const token = await verify(authToken, process.env.JWT_SECRET_KEY);
                const user = await User.findOne({ _id: token.id })
                if (user===null || user===[]) {
                    return res.json({"status":"failed","message":"kindly login first"})
                }
                else {
                    // console.log(user)
                    if (user.verified_email == true) {
                        req.user = user
                        next()
                    }
                    else return res.json({"status":"failed","message":"kindly verify your email first"})                   
                    
                }               
                
            }
        } catch (err) {
            console.log(err.message)
            if(err.message==='jwt expired'){
                res.status(403).json({'status':'failed','message':'token/session expired Please login again'})
            }
            else res.status(403).json({ error: err.message });
        }
    },
    authHeader : async (req, res, next) => {
        try {
            if (req.header("Authorization")) {
                const userToken = req.header("Authorization")
                // const user = await User.find({accessToken:userToken})
                const token = await verify(userToken, process.env.JWT_SECRET_KEY);
                const user = await User.findOne({ _id: token.id })
                if (user!==[] || user!==null) {
                    // console.log(user)
                    if (user.verified_email == true) {
                        req.user = user
                    }
                    else return res.json({"status":"failed","message":"kindly verify your email first"})
                }
            }
            else return res.json({"status":"failed","message":"kindly login first"})
            next();
        }
        catch (err) {
            console.log(err.message);
            if(err.message==='jwt expired'){
                res.status(403).json({'status':'failed','message':'token/session expired Please login again'})
            }
            else res.json({"status":"failed","message":"kindly login first"})
        }
    }
}

