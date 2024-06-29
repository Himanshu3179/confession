import { getPublicConfessionById, getUserId } from '@/app/actions'
import PublicConfessionCard from '@/components/PublicConfessionCard'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = async (
    { params }: { params: { id: string } }
) => {
    // 1 sec delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const confession = await getPublicConfessionById(params.id)
    if (!confession) {
        return (
            <div className='py-10 lg:px-10 px-5'>
                <p className="font-serif text-4xl text-rose-500">
                    No confession found
                </p>

                <Link href="/public"
                    className={`${buttonVariants({ variant: 'default' })} px-16  flex gap-2 items-center justify-center 
                        hover:gap-5 hover:transition-all 
                        mt-5

                    `}
                >See Public Confessions
                    <ArrowRight size={20} />
                </Link>

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
                className={`${buttonVariants({ variant: 'default' })} px-16 flex gap-2`}
            >See More Public Confessions
                <ArrowRight size={20} />
            </Link>

        </div>
    )
}

export default page