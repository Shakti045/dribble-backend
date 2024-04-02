import User from '../models/user.model.js';

export const update = async (req, res) => {
    try{
        const {avatarurl,location,acccountType} = req.body;
        if(!avatarurl || !location || !acccountType){
            return res.status(400).json({success:false,message: 'All fields are required'});
        }
       
        const userid = req.user;
        if(!userid){
            return res.status(400).json({success:false,message: 'User id required'});
        }
        const user = await User.findByIdAndUpdate({_id: userid}, {avatarurl,location,acccountType},{new:true});
        if(!user){
            return res.status(400).json({success:false,message: 'User not found'});
        }
        res.status(200).json({success:true,message: 'User updated successfully',user:user});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message: 'Internal Server Error'});
    }
}