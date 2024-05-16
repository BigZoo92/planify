import { Server as SocketIOServer, Socket } from 'socket.io';

interface Message {
  authorId: string;
  authorName: string;
  content: string;
  timestamp: number;
  room?: string;
}

const setupWebsocketServer = (io: SocketIOServer) => {
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.emit('welcome', {
      message: `Welcome! Your socket ID is ${socket.id}`,
    });

    socket.on('join-room', (room: string) => {
      socket.join(room);
      console.log(`Client ${socket.id} joined room ${room}`);
      socket
        .to(room)
        .emit('message', { content: `User ${socket.id} has joined the room.` });
    });

    socket.on('leave-room', (room: string) => {
      socket.leave(room);
      console.log(`Client ${socket.id} left room ${room}`);
      socket
        .to(room)
        .emit('message', { content: `User ${socket.id} has left the room.` });
    });

    socket.on('send-message', (message: Message) => {
      console.log(
        `Message received from ${message.authorName}: ${message.content}`
      );
      const room = message.room;
      if (room) {
        socket.to(room).emit('new-message', message);
      } else {
        socket.broadcast.emit('new-message', message);
      }
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
