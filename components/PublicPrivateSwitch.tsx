"use client"
import React, { useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useRouter } from 'next/navigation'

const PublicPrivateSwitch = (
    {
        isPublic,
        setIsPublic
    }: {
        isPublic: boolean,
        setIsPublic: (isPublic: boolean) => void
    }
) => {

    const router = useRouter();
    useEffect(() => {
        const url = `/confess${isPublic === true ? '' : `?public=${isPublic}`}`
        router.push(url);
    }, [isPublic]
    )

    return (
        <div className="flex items-center space-x-2">
            <Label htmlFor="confession">Public</Label>
            <Switch id="confession"
                checked={isPublic}
                onCheckedChange={() => {
                    setIsPublic(!isPublic)
                }}
            />
        </div>
    )
}

export default PublicPrivateSwitch