"use client"

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { RemainingVotes } from "./remaining-votes";
import { LogInIcon } from "lucide-react";

export function BottomIndicator() {
    return (
        <>
            <Authenticated>
                <div className="fixed bottom-6 left-[50%] translate-[-50%] rounded-full flex gap-2 border-2 border-black bg-neutral-50 text-neutral-950 shadow p-2 text-center items-center">
                    <UserButton appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }} />
                    <RemainingVotes />
                </div>
            </Authenticated>
            <Unauthenticated>
                <SignInButton mode="modal"><button className="fixed bottom-6 left-[50%] translate-[-50%] rounded-full border-2 border-black flex gap-4 text-neutral-950 bg-neutral-50 p-4 text-center cursor-pointer"><LogInIcon />Faça login</button></SignInButton>
            </Unauthenticated>
        </>
    )
}