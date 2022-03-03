import koa from 'koa';
import koaCors from 'koa-cors';
import koaBodyParser from 'koa-body-parser';

import { config } from './config';

const app = new koa();

app.use(koaCors());
app.use(koaBodyParser());

app.listen(config.port);
