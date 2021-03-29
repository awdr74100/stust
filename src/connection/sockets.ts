import { Server } from 'socket.io';
import { Express } from 'express';
import http from 'http';

const init = (server: http.Server, app: Express): void => {
  const io = new Server(server, { cors: { origin: true } });
  console.log('⚡ Socket is listening for connections');

  app.set('io', io);

  io.on('connection', (socket) => {
    console.log(`New User：${socket.id}`);
  });
};

export default { init };
