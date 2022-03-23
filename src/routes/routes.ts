import { ENV_CONFIG } from "../config/env.config";

export class Routes {
    protected route;
    private _apiPrefix: string = ENV_CONFIG.API_PREFIX;
    private _apiVersion: string = ENV_CONFIG.API_VERSION;
    
    constructor(route: string) {
        this.route = `/${this._apiPrefix}/${this._apiVersion}/${route}`;
    }
}