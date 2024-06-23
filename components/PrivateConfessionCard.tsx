import { Share } from 'lucide-react';
import React from 'react'
import { Badge } from './ui/badge';
import { formatTimeAgo } from '@/helpers/GetTime';
import { ScrollArea } from './ui/scroll-area';
import LikeButton from './LikeButton';
import { getUserId } from '@/app/actions';
import Link from 'next/link';
import { satisfy } from '@/app/layout';


const PrivateConfessionCard = async (
    {
        id,
        content,
        from,
        createdAt,
        likes
    }: {
        id: string,
        content: string,
        from: string | null,
        createdAt: Date,
        likes: {
            id: string,
            confessionId: string,
            userId: string,
            createdAt: Date
        }[]
    }
) => {
    const userId = await getUserId()
    return (
        <div className='p-5 rounded-md w-full max-w-md mx-auto bg-secondary/50 
        border border-rose-500
        h-52 flex flex-col gap-5'>
            <ScrollArea className="h-full w-full rounded-md text-justify relative">
                <p
                    className={`overflow-ellipsis overflow-hidden pr-3 pb-10 ${content.length > 100 ? 'text-overflow' : ''}
                    ${satisfy.className} text-xl
                    `}
                >&quot;{content}&quot;</p>

                {content.length > 100 && (
                    <div className='absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-secondary to-transparent'></div>
                )}

            </ScrollArea>

            <div className='mt-auto flex items-center justify-between'>
                {
                    from &&
                    <Link
                        href={`/confess/${from}`}
                    >
                        <Badge
                            variant={`${from ? 'default' : 'secondary'}`}
                        >
                            {from ? from : 'Anonymous'}
                        </Badge>
                    </Link>
                }
                {
                    !from &&
                    <Badge
                        variant={`${from ? 'default' : 'secondary'}`}
                        className='cursor-pointer'
                    >
                        {from ? from : 'Anonymous'}
                    </Badge>
                }
                <p className=''>
                    {formatTimeAgo(createdAt)}
                </p>
                {/* <Heart className="text-rose-500" size={20} /> */}

                <div className='flex gap-3'>
                    <Share className="" size={20} />
                    {/* <ShareButton
                        confessionId={id}
                    /> */}
                    <LikeButton id={id}
                        likes={likes}
                        userId={userId}
                    />
                </div>
            </div>

        </div >
    )
}

export default PrivateConfessionCard