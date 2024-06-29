import React, { Suspense } from 'react'
import { getAllConfessions, getName, getTotalConfessions } from '@/app/actions'
import PrivateConfessionCard from '@/components/PrivateConfessionCard';
import PaginationControls from '@/components/PaginationControls';
import CopyConfessionLink from '@/components/CopyConfessionLink';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight, CirclePlus } from 'lucide-react';

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
    const allConfessions = await getAllConfessions(currentPage);

    const username = await getName()



    if (!allConfessions || allConfessions.length === 0) {
        return (
            <div className='py-10 lg:px-10 px-5 flex flex-col items-center justify-center'>
                <p className="font-serif text-4xl text-rose-500 mx-auto">
                    Nobody have confess you till now ://
                </p>
                <p className='text-muted-foreground mt-3 text-center'>
                    Copy and Share this link to <br />Start seeing and receiving the confessions
                </p>

                {username &&
                    <div className='w-full flex items-center justify-center mt-5'>
                        <CopyConfessionLink username={username} />
                    </div>
                }
                <div className='max-w-lg mx-auto my-2 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                    or
                </div>
                <Link href="/public"
                    className={`${buttonVariants({ variant: 'default' })} px-16 bg-blue-600 hover:bg-blue-500`}
                >See Public Confessions 🤭</Link>
            </div>
        )
    }


    const totalCount = await getTotalConfessions()
    const totalPages = Math.ceil(totalCount / 9)

    return (
        <div className='py-10 
        lg:px-10 px-5
        w-full
        justify-center
        flex flex-col gap-5'>
            <p className='text-rose-500 text-4xl font-serif text-center'>All Confessional Message You Got !!</p>
            <div className='
                mt-5
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2
            '>
                <Suspense key={currentPage} fallback={
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