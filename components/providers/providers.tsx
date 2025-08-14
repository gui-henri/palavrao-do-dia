import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'
import ConvexClientProvider from './convexClientProvider'
import { ThemeProvider } from './theme-provider'
import { shadcn } from '@clerk/themes'

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider appearance={{ theme: shadcn }}>
            <ConvexClientProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme='dark'
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </ConvexClientProvider>
        </ClerkProvider>
    )
}