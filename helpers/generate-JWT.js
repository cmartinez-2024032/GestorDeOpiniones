'use strict';

import jwt from 'jsonwebtoken';

export const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { uid },
            process.env.JWT_SECRET,
            {
                expiresIn: '4h'
            },
            (err, token) => {
                if (err) {
                    reject('Could not generate token');
                } else {
                    resolve(token);
                }
            }
        );
    });
};
