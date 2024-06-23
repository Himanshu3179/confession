import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
    return (
        <div
            className='w-full flex flex-col lg:px-20 px-5 py-10 gap-10'
        >
            <div className='w-full flex flex-col gap-3'>
                <Skeleton className="h-4 w-[400px] mx-auto bg-secondary/50" />
                <Skeleton className="h-10 w-[600px] mx-auto bg-secondary/50" />
            </div>
            <div className='flex items-center justify-center'>
                <Skeleton className="h-10 w-[300px] bg-secondary/50" />
                <Skeleton className="h-8 w-[80px] bg-secondary/50 ml-auto" />
            </div>

            <div className='
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-3'>
                <Skeleton className="h-52 max-w-md w-full bg-secondary/50 mx-auto" />
                <Skeleton className="h-52 max-w-md w-full bg-secondary/50 mx-auto hidden md:block" />
                <Skeleton className="h-52 max-w-md w-full bg-secondary/50 mx-auto hidden lg:block" />
            </div>

        </div>
    )
}

export default loading