import { TcpBot } from './tcp';
import { HttpBot } from './http';
import { PROTOCOL } from '../constants';

class BotManager {
  constructor(task) {
    this.task = task;

    this.bots = [];
  }

  start(connections = 1e3) {
    for(let i = 0; i < connections; i++) {
      this.bots.push(this.getBot());
    }
  }

  getBot() {
    if (this.task.protocol === PROTOCOL.TCP) {
      return new TcpBot(this.task);
    }

    if (this.task.protocol === PROTOCOL.HTTP) {
      return new HttpBot(this.task);
    }

    return null;
  }

  getStats() {
    return {
      ...this.task,
      connections: this.bots.reduce((acc, bot) => acc + (bot?.connections || 0), 0),
    }
  }

  destroy() {
    for (const bot of this.bots) {
      bot?.destroy();
    }
  }
}
