"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
class LoggerMiddleware {
    constructor() { }
    getMiddleware(request, response, next) {
        console.log(`${request.method} ${request.path}`);
        next();
    }
}
exports.LoggerMiddleware = LoggerMiddleware;
