/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@0xintuition/1ui'

import { useFetcher } from '@remix-run/react'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'

// import { ScrollArea } from '../components/ui/scroll-area'

interface ProgressModalProps {
  isOpen: boolean
  onClose: () => void
  requestHash: string
}

interface RequestData {
  hash: string
  sender: string
  status: 'pending' | 'processing' | 'fulfilled' | 'failed'
  type: 'createAtoms' | 'createTriples'
  created_at: string
  updated_at: string
  data: any
  updates: string[]
}

export function ProgressModal({
  isOpen,
  onClose,
  requestHash,
}: ProgressModalProps) {
  const [requestData, setRequestData] = useState<RequestData | null>(null)
  const fetcher = useFetcher<{ result: RequestData }>()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isOpen && requestHash) {
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
  }, [isOpen, requestHash, requestData?.status])

  useEffect(() => {
    if (fetcher.data?.result) {
      setRequestData(fetcher.data.result as RequestData)
    }
  }, [fetcher.data])

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]',
      ) as HTMLElement
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [requestData?.updates])

  const getStatusIcon = (status: RequestData['status']) => {
    switch (status) {
      case 'fulfilled':
        return <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
      case 'failed':
        return <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
      default:
        return (
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin flex-shrink-0" />
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] w-full">
        <DialogHeader>
          <DialogTitle>Operation Progress</DialogTitle>
        </DialogHeader>
        {requestData && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{requestData.type}</span>
              <div className="flex-shrink-0 w-6">
                {getStatusIcon(requestData.status)}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Status:{' '}
              <span className="font-semibold">{requestData.status}</span>
            </div>
            {/* <ScrollArea
              className="h-[300px] w-full rounded-md border p-4"
              ref={scrollAreaRef}
            > */}
            <div className="pr-4">
              {requestData.updates.map((update, index) => (
                <div key={index} className="mb-2 break-words text-gray-700">
                  {update}
                </div>
              ))}
            </div>
            {/* </ScrollArea> */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
