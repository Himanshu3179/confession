import ProfileForm from '@/components/ProfileForm'
import React from 'react'
import { getName } from '@/app/actions';

const page = async () => {
    const username = await getName();
    return (
        <div className='lg:px-20 px-5 py-10 flex flex-col w-full gap-5'>
            <ProfileForm username={username} />
        </div>
    )
}

export default page