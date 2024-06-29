
import { IdentitySwitcher } from '@/components/IdentitySwitcher'


import React from 'react'
import { getName } from '@/app/actions'
import FindUsers from '@/components/FindUsers';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
const page = async (

) => {

    const username = await getName();

    if (!username) return (
        <div className='py-10 lg:px-10 px-5 flex gap-10'>
            <div className='flex flex-col gap-5 w-full '>
                <p className='text-center  text-4xl text-rose-500 font-serif'>
                    Login to confess publicly
                </p>
                <Link href="/signup"
                    className={`${buttonVariants({ variant: 'default' })} w-fit mx-auto`}
                >
                    Login
                </Link>
            </div>
            <FindUsers />
        </div>
    )

    return (
        <div className='lg:px-10 px-5 py-10 flex lg:flex-row flex-col
            lg:gap-0 gap-10
        '>
            <div className='flex flex-col gap-8 items-center w-full '>
                <p className="font-serif text-4xl text-rose-500">
                    Confess Here Publicly
                </p>
                <IdentitySwitcher username={username} />
            </div>
            <FindUsers />
        </div>
    )
}

export default page