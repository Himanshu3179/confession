"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "./ui/textarea"
import { getName } from "@/app/actions"
import PublicPrivateSwitch from "./PublicPrivateSwitch"
import ConfessButton from "./ConfessButton"
import { useState } from "react"
import { useToast } from "./ui/use-toast"
import { useRouter } from "next/navigation"
import { Satisfy } from "next/font/google"
const satisfy = Satisfy({ subsets: ["latin"], weight: "400" });

export function IdentitySwitcher(
    { username }: { username: string }
) {
    const [content, setContent] = useState<string>('')
    const [isAnonymous, setIsAnonymous] = useState<boolean>(true)
    const [isPublic, setIsPublic] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const { toast } = useToast()
    const handleConfession = async () => {

        try {
            setLoading(true)
            const res = await fetch('/api/confess', {
                method: 'POST',
                body: JSON.stringify({
                    content,
                    isPublic,
                    isAnonymous
                })
            })
            const data = await res.json()

            if (res.ok) {
                toast({
                    title: 'Confession created successfully',
                    description: data.message,
                })
                router.push('/sent')
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

    return (
        <Tabs defaultValue="anonymous" className="max-w-[400px] w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="anonymous"
                    onClick={() => {
                        setIsAnonymous(true)
                    }}
                >Anonymous</TabsTrigger>
                <TabsTrigger value="named"
                    onClick={() => {
                        setIsAnonymous(false)
                    }}
                >As {"  "}{username}
                </TabsTrigger>
            </TabsList>
            <TabsContent value="anonymous">
                <Card>
                    <CardHeader>
                        <CardTitle>Confess Anonymously 🤫</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">

                        <Textarea placeholder='I have a confession to make...'
                            className={`mt-4 border-rose-500 ${satisfy.className} text-lg
                                bg-gradient-to-br from-rose-500/20 to-transparent
                            `}
                            rows={8}
                            onInput={(e) => {
                                setContent(e.currentTarget.value)
                            }}
                        />
                        {/* <div
                                className="absolute bottom-0 right-0
                                    w-20 h-20 rounded-full
                                    bg-rose-500 
                                    blur-[50px]
                                    
                                "
                            /> */}

                        <p className="text-sm text-muted-foreground mt-2">
                            Your identity will be kept secret
                        </p>
                    </CardContent>
                    <CardFooter>
                        {/* <PublicPrivateSwitch
                            isPublic={isPublic}
                            setIsPublic={setIsPublic}
                        /> */}

                        <Button className="ml-auto"
                            onClick={handleConfession}
                            disabled={loading}
                        >
                            {loading ? 'Confessing...' : 'Confess'}
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="named"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Confess as {" "}
                            <span className="text-blue-500">{username}</span>
                            {" "}🧑‍💼
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Textarea placeholder='I have a confession to make...'
                            className={`mt-4 border-rose-500 ${satisfy.className} text-lg
                            bg-gradient-to-br from-rose-500/20 to-transparent
                            `}
                            rows={8}
                            onInput={(e) => {
                                setContent(e.currentTarget.value)
                            }}
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                            Your identity will be visible to everyone
                        </p>
                    </CardContent>
                    <CardFooter>
                        {/* <PublicPrivateSwitch
                            isPublic={isPublic}
                            setIsPublic={setIsPublic}
                        /> */}
                        <Button className="ml-auto"
                            onClick={handleConfession}
                            disabled={loading}
                        >
                            {loading ? 'Confessing...' : 'Confess'}
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs >
    )
}
