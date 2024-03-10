import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';

export default async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    if (req.method === 'DELETE') {
        try {
            const id = Number(req.query.id);
            await prisma.appointment.delete({
                where: { id }
            });
            res.status(204).end();
        } catch (error) {
            console.error('Error deleting appointment:', error);
            res.status(500).json({ message: 'Error deleting appointment' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}