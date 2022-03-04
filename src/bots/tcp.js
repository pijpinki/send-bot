import net from 'net';
import log4js from 'log4js';


export class TcpBot {
  constructor(task) {
    this.ip = task.ip;
    this.port = task.port;

    this.client = null;
    this.actvie = true;
    this.connections = 0;
    this.attempst = 0;
    this.timeoutId = 0;
    this.intervalId = setInterval(this.logs.bind(this), 10e3);
    this.logger = log4js.getLogger(`TCP BOT: ${this.ip}:${this.port}`);
    this.logger.level = 'ALL';
  }

  logs() {
    this.logger.info('Active connections', this.connections);
    this.logger.info('Attempts',this.attempst);
  }

  start() {
    this.client = new net.Socket();

    this.client.connect({ port: this.port, host: this.ip }, err => {
      if (err) this.logger.error('error', err);

      this.connections++;
      this.attempst++;

      if (!this.actvie) return;

      this.timeoutId = setTimeout(this.reconnect.bind(this), 1e2);
    });

    this.client.on('end', () => {
      if (!this.actvie) return;
      this.reconnect();
    });

    this.client.on('error', () => {
      this.logger.error('client error')
    })
  }

  reconnect() {
    this.connections--;
    this.client?.off('message');
    this.client?.off('error');
    this.client?.off('end');

    this.client?.end();
    this.start();
  }

  async destroy() {
    this.connections = 0;
    this.actvie = false;
    clearTimeout(this.timeoutId);
    clearInterval(this.intervalId);
    this.client?.end();
  }
}
