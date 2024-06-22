import React from 'react'

interface ConfessionCardProps {
    id: string;
    content: string;
    to?: string;
    from?: string;
    createdAt: string;
}

const ConfessionCard = (
    { id, content, to, from, createdAt }: ConfessionCardProps
) => {
    return (
        <div className='p-6 rounded-md w-full max-w-sm mx-auto border secondary my-5'>
            <p className='text-lg'>{content}</p>
            <p className='text-sm text-gray-400'>
                {from ? `From: ${from}` : ''}
                {to ? `To: ${to}` : ''}
            </p>
            <p className='text-sm text-gray-400'>{createdAt}</p>
        </div>
    )
}

export default ConfessionCard