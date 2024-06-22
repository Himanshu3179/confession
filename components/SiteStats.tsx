import React from 'react'

const SiteStats = () => {
    const stats = [
        { Confessions: 1200 },
        { Shares: 500 },
        { Users: 200 },
        { Likes: 1000 },
    ]
    return (
        <div className='
        md:w-1/3
        rounded-xl bg-secondary/50
        p-5
            h-fit
        '>
            <p className="font-serif text-4xl text-rose-500 text-center my-auto
                pb-10
            ">
                Site Stats
            </p>
            <div
                className='
                    flex flex-col
                    gap-5
                    text-center
                    justify-between
                    
                    items-center
                '
            >
                {stats.map((stat) => (
                    <div className='flex justify-between flex-col'
                        key={Object.keys(stat)[0]}
                    >
                        <p className='text-4xl font-bold font-mono '>{Object.values(stat)[0]}</p>
                        <p className='text-lg text-muted-foreground'>{Object.keys(stat)[0]}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SiteStats