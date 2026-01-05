import type React from "react"
import type { Metadata } from "next"
import { Itim } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GameProvider } from "@/contexts/GameContext"
import "./globals.css"

const itim = Itim({ 
  weight: "400",
  subsets: ["latin"] 
})

export const metadata: Metadata = {
  title: "Stardew Valley Editor",
  description: "Stardew Valley-Editor RPG menu interface with pixel-art aesthetics by nik",
  generator: "",
  icons: {
    icon: [
      {
        url: "/PlayerIcon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/PlayerIcon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/PlayerIcon.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/PlayerIcon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={itim.className} suppressHydrationWarning={true}>
        <GameProvider>{children}</GameProvider>
        <Analytics />
      </body>
    </html>
  )
}