import { MULTIVAULT_CONTRACT_ADDRESS } from '@consts/general'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { getUser } from '@server/auth'
import { getMultiVaultConfig } from '@server/multivault'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { WalletSync } from '../.client/wallet-sync'
import { AppShell } from '../components/layouts/app-shell'

export async function loader({ request }: LoaderFunctionArgs) {
  const queryClient = new QueryClient()
  const user = await getUser(request)

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
    wallet: user?.wallet?.address.toLowerCase(),
  })
}

export default function AppLayout() {
  return (
    <AppShell>
      <WalletSync />
      <Outlet />
    </AppShell>
  )
}
