"use client"
import React, { useEffect } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Heart, Menu, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Kaushan_Script } from 'next/font/google'
const kaushan = Kaushan_Script({ weight: "400", subsets: ["latin"] });
const Sidebar = () => {
    const sideLinks = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'Confess',
            link: '/confess'
        },
        {
            title: 'All Confessions',
            link: '/allconfessions'
        },
        {
            title: 'Liked',
            link: '/liked'
        },
        {
            title: 'Public',
            link: '/public'
        }
    ]

    const pathname = usePathname();



    return (
        <div className={`lg:hidden`} >
            <Sheet>
                <SheetTrigger>
                    <Menu />
                </SheetTrigger>
                <SheetContent side={"left"} className='bg-secondary/50'>
                    <SheetClose asChild >
                        <Link
                            href={'/'}
                            className={`font-bold text-xl ${kaushan.className}
                            flex justify-center items-center
                            `}
                        >
                            Confess Your Heart <sup className="ml-2
                                    rotate-12
                                    transform
                                    transition-transform
                                    duration-300
                                    ease-in-out
                                    hover:rotate-45

                                "><Heart color="red"
                                    fill="red"
                                    size={15} /></sup>
                        </Link>
                    </SheetClose>

                    <div className={`flex flex-col gap-3 mt-10  ${kaushan.className}`}>
                        {sideLinks.map((link, index) => {
                            const isActive = pathname === link.link;
                            return (
                                <SheetClose asChild key={index}>
                                    <Link href={link.link}
                                        className={`text-lg  py-2 rounded-lg px-3
                                        ${isActive ? 'bg-rose-500 text-white' : 'secondary'}
                                        `}
                                    >{link.title}</Link>
                                </SheetClose>
                            )
                        })}

                    </div>

                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Sidebar