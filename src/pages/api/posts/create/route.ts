import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, content, image, category } = req.body;
    console.log('Datos recibidos:', { title, content, image, category });

    try {
      // Crear la nueva publicación en la base de datos
      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          image, // Almacenar la imagen como cadena base64
          category,
        },
      });

      // Devolver la nueva publicación creada como respuesta
      return res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}