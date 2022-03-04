import udp from 'dgram';

class UdpBot {
  constructor(task) {
    this.ip = task.ip;
    this.port = task.port;
    this.active = true;
    this.client = null;
    this.timeoutId = 0;
  }

  sendMessage() {
    this.client = udp.createSocket('udp4');
    const data = Buffer.from('Русский иди на хуй !');

    this.client.send(data, this.port, this.ip, (error) => {
      if (error) console.error(error);

      this.client.close();

      if (!this.active) return;

      this.timeoutId = setTimeout(this.sendMessage.bind(this), 1e2);
    });
  }

  destroy() {
    this.active = false;
    clearInterval(this.timeoutId);
  }
}


const client = udp.createSocket('udp4');

//buffer msg
const data = Buffer.from('siddheshrane');

client.on('message', function (msg, info) {
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
});

//sending msg
client.send(data, 2222, 'localhost', function (error) {
  if (error) {
    client.close();
  } else {
    console.log('Data sent !!!');
  }
});

var data1 = Buffer.from('hello');
var data2 = Buffer.from('world');

//sending multiple msg
client.send([ data1, data2 ], 2222, 'localhost', function (error) {
  if (error) {
    client.close();
  } else {
    console.log('Data sent !!!');
  }
});
