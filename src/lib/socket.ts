import { io } from "socket.io-client";

const baseURL = "http://localhost:3000";

export const socket = io(baseURL, {
  autoConnect: false,
  withCredentials: true,
});

socket.on("connect", () => {
  console.log(`Connected to server ${socket.id}`);
});
