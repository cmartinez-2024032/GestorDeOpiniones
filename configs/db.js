'use strict';

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: process.env.DB_SQL_LOGGING === 'true' ? console.log : false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

export const dbConnection = async () => {
    try {
        console.log('PostgreSQL | Connecting to PostgreSQL...');

        await sequelize.authenticate();

        console.log('PostgreSQL | Connected to PostgreSQL');
        console.log(`PostgreSQL | Connected to ${process.env.DB_NAME} database`);

    } catch (error) {
        console.error(`PostgreSQL | Connection error: ${error.message}`);
        process.exit(1);
    }
};

const gracefulShutdown = async (signal) => {
    console.log(`PostgreSQL | Received ${signal}. Closing connection...`);
    try {
        await sequelize.close();
        console.log('PostgreSQL | Connection closed successfully');
        process.exit(0);
    } catch (error) {
        console.error('PostgreSQL | Error during shutdown:', error.message);
        process.exit(1);
    }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2'));
