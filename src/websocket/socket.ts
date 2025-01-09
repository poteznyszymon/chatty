import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const activeUsers: Map<string, Set<string>> = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;

  if (userId) {
    if (!activeUsers.has(userId)) {
      activeUsers.set(userId, new Set());
    }
    activeUsers.get(userId)?.add(socket.id);

    console.log("User connected:", userId, "Socket ID:", socket.id);

    io.emit("getOnlineUsers", Array.from(activeUsers.keys()));
  }

  socket.on("disconnect", () => {
    if (userId) {
      const userSockets = activeUsers.get(userId);
      if (userSockets) {
        userSockets.delete(socket.id);
        if (userSockets.size === 0) {
          activeUsers.delete(userId);
        }
      }

      console.log("User disconnected:", userId, "Socket ID:", socket.id);

      io.emit("getOnlineUsers", Array.from(activeUsers.keys()));
    }
  });
});

export { httpServer, io };
