import { Button } from '@0xintuition/1ui'

import { formatUnits } from 'viem'

interface FollowActionsProps {
  action: string | undefined
  setVal: (val: string) => void
  walletBalance: string
  userConviction: string
  price: string
}

export default function FollowActions({
  action,
  setVal,
  walletBalance,
  userConviction,
  price,
}: FollowActionsProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-5">
      <Button
        variant="ghost"
        className={`${action === 'redeem' && 'hidden'}`}
        onClick={() => {
          setVal('0.0003')
        }}
      >
        <span className="text-xxs">Min</span>
      </Button>
      <Button
        variant="ghost"
        className={`${action === 'deposit' && 'hidden'}`}
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
