import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
    return (
        <div
            className='w-full flex flex-col lg:px-20 px-5 py-10 gap-10'
        >
            <p className='text-rose-500 text-4xl font-serif text-center'>All Confessional Message You Have Sent !!

            </p>

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