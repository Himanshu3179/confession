import { LockKeyholeOpen, Share, SwitchCamera, UserRound, VenetianMask } from 'lucide-react';
import React from 'react'
import { Badge } from './ui/badge';
import { formatTimeAgo } from '@/helpers/GetTime';
import { ScrollArea } from './ui/scroll-area';
import LikeButton from './LikeButton';
import { getName, getUserId } from '@/app/actions';
import Link from 'next/link';
import { satisfy } from '@/app/layout';

const SentConfessionCard = async (
  {
    id,
    content,
    isPublic,
    isAnonymous,
    createdAt,
    to,
    likes
  }: {
    id: string,
    content: string,
    isPublic: boolean,
    isAnonymous: boolean,
    createdAt: Date,
    to: {
      name: string;
    } | null,
    likes: {
      id: string,
      confessionId: string,
      userId: string,
      createdAt: Date
    }[]
  }
) => {
  const userId = await getUserId()
  const username = await getName()

  return (
    <div className='p-5 rounded-md w-full max-w-md mx-auto bg-secondary/50 h-64 flex flex-col gap-5'>
      <ScrollArea className="h-full w-full rounded-md text-justify relative">
        <p
          className={`overflow-ellipsis overflow-hidden pr-3 pb-10 ${content.length > 100 ? 'text-overflow' : ''}
                    ${satisfy.className} text-xl
                    `}
        >&quot;{content}&quot;</p>

        {content.length > 150 && (
          <div className='absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-secondary to-transparent'></div>
        )}

      </ScrollArea>

      <div className='mt-auto flex items-center justify-between'>
        {
          to
            ? <Link href={`/confess/${to.name}`}>
              {
                // if to.name === username then show "To: You"
                to.name === username
                  ? <Badge variant={'secondary'}
                    className='flex gap-2 items-center justify-center'
                  ><SwitchCamera size={15} />{"Self"}</Badge>
                  :
                  <Badge>{"To: "}{to.name}</Badge>
              }
            </Link>
            : (
              isPublic
                ? <Badge variant={'outline'} className='flex gap-2 items-center justify-center'>
                  <LockKeyholeOpen size={15} />
                  Public
                </Badge>
                :
                <Badge variant={'destructive'} className='flex gap-2 items-center justify-center'>
                  <LockKeyholeOpen size={15} />
                  Error
                </Badge>
            )
        }

        {/* <Heart className="text-rose-500" size={20} /> */}
        {
          isAnonymous
            ? <Badge variant={'secondary'} className='flex gap-2 items-center justify-center'>
              <VenetianMask size={15} />
              Anonymous
            </Badge>
            : <Badge  className='flex gap-2 items-center justify-center'>
              <UserRound size={15} />
              Not Anonymous
            </Badge>
            
        }
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

      <p className='mx-auto text-sm text-muted-foreground'>
        {formatTimeAgo(createdAt)}
      </p>


    </div >
  )
}

export default SentConfessionCard