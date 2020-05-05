import { SMTP_OPTIONS } from "../config/index"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport(SMTP_OPTIONS)

// Send Email function
export const sendEmail = (subject: string, receivers: string[], output: string, attachments?: Array<object>) => {
    if (receivers.length == 0) return

    const mailOptions = {
        from: "boletinesdiariosunigrid@gmail.com", // sender address
        to: `${receivers}`, // list of receivers
        subject: `${subject}`, // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
        attachments
    }

    transporter.sendMail(mailOptions, err => { if (err) throw err })
}
