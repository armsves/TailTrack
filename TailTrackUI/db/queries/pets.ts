import type { Pets } from '@prisma/client'
import { db } from '@/db'
import { notFound } from 'next/navigation'

export async function fetchPosts(): Promise<Pets[]> {
    return await db.pets.findMany({
        orderBy: [
            {
                updatedAt: 'desc',
            }
        ],
    })
}

export async function fetchPostById(id: string): Promise<Pets | null> {
    const post = await db.pets.findFirst({
        where: {
            id
        }
    })

    if (!post) {
        notFound()
    }

    return post
}
