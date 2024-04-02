import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { sendMail } from '../utils/mail.js';
import dotenv from 'dotenv';
dotenv.config(
    {
        path: './.env'
    }

);

export const signup = async (req, res) => {
    try{
        const {name,username,email,password} = req.body;
        if(!name || !username || !email || !password || password.length < 6){
            return res.status(400).json({success:false,message: 'All fields are required'});
        }
        const useralreadyExists = await User.findOne({$or: [{email: email}, {username: username}]});
        if(useralreadyExists){
            return res.status(400).json({success:false,message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newuser = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });
        if(!newuser){
            return res.status(400).json({success:false,message: 'User not created'});
        }
        await sendMail(email, 'Email Verification from dribble', `<div><h1>Click on the link below to verify your email</h1><a href=${process.env.MAIL_VERIFICATION_LINK+"/"+newuser._id}>Verify Email</a></div>`);
        res.status(200).json({success:true,message: 'User created successfully'});
    }catch(error){
        console.log(error.message);
        res.status(500).json({success:false,message: 'Internal Server Error'});
    }
};