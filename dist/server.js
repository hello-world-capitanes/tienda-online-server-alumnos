"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const express_1 = require("express");
// Middlewares
const body_parser_1 = __importDefault(require("body-parser"));
// Controllers
const main_controller_1 = require("./controllers/main.controller");
const middlewares = [
    body_parser_1.default.json(),
    body_parser_1.default.urlencoded({ extended: true }),
];
const controllers = [
    new main_controller_1.MainController((0, express_1.Router)())
];
/**
 * Server Application
 */
const app = new app_1.App(5000, middlewares, controllers);
app.listen();
