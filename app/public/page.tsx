import React from 'react'
import { getPublicConfessions, getTotalPublicConfessions, getUserId } from '@/app/actions';
import PublicConfessionCard from '@/components/PublicConfessionCard';
import MakePublicConfessionButton from '@/components/MakePublicConfessionButton';
import PaginationControls from '@/components/PaginationControls';
import Link from 'next/link';
import { CirclePlus } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

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

    const allConfessions = await getPublicConfessions(currentPage);
    if (!allConfessions || allConfessions.length === 0) {
        return (
            <div className='py-10 flex flex-col items-center gap-5
        lg:px-10 px-5
        relative
        '>
                <p className='text-rose-500 text-4xl font-serif text-center'>Public Confessions</p>
                <p>
                    No confession found :/
                </p>
                <Link
                    href="/confess"
                    className={`${buttonVariants({ variant: 'default' })} shadow-lg
                    gap-2
                `}
                >
                    <CirclePlus size={20} />
                    Make a public confession
                </Link>
            </div>
        )
    }
    const userId = await getUserId();

    const totalCount = await getTotalPublicConfessions()
    const totalPages = Math.ceil(totalCount / 9)


    return (
        <div className='py-10 flex flex-col items-center gap-5
        lg:px-10 px-5
        relative
        '>
            <p className='text-rose-500 text-4xl font-serif text-center'>Public Confessions</p>
            <div className='
                mt-5
                flex flex-col gap-2
                w-full
                items-center
            '>

                {
                    allConfessions.map((confession) => (
                        <PublicConfessionCard
                            id={confession.id}
                            key={confession.id}
                            content={confession.content}
                            from={confession.from?.name as string}
                            createdAt={confession.createdAt}
                            likes={confession.likes}
                            userId={userId}
                        />
                    ))
                }
            </div>
            <MakePublicConfessionButton />
            <PaginationControls totalPages={totalPages} />
        </div>
    )
}

export default page