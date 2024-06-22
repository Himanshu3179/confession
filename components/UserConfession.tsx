import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import PrivateConfessionCard from './PrivateConfessionCard'
import { getAllConfessions } from '@/app/actions';

const UserConfession = async () => {
    let allConfessions = await getAllConfessions(1);

    if (!allConfessions || allConfessions.length === 0) {
        return (
            <div>
                <p className='text-center text-muted-foreground'>
                    No confessions have been made yet. Copy your confession link and share it with your friends to see their confessions here.
                </p>
            </div>
        )
    }

    // only get the last 10 confessions
    allConfessions = allConfessions.slice(0, 6);


    return (
        <Carousel className=''>
            <CarouselPrevious />
            <CarouselContent>
                {allConfessions.map((confession) => (
                    <CarouselItem key={confession.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <PrivateConfessionCard
                            id={confession.id}
                            content={confession.content}
                            from={confession.from?.name as string}
                            createdAt={confession.createdAt}
                            likes={confession.likes}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
        </Carousel>
    )
}

export default UserConfession