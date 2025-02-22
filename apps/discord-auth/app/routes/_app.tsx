import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { getUser } from '@server/auth'
import { dehydrate, QueryClient } from '@tanstack/react-query'

export async function loader({ request }: LoaderFunctionArgs) {
  const queryClient = new QueryClient()
  const user = await getUser(request)

  return json({
    dehydratedState: dehydrate(queryClient),
    wallet: user?.wallet?.address.toLowerCase(),
  })
}

export default function AppLayout() {
  return <Outlet />
}
