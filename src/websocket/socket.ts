import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const activeUsers = {};

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  const userId = socket.handshake.query.userId;
  console.log(userId);

  socket.on("disconnect", () => {
    console.log("User disconnect", socket.id);
  });
});

export { httpServer, io };
