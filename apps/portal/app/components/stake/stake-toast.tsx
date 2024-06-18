import { cn, formatBalance } from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { ExternalLinkIcon } from 'lucide-react'

import UserConvictionIcon from '../svg/user-conviction-icon'

interface ToastProps {
  action: string
  assets: string
  conviction: string
  txHash: string
}
export default function StakeToast({
  action,
  assets,
  conviction,
  txHash,
}: ToastProps) {
  return (
    <div
      className={cn(
        'z-[999999] m-0 h-full w-full rounded-md border py-4 pl-4 pr-4',
        'border-primary-800 bg-primary-900',
      )}
    >
      <div className="flex h-full w-full items-center justify-start gap-4">
        <div className="flex flex-shrink-0">
          <UserConvictionIcon className="h-6 w-6 text-primary-foreground/50" />
        </div>
        <div className="flex w-full flex-1">
          <div className="space-y-0">
            <div className={cn('text-sm font-bold', 'text-primary-foreground')}>
              Transaction Successful
            </div>
            <div
              className={cn(
                'text-xs font-semibold',
                'text-primary-foreground/50',
              )}
            >
              {action}{' '}
              <span className="font-bold">
                {formatBalance(BigInt(conviction), 18, 6)}
              </span>{' '}
              {action === 'Deposited' ? 'ETH' : 'Conviction'} for{' '}
              <span className="font-bold">
                {formatBalance(BigInt(assets), 18, 6)}
              </span>{' '}
              {action !== 'Deposited' ? 'ETH' : 'Conviction'}
            </div>
            <div>
              <Link
                to={`https://optimism-sepolia.blockscout.com/tx/${txHash}`}
                target="_blank"
                className="flex flex-row items-center gap-1 text-xxs text-blue-500 transition-colors duration-300 hover:text-blue-400"
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
