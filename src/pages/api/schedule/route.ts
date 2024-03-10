import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAllSchedules(req: NextApiRequest, res: NextApiResponse) {
    try {
        const schedules = await prisma.schedule.findMany();
        res.status(200).json(schedules);
    } catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}