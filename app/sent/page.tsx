import PaginationControls from '@/components/PaginationControls'
import React from 'react'
import { getSentConfessions, getTotalSentConfessions } from '@/app/actions';
import SentConfessionCard from '@/components/SentConfessionCard';

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
    const sentConfessions = await getSentConfessions(currentPage);

    if (!sentConfessions) {
        return (
            <div className='py-10 lg:px-10 px-5'>
                <p className="font-serif text-4xl text-rose-500">
                    You have not sent any confessions yet ://
                </p>
            </div>
        )
    }

    const totalCount = await getTotalSentConfessions()
    const totalPages = Math.ceil(totalCount / 9)

    return (
        <div className='py-10 
        lg:px-10 px-5
        w-full
        justify-center
        flex flex-col gap-5'>
            <p className='text-rose-500 text-4xl font-serif text-center'>All Confessional Message You Have Sent !!</p>
            <div className='
                mt-5
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2
            '>
                {
                    sentConfessions.map((confession) => (
                        <SentConfessionCard
                            key={confession.id}
                            id={confession.id}
                            content={confession.content}
                            isPublic={confession.isPublic}
                            isAnonymous={confession.isAnonymous}
                            createdAt={confession.createdAt}
                            to={confession.to}
                            likes={confession.likes}
                        />
                    ))
                }

            </div>
            <PaginationControls totalPages={totalPages} />
        </div>
    )
}

export default page
