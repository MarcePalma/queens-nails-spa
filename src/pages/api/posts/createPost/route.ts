import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = await parseFormData(req);

      const { title, content, category } = data.fields;
      const imageFile = data.files?.image;

      if (!title || !content || !category || !imageFile) {
        console.error('Missing required fields');
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const imageBuffer = await fs.readFile(imageFile.path);
      const imageBase64 = imageBuffer.toString('base64');

      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          image: imageBase64,
          category,
        },
      });

      return res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      // Asegúrate de enviar una respuesta aunque haya errores
      res.end();
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}

async function parseFormData(req: NextApiRequest)  {
  const contentType = req.headers['content-type'];

  if (!contentType || !contentType.includes('multipart/form-data')) {
    throw new Error('Invalid content type. Expected multipart/form-data');
  }

  const body: Buffer = await new Promise((resolve, reject) => {
    let chunks: Uint8Array[] = [];

    req.on('data', (chunk: Uint8Array) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });

  const boundary = contentType.split('boundary=')[1];
  const boundaryString = `--${boundary}`;

  const parts = body.toString().split(boundaryString);

  const fields: Record<string, string> = {};
  const files: Record<string, { filename: string, path: string }> = {};

  for (const part of parts) {
    if (!part.includes('filename')) {
      const [fieldName, fieldValue] = part
        .replace(/\r\n$/, '')
        .split('\r\n\r\n');

      fields[fieldName] = fieldValue;
    } else {
      const [, contentDisposition, data] = part.split('\r\n\r\n');

      const match = contentDisposition.match(/name="(.+)"\s*filename="(.+)"/);

      if (match) {
        const [, fieldName, filename] = match;
        const path = `./tmp/${filename}`;

        await fs.writeFile(path, data, 'binary');
        files[fieldName] = { filename, path };
      }
    }
  }

  return { fields, files };
}