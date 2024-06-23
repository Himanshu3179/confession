"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "./ui/badge"
import { useToast } from "./ui/use-toast"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { useState } from "react"

export function DeleteButton(
    { id }: { id: string }
) {
    const [loading, setLoading] = useState<boolean>(false)
    const { toast } = useToast();
    const router = useRouter()
    const handleDelete = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/delete', {
                method: 'DELETE',
                body: JSON.stringify({
                    id
                })
            })

            const data = await res.json()
            if (res.ok) {
                toast({
                    title: 'Confession deleted successfully',
                    description: data.message,
                })
                window.location.reload()
            }
            else {
                toast({
                    title: 'Error',
                    description: 'Error deleting confession',
                    variant: 'destructive'
                })
            }

        } catch (error) {
            toast({
                title: 'Error',
                description: 'Error deleting confession',
                variant: 'destructive'
            })
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Badge variant="destructive" className="flex gap-2">
                    Delete
                    <Trash2 size={15} />
                </Badge>

            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this Confession?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="ml-auto">
                    <Button type="submit" variant="destructive" className="w-fit"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
