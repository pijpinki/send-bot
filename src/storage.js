import EventEmitter from 'events';

class Storage extends EventEmitter {
  constructor() {
    super();

    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    this.emit('task', task);
  }

  getStats() {
    return this.tasks;
  }
}

export const storage = new Storage();
