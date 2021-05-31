import nodemailer from 'nodemailer'
import fs from 'fs'
import { templateEmailPATH } from "../config/index.js";

/**
 * mailSender
 * @param {Array<String>} emails
 * @returns {Promise<{id, email: (string|string|*), username}>}
 */
export const mailSender = async (emails = ['']) => {
    const buff  =  fs.readFileSync(templateEmailPATH, 'utf8')


    const transporter = nodemailer.createTransport({
        // port: 465,
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_PASSWORD,
        },
        secure: true,
    });

    const mailData = {
        from: process.env.EMAIL_SENDER,
        to: emails,   // list of receivers
        subject: 'NEWSLETTERS °[^^]°',
        text: 'newsletters E-tech',
        html: buff
    }

    return new Promise((resolve) => {
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.log(err)
                throw new Error("ERROR SEND MAIL")
            } else {
                resolve({ ...mailData, ...{ id: info.messageId} })
            }
        })
    })
}
