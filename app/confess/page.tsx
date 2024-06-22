
import { IdentitySwitcher } from '@/components/IdentitySwitcher'


import React from 'react'
import { getName } from '@/app/actions'
import FindUsers from '@/components/FindUsers';
const page = async (

) => {
    const username = await getName();

    if (!username) return (
        <div className='py-10 lg:px-10 px-5'>
            <p className="font-serif text-4xl text-rose-500">
                You are not logged in
            </p>
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