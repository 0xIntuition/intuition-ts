import { useEffect, useState } from 'react'

import { Input, Text } from '@0xintuition/1ui'
import {
  fetcher,
  GetAtomsDocument,
  useGetAtomsQuery,
} from '@0xintuition/graphql'

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

// Simple debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const search = url.searchParams.get('search') || ''

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['get-atoms-query', { search }],
    queryFn: () =>
      fetcher(GetAtomsDocument, {
        where: search
          ? {
              _or: [{ label: { _ilike: `%${search}%` } }],
            }
          : undefined,
      })(),
  })

  return json({
    dehydratedState: dehydrate(queryClient),
    initialSearch: search,
  })
}

export default function PlaygroundHydration() {
  const { dehydratedState, initialSearch } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState(
    searchParams.get('search') || initialSearch,
  )
  const debouncedSearch = useDebounce(inputValue, 300) // 300ms delay

  // Update URL params when debounced search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set('search', debouncedSearch)
    setSearchParams(params)
  }, [debouncedSearch, setSearchParams])

  const { data: atomsData } = useGetAtomsQuery(
    {
      where: debouncedSearch
        ? {
            _or: [{ label: { _ilike: `%${debouncedSearch}%` } }],
          }
        : undefined,
    },
    {
      queryKey: ['get-atoms-query', { search: debouncedSearch }],
    },
  )

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="space-y-4">
        <Text variant="h1">Playground Hydration</Text>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search atoms by label or description..."
        />

        <pre>
          {JSON.stringify(atomsData?.atoms_aggregate.nodes || [], null, 2)}
        </pre>
      </div>
    </HydrationBoundary>
  )
}
