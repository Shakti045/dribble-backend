import mongoose from 'mongoose';
import dotenv from 'dotenv';

export const connectDb = async () => {
    dotenv.config({
        path: '.env',
    });
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database Connected');
    } catch (error) {
        console.log('Error:', error.message);
    }
};
