'use strict';

import User from '../users/user.model.js';
import { encryptPassword, comparePassword } from '../../helpers/encrypt-password.js';
import { generateJWT } from '../../helpers/generate-JWT.js';
import { generateEmailVerificationToken } from '../../services/auth-helpers.js';
import { sendVerificationEmail } from '../../services/email-sender.js';
import { Op } from 'sequelize';

export const register = async (req, res, next) => {
    try {
        const { username, email, password, name, surname } = req.body;

        const exists = await User.findOne({
            where: {
                [Op.or]: [{ email }, { username }],
            },
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'El usuario o correo ya existe',
            });
        }

        const hashedPassword = await encryptPassword(password);

        const emailVerificationToken = generateEmailVerificationToken();
        const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            name,
            surname,
            emailVerificationToken,
            emailVerificationExpires,
            isEmailVerified: false,
        });

        await sendVerificationEmail(email, username, emailVerificationToken);

        const token = await generateJWT(user.id);

        return res.status(201).json({
            success: true,
            message: 'Usuario registrado. Revisa tu correo para verificar tu cuenta.',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                isEmailVerified: user.isEmailVerified,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;

        const user = await User.findOne({
            where: {
                emailVerificationToken: token,
                emailVerificationExpires: { [Op.gt]: new Date() },
            },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Token inválido o expirado',
            });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = null;
        user.emailVerificationExpires = null;
        await user.save();

        return res.json({
            success: true,
            message: '¡Correo verificado correctamente! Ya puedes iniciar sesión.',
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { emailOrUsername, password } = req.body;

        const user = await User.findOne({
            where: {
                [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
            },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Credenciales incorrectas',
            });
        }

        if (!user.status) {
            return res.status(400).json({
                success: false,
                message: 'Usuario inactivo',
            });
        }

        if (!user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: 'Debes verificar tu correo antes de iniciar sesión',
            });
        }

        const validPassword = await comparePassword(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: 'Credenciales incorrectas',
            });
        }

        const token = await generateJWT(user.id);

        return res.json({
            success: true,
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                isEmailVerified: user.isEmailVerified,
            },
        });
    } catch (error) {
        next(error);
    }
};