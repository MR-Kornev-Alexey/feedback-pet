// sockets.ts (или в файле, где настраиваются сокеты)
import { Server as SocketIOServer } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function setupSockets(io: SocketIOServer) {
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        // Отправляем текущие отзывы сразу после подключения
        sendFeedback(io);

        // Можно добавить периодическую рассылку или обновление по событию (например, при добавлении нового отзыва)
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}

// Функция для отправки всех отзывов клиентам
async function sendFeedback(io: SocketIOServer) {
    const feedback = await prisma.feedback.findMany();
    io.emit('feedback', feedback);
}

