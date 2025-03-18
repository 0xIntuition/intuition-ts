import { Button, Text } from '@0xintuition/1ui'

import { formatUnits } from 'viem'

interface StakeActionsProps {
  action: string | undefined
  setVal: (val: string) => void
  minDeposit: string
  userAssets?: string
}

export default function StakeActions({
  action,
  setVal,
  minDeposit,
  userAssets,
}: StakeActionsProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-5">
      <Button
        variant="ghost"
        className={`${action === 'redeem' && 'hidden'}`}
        onClick={() => {
          setVal(minDeposit)
        }}
      >
        <Text variant="small">Min</Text>
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          if (userAssets) {
            setVal(formatUnits(BigInt(userAssets), 18))
          }
        }}
        className={`${action === 'deposit' && 'hidden'}`}
      >
        <Text variant="small">Max</Text>
      </Button>
    </div>
  )
}
