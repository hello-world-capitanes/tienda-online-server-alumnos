"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const express_1 = require("express");
const main_routes_1 = require("../routers/main.routes");
class MainController {
    constructor() {
        this._route = "/";
        this._router = new main_routes_1.MainRouter(this._route, (0, express_1.Router)());
    }
    get route() {
        return this._route;
    }
    get router() {
        return this._router.getRouter();
    }
}
exports.MainController = MainController;
