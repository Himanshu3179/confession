"use client"
import { Share } from 'lucide-react'
import React from 'react'
import { useToast } from './ui/use-toast';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const ShareButton = (
    { confessionId }: { confessionId: string }
) => {
    const { toast } = useToast();


    const handleShare = async () => {
        const confessionLink = `${window.location.origin}/public/${confessionId}`;
        try {
            await navigator.clipboard.writeText(confessionLink);
            toast({
                title: 'Success',
                description: 'Link copied to clipboard',
            });
        } catch (error) {
            console.error('Failed to copy text: ', error);
            toast({
                title: 'Error',
                description: 'Failed to copy link',
                variant: 'destructive'
            });
        }
    };

    return (

        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Share className="cursor-pointer hover:text-muted-foreground" size={20} onClick={handleShare} />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Share</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ShareButton