import * as nodemailer from 'nodemailer'
import { Auth } from 'googleapis';

const OAuth2Client = new Auth.OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

import { config } from 'dotenv';
import { MailOptions } from 'nodemailer/lib/json-transport';


config();

interface CustomTransportOptions extends nodemailer.TransportOptions {
    host: string;
}

OAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});

export async function createTransport() {
    try {

        const accessToken = await new Promise((resolve, reject) => {
            OAuth2Client.getAccessToken((err, token) => {
                if (err) {
                    console.log("Erro: ", err.message)
                    reject();
                }
                resolve(token);
            });
        });

        const transporter = nodemailer.createTransport({
            host: process.env.MAILHOST,
            port: 587,
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: process.env.MAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            }
        } as CustomTransportOptions);

        return transporter

    } catch (error) {
        console.log(error)
    }
}

export default async function sendMail(mail: MailOptions) {
    try {
        const transporter = await createTransport();

        const mailOptions = {
            to: mail.to,
            subject: mail.subject,
            text: mail.text,
        }

        await transporter?.sendMail(mailOptions);
        
    } catch (err) {
        console.log("ERROR: ", err)
    }
}