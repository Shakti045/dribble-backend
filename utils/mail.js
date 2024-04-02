// import {resend} from '../config/mail.js';
import { transporter } from "../config/mail.js";

// export const sendMail = async (to,subject,html) => {
//     try{
//       await resend.emails.send({
//         from: 'onboarding@resend.dev',
//         to: to,
//         subject: subject,
//         html: html
//       });
//     }catch(error){
//         console.log(error.message);
//         throw new Error('Error in sending mail');
//     }
// };



export const sendMail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            html
        })
    } catch (error) {
        console.log("Error while sending email","=>",error);
    }
}