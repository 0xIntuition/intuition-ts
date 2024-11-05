import {
  fetcher,
  GetAtomsDocument,
  GetAtomsQuery,
  GetAtomsQueryVariables,
  useGetAtomsQuery,
} from '@0xintuition/graphql'

import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export async function loader() {
  const queryClient = new QueryClient()

  console.log('🟡 Server: Starting prefetch')
  await queryClient.prefetchQuery({
    queryKey: ['get-atoms-query'],
    queryFn: () =>
      fetcher<GetAtomsQuery, GetAtomsQueryVariables>(GetAtomsDocument, {})(),
  })
  console.log('🟢 Server: Prefetch complete')

  return json({
    dehydratedState: dehydrate(queryClient),
  })
}

function Atoms() {
  const { data: atomsData } = useGetAtomsQuery(
    {},
    {
      queryKey: ['get-atoms-query'],
    },
  )

  return (
    <div>
      <h1>Playground Hydration</h1>
      <pre>{JSON.stringify(atomsData?.atoms || [], null, 2)}</pre>
    </div>
  )
}

export default function PlaygroundHydration() {
  console.log('🔵 Client: Component rendering')
  const { dehydratedState } = useLoaderData<typeof loader>()

  return (
    <HydrationBoundary state={dehydratedState}>
      <Atoms />
    </HydrationBoundary>
  )
}
