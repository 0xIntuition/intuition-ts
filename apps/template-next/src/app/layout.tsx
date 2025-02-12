import '@0xintuition/1ui/src/styles/globals.css'

import { Providers } from '@/components/providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Intuition Next.js Template',
  description: 'Next.js template for Intuition',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased dark">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
