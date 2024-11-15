import { Text } from '@0xintuition/1ui'
import {
  fetcher,
  GetAtomsDocument,
  GetAtomsQuery,
  GetAtomsQueryVariables,
  useGetAtomsQuery,
} from '@0xintuition/graphql'

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const limit = parseInt(url.searchParams.get('limit') || '10')
  const offset = parseInt(url.searchParams.get('offset') || '0')

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['GetAtoms', { limit, offset }],
    queryFn: () =>
      fetcher<GetAtomsQuery, GetAtomsQueryVariables>(GetAtomsDocument, {
        limit,
        offset,
      })(),
  })

  return json({
    dehydratedState: dehydrate(queryClient),
    initialParams: { limit, offset },
  })
}

export default function PlaygroundHydration() {
  const { initialParams } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()

  const limit = parseInt(
    searchParams.get('limit') || String(initialParams.limit),
  )
  const offset = parseInt(
    searchParams.get('offset') || String(initialParams.offset),
  )

  const { data: atomsData } = useGetAtomsQuery(
    { limit, offset },
    {
      queryKey: ['GetAtoms', { limit, offset }],
    },
  )

  return (
    <div className="space-y-4">
      <Text variant="h1">Playground Hydration Pagination</Text>
      <div className="flex gap-2">
        <button
          onClick={() => {
            const params = new URLSearchParams(searchParams)
            params.set('offset', String(Math.max(0, offset - limit)))
            setSearchParams(params)
          }}
          disabled={offset === 0}
        >
          Previous
        </button>
        <span>Page {offset / limit + 1}</span>
        <button
          onClick={() => {
            const params = new URLSearchParams(searchParams)
            params.set('offset', String(offset + limit))
            setSearchParams(params)
          }}
          disabled={!atomsData?.atoms_aggregate.nodes?.length}
        >
          Next
        </button>
      </div>

      <pre>
        {JSON.stringify(atomsData?.atoms_aggregate.nodes || [], null, 2)}
      </pre>
    </div>
  )
}
