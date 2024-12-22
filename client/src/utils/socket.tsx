import { setActiveUsersGlobally } from "@/context/OnlineUsersContext";
import { io, Socket } from "socket.io-client";

const BASE_URL = "http://localhost:4000";

let socket: Socket | null = null;

export const ConnectSocket = (userId: string) => {
  if (!socket) {
    socket = io(BASE_URL, {
      query: {
        userId,
      },
    });
  }

  socket.on("getOnlineUsers", (activeUsers: string[]) => {
    setActiveUsersGlobally(activeUsers);
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
