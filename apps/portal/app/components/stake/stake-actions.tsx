import { Button, Text } from '@0xintuition/1ui'

import { formatUnits } from 'viem'

interface StakeActionsProps {
  action: string | undefined
  setVal: (val: string) => void
  minDeposit: string
  userConviction?: string
  price?: string
  disabled?: boolean
}

export default function StakeActions({
  action,
  setVal,
  minDeposit,
  userConviction,
  price,
  disabled,
}: StakeActionsProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-5">
      <Button
        variant="ghost"
        className={`${action === 'redeem' && 'hidden'} ${disabled && 'opacity-50'}`}
        onClick={() => {
          setVal(formatUnits(BigInt(minDeposit), 18))
        }}
        disabled={disabled}
      >
        <Text variant="small">Min</Text>
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          if (userConviction && price) {
            const userConvictionValue = formatUnits(BigInt(userConviction), 18)
            const priceValue = formatUnits(BigInt(price), 18)
            const maxEth = +userConvictionValue * +priceValue
            setVal(maxEth.toString())
          }
        }}
        className={`${action === 'deposit' && 'hidden'} ${disabled && 'opacity-50'}`}
        disabled={disabled}
      >
        <Text variant="small">Max</Text>
      </Button>
    </div>
  )
}
