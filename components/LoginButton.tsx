import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '@/components/ui/button'
import { getImage, getName, isAdmin } from '@/app/actions'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from './ModeToggle';
import Image from 'next/image'


export async function LoginButton() {
    const name = await getName();
    const image = await getImage()
    if (!name) {
        return (
            <div>
                <Link
                    href="/signin"
                    className={`${buttonVariants({ variant: 'default' })}`}
                >
                    Sign In
                </Link>
            </div>
        )
    }
    const isadmin = await isAdmin();
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
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
                            <div className="rounded-full w-12 h-12 bg-rose-500 text-white flex justify-center items-center">
                                {name.charAt(0).toUpperCase()}
                            </div>}
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuLabel>{name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className='lg:hidden'>
                        <ModeToggle />
                    </div>
                    <Link
                        href={'/profile'}
                    >
                        <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem>
                    </Link>
                    {
                        isadmin && (
                            <Link
                                href={'/admin'}
                            >
                                <DropdownMenuItem>
                                    Admin
                                </DropdownMenuItem>
                            </Link>
                        )
                    }
                    <Link
                        href={'/signout'}
                    >
                        <DropdownMenuItem className='text-red-600'>
                            Sign Out
                        </DropdownMenuItem>
                    </Link>

                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    )
}

