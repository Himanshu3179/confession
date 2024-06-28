import { Button, buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { isAuthenticated } from '@/app/actions'
import { ArrowRight } from 'lucide-react'

const page = () => {
    const authenticated = isAuthenticated();
    if (!authenticated) {
        <div className='flex flex-col justify-center items-center pt-10 lg:px-10 px-5'>
            <p className='text-3xl text-rose-500 font-serif'>
                Hurray!! You have successfully confessed your Confession
            </p>
            <Image src="/confession.png" width={300} height={300} alt="confession image" />
            <div className='text-center space-y-2 mt-3'>
                <p className="text-sm text-center">
                    You can also recieve confessions from your friends by sharing your confession link.
                </p>
                <p className="text-sm text-muted-foreground text-center">
                    Click the button below to get started
                </p>
            </div>
            <Link href="/signup"
                className={`${buttonVariants({ variant: 'default' })} px-16 mt-5`}
            >Get Started</Link>
        </div>
    }
    return (
        <div className='flex flex-col justify-center items-center pt-10 lg:px-10 px-5'>
            <p className='text-3xl text-rose-500 font-serif text-center'>
                Hurray!! You have successfully confessed your Confession
            </p>
            <Image src="/confession.png" width={300} height={300} alt="confession image" />
            <div className='text-center space-y-2 mt-3'>

                <p className="text-sm text-muted-foreground text-center">
                    See all Confessions sent by You
                </p>
            </div>
            <Link href="/sent"
                className={`${buttonVariants({ variant: 'default' })} px-16 mt-5 flex gap-2
                `}
            >
                All Sent Confessions <ArrowRight size={20} />
            </Link>
        </div>
    )
}

export default page