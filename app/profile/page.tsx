import ProfileForm from '@/components/ProfileForm'
import React from 'react'
import { getConfessionLink } from '@/app/actions';

const page = async () => {
    const confessionLink = await getConfessionLink();
    console.log(confessionLink);
    return (
        <div className='
    lg:px-20 
    px-5
    py-10 flex flex-col w-full gap-5'>
            <ProfileForm
                confessionLink={confessionLink}
            />  
        </div>
    )
}

export default page