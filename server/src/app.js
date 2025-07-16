import dotenv from "dotenv"
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "./config/socket.config.js";
import { connectDB } from "./config/db-client.config.js";
import routes from "./routes/index.routes.js";
import {verifyAuthentication} from "./middlewares/verify.middleware.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: String(process.env.ORIGIN),
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  },
});
setupSocket(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((req, res, next) => {
    if (req.path.startsWith("/socket.io")) return next();
  verifyAuthentication(req, res, next);
});

app.use("/api", routes);

try {
  await connectDB();
  const port = Number(process.env.PORT) | 3000;
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (error) {
  console.error(error);
}
