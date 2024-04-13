import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import  Jwt  from 'jsonwebtoken';
import { sendMail } from '../utils/mail.js';

export const signin = async (req, res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message: 'All fields are required'});
        }
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({success:false,message: 'User not found'});
        }
        if(!user.emailVerified){
            try {
                await sendMail(email, 'Email Verification from dribble', `<div><h1>Click on the link below to verify your email</h1><a href=${process.env.MAIL_VERIFICATION_LINK+"/"+user._id}>Verify Email</a></div>`);
                return res.status(400).json({success:false,message: 'Email not verified, verification link was sent again to your email address,kindly verify your email before login'});                                           
            } catch (error) {
                return res.status(400).json({success:false,message: 'Issue in sending email verification link , please try again changing network'});
            }
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success:false,message: 'Invalid credentials'});
        }
        const payload = {
            id: user._id,
            email: user.email,
            username: user.username,
            avatarurl: user.avatarurl
        };
        const token = Jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '5d'});

        res.status(200).json({success:true,message: 'User logged in successfully', token: token, user: payload});
    }catch(error){
        console.log(error.message);
        res.status(500).json({success:false,message: 'Internal Server Error'});
    }
}