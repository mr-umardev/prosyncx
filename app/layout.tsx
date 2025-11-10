import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ChatbotWidget } from "@/components/chatbot-widget"
import "./globals.css"

export const metadata: Metadata = {
  title: "ProSyncX - Project Collaboration Platform",
  description:
    "Streamline your team collaboration with ProSyncX - the ultimate platform for project management, communication, and academic integration.",
  generator: "ProSyncX",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/p4-9JeppgAJ06W7YNmAPTQVLiIUwTachA.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <ChatbotWidget />
        <Analytics />
      </body>
    </html>
  )
}
