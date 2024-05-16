import { type Toast } from '@server/toast'
import { BLOCK_EXPLORER_URL } from '@lib/utils/constants'
import { cn } from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { ExternalLinkIcon } from 'lucide-react'
import { useEffect } from 'react'
import { Toaster, toast as showToast } from 'sonner'

export function MemekekToaster({ toast }: { toast?: Toast | null }) {
  return (
    <>
      <Toaster
        closeButton
        position="bottom-right"
        className="flex"
        theme="light"
        offset={32}
      />
      {toast ? <ShowToast toast={toast} /> : null}
    </>
  )
}

function ShowToast({ toast }: { toast: Toast }) {
  const { id, type, title, description } = toast

  useEffect(() => {
    setTimeout(() => {
      showToast[type](title, { id, description })
    }, 0)
  }, [description, id, title, type])

  return null
}

interface ToastProps {
  icon: React.ReactNode
  title: string
  description: string | React.ReactNode
  txHash?: string
}

export default function Toast({
  icon,
  title,
  description,
  txHash,
}: ToastProps) {
  return (
    <div
      className={cn(
        'z-[999999] m-0 h-full w-full rounded-md border py-4 pl-4 pr-4',
        'border-primary-800 bg-white',
      )}
    >
      <div className="flex h-full w-full items-center justify-start gap-4">
        <div className="flex flex-shrink-0">{icon}</div>
        <div className="flex w-full flex-1">
          <div className="space-y-0">
            <div className={cn('text-sm font-bold', 'text-primary-foreground')}>
              {title}
            </div>
            <div
              className={cn(
                'text-xs font-semibold',
                'text-primary-foreground/50',
              )}
            >
              {description}
            </div>
            {txHash && (
              <Link
                to={`${BLOCK_EXPLORER_URL}/tx/${txHash}`}
                target="_blank"
                className="flex flex-row items-center gap-1 text-xs text-blue-500 transition-colors duration-300 hover:text-blue-400"
              >
                View on Explorer <ExternalLinkIcon className="h-2.5 w-2.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
