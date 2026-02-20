import 'dotenv/config';
import { dbConnection } from './configs/database.js';
import { initServer } from './configs/app.js';

const start = async () => {
    try {
        if (process.env.MONGO_URI) {
            await dbConnection();
        } else {
            console.warn('MONGO_URI not set — skipping DB connection');
        }

        initServer();
    } catch (err) {
        console.error('Failed to start application:', err);
        process.exit(1);
    }
};

start();
