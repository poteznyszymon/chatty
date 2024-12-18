import { io, Socket } from "socket.io-client";

/// Use environment variable for BASE_URL
const BASE_URL = "http://localhost:4000";

let socket: Socket | null = null;

export const connectSocket = (userId: string) => {
  if (!socket) {
    socket = io(BASE_URL, {
      query: {
        userId: userId,
      },
    });
  }

  socket.on("getOnlineUsers", (usersId) => {
    console.log(usersId);
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
