'use strict';

import { randomUUID } from 'crypto';

/* ================================
   GLOBAL ERROR HANDLER
================================ */
export const errorHandler = (err, req, res, _next) => {
    console.error('Error:', err);

    const traceId = err.traceId || randomUUID();
    const timestamp = new Date().toISOString();
    const errorCode = err.errorCode || null;

    /* ===== MONGOOSE VALIDATION ===== */
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errorCode,
            traceId,
            timestamp,
        });
    }

    /* ===== INVALID OBJECT ID ===== */
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID',
            errorCode,
            traceId,
            timestamp,
        });
    }

    /* ===== DUPLICATE KEY ===== */
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];

        return res.status(400).json({
            success: false,
            message: `${field} '${value}' already exists`,
            errorCode,
            traceId,
            timestamp,
        });
    }

    /* ===== JWT ERRORS ===== */
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
            errorCode,
            traceId,
            timestamp,
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token expired',
            errorCode,
            traceId,
            timestamp,
        });
    }

    /* ===== DB CONNECTION ===== */
    if (err.name === 'MongoNetworkError') {
        return res.status(503).json({
            success: false,
            message: 'Database connection error',
            errorCode,
            traceId,
            timestamp,
        });
    }

    /* ===== CUSTOM ERROR ===== */
    if (err.status) {
        return res.status(err.status).json({
            success: false,
            message: err.message || 'Server error',
            errorCode,
            traceId,
            timestamp,
        });
    }

    /* ===== GENERIC ERROR ===== */
    return res.status(500).json({
        success: false,
        message: 'Internal server error',
        errorCode,
        traceId,
        timestamp,
    });
};

/* ================================
   404 NOT FOUND
================================ */
export const notFound = (req, res) => {
    const traceId = randomUUID();
    const timestamp = new Date().toISOString();

    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        errorCode: null,
        traceId,
        timestamp,
    });
};

/* ================================
   ASYNC WRAPPER
================================ */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
