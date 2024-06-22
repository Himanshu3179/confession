import { getPublicConfessionById, getUserId } from '@/app/actions'
import PublicConfessionCard from '@/components/PublicConfessionCard'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = async (
    { params }: { params: { id: string } }
) => {
    const confession = await getPublicConfessionById(params.id)
    if (!confession) {
        return (
            <div>
                <p>No confession found</p>
            </div>
        )
    }
    const userId = await getUserId();
    return (
        <div className='flex flex-col py-10 lg:px-10 px-5 justify-center items-center gap-10'>
            <PublicConfessionCard
                id={confession.id}
                content={confession.content}
                from={confession.from?.name as string}
                createdAt={confession.createdAt}
                likes={confession.likes}
                userId={userId}
            />
            <Link href="/public"
                className={`${buttonVariants({ variant: 'default' })} px-16 `}
            >See More Public Confessions 🤭</Link>

        </div>
    )
}

export default page