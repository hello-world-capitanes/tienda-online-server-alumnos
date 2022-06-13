import bodyParser from 'body-parser';
import App from './app';
// Initialize Configuration
import { ENV_CONFIG } from './config/env.config';

// Middlewares
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { CorsMiddleware } from './middlewares/cors.middleware';
import admin from 'firebase-admin';

var serviceAccount = require("../firebase-adminsdk.json");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/**
 * App Middlewares
 */
const middlewares = [
    bodyParser.json(),
    new LoggerMiddleware().getMiddleware,
    new CorsMiddleware().getMiddleware
];

/**
 * Start application
 */
const app = new App(
    (!!ENV_CONFIG.PORT ? ENV_CONFIG.PORT : ENV_CONFIG.DEFAULT_PORT),
    middlewares
);

app.listen();

