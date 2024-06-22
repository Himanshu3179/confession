import React from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Label } from './ui/label'

const AnonymousConfessionInput = () => {
    return (
        <div className='max-w-lg flex flex-col justify-center  w-full mx-auto'>
            <Label htmlFor="message-2">
                Confess Anonymously
            </Label>
            <Textarea placeholder='I have a confession to make...'
                className='mt-4'
                rows={5}
            />
            <p className="text-sm text-muted-foreground mt-2">
                Your identity will be kept secret
            </p>
            <Button className='w-fit ml-auto mt-3' type='submit'>
                Confess
            </Button>
        </div>
    )
}

export default AnonymousConfessionInput