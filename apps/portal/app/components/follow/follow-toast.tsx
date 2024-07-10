import CheckCircleIcon from '@components/svg/check-circle-icon'
import { cn, formatBalance } from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { ExternalLinkIcon } from 'lucide-react'

import { BLOCK_EXPLORER_URL } from '@lib/utils/constants';

interface ToastProps {
  action: string
  assets: string
  txHash: string
}
export default function FollowToast({ action, assets, txHash }: ToastProps) {
  return (
    <div
      className={cn(
        'z-[999999] m-0 h-full w-[300px] bg-background-primary border rounded-md border-primary/30 py-4 pl-4 pr-4',
      )}
    >
      <div className="flex h-full w-full items-center justify-start gap-4">
        <div className="flex flex-shrink-0">
          <CheckCircleIcon className="h-6 w-6 text-success" />
        </div>
        <div className="flex w-full flex-1">
          <div className="space-y-0">
            <div className={cn('text-sm font-bold', 'text-accent-foreground')}>
              Transaction Successful
            </div>
            <div
              className={cn(
                'text-xs font-semibold',
                'text-accent-foreground/50',
              )}
            >
              {action}{' '}
              <span className="font-bold">
                {formatBalance(BigInt(assets), 18, 6)}
              </span>{' '}
              ETH
            </div>
            <div>
              <Link
                to={`${BLOCK_EXPLORER_URL}/tx/${txHash}`}
                target="_blank"
                className="flex flex-row items-center gap-1 text-xs text-blue-500 transition-colors duration-300 hover:text-blue-400"
              >
                View on Explorer <ExternalLinkIcon className="h-2.5 w-2.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
