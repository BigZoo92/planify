import { Server as SocketIOServer, Socket } from 'socket.io';

interface Message {
  author: string;
  content: string;
}

export function setupWebsocketServer(io: SocketIOServer) {
  io.on('connection', (socket: Socket) => {

    socket.on('send-message', (message: Message) => {
      socket.broadcast.emit('new-message', message);
    });

    socket.on('disconnect', () => {
    });
  });
}
