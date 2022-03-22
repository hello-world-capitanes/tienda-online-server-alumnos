"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
class MainController {
    constructor(router) {
        this.router = router;
    }
    initRoutes() {
        this.router.get('/', this.getRootPath);
    }
    getRootPath(req, res) {
        res.status(200);
    }
}
exports.MainController = MainController;
