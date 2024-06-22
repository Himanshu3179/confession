import React from 'react'

const Background = () => {
    return (
        <>
            <div
                className='fixed w-52 h-52 -z-10 bg-red-500
                top-0 left-0
            rounded-full
            blur-[200px]
            '
            />
            <div
                className='fixed w-52 h-52 -z-10 bg-blue-500
            
            bottom-0 right-0
            rounded-full
            blur-[200px]
            '
            />

        </>

    )
}

export default Background