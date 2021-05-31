import express from 'express'
import sendEmail from '../controllers/send-email.js'

const notifier = express.Router()

notifier.post('/send', sendEmail)

export default notifier
