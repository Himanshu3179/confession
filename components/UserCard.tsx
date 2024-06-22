import { kaushan, lobster, permanent } from '@/app/layout'
import { Dot } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const UserCard = (
    {
        name,
        confessions
    }:
        {
            name: string,
            confessions: number
        }
) => {
    return (
        <Link
            href={`/confess/${name}`}
            className={`flex bg-neutral-50/10 py-3 px-10 rounded-xl gap-5 items-center cursor-pointer
                hover:bg-card/100 transition duration-200 ease-in-out
                ${lobster.className}
            `}>
            <div className="rounded-full w-10 h-10 bg-blue-500 text-white flex justify-center items-center">
                {name.charAt(0).toUpperCase()}
            </div>
            <div className={`flex items-center gap-2 `}>
                <p className='text-xl'>{name}</p>
                <Dot className='text-muted-foreground' />
                <p className='text-muted-foreground'>{confessions} Confessions</p>
            </div>
        </Link>
    )
}

export default UserCard