import App from './app';
import { Router } from "express";

// Middlewares
import bodyParser from 'body-parser';
// Controllers
import { MainController } from './controllers/main.controller';


const middlewares = [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
];

const controllers = [
    new MainController()
];


/**
 * Server Application
 */
const app = new App(
    8000,
    middlewares,
    controllers,
);
app.listen();