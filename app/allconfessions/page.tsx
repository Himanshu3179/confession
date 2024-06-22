import React, { Suspense } from 'react'
import { getAllConfessions, getTotalConfessions, getTotalPagesAllConfessions } from '../actions'
import PrivateConfessionCard from '@/components/PrivateConfessionCard';
import PaginationControls from '@/components/PaginationControls';

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

    if (!allConfessions) {
        return (
            <div className='py-10 lg:px-10 px-5'>
                <p className="font-serif text-4xl text-rose-500">
                    No confessions found
                </p>
            </div>
        )
    }


    const totalCount = await getTotalConfessions()
    const totalPages = Math.ceil(totalCount / 10)
    

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