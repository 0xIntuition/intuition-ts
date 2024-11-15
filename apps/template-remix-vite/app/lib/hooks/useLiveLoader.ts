import { useEffect } from 'react'

import { useLoaderData, useRevalidator } from '@remix-run/react'
import { useEventSource } from 'remix-utils/sse/react'

export function useLiveLoader<T>(events: string[]) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const eventSources = events.map((event) => useEventSource(`/event/${event}`))

  const { revalidate } = useRevalidator()
  useEffect(() => {
    revalidate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, eventSources)

  return useLoaderData<T>()
}
