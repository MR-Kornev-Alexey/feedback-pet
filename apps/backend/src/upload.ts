// upload.ts
export {}; // Обеспечивает, что файл считается модулем

import { Router, Request, Response } from 'express';
import multer from 'multer';
import { minioClient, bucketName } from './minioClient';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
const router = Router();

// Конфигурация multer для хранения файлов в памяти
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/api/upload', upload.array('files'), async (req: Request, res: Response): Promise<void> => {
    if (!req.files || !Array.isArray(req.files)) {
        res.status(400).json({ error: 'Нет файлов для загрузки' });
        return;
    }

    try {
        const uploadPromises = req.files.map(async (file) => {
            const ext = path.extname(file.originalname);
            const fileName = `${uuidv4()}${ext}`;

            // Загрузка файла в MinIO
            await minioClient.putObject(bucketName, fileName, file.buffer);

            const minioEndpoint = process.env.MINIO_ENDPOINT || 'localhost';
            const minioPort = process.env.MINIO_PORT || '9000';
            const fileUrl = `http://${minioEndpoint}:${minioPort}/${bucketName}/${fileName}`;

            // Создание записи изображения в базе данных
            const imageRecord = await prisma.images.create({
                data: {
                    name: file.originalname,
                    urlImage: fileUrl,
                },
            });
            return imageRecord;
        });

        // Ожидаем, пока все файлы загрузятся и данные будут сохранены в базе
        const images = await Promise.all(uploadPromises);

        // Запрос всех изображений из базы данных
        const allImages = await prisma.images.findMany();

        // Возвращаем список всех изображений
        res.status(200).json({
            message: 'Файлы успешно загружены',
            uploadedImages: images,
            allImages: allImages,  // Возвращаем все изображения
        });
    } catch (error) {
        console.error('Ошибка загрузки файлов:', error);
        res.status(500).json({ error: 'Ошибка загрузки файлов' });
    }
});
router.get('/api/images', async (req: Request, res: Response): Promise<void> => {
    try {
        // Запрос всех изображений из базы данных
        const allImages = await prisma.images.findMany({
            select: {
                id: true,
                name: true,
                urlImage: true,
            },
        });

        // Возвращаем список всех изображений
        res.status(200).json({
            message: 'Список изображений успешно получен',
            allImages: allImages,  // Возвращаем все изображения
        });
    } catch (error) {
        console.error('Ошибка при получении изображений:', error);
        res.status(500).json({ error: 'Ошибка при получении изображений' });
    }
});
router.post('/api/submitRating', async (req: Request, res: Response): Promise<void> => {
    const { customer, stars, text, id } = req.body;

    try {
        const ratingRecord = await prisma.feedback.create({
            data: {
                customer,
                stars,
                text,
                imageId: id,
            },
        });

        res.status(200).json({
            message: 'отзыв успешно сохранен',
            ratingRecord,
        });
    } catch (error) {
        console.error('Ошибка при сохранении отзыва', error);
        res.status(500).json({ error: 'Ошибка при сохранении оценки' });
    }
});

export default router;
