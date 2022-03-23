import { Request, Response } from 'express';

export class LoggerMiddleware {

    constructor() {}

    public getMiddleware(request: Request, response: Response, next: any) {
        console.log(`${request.method} ${request.path}`);
        next();
    }

}