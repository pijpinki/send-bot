import { TcpBot } from './tcp';
import { HttpBot } from './http';
import { UdpBot } from './udp';
import { PROTOCOL } from '../constants';

export class BotManager {
  constructor(task) {
    this.task = task;

    this.bots = [];
  }

  start(connections = 1e3) {
    console.info('start bot', connections);
    for(let i = 0; i < connections; i++) {
      const bot = this.getBot();

      if (!bot) continue;

      bot.start();

      this.bots.push(bot);
    }
  }

  getBot() {
    if (this.task.protocol === PROTOCOL.TCP) {
      return new TcpBot(this.task);
    }

    if (this.task.protocol === PROTOCOL.HTTP) {
      return new HttpBot(this.task);
    }

    if (this.task.protocol === PROTOCOL.UDP) {
      return new UdpBot(this.task);
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
