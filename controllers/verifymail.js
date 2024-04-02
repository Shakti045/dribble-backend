import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/mail.js';


export const verifymail = async (req, res) => {
    try{
        const {id} = req.body;
        if(!id){
            return res.status(400).json({success:false,message: 'User id required'});
        }
        const user = await User.findById({_id: id});
        if(!user){
            return res.status(400).json({success:false,message: 'User not found'});
        }
        if(user.emailVerified){
            return res.status(400).json({success:false,message: 'Email already verified'});
        }
        await User.findByIdAndUpdate({_id: id}, {emailVerified: true});
        const payload = {
            id: user._id,
            email: user.email,
            username: user.username,
            avatarurl: user.avatarurl
        };
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '5d'});
        await sendMail(user.email, 'Email Verified', `<div><h1>Thank you for creating account with us</h1></div>`);
        res.status(200).json({success:true,message: 'Email verified successfully', token: token, user: payload});
    }catch(error){
        console.log(error.message);
        res.status(500).json({success:false,message: 'Internal Server Error'});
    }
};