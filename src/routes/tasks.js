import KoaRouter from 'koa-router';
import { storage } from '../storage';
import { Task } from '../task';

const router = new KoaRouter();

router.post('/tasks', async ctx => {
  storage.addTask(new Task(ctx.request.body));

  ctx.body = ctx.request.body;
})

export const tasksRouter = router;
