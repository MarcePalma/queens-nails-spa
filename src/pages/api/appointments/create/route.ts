import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient()

    if (req.method === 'POST') {
        try {
            const { name, treatment, date, status, time } = req.body;
            const newAppointment = await prisma.appointment.create({
                data: {
                    name,
                    treatment,
                    date: new Date(date), 
                    status,
                    time
                }
            });
            res.status(201).json(newAppointment);
        } catch (error) {
            console.error('Error creating appointment:', error);
            res.status(500).json({ message: 'Error creating appointment' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}