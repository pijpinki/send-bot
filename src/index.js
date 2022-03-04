import { Server } from './server';
import { Worker } from './workers';

const server = new Server();
const worker = new Worker();

worker.start();
server.start().catch(console.error);
