import { Button } from '@0xintuition/1ui'

import { formatUnits } from 'viem'

interface StakeActionsProps {
  action: 'deposit' | 'redeem'
  setVal: (val: string) => void
  walletBalance: string
  userConviction: string
  price: string
}

export default function StakeActions({
  action,
  setVal,
  walletBalance,
  userConviction,
  price,
}: StakeActionsProps) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 items-center pb-5">
        <div className="flex flex-row items-center justify-end gap-1">
          <Button
            className={`flex flex-row items-center justify-start gap-1 rounded-full border bg-primary-50/[3%] px-2 py-0.5 text-primary-500 transition-colors duration-300 enabled:hover:border-primary-700 enabled:hover:bg-primary-800 enabled:hover:text-primary-300 disabled:opacity-50 ${
              action === 'redeem' && 'hidden'
            }`}
            onClick={() => {
              setVal('0.0003')
            }}
          >
            <span className="text-xxs">Min</span>
          </Button>
          <Button
            className="flex flex-row items-center justify-start gap-1 rounded-full border bg-primary-50/[3%] px-2 py-0.5 text-primary-500 transition-colors duration-300 enabled:hover:border-primary-700 enabled:hover:bg-primary-800 enabled:hover:text-primary-300 disabled:opacity-50"
            onClick={() => {
              if (action === 'deposit') {
                setVal(walletBalance)
              } else {
                const maxEth = (
                  +formatUnits(BigInt(userConviction), 18) *
                  +formatUnits(BigInt(price), 18)
                ).toString()
                setVal(maxEth)
              }
            }}
          >
            <span className="text-xxs">Max</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
