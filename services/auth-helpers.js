'use strict';

import crypto from 'crypto';

const generateSecureToken = (length) => {
    const bytes = crypto.randomBytes(length);
    return bytes
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
};

export const generateEmailVerificationToken = () => {
    return generateSecureToken(32);
};

export const generatePasswordResetToken = () => {
    return generateSecureToken(32);
};