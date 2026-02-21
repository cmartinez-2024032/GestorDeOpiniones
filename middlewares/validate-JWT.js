'use strict';

import jwt from 'jsonwebtoken';
import User from '../src/users/user.model.js';

export const validateJWT = async (req, res, next) => {
    try {
        let token =
            req.header('x-token') ||
            req.header('authorization') ||
            req.body.token ||
            req.query.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No hay token en la petición',
            });
        }

        token = token.replace(/^Bearer\s+/i, '');

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: 'JWT no configurado en el servidor',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.uid || decoded.id;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no existe',
            });
        }

        if (!user.status) {
            return res.status(403).json({
                success: false,
                message: 'Usuario desactivado',
            });
        }

        req.user = user;
        req.userId = user.id;
        req.role = user.role || null;

        next();
    } catch (error) {
        console.error('JWT Error:', error);

        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado',
        });
    }
};