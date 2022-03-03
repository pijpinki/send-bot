import net from 'net';

class TcpBot {
  constructor(params) {
    this.ip = params.ip;
    this.port = params.port;

    this.client = null;
    this.actvie = false;
    this.timeoutId = 0;
  }

  start() {
    this.client = new net.Socket();

    this.client.connect({ port: this.port, host: this.ip }, err => {
      if (err) console.error('error');

      if (!this.actvie) return;

      setTimeout(this.reconnect.bind(this), 10e3);
    });

    this.client.on('end', () => {
      if (!this.actvie) return;
      this.reconnect();
    });
  }

  reconnect() {
    this.client?.end();
    this.start();
  }

  async destroy() {
    this.actvie = false;
    clearTimeout(this.timeoutId);
    this.client?.end();
  }
}
