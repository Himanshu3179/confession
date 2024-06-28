import React from 'react'
import AnonymousPublicConfession from './AnonymousPublicConfession'
import { getTopConfessions } from '@/app/actions'
import PrivateConfessionCard from './PrivateConfessionCard'

const TopConfessions = async () => {
    const confession = await getTopConfessions()
    if (!confession || confession.length === 0) {
        return (
            <div
                className='
                w-full
                md:w-2/3
                grid
                grid-cols-1
                gap-2
                lg:grid-cols-2
                rounded-xl
                bg-secondary/50
                p-5
            '
            >
                <p className="font-serif text-4xl text-rose-500 text-center my-auto
                lg:pb-0 pb-5
            ">
                    Top Confessions
                </p>
            </div>
        )
    }

    return (
        <div
            className='
                w-full
                md:w-2/3
                grid
                grid-cols-1
                gap-2
                lg:grid-cols-2
                rounded-xl
                bg-secondary/50
                p-5
            '
        >
            <p className="font-serif text-4xl text-rose-500 text-center my-auto
                lg:pb-0 pb-5
            ">
                Top Confessions
            </p>
            {
                confession.map((confession) => (
                    <PrivateConfessionCard
                        key={confession.id}
                        id={confession.id}
                        content={confession.content}
                        from={confession.from?.name as string}
                        createdAt={confession.createdAt}
                        likes={confession.likes}
                    />
                ))
            }

        </div>
    )
}

export default TopConfessions