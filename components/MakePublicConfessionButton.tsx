import React from 'react'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'

const MakePublicConfessionButton = () => {
    return (
        <div
            className='fixed bottom-5 right-5'
        >
            <Link
                href="/confess"
                className={`${buttonVariants({ variant: 'default' })} shadow-lg`}
            >
                Make a public confession
            </Link>
        </div>
    )
}

export default MakePublicConfessionButton