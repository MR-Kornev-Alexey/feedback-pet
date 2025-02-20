import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
import { setupSockets } from "./sockets";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
    cors: { origin: "*" }
});

// Middleware
app.use(cors());
app.use(express.json());

// Настройка Socket.io
setupSockets(io);

// Пример маршрута
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
