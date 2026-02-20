'use strict';
import User from './user.model.js';
import { encryptPassword, comparePassword } from '../../helpers/encrypt-password.js';

export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).select('-password');

        if (!user || !user.status) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        res.json({
            success: true,
            user,
        });
    } catch (err) {
        next(err);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const { username, email, name, password, newPassword } = req.body;

        const user = await User.findById(req.userId);

        if (!user || !user.status) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        if (password && newPassword) {
            const valid = await comparePassword(password, user.password);

            if (!valid) {
                return res.status(400).json({
                    success: false,
                    message: 'Contraseña actual incorrecta',
                });
            }

            user.password = await encryptPassword(newPassword);
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (name) user.name = name;

        await user.save();

        res.json({
            success: true,
            message: 'Perfil actualizado',
        });
    } catch (err) {
        next(err);
    }
};
