"use client"
import React, { useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useRouter } from 'next/navigation'

const AnonymousSwitch = (
    {
        name,
        isAnonymous,
        setIsAnonymous
    }: {
        name: string,
        isAnonymous: boolean,
        setIsAnonymous: (isAnonymous: boolean) => void
    }
) => {
    const router = useRouter();
    useEffect(() => {
        const url = `/confess/${name}${isAnonymous === true ? '' : `?isAnonymous=${isAnonymous}`}`
        router.push(url);
    }, [isAnonymous]);
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className='flex items-center gap-2 mt-3'>
                <Switch id="confession"
                    checked={isAnonymous}
                    onCheckedChange={() => {
                        setIsAnonymous(!isAnonymous)
                    }}
                />
                <Label htmlFor="confession">Be Anonymous</Label>
            </div>
            {
                isAnonymous && (
                    <p className="text-sm text-muted-foreground mt-2">
                        Your identity will be kept secret
                    </p>
                )
            }
            {
                !isAnonymous && (
                    <p className="text-sm text-muted-foreground mt-2">
                        Your identity will be visible
                    </p>
                )
            }
        </div>
    )
}

export default AnonymousSwitch