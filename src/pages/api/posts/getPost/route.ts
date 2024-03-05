import { PrismaClient } from '@prisma/client';

import type { Appointment, Post } from '@prisma/client';

const prisma = new PrismaClient();

export const getPosts = async () => {
    try {
        const posts: Post[] = await prisma.post.findMany();

        const manicuraPosts = posts
            .filter((post) => post.category === 'manicura')
            .map((post) => ({ ...post, image: `data:image/png;base64,${post.image}` }));

        const pedicuraPosts = posts
            .filter((post) => post.category === 'pedicura')
            .map((post) => ({ ...post, image: `data:image/png;base64,${post.image}` }));

        return { manicuraPosts, pedicuraPosts };
    } catch (error) {
        console.error('Error getting posts:', error);
        throw new Error('Error getting posts');
    }
};