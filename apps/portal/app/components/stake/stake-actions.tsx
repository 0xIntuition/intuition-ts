import { Button } from '@0xintuition/1ui'

import { formatUnits } from 'viem'

interface StakeActionsProps {
  action: string | undefined
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
    <div className="flex flex-row items-center justify-center gap-5">
      <Button
        variant="ghost"
        className={`flex flex-row items-center justify-start gap-1 border bg-primary-50/3 px-2 py-0.5 text-primary-500 transition-colors duration-300 enabled:hover:border-primary-700 enabled:hover:bg-primary-800 enabled:hover:text-primary-300 disabled:opacity-50 ${
          action === 'redeem' && 'hidden'
        }`}
        onClick={() => {
          setVal('0.0003')
        }}
      >
        <span className="text-xxs">Min</span>
      </Button>
      <Button
        variant="ghost"
        className={`flex flex-row items-center justify-start gap-1 border bg-primary-50/3 px-2 py-0.5 text-primary-500 transition-colors duration-300 enabled:hover:border-primary-700 enabled:hover:bg-primary-800 enabled:hover:text-primary-300 disabled:opacity-50 ${
          action === 'deposit' && 'hidden'
        }`}
        onClick={() => {
          const maxEth =
            +formatUnits(BigInt(userConviction), 18) *
            +formatUnits(BigInt(price), 18)
          setVal((maxEth * 0.05).toString())
        }}
      >
        <span className="text-xxs">5%</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-row items-center justify-start gap-1 border bg-primary-50/3 px-2 py-0.5 text-primary-500 transition-colors duration-300 enabled:hover:border-primary-700 enabled:hover:bg-primary-800 enabled:hover:text-primary-300 disabled:opacity-50"
        onClick={() => {
          if (action === 'deposit') {
            setVal((+walletBalance * 0.1).toString())
          } else {
            const maxEth =
              +formatUnits(BigInt(userConviction), 18) *
              +formatUnits(BigInt(price), 18)
            setVal((maxEth * 0.1).toString())
          }
        }}
      >
        <span className="text-xxs">10%</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-row items-center justify-start gap-1 border bg-primary-50/3 px-2 py-0.5 text-primary-500 transition-colors duration-300 enabled:hover:border-primary-700 enabled:hover:bg-primary-800 enabled:hover:text-primary-300 disabled:opacity-50"
        onClick={() => {
          if (action === 'deposit') {
            setVal((+walletBalance * 0.5).toString())
          } else {
            const maxEth =
              +formatUnits(BigInt(userConviction), 18) *
              +formatUnits(BigInt(price), 18)
            setVal((maxEth * 0.5).toString())
          }
        }}
      >
        <span className="text-xxs">50%</span>
      </Button>
      <Button
        variant="ghost"
        className="flex flex-row items-center justify-start gap-1 border bg-primary-50/3 px-2 py-0.5 text-primary-500 transition-colors duration-300 enabled:hover:border-primary-700 enabled:hover:bg-primary-800 enabled:hover:text-primary-300 disabled:opacity-50"
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
  )
}
