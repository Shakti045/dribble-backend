import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getProfile = async (req, res) => {
    try {
        const userid = req.user;
        if (!userid) {
            return res.status(400).json({ success: false, message: 'User id required' });
        }

        const user = await User.findById(userid, { password: 0 });
        if(!user){
            return res.status(400).json({success:false,message: 'User not found'});
        }
        res.status(200).json({ success: true, message: 'User profile fetched successfully', user: user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};