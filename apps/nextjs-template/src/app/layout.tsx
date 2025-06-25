import type { Metadata } from 'next'

import { NEXT_PUBLIC_URL } from '../config'

import '@rainbow-me/rainbowkit/styles.css'

import dynamic from 'next/dynamic'

import './global.css'

const OnchainProviders = dynamic(
  () => import('src/components/OnchainProviders'),
  {
    ssr: true,
  },
)

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export const metadata: Metadata = {
  title: 'Intuition Systems',
  description: 'SDK Demo',
  openGraph: {
    title: 'Intuition Systems',
    description: 'SDK Demo',
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center">
        <OnchainProviders>{children}</OnchainProviders>
      </body>
    </html>
  )
}
