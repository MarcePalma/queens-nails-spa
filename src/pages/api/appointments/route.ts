import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const appointments = await prisma.appointment.findMany()
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching appointments", error);
        res.status(500).json({ error: 'Internal server error' })
    }
}
