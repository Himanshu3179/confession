
import Link from "next/link"
// import { LoginButton } from "./LoginButton"
import NavLinks from "./NavLinks"
import Sidebar from "./Sidebar"
import { LoginButton } from "./LoginButton"
import { kaushan } from "@/app/layout"
import { Heart } from "lucide-react"

const Navbar = () => {
    return (
        <div className={`flex justify-between w-full p-5 items-center border-b-2 shadow-md
        bg-secondary/50
            ${kaushan.className}
        `}>

            <div className="flex gap-2 items-center ">
                <Sidebar />
                <Link
                    href={'/'}
                    className="font-bold text-xl flex justify-center items-center ">
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
            </div>

            <div className="flex gap-5 items-center">
                <NavLinks />
                <LoginButton />
            </div>
        </div>
    )
}

export default Navbar