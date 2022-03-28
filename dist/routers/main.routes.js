"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
class MainRouter {
    constructor(route, router) {
        this.route = route;
        this.router = router;
        if (!!this.router && this.route && this.route.length > 1 && this.route.includes('/')) {
            this.router.get(`${this.route}/`, this.defaultRoute);
        }
    }
    defaultRoute(req, res) {
        res.send("Main Router running");
    }
    getRouter() {
        return this.router;
    }
}
exports.MainRouter = MainRouter;
