import nodemailer from 'nodemailer';
// import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

// export const resend = new Resend(process.env.RESEND_API_KEY);



export const transporter = nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    }
})