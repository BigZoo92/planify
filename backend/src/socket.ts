import { Server as SocketIOServer, Socket } from 'socket.io';

const setupWebsocketServer = (io: SocketIOServer) => {
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.on('new-message', (message) => {
      io.emit('message-received', message);
    });
    socket.on('agenda-update', (update) => {
      io.emit('agenda-update', update);
    });
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

export default setupWebsocketServer;
