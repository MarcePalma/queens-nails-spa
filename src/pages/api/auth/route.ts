import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { token } = req.body;
        const envToken = process.env.AUTH_TOKEN;

        if (token === envToken) {


            res.status(200).json({ message: 'Token válido. Acceso concedido.', token });
        } else {
            res.status(401).json({ message: 'Token inválido. Acceso denegado.' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
