"use client"
import { FC, ReactNode } from 'react';
import { Button } from './ui/button';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

interface GoogleSignInButtonProps { }
const GoogleSignInButton: FC<GoogleSignInButtonProps> = () => {
    const loginWithGoogle = async () => {
        await signIn('google', {
            callbackUrl: '/'
        })
    }

    return (
        <Button onClick={loginWithGoogle} className='w-full flex gap-2 bg-white text-black hover:bg-neutral-300'>
            <p>Sign up with Google</p>
            <Image src='/google.png' alt='google' width={20} height={20} />
        </Button>
    );
};

export default GoogleSignInButton;