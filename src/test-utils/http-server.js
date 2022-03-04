import koa from 'koa';

const app = new koa();

app.use(ctx => {
  console.info('request');
  ctx.body = '';
});

app.listen(8080);
