import koa from 'koa';
import koaCors from 'koa-cors';
import koaBodyParser from 'koa-body-parser';

import config from './config';
import { statsRouter, tasksRouter } from './routes';

export class Server {
  constructor() {
    this.app = new koa();

    this.app.use(koaCors());
    this.app.use(koaBodyParser());

    this.app.use(statsRouter.routes());
    this.app.use(statsRouter.allowedMethods());
    this.app.use(tasksRouter.routes());
    this.app.use(tasksRouter.allowedMethods());
  }

  async start() {
    console.info('startng at', config.port)
    return this.app.listen(config.port);
  }
}
