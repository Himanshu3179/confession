import { kaushan, lobster, permanent } from '@/app/layout'
import { Dot } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const UserCard = (
    {
        name,
        confessions,
        image
    }:
        {
            name: string,
            confessions: number,
            image: string | null
        }
) => {
    return (
        <Link
            href={`/confess/${name}`}
            className={`flex  py-3 px-10 rounded-xl gap-5 items-center cursor-pointer
                transition duration-200 ease-in-out
                bg-card
                hover:bg-primary/20
                ${lobster.className}
            `}>
            {
                image
                    ? <Image
                        src={image}
                        alt='profile'
                        className=' rounded-full'
                        width={40}
                        height={40}
                    />
                    :
                    <div className="rounded-full w-10 h-10 bg-blue-500 text-white flex justify-center items-center">
                        {name.charAt(0).toUpperCase()}
                    </div>}
            <div className={`flex items-center gap-2 `}>
                <p className='text-xl'>{name}</p>
                <Dot className='text-muted-foreground' />
                <p className='text-muted-foreground'>{confessions} Confessions</p>
            </div>
        </Link>
    )
}

export default UserCard