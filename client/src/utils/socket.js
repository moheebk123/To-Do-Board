import { io } from "socket.io-client";

const URL = String(import.meta.env.VITE_BACKEND_API_URL);
export const socketConnection = io(URL, {
  withCredentials: true,
  transports: ["websocket"],
});
