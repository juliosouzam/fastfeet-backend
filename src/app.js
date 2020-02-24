import express from 'express'

import routes from './routes'

class Application {
  constructor() {
    this.server = express();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes)
  }
}

export default new Application().server