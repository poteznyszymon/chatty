import { Hono } from "hono";
import { createServer } from "http";
import { Server } from "socket.io";
import { env } from "./utils/config";

const app = new Hono();

const httpServer = createServer();
const io = new Server(httpServer);

app.get("/api/test", (c) => {
  return c.json({ message: "test" });
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("message", (data) => {
    console.log("Received message:", data);
    socket.emit("chat response", { text: `Server received: ${data.text}` });
  });

  socket.on("disconnect", () => {
    console.log("User disconnect", socket.id);
  });
});

httpServer.listen(env.CHAT_PORT, () => {
  console.log(`Chat server running on PORT: ${env.CHAT_PORT}`);
});

const server = Bun.serve({
  port: env.PORT,
  fetch: app.fetch,
});

console.log(`Server running on PORT: ${server.port}`);
