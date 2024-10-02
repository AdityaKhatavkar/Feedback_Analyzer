import nodemailer from 'nodemailer';
import ApiError from './ApiError.js';

const sendVerificationCode = async (email, verificationCode) => {
   

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // Make sure this is set correctly
                pass: process.env.PASSWORD // Make sure this is set correctly
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Verification Code',
            text: `Your verification code is ${verificationCode}`
        };

       

        await transporter.sendMail(mailOptions);

       

    } catch (error) {
       
        throw new ApiError(400, 'Check the email again' );
    }
};

export default sendVerificationCode;
