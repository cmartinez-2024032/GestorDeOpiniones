'use strict';

import User from '../users/user.model.js';
import { encryptPassword, comparePassword } from '../../helpers/encrypt-password.js';
import { generateJWT } from '../../helpers/generate-JWT.js';

export const register = async (req, res, next) => {
    try {
        const data = req.body;

        const exists = await User.findOne({
            $or: [
                { email: data.email },
                { username: data.username }
            ]
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'Usuario o email ya existe'
            });
        }

        data.password = await encryptPassword(data.password);

        const user = await User.create(data);

        const token = await generateJWT(user._id);

        return res.status(201).json({
            success: true,
            message: 'Usuario registrado correctamente',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        next(error);
    }
};


export const login = async (req, res, next) => {
    try {
        const { emailOrUsername, password } = req.body;

        const user = await User.findOne({
            $or: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }

        const validPassword = await comparePassword(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: 'Credenciales incorrectas'
            });
        }

        const token = await generateJWT(user._id);

        return res.json({
            success: true,
            message: 'Login exitoso',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        next(error);
    }
};
