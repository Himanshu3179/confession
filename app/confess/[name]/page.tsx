"use client"
import AnonymousSwitch from '@/components/AnonymousSwitch'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Satisfy } from 'next/font/google'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const satisfy = Satisfy({ subsets: ["latin"], weight: "400" });
import { Skeleton } from "@/components/ui/skeleton"

const Component = (
    { params }: { params: { name: string } }
) => {
    const [content, setContent] = useState<string>('')
    const [isAnonymous, setIsAnonymous] = useState<boolean>(true)
    const [isUser, setIsUser] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [checkingUser, setCheckingUser] = useState<boolean>(true)
    const [userPresentWithName, setUserPresentWithName] = useState<boolean>(false)
    const { toast } = useToast()
    const router = useRouter()
    useEffect(() => {
        const checkAuthenticated = async () => {
            const req = await fetch('/api/user/userpresent')
            const data = await req.json()
            if (req.ok) {
                setIsUser(true)
            }
        }
        const checkName = async () => {
            setCheckingUser(true)
            const req = await fetch('/api/confessuserpresent',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        name: params.name
                    })
                }
            )
            const data = await req.json()
            if (req.ok) {
                setUserPresentWithName(true)
            }
            setCheckingUser(false)
        }

        checkAuthenticated()
        checkName()
    }, [])

    const handleConfession = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/directconfess', {
                method: 'POST',
                body: JSON.stringify({
                    toName: params.name,
                    content,
                    isAnonymous
                })
            })
            const data = await res.json()

            if (res.ok) {
                toast({
                    title: 'Success',
                    description: data.message,
                })
                router.push('/success')
            } else {
                toast({
                    title: 'Error',
                    description: data.message,
                    variant: 'destructive'
                })
            }

        } catch (error) {
            console.error(error)
            toast({
                title: 'Error',
                description: 'Internal Server Error',
                variant: 'destructive'
            })
        }
        finally {
            setLoading(false)
        }
    }

    if (checkingUser) {
        return (
            <div
                className='w-full flex flex-col lg:px-20 px-5 py-10 gap-10'
            >
                <p className='text-white text-3xl font-serif text-center'>
                    Make Confession to .....
                </p>

                <div className='flex flex-col gap-5'>
                    <Skeleton className="h-44 max-w-lg w-full bg-secondary/50 mx-auto border border-rose-500" />
                    <Skeleton className="h-10 w-[300px] bg-secondary/50 mx-auto border border-rose-500" />

                </div>

            </div>
        )
    }

    if (!userPresentWithName) {
        return (
            <div className='flex flex-col justify-center items-center  pt-10 px-5'>
                <div className='max-w-lg w-full flex flex-col items-center justify-center
                    gap-2
                '>
                    <h1
                        className='text-3xl text-center font-serif'
                    >User not found</h1>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col justify-center items-center  pt-10 px-5'>
            <div className='max-w-lg w-full flex flex-col items-center justify-center
                gap-2
            '>
                <h1
                    className='text-3xl text-center font-serif'
                >Make Confession to {" "}
                    <span className='text-rose-500 font-bold cursor-pointer'>{params.name}</span>
                </h1>

                <Textarea placeholder='I have a confession to make...'
                    className={`mt-4 border-rose-500 ${satisfy.className} text-lg
                    bg-gradient-to-br from-rose-500/20 to-transparent
                    `}
                    rows={8}
                    value={content}
                    onInput={(e) => {
                        setContent(e.currentTarget.value)
                    }}
                />
                {
                    isUser &&
                    <AnonymousSwitch
                        name={params.name}
                        isAnonymous={isAnonymous}
                        setIsAnonymous={setIsAnonymous}
                    />
                }
                <Button
                    className='ml-auto'
                    onClick={handleConfession}
                    disabled={loading}

                >
                    {loading ? 'Confessing...' : 'Confess'}
                </Button>

            </div>
        </div>
    )
}

export default Component