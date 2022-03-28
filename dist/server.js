"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_middleware_1 = require("./middlewares/logger.middleware");
const main_controller_1 = require("./controllers/main.controller");
// Initialize Configuration
const env_config_1 = require("./config/env.config");
// Express
const app = (0, express_1.default)();
/**
 * App Middlewares
 */
const middlewares = [
    body_parser_1.default.json(),
    new logger_middleware_1.LoggerMiddleware().getMiddleware
];
middlewares.forEach(middleware => {
    app.use(middleware);
});
/**
 * App Controllers
 */
const controllers = [
    new main_controller_1.MainController(),
];
controllers.forEach(controller => {
    app.use(controller.route, controller.router);
});
/**
 * Start application
 */
app.listen(env_config_1.ENV_CONFIG.PORT, function () {
    console.info('Server listening on port', env_config_1.ENV_CONFIG.PORT);
});
