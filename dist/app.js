"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor(port, middlewares, controllers) {
        this.app = (0, express_1.default)(); //run the express instance and store in app
        this.port = port;
        this.middlewares(middlewares);
        this.routes(controllers);
    }
    middlewares(middlewares) {
        middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }
    routes(controllers) {
        controllers.forEach(controller => {
            this.app.use('/', controller === null || controller === void 0 ? void 0 : controller.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}
exports.default = App;
//export default App;
