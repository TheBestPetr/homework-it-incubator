import nodemailer from 'nodemailer'

export const nodemailerService = {
    async sendEmail(email: string, subject: string, confirmationCode: string) {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ACCOUNT_USER,
                pass: process.env.EMAIL_ACCOUNT_PASSWORD
            }
        })
        const info = await transport.sendMail({
            from: 'Ignat <process.env.EMAIL_ACCOUNT_USER>',
            to: email,
            subject: subject,
            html: `<h1>Thanks for your registration</h1> 
                <p>To finish registration please follow the link below: 
                    <a href=\'https://some-front.com/confirm-registration?${confirmationCode}\'> complete registration </a> 
                </p>`
        })
        return !!info
    }
}