import bodyParser from 'body-parser';
import App from './app';

// Initialize Configuration
import { ENV_CONFIG } from './config/env.config';

// Middlewares
import { LoggerMiddleware } from './middlewares/logger.middleware';


// Express

/**
 * App Middlewares
 */
const middlewares = [
    bodyParser.json(),
    new LoggerMiddleware().getMiddleware
];

/**
 * Start application
 */
const app = new App(
    (!!ENV_CONFIG.PORT ? ENV_CONFIG.PORT : ENV_CONFIG.DEFAULT_PORT),
    middlewares
);
app.listen();