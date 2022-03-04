import Router from 'koa-router';
import { storage } from '../storage';

const router = new Router();

router.get('/stats', async ctx => {
  return ctx.body = storage.getStats();
});

export const statsRouter = router;
