import ConfessionCard from "@/components/ConfessionCard";
import CopyConfessionLink from "@/components/CopyConfessionLink";
import PrivateConfessionCard from "@/components/PrivateConfessionCard";
import SiteStats from "@/components/SiteStats";
import TopConfessions from "@/components/TopConfessions";
import UserConfession from "@/components/UserConfession";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { getAllConfessions, getConfessionLink, getTotalConfessions } from "@/app/actions";
import Link from "next/link";


export default async function Home() {
  const confessionLink = await getConfessionLink();
  const totalCOnfession = await getTotalConfessions()


  if (!confessionLink) return (
    <div className="h-full w-full flex items-center justify-center pb-20">
      <div className="flex flex-col items-center justify-center gap-5">
        <Image src="/confession.png" width={300} height={300} alt="confession image" />
        <p className="text-rose-500 text-4xl font-serif">Confess</p>
        <p className="text-muted-foreground text-center">Confess is a platform where you can confess anything you want anonymously. Click the button below to get started</p>
        <Link href="/signup"
          className={`${buttonVariants({ variant: 'default' })} px-16`}
        >Get Started</Link>

        <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400 text-muted-foreground'>
          or
        </div>
        <Link href="/public"
          className={`${buttonVariants({ variant: 'default' })} px-16 bg-blue-600 hover:bg-blue-500`}
        >See Public Confessions 🤭</Link>

      </div>
    </div>
  )

  return (
    <div className="h-full w-full py-10 lg:px-10 px-3 space-y-10">
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="text-sm text-muted-foreground text-center">
          This Is your confession link, share it with your friends
        </p>
        <CopyConfessionLink
          confessionLink={confessionLink}
        />
      </div>
      <div className="lg:px-10 px-5 space-y-5 ">
        <div className="flex justify-between
          items-center w-full
          md:flex-row flex-col
          gap-5
        ">
          <p className="font-serif text-4xl text-rose-500">Recent Confessions</p>
          {
            totalCOnfession > 0 &&
            <Link href="/allconfessions"
              className="text-blue-500 px-3 py-1 bg-secondary  rounded-full hover:underline
                ml-auto

              "
            >See all</Link>
          }
        </div>
        <UserConfession />
        
      </div>
      <div className="flex gap-5 w-full md:flex-row flex-col">
        <TopConfessions />
        <SiteStats />
      </div>
    </div>
  );
}
