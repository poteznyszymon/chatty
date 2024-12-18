import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const activeUsers: string[] = [];

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;

  if (userId && !activeUsers.includes(userId)) {
    activeUsers.push(userId);
    console.log("User connected:", userId, "Socket ID:", socket.id);
  }

  io.emit("getOnlineUsers", activeUsers);

  socket.on("disconnect", () => {
    if (userId) {
      const index = activeUsers.indexOf(userId);
      if (index !== -1) {
        activeUsers.splice(index, 1);
      }
      console.log("User disconnected:", userId, "Socket ID:", socket.id);

      io.emit("getOnlineUsers", activeUsers);
    }
  });
});

export { httpServer, io };
