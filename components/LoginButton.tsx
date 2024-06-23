import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '@/components/ui/button'
import { getName, isAdmin } from '@/app/actions'
import LogoutButton from '@/components/LogoutButton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from './ModeToggle';


export async function LoginButton() {
    const name = await getName();
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
                    <div className="rounded-full w-12 h-12 bg-rose-500 text-white flex justify-center items-center">
                        {name.charAt(0).toUpperCase()}
                    </div>
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

