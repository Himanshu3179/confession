import React from 'react'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'
import { ArrowRight, CirclePlus } from 'lucide-react'

const MakePublicConfessionButton = () => {
    return (
        <div
            className='fixed bottom-5 right-5'
        >
            <Link
                href="/confess"
                className={`${buttonVariants({ variant: 'default' })} shadow-lg
                    gap-2
                `}
            >
                Make Confessions to others
                <ArrowRight size={20} />
            </Link>
        </div>
    )
}

export default MakePublicConfessionButton