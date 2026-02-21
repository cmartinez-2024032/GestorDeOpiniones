'use strict';

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendVerificationEmail = async (toEmail, username, token) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/api/auth/verify-email?token=${token}`;

    const mailOptions = {
        from: `"${process.env.MAIL_NAME}" <${process.env.MAIL_FROM}>`,
        to: toEmail,
        subject: 'Verifica tu correo electrónico',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">¡Bienvenido, ${username}!</h2>
                <p>Gracias por registrarte. Por favor verifica tu correo haciendo clic en el botón:</p>
                <a href="${verificationUrl}" 
                   style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; 
                          color: white; text-decoration: none; border-radius: 4px; margin: 16px 0;">
                    Verificar correo
                </a>
                <p style="color: #666; font-size: 14px;">
                    O copia este enlace en tu navegador:<br/>
                    <a href="${verificationUrl}">${verificationUrl}</a>
                </p>
                <p style="color: #999; font-size: 12px;">
                    Este enlace expira en 24 horas. Si no creaste esta cuenta, ignora este correo.
                </p>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};