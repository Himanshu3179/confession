import React, { Suspense } from 'react'
import { getLikedConfessions, getTotalLikedConfessions } from '@/app/actions'
import PrivateConfessionCard from '@/components/PrivateConfessionCard';
import PaginationControls from '@/components/PaginationControls';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const page = async (
    {
        searchParams,
    }: {
        searchParams?: {
            page?: string;
        };
    }
) => {

    const currentPage = Number(searchParams?.page) || 1;
    const allConfessions = await getLikedConfessions(currentPage);

    if (!allConfessions || allConfessions.length === 0) {
        return (
            <div className='py-10 lg:px-10 px-5 flex flex-col gap-5 justify-center items-center'>
                <p className='text-rose-500 text-4xl font-serif text-center'>
                    You have not liked any confessions yet
                </p>
                <Link href="/public"
                    className={`${buttonVariants({ variant: 'default' })} px-16  flex gap-2 items-center justify-center 
                        hover:gap-5 hover:transition-all 
                        mt-5
                        w-fit
                    `}
                >See Public Confessions
                    <ArrowRight size={20} />
                </Link>

            </div>
        )
    }

    const totalCount = await getTotalLikedConfessions()
    const totalPages = Math.ceil(totalCount / 9)


    return (
        <div className='py-10 
        lg:px-10 px-5
        w-full
        justify-center
        flex flex-col gap-5'>
            <p className='text-rose-500 text-4xl font-serif text-center'>
                You have Liked these confessions
            </p>
            <div className='
                mt-5
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2
            '>
                <Suspense fallback={
                    <div>Loading...</div>
                }>

                    {allConfessions.map((confession) => (
                        <PrivateConfessionCard
                            id={confession.id}
                            key={confession.id}
                            content={confession.content}
                            from={confession.from?.name as string}
                            createdAt={confession.createdAt}
                            likes={confession.likes}
                        />

                    ))}
                </Suspense>
            </div>
            <PaginationControls totalPages={totalPages} />

        </div>
    )
}

export default page