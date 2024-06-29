import React from 'react'
import { getName, getPublicConfessions, getTotalPublicConfessions, getUserId } from '@/app/actions';
import PublicConfessionCard from '@/components/PublicConfessionCard';
import MakePublicConfessionButton from '@/components/MakePublicConfessionButton';
import PaginationControls from '@/components/PaginationControls';
import Link from 'next/link';
import { CirclePlus } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { IdentitySwitcher } from '@/components/IdentitySwitcher';

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
    const username = await getName();

    return (
        <div className='py-10 flex flex-col items-center gap-5
        lg:px-10 px-5
        relative w-full
        '>
            <div className='flex justify-evenly w-full'>
                <div className='lg:w-2/3 w-full'>
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
                    <div className='lg:hidden'>
                        <MakePublicConfessionButton />
                    </div>
                </div>
                {username &&
                    <div className='w-1/3 flex-col gap-5 hidden lg:flex 
                    '>
                        <p className="font-serif text-4xl text-rose-500 text-center">
                            Confess Here Publicly
                        </p>
                        <IdentitySwitcher username={username} />
                    </div>}

            </div>


            <PaginationControls totalPages={totalPages} />
        </div>
    )
}

export default page