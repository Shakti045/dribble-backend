import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    avatarurl: {
         type: String,
         default: 'https://www.gravatar.com/avatar/anything?s=200&d=mm'
    },
    location:{
        type: String,
        default:''
    },
    acccountType:[
        {
            type: String,
        }
    ]
});

const User = mongoose.model('User', userSchema);
export default User;