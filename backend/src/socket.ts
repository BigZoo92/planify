import { Server as SocketIOServer, Socket } from 'socket.io';

interface Message {
  authorId: string;
  authorName: string;
  content: string;
  timestamp: number; 
}
const setupWebsocketServer = (io: SocketIOServer) => {
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);
    
  io.on('connection', (socket: Socket) => {
    console.log(`Client connecté avec l'id ${socket.id}`);
    socket.on('new-message', (message) => {
      io.emit('message-received', message);
    });
    socket.on('agenda-update', (update) => {
      io.emit('agenda-update', update);

    socket.on('send-message', (message: Message) => {
      console.log(`Message reçu: ${message.content}`);
      socket.broadcast.emit('new-message', message);
    });
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
})})
};

export default setupWebsocketServer;
