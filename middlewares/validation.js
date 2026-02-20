'use strict';

import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Error de validación',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }

    next();
};

export const validateRegister = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ max: 25 })
        .withMessage('Máximo 25 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('Solo letras y espacios'),

    body('surname')
        .trim()
        .notEmpty()
        .withMessage('El apellido es obligatorio')
        .isLength({ max: 25 })
        .withMessage('Máximo 25 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('Solo letras y espacios'),

    body('username')
        .trim()
        .notEmpty()
        .withMessage('El username es obligatorio')
        .isLength({ max: 50 })
        .withMessage('Máximo 50 caracteres'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('Formato inválido')
        .isLength({ max: 150 })
        .withMessage('Máximo 150 caracteres'),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 })
        .withMessage('Mínimo 6 caracteres'),

    body('phone')
        .optional()
        .matches(/^\d{8}$/)
        .withMessage('Debe tener 8 dígitos'),

    handleValidationErrors
];


export const validateLogin = [
    body('emailOrUsername')
        .trim()
        .notEmpty()
        .withMessage('Email o username requerido'),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida'),

    handleValidationErrors
];
