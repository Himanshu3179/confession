import React from 'react'
import { Input } from './ui/input'
import UserCard from './UserCard'
import { getAllUsers } from '@/app/actions'
import { ScrollArea } from './ui/scroll-area'
import SearchUsers from './SearchUsers'

const FindUsers = async () => {
    const users = await getAllUsers()
    if (!users) return null

    return (
        <div className='w-full space-y-5'>
            <p className="font-serif text-4xl text-blue-500 text-center">
                Find Users
            </p>

            <div className='bg-secondary/70 p-5 rounded-lg w-full '>
                {/* <SearchUsers /> */}
                <ScrollArea className="h-[400px]  w-full rounded-md  mt-5 ">
                    <div className='flex flex-col gap-4'>
                        {
                            users.map((user) => (
                                <UserCard
                                    key={user.name}
                                    name={user.name}
                                    confessions={user._count.receivedConfessions}
                                />
                            ))
                        }
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default FindUsers