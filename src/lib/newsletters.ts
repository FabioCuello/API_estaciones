import puppeteer from "puppeteer"
import { sendEmail, searchUsers } from "./index"

// Get page information & send Email
export const newsletter = async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setViewport({ width: 1280, height: 800 })
        await page.goto("http://estacionuninor.ddns.net:3000/", { waitUntil: "networkidle0" });
        await page.pdf({ path: "src/public/boletin.pdf", format: "A4" });
        await browser.close();

        const subject = "Boletin meteorológico"
        const receivers = await searchUsers("newsletter")
        const output = "Resumen Diario"
        const attachments = [{
            filename: "boletin.pdf",
            path: "src/public/boletin.pdf",
            contentType: "application/pdf"
        }]
        sendEmail(subject, receivers, output, attachments)

    } catch (err) { throw err }
}


