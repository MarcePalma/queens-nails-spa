import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";

export default async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Method not allowed", message: "Only DELETE requests allowed" });
    }

    const { id } = req.query; // Así obtendrás el ID desde la ruta

    try {
        await prisma.schedule.delete({
            where: { id: Number(id) }
        });
        // Aquí retornamos la respuesta directamente con res.status().json()
        return res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        console.error("Error deleting schedule:", error);
        return res.status(500).json({ error: "Internal server error", message: "Error deleting schedule" });
    }
}