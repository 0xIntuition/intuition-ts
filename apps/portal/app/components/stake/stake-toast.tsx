import { Icon, Text } from '@0xintuition/1ui'

import { cn, formatBalance } from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { BLOCK_EXPLORER_URL } from 'app/consts'

interface ToastProps {
  action: string
  assets: string
  txHash: string
}
export default function StakeToast({ action, assets, txHash }: ToastProps) {
  return (
    <div
      className={cn(
        'z-[999999] m-0 h-full w-[300px] rounded-md theme-border py-4 pl-4 pr-4 bg-background',
      )}
    >
      <div className="flex h-full w-full items-center justify-start gap-4">
        <div className="flex flex-shrink-0">
          <Icon name="circle-check" className="h-6 w-6 text-success" />
        </div>
        <div className="flex w-full flex-1">
          <div className="space-y-0">
            <Text variant="base" weight="bold">
              Transaction Successful
            </Text>
            <Text
              variant="footnote"
              weight="semibold"
              className="text-secondary-foreground inline-flex gap-1"
            >
              {action}{' '}
              <span className="text-sm font-bold">
                {formatBalance(BigInt(assets), 18, 6)}
              </span>{' '}
              ETH
            </Text>
            <div>
              <Link
                to={`${BLOCK_EXPLORER_URL}/tx/${txHash}`}
                target="_blank"
                className="flex flex-row items-center gap-1 text-xs text-blue-500 transition-colors duration-300 hover:text-blue-400"
              >
                View on Explorer{' '}
                <Icon name="square-arrow-top-right" className="h-2.5 w-2.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
