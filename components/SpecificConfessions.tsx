"use client"

import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const SpecificConfessions = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get('type')

    // search = null|'anonymous'|'private'|'public'


    return (
        <div>
            <h1>Specific Confessions</h1>
        </div>
    )
}

export default SpecificConfessions