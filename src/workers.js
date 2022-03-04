import { storage } from './storage';
import { BotManager } from './bots';

export class Worker {
  constructor() {
    this.bots = [];
  }

  start() {
    storage.on('task', (task) => {
      this.bots.push(new BotManager(task));
    });
  }
}
