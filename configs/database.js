'use strict';

import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | Error connecting to MongoDB');
            mongoose.disconnect();
        });

        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | Connecting to MongoDB...');
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB | Connected to MongoDB');
        });

        mongoose.connection.on('open', () => {
            console.log('MongoDB | Connected to gestor_opiniones database');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | Reconnecting to MongoDB');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | Disconnected from MongoDB');
        });

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10
        });

    } catch (error) {
        console.error(`MongoDB | Connection error: ${error.message}`);
        process.exit(1);
    }
};

/* ================================
   GRACEFUL SHUTDOWN
================================ */
const gracefulShutdown = async (signal) => {
    console.log(`MongoDB | Received ${signal}. Closing connection...`);
    try {
        await mongoose.connection.close();
        console.log('MongoDB | Connection closed successfully');
        process.exit(0);
    } catch (error) {
        console.error('MongoDB | Error during shutdown:', error.message);
        process.exit(1);
    }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2'));
