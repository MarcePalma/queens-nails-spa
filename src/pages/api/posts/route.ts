import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const posts = await prisma.post.findMany()
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts", error);
        res.status(500).json({ error: 'Internal server error' })
    }
}
