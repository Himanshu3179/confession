'use client';

import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
});

const SignInForm = () => {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        setLoading(true)
        const signInData = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
        });

        if (signInData?.error) {
            toast({
                title: "Error",
                description: "Invalid email or password",
                variant: 'destructive'
            })
        }
        else {
            router.push('/')
            router.refresh()
        }
        setLoading(false)
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <div className='space-y-2'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='mail@example.com' {...field}
                                        className='bg-transparent/10'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type='password'
                                        placeholder='Enter your password'
                                        className='bg-transparent/10'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className='w-full mt-6' type='submit'
                    disabled={loading}
                >
                    {
                        loading ? 'Loading...' : 'Sign In'
                    }
                </Button>
            </form>
            <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                or
            </div>
            <GoogleSignInButton />
            <p className='text-center text-sm text-muted-foreground mt-4'>
                If you don&apos;t have an account, please&nbsp;
                <Link className='text-blue-500 hover:underline' href='/signup'>
                    Sign up
                </Link>
            </p>
        </Form>
    );
};

export default SignInForm;