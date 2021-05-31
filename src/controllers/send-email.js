import { mailSender } from "../services/mail-sender.js";

export const sendEmail = async (req, res, next) => {
    const { emails } = req.body
    if (!emails && emails.length < 1) {
        next(new Error("ERROR MISSING EMAIL"))
        return
    }

    let eventSend
    try {
        eventSend = await mailSender(emails)
    } catch (err) {
        return next(err)
    }

    return res.success({ status: 200, data: eventSend, message: 'EMAIL SEND' })
}

export default sendEmail
