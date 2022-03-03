import KoaRouter from 'koa-router';
import { storage } from '../storage';

const router = new KoaRouter({ prefix: '/tasks '});

router.post('/', async ctx => {
  storage.addTask(ctx.body);
  ctx.body = {};
})

export const tasksRouter = router;
