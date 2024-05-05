'use client'

import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client';

export default function NavBar() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <div className="bg-gradient-to-r from-blue-950 to-blue-500 flex justify-between">
            <div className="">
                <p className="text-xl font-bold font-mono m-2 text-slate-300">Pet Adoption Co.</p>
            </div>
            <div className="flex">
                <Link className="no-underline m-2 text-slate-950" href="/pets">Home</Link>

                {user &&
                    <>
                        <Link className="no-underline m-2 text-slate-950" href="/user/dashboard">Dashboard</Link>
                        <Link className="no-underline m-2 text-slate-950" href="/api/auth/logout">Logout</Link>
                    </> 
                }

                {!user &&
                    <Link className="no-underline m-2 text-slate-950" href="/api/auth/login">Login</Link>
                }
            </div>
        </div>
    )
}