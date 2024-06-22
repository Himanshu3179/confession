"use client"
import React, { useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation'
const SelectTypeOfConfession = () => {
    const [type, setType] = React.useState('all')
    const router = useRouter();

    useEffect(() => {
        // set url query params to all
        const url = `/confess${type === 'all' ? '' : `?type=${type}`}`
        router.push(url);

    }, [])


    const handleChange = (value: string) => {
        setType(value);
        const url = `/confess${value === 'all' ? '' : `?type=${value}`}`
        router.push(url);
    }

    return (
        <Select
            onValueChange={handleChange}
            defaultValue='all'
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue
                    placeholder="Your Confessions"
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Visibility</SelectLabel>
                    <SelectItem value="all" className='font-bold'>All</SelectItem>
                    <SelectItem value="anonymous">Anonymous</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectTypeOfConfession