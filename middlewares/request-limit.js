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
                message: 'No token provided',
            });
        }


        token = token.replace(/^Bearer\s+/i, '');


        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const user = await User.findById(decoded.uid);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User does not exist',
            });
        }

        if (user.active === false) {
            return res.status(423).json({
                success: false,
                message: 'User disabled',
            });
        }


        req.user = user;
        req.userId = user._id;

        next();
    } catch (error) {
        console.error('JWT Error:', error.message);

        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
            error:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : undefined,
        });
    }
};
