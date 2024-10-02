import nodemailer from 'nodemailer'
import ApiError from './ApiError.js'
const sendverficationcode = (email, verficationcode) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        const mailoption = {
            from: process.env.EMAIL,
            to: email,
            subject: 'verfication code',
            text: `your verfication code is ${verficationcode}`
        }
        transporter.sendMail(mailoption);
    }
    catch {
        console.log("verfication code not sent");
        throw new ApiError(400, "verfication code not sent")

    }
}

export default sendverficationcode