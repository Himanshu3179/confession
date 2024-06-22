import { Heart, Share } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { formatTimeAgo } from '@/helpers/GetTime';

interface ConfessionCardProps {
    id: string;
    content: string;
    to?: string;
    from?: string;
    createdAt: string;
}


const AnonymousPublicConfession = (
    { id, content, to, from, createdAt }: ConfessionCardProps


) => {
    return (
        <div className='p-5 rounded-md w-full mx-auto secondary h-40 flex flex-col '>
            <div className=''>
                <p>&quot;{content}&quot;</p>
            </div>
            <div className='mt-auto flex items-center justify-center'>
                {/* <p className=''>{from}</p> */}
                <Badge variant="default">{from}</Badge>
                <p className='ml-auto'>
                    {formatTimeAgo(createdAt)}
                </p>
                <Share className="ml-auto mr-3 " size={20} />
                <Heart size={20} className='text-rose-500'/>
            </div>

        </div>
    )
}

export default AnonymousPublicConfession