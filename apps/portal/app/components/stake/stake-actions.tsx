import { Button, Text } from '@0xintuition/1ui'

import { formatUnits } from 'viem'

interface StakeActionsProps {
  action: string | undefined
  setVal: (val: string) => void
  minDeposit: string
  userConviction?: string
  price?: string
}

export default function StakeActions({
  action,
  setVal,
  minDeposit,
  userConviction,
  price,
}: StakeActionsProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-5">
      <Button
        variant="ghost"
        className={`${action === 'redeem' && 'hidden'}`}
        onClick={() => {
          setVal(formatUnits(BigInt(minDeposit), 18))
        }}
      >
        <Text variant="small">Min</Text>
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          if (userConviction && price) {
            const userConvictionValue = BigInt(userConviction)
            const priceValue = BigInt(price)
            const maxEthInWei = userConvictionValue * priceValue
            const maxEth = formatUnits(maxEthInWei, 36)
            setVal(maxEth)
          }
        }}
        className={`${action === 'deposit' && 'hidden'}`}
      >
        <Text variant="small">Max</Text>
      </Button>
    </div>
  )
}
