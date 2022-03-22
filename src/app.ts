import express from 'express';

export default class App {

    public app: express.Application;
    public port: number;

    constructor(port: number, middlewares: any[], controllers: any[]) {
        this.app = express(); //run the express instance and store in app
        this.port = port;
        this.middlewares(middlewares);
        this.routes(controllers);
    }

    private middlewares(middlewares: any[]) {
      middlewares.forEach(middleware => {
        this.app.use(middleware)
      })
    }

    private routes(controllers: any[]) {
      controllers.forEach(controller => {
        this.app.use('/', controller?.router)
      })
    }

    public listen() {
      this.app.listen(this.port, () => {
        console.log(`App listening on the http://localhost:${this.port}`);
      })
    }

}

//export default App;