/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@0xintuition/1ui'

import { usePollRequestDetails } from '@lib/hooks/usePollRequestDetails'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'

import { ScrollArea } from './ui/scroll-area'

interface ProgressModalProps {
  isOpen: boolean
  onClose: () => void
  requestHash: string
  step:
    | 'idle'
    | 'initiating'
    | 'publishing'
    | 'sending'
    | 'logging'
    | 'verifying'
    | 'complete'
    | 'error'
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
  step,
}: ProgressModalProps) {
  // TODO: going to need this to handle UI on transaction stages anyway
  console.log('step', step)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const { requestData } = usePollRequestDetails({
    requestHash,
    active: isOpen,
  })

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
          <DialogTitle>Operation in Progress</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh]" ref={scrollAreaRef}>
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

              <div className="pr-4">
                {requestData &&
                  requestData.updates.map((update: string, index: number) => (
                    <div
                      key={index}
                      className="mb-2 break-words text-gray-700 overflow-hidden text-ellipsis"
                    >
                      {update}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
