"use client"
import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, Download, Heart, Share, VenetianMask } from 'lucide-react';
import { Button } from './ui/button';
import { Satisfy } from 'next/font/google';
import { Input } from './ui/input';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { toPng } from 'html-to-image';
import { useToast } from './ui/use-toast'
import { ScrollArea } from './ui/scroll-area';

const satisfy = Satisfy({ subsets: ["latin"], weight: "400" });

const DownloadShare = (
    {
        id,
        content,
        from,
        createdAt,
        basePath
    }: {
        id: string,
        content: string,
        from: string | null,
        createdAt: Date,
        basePath?: string
    }
) => {
    const [url, setUrl] = React.useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const elementRef = useRef(null);

    const { toast } = useToast()

    const handleDownload = async () => {
        if (elementRef.current === null) {
            return;
        }

        try {
            const dataUrl = await toPng(elementRef.current);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'confession.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Could not generate image', error);
        }
    };

    const handleCopy = () => {
        if (inputRef.current) {
            navigator.clipboard.writeText(inputRef.current.value);
            toast({
                title: 'Link copied to clipboard',
                description: 'You can now share this link with your friends',
            })
        }
    }

    React.useEffect(() => {
        // This code will only run in the browser where `window` is defined
        setUrl(`${window.location.origin}/${basePath}/${id}`);
    }, [id, basePath]);
    
    return (
        <Dialog>
            <DialogTrigger>
                <Share className="share-button cursor-pointer hover:text-muted-foreground" size={20} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Download</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[300px] max-w-md w-full rounded-md ">
                    <div className='w-full bg-secondary border border-rose-500 p-5 rounded-lg flex flex-col gap-5'
                        ref={elementRef}
                    >
                        <div className='flex gap-5'>
                            {from && (
                                <p className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-serif
                            ${!from ? 'text-rose-500 bg-black' : 'bg-rose-500'}
                        `}>
                                    {from.charAt(0).toUpperCase()}
                                </p>
                            )}
                            {!from && (
                                <p className='w-10 h-10 rounded-full flex items-center justify-center font-bold font-serif text-rose-500 bg-black cursor-pointer'>
                                    <VenetianMask />
                                </p>
                            )}
                            <div>

                                <p className='font-semibold'>
                                    {from || 'Anonymous'}
                                </p>

                                <p className='text-sm text-muted-foreground flex gap-2'>
                                    {/* HH:MM */}
                                    {createdAt.toLocaleDateString()}
                                    {" "}
                                    {createdAt.toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                        <p className={`text-xl  ${satisfy.className}`}>
                            {content}
                        </p>
                    </div>
                </ScrollArea>
                {
                    basePath === 'public' ? (
                        <>
                            <p
                                className='text-sm text-muted-foreground cursor-pointer font-semibold '
                            >Copy Link :</p>
                            <div className='flex gap-3'>
                                <Input
                                    ref={inputRef}
                                    id="link"
                                    value={url}
                                    readOnly
                                    className='italic  text-sm text-muted-foreground w-full 
                border border-rose-500 
                    bg-gradient-to-r from-rose-500/20 to-rose-200/20                  
                    '/>
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
                            <div className='mx-auto my-2 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                                or
                            </div>
                        </>
                    )
                        : null
                }
                <Button className='w-full flex items-center gap-2'
                    onClick={handleDownload}
                >
                    Download
                    <Download size={20} />
                </Button>
            </DialogContent>
        </Dialog >
    );
};

export default DownloadShare;
