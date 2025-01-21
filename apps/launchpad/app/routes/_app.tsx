import { MULTIVAULT_CONTRACT_ADDRESS } from '@consts/general'
import { json } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { getMultiVaultConfig } from '@server/multivault'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { AppShell } from '../components/layouts/app-shell'

export async function loader() {
  const queryClient = new QueryClient()

  try {
    // await queryClient.prefetchQuery({
    //   queryKey: ['get-protocol-stats'],
    //   queryFn: () =>
    //     fetcher<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, {}),
    // })

    await queryClient.prefetchQuery({
      queryKey: ['get-multivault-config'],
      queryFn: () => getMultiVaultConfig(MULTIVAULT_CONTRACT_ADDRESS),
    })
  } catch (error) {
    console.error('Error prefetching data:', error)
  }

  return json({
    dehydratedState: dehydrate(queryClient),
  })
}

export default function AppLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
