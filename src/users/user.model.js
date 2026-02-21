'use strict';

import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/db.js';

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            validate: { len: [3, 30] },
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            validate: { isEmail: true },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [6, 255] },
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        surname: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user',
        },

        isEmailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_email_verified',
        },
        emailVerificationToken: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'email_verification_token',
        },
        emailVerificationExpires: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'email_verification_expires',
        },
    },
    {
        tableName: 'users',
    }
);

export default User;