module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(' User connected to WebSocket');

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`Joined room: ${roomId}`);
    });

    socket.on('productScroll', ({ roomId, scrollPosition }) => {
      socket.to(roomId).emit('syncScroll', scrollPosition);
    });

    socket.on('chatMessage', (msg) => {
      io.emit('chatMessage', msg); 
    });

    socket.on('disconnect', () => {
      console.log(' User disconnected');
    });
  });
};
