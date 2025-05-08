import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Samooh - College Event Aggregator",
  description: "Discover, List, and Manage College Events such as hackathons, workshops, and tech talks.",
  icons: {
    icon: "/images/favicon.ico",
    apple: '/images/favicon.ico'
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <div className="">{children}</div>
        </SessionProvider>
      </body>
    </html>
  )
}
