"use client"

import { Satisfy } from 'next/font/google';
import React, { useState } from 'react'
const satisfy = Satisfy({ subsets: ["latin"], weight: "400" });
const ExpandText = (
    { content }: { content: string }
) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shortContent = content.length > 200 ? `${content.substring(0, 200)}...` : content;

    return (
        <div className='flex flex-col relative'>
            <p className={`text-xl  ${satisfy.className}`}>
                &quot;{isExpanded ? content : shortContent}&quot;
            </p>
            {content.length > 200 && (
                <button onClick={() => setIsExpanded(!isExpanded)}
                    className='text-rose-500 ml-auto w-fit text-sm
                            
                    '
                >
                    {isExpanded ? 'Read Less' : 'Read More...'}
                </button>
            )}
        </div>
    )
}

export default ExpandText