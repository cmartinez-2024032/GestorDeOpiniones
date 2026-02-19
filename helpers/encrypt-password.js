'use strict';

import bcrypt from 'bcryptjs';

/* ================================
   ENCRYPT PASSWORD
================================ */
export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

/* ================================
   COMPARE PASSWORD
================================ */
export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
