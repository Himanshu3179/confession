"use client"
import React, { useRef } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from './ui/use-toast'

const CopyConfessionLink = (
    { confessionLink }: { confessionLink: string }
) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast()
    const handleCopy = () => {
        if (inputRef.current) {
            navigator.clipboard.writeText(inputRef.current.value);
            toast({
                title: 'Link copied to clipboard',
                description: 'You can now share this link with your friends',
            })
        }
    }

    return (
        <div className="flex items-center space-x-2 max-w-lg w-full">
            <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                    Link
                </Label>
                <Input
                    ref={inputRef}
                    id="link"
                    value={confessionLink}
                    readOnly
                    className='italic  text-sm text-muted-foreground w-full 
                border border-rose-500 
                    bg-gradient-to-r from-rose-500/20 to-rose-200/20
                    
                    
                    '
                />
            </div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Copy Link</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </div>
    )
}

export default CopyConfessionLink