import React from 'react'

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// This Providers component/config omits anything Privy and Wagmi related for now.
// We'll add them back in once we add Privy and Wagmi to the app.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Disable automatic refetching on window focus for SSR
      refetchOnWindowFocus: false,
    },
  },
})

export default function Providers({
  children,
  dehydratedState,
}: {
  children: React.ReactNode
  dehydratedState?: unknown
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  )
}
