"use client"
import React from 'react';
import ExpandText from './ExpandText';
import { VenetianMask } from 'lucide-react';
import LikeButton from './LikeButton';
import { formatTimeAgo } from '@/helpers/GetTime';
import Link from 'next/link';
import { Lobster } from 'next/font/google';
import DownloadShare from './DownloadShare';

export const lobster = Lobster({ weight: "400", subsets: ["latin"] });

const PublicConfessionCard = (
    { id, content, from, createdAt, likes, userId }: {
        id: string,
        content: string,
        from: string | null,
        createdAt: Date,
        likes: {
            id: string,
            confessionId: string,
            userId: string,
            createdAt: Date
        }[],
        userId: string | null
    }
) => {

    return (
        <div className='max-w-md w-full bg-secondary/50 border border-rose-500 p-5 rounded-lg flex flex-col gap-5'>
            <div className='flex gap-5'>
                {from && (
                    <Link href={`/confess/${from}`}>
                        <p className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-serif
                            ${!from ? 'text-rose-500 bg-black' : 'bg-rose-500'}
                        `}>
                            {from.charAt(0).toUpperCase()}
                        </p>
                    </Link>
                )}
                {!from && (
                    <p className='w-10 h-10 rounded-full flex items-center justify-center font-bold font-serif text-rose-500 bg-black cursor-pointer'>
                        <VenetianMask />
                    </p>
                )}
                <div>
                    <Link href={`/confess/${from}`}>
                        <p className='font-semibold'>
                            {from || 'Anonymous'}
                        </p>
                    </Link>
                    <p className='text-sm text-muted-foreground flex gap-2'>
                        {formatTimeAgo(createdAt)}
                    </p>
                </div>
            </div>
            <ExpandText content={content} />
            <div className='flex justify-between mt-auto'>
                <LikeButton id={id} likes={likes} userId={userId} />
                <DownloadShare
                    id={id}
                    content={content}
                    createdAt={createdAt}
                    from={from}
                    basePath='public'
                />
            </div>
        </div>
    );
};

export default PublicConfessionCard;