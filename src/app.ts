import express from 'express';
import { HealthRoutes } from './routes/health.routes';
import { MainRoutes } from './routes/main.routes';
import { Routes } from './routes/routes';

export default class App {

  public expressApp: express.Application;
  public port: number;

  private routes: Routes[];

  constructor(port: number, middlewares?: any[]) {
      this.expressApp = express(); //run the express instance and store in app
      this.port = port;
      this.middlewares(middlewares);

      this.routes = [
        new MainRoutes(this.expressApp),
        new HealthRoutes(this.expressApp),
      ];
  }

  private middlewares(middlewares?: any[]) {
    middlewares?.forEach(middleware => {
      this.expressApp.use(middleware)
    })
  }

  public listen() {
    this.expressApp.listen(this.port, () => {
      console.log(`App listening on: http://localhost:${this.port}`);
    })
  }

}

//export default App;