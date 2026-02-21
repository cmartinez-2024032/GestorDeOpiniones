'use strict';

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { dbConnection, sequelize } from './configs/db.js';
// Importar todos los modelos
import './src/users/user.model.js';
import './src/posts/post.model.js';
import './src/comments/coment.model.js';

// Importar rutas
import userRoutes from './src/users/user.routes.js';
import postRoutes from './src/posts/post.routes.js';
import commentRoutes from './src/comments/coment.routes.js';
import authRoutes from './src/auths/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const startServer = async () => {
    await dbConnection();

    await sequelize.sync({ alter: true });
    console.log('PostgreSQL | Tablas sincronizadas');

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });
};

startServer();