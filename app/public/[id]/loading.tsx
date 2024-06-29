import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
    return (
        <div
            className='w-full flex flex-col lg:px-20 px-5 py-10 gap-10'
        >


            <div className='
            flex flex-col
            gap-3'>
                <Skeleton className="h-52 max-w-md w-full bg-secondary/50 mx-auto border border-rose-500" />
            </div>

        </div>
    )
}

export default loading