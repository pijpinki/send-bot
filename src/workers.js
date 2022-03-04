import { storage } from './storage';
import { BotManager } from './bots';

export class Worker {
  constructor() {
    this.bots = [];
  }

  start() {
    storage.on('task', (task) => {
      const bot = new BotManager(task);

      bot.start();

      this.bots.push(bot);
    });
  }
}
