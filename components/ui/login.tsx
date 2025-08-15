"use client"

import { UserButton, SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { LogInIcon } from "lucide-react";

export function Login() {
    return (
        <>
            <Authenticated>
                <UserButton />
            </Authenticated>
            <Unauthenticated>
                <SignInButton mode="modal"><button className="cursor-pointer bg-blue-500 p-2 flex gap-4 w-64"><LogInIcon />Faça login para votar ou sugerir</button></SignInButton>
            </Unauthenticated>
        </>
    )
}