"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from './ModeToggle'

const NavLinks = () => {
    const Navlinks = [
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
            title: 'Sent',
            link: '/sent'
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
        <div className='lg:flex gap-5 items-center hidden '>
            {Navlinks.map((link, index) => (
                <Link key={index} href={link.link}
                    className={`text-lg  ${pathname === link.link ? 'font-semibold underline text-rose-500' : ''}`}
                >{link.title}</Link>
            ))}
            <ModeToggle />
        </div>
    )
}

export default NavLinks