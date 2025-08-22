import React from "react";

export default function PageTitle({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="scroll-m-20 text-center text-4xl lg:text-6xl font-extrabold tracking-tight text-balance mb-8 mt-8">{children}</h1>
    )
}