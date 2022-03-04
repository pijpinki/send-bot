import net from 'net';

export class TcpBot {
  constructor(task) {
    this.ip = task.ip;
    this.port = task.port;

    this.client = null;
    this.actvie = true;
    this.connections = 0;
    this.timeoutId = 0;
  }

  start() {
    this.client = new net.Socket();

    this.client.connect({ port: this.port, host: this.ip }, err => {
      if (err) console.error('error');

      console.info('tcp connected');
      this.connections++;

      if (!this.actvie) return;

      this.timeoutId = setTimeout(this.reconnect.bind(this), 10e3);
    });

    this.client.on('end', () => {
      if (!this.actvie) return;
      this.reconnect();
    });
  }

  reconnect() {
    this.connections--;
    this.client?.end();
    this.start();
  }

  async destroy() {
    this.connections = 0;
    this.actvie = false;
    clearTimeout(this.timeoutId);
    this.client?.end();
  }
}
