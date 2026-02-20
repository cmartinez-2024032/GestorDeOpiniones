"use strict";

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'El username es requerido'],
            unique: true,
            trim: true,
            minLength: [3, 'Mínimo 3 caracteres'],
            maxLength: [30, 'Máximo 30 caracteres'],
        },

        email: {
            type: String,
            required: [true, 'El email es requerido'],
            unique: true,
            lowercase: true,
            trim: true,
            maxLength: [150, 'Máximo 150 caracteres'],
        },

        password: {
            type: String,
            required: [true, 'La contraseña es requerida'],
            minLength: [6, 'Mínimo 6 caracteres'],
        },

        name: { type: String, trim: true, maxLength: [50, 'Máximo 50 caracteres'] },
        surname: { type: String, trim: true, maxLength: [50, 'Máximo 50 caracteres'] },

        phone: { type: String },

        status: { type: Boolean, default: true },
        role: { type: String, default: 'user' },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('User', userSchema);
