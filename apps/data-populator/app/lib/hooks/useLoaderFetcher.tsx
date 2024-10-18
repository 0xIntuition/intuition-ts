import { useEffect, useRef } from 'react'

import { useFetcher } from '@remix-run/react'

export function useLoaderFetcher<CreateLoaderData>(resourceUrl: string) {
  const loaderFetcher = useFetcher<CreateLoaderData>()
  const loaderFetcherRef = useRef(loaderFetcher.load)

  useEffect(() => {
    loaderFetcherRef.current = loaderFetcher.load
  }, [loaderFetcher.load])

  useEffect(() => {
    loaderFetcherRef.current(resourceUrl)
  }, [resourceUrl])

  return loaderFetcher
}
