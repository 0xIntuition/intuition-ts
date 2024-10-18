import { useEffect, useRef, useState } from 'react'

import { RequestData } from '@lib/services/request'
import { useFetcher } from '@remix-run/react'

export function usePollRequestDetails({
  requestHash = null,
  active = false,
}: {
  requestHash: string | null
  active: boolean
}) {
  const [requestData, setRequestData] = useState<RequestData | null>(null)
  const fetcher = useFetcher<{ result: RequestData }>()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const isLoading =
    fetcher.state === 'loading' || fetcher.state === 'submitting'

  useEffect(() => {
    if (active && requestHash) {
      const fetchData = () => {
        fetcher.load(
          `/api/csv-editor?action=getRequestUpdate&requestHash=${requestHash}`,
        )
      }

      fetchData() // Fetch immediately when opened
      intervalRef.current = setInterval(() => {
        if (
          requestData?.status === 'fulfilled' ||
          requestData?.status === 'failed'
        ) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
        } else {
          fetchData()
        }
      }, 1000)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [active, requestHash, requestData?.status])

  useEffect(() => {
    if (fetcher.data?.result) {
      setRequestData(fetcher.data.result as RequestData)
    }
  }, [fetcher.data])

  return { requestData, isLoading }
}
