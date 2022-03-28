require('dotenv').config()
const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const routes = require('../router/routes');

class WebServer {
  app = undefined;
  port = 3000;

  constructor() {
    this.app = express();

    initializeConfigMiddlewares(this.app);
    this._initializeRoutes();
    initializeErrorMiddlwares(this.app);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }

  _initializeRoutes() {
    this.app.use('', routes.initializeRoutes());
  }
}

module.exports = WebServer;