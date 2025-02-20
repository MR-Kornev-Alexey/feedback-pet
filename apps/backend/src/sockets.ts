import { Server } from "socket.io";

export const setupSockets = (io: Server) => {
    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on("message", (msg) => {
            console.log(`Received message: ${msg}`);
            io.emit("message", msg);
        });

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};
