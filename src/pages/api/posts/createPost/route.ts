import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';


export default async function POST(req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient()

    if (req.method === 'POST') {
        try {
            const { title, content, date, image, category } = req.body;

            const newPost = await prisma.post.create({
                data: {
                    title,
                    content,
                    date,
                    image,
                    category,
                },
            });

            return res.status(201).json(newPost);
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {

        res.status(405).json({ error: 'Method Not Allowed' });
    }
}