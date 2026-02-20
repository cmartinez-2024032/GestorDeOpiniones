'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from '../src/auths/auth.routes.js';
import userRoutes from '../src/users/user.routes.js';
import postRoutes from '../src/posts/post.routes.js';
import commentRoutes from '../src/comments/coment.routes.js';

import { corsOptions } from './cors-configurations.js';
import rateLimit from '../middlewares/request-limit.js';
import { helmetConfiguration } from './helmet.js';
import { errorHandler, notFound } from '../middlewares/server-genericError-handler.js';

const BASE_PATH = '/api/v1';

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(helmet(helmetConfiguration));
    app.use(rateLimit);
    app.use(morgan('dev'));
};

const routes = (app) => {
    app.use(`${BASE_PATH}/auth`, authRoutes);
    app.use(`${BASE_PATH}/users`, userRoutes);
    app.use(`${BASE_PATH}/posts`, postRoutes);
    app.use(`${BASE_PATH}/comments`, commentRoutes);

    app.get(`${BASE_PATH}/health`, (req, res) => {
        res.status(200).json({
            success: true,
            service: 'GestorOpiniones API',
            timestamp: new Date().toISOString()
        });
    });

    app.use(notFound);
};


export const initServer = () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.set('trust proxy', 1);

    middlewares(app);
    routes(app);
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`GestorOpiniones Server running on port ${PORT}`);
        console.log(`Health: http://localhost:${PORT}${BASE_PATH}/health`);
    });
};
