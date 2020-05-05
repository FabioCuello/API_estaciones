import { Options } from "nodemailer/lib/smtp-connection"
import { APP_HOSTNAME } from "./app"

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD
} = process.env

export const SMTP_OPTIONS: Options = {
    host: SMTP_HOST,
    port: +SMTP_PORT!,
    secure: true,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
}

export const MAIL_FROM = `noreply@${APP_HOSTNAME}`