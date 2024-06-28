import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
    return (
        <div
            className='w-full flex flex-col lg:px-20 px-5 py-10 gap-10'
        >
            <div className='flex lg:flex-row flex-col gap-5 w-full'>
                <div className='mx-auto flex flex-col gap-5 w-full'>
                    <p className="font-serif text-4xl text-rose-500 mx-auto">
                        Confess Here Publicly
                    </p>
                    <Skeleton className="h-96 max-w-[500px] w-full mx-auto bg-secondary/50 border border-rose-500" />
                </div>
                <div className='mx-auto flex flex-col gap-5 w-full'>
                    <p className="font-serif text-4xl text-blue-500 text-center">
                        Find Users
                    </p>
                    <Skeleton className="h-96 max-w-[500px] w-full mx-auto bg-secondary/50 border border-rose-500" />
                </div>
            </div>
        </div >
    )
}

export default loading