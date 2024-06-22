"use client"
import { Heart } from 'lucide-react'
import React, { useEffect } from 'react'
import { useToast } from './ui/use-toast'

const LikeButton = (
    { id, likes, userId }: {
        id: string,
        likes: {
            id: string,
            confessionId: string,
            userId: string,
            createdAt: Date
        }[],
        userId: string | null
    }
) => {
    const [isLiked, setIsLiked] = React.useState<boolean>(false)
    const [likeCount, setLikeCount] = React.useState<number>(likes.length)
    const { toast } = useToast()

    useEffect(() => {
        if (userId && likes.some(like => like.userId === userId)) {
            setIsLiked(true);
        }
    }, [userId, likes]);

    const handleLike = async () => {
        if (!userId) {
            toast({
                title: 'Error',
                description: 'You must login to like a confession',
                variant: 'destructive'
            })
            return
        }
        setIsLiked(!isLiked);
        setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1); // Optimistic update
        try {
            const res = await fetch('/api/like', {
                method: 'POST',
                body: JSON.stringify({
                    confessionId: id
                })
            })
            const data = await res.json()
            if (res.ok) {
                toast({
                    title: 'Like',
                    description: data.message
                })
            } else {
                setIsLiked(!isLiked);
                setLikeCount(prevCount => isLiked ? prevCount + 1 : prevCount - 1); // Revert optimistic update
                toast({
                    title: 'Error',
                    description: data.message,
                    variant: 'destructive'
                })
            }
        } catch (error) {
            setIsLiked(!isLiked);
            setLikeCount(prevCount => isLiked ? prevCount + 1 : prevCount - 1); // Revert optimistic update
            console.error(error)
            toast({
                title: 'Error',
                description: 'Internal Server Error',
                variant: 'destructive'
            })
        }
    }

    return (
        <button className='flex'>
            {
                <Heart
                    className="text-rose-500"
                    fill={isLiked ? 'currentColor' : 'none'}
                    size={20}
                    onClick={handleLike}
                />
            }
            <sup >
                {/* if 0 then dont show anyting  */}
                {likeCount > 0 && likeCount}
            </sup>
        </button>
    )
}

export default LikeButton