import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import HydrationZustand from '@/templates/hydrationZustand'
import { Providers } from './providers'
import './globals.css'
import { APP_NAME } from '@/config/constants'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: APP_NAME,
  description: `Welcome to ${APP_NAME}`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <HydrationZustand>{children}</HydrationZustand>
        </Providers>
      </body>
    </html>
  )
}
