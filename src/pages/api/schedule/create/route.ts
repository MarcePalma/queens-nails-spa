import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    if (req.method === 'POST') {
        try {
            const { date, time } = req.body;

            const newSchedule = await prisma.schedule.create({
                data: {
                    date,
                    time,
                },
            });

            res.status(201).json(newSchedule);
        } catch (error) {
            console.error('Error al crear el registro de Schedule:', error);
            res.status(500).json({ message: 'Error al crear el registro de Schedule.' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido.' });
    }
}