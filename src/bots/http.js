import request from 'request';

export class HttpBot {
  constructor(task) {
    this.task = task;
    this.address = task.address;

    this.actvie = true;
    this.connections = 0;
    this.timeoutId = {
      get: 0, post: 0, put: 0, delete: 0,
    };
  }

  get() {
    this.connections++;

    request(this.address, { method: 'get' }, err => {
      if (err) console.error(err);

      this.connections--;

      if (!this.actvie) return;

      this.timeoutId.get = setTimeout(this.get.bind(this), 1e2);
    });
  }

  post() {
    this.connections++;

    request(this.address, { method: 'post' }, err => {
      if (err) console.error(err);

      this.connections--;

      if (!this.actvie) return;

      this.timeoutId.post = setTimeout(this.post.bind(this), 1e2);
    });
  }

  put() {
    this.connections++;

    request(this.address, { method: 'put' }, err => {
      if (err) console.error(err);

      this.connections--;

      if (!this.actvie) return;

      this.timeoutId.put = setTimeout(this.put.bind(this), 1e2);
    });
  }

  delete() {
    this.connections++;

    request(this.address, { method: 'delete' }, err => {
      if (err) console.error(err);

      this.connections--;

      if (!this.actvie) return;

      this.timeoutId.delete = setTimeout(this.delete.bind(this), 1e2);
    });
  }

  makeRequest() {
    this.get();
    this.post();
    this.put();
    this.delete();
  }

  start() {
    this.makeRequest();
  }

  destroy() {
    this.actvie = false;
    clearTimeout(this.timeoutId.get);
    clearTimeout(this.timeoutId.post);
    clearTimeout(this.timeoutId.put);
    clearTimeout(this.timeoutId.delete);
  }
}
