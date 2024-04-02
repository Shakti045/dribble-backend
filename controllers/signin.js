import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import  Jwt  from 'jsonwebtoken';

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
            return res.status(400).json({success:false,message: 'Please verify your email before logging in'});
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