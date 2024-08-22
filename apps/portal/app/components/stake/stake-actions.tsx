import { Button, Text } from '@0xintuition/1ui'

import { formatUnits } from 'viem'

interface StakeActionsProps {
  action: string | undefined
  setVal: (val: string) => void
  walletBalance: string
  minDeposit: string
  userConviction?: string
  price?: string
}

export default function StakeActions({
  action,
  setVal,
  walletBalance,
  minDeposit,
  userConviction,
  price,
}: StakeActionsProps) {
  const formatDecimal = (value: number): string => {
    return value.toLocaleString('fullwide', {
      useGrouping: false,
      minimumFractionDigits: 0,
      maximumFractionDigits: 18,
    })
  }

  const calculateAndSetValue = (percentage: number) => {
    if (action === 'deposit') {
      const value = +walletBalance * percentage
      setVal(formatDecimal(value))
    } else if (userConviction && price) {
      const maxEth =
        +formatUnits(BigInt(userConviction), 18) *
        +formatUnits(BigInt(price), 18)
      const value = maxEth * percentage
      setVal(formatDecimal(value))
    }
  }

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
        className={`${action === 'deposit' && 'hidden'}`}
        onClick={() => calculateAndSetValue(0.05)}
      >
        <Text variant="small">5%</Text>
      </Button>
      <Button variant="ghost" onClick={() => calculateAndSetValue(0.1)}>
        <Text variant="small">10%</Text>
      </Button>
      <Button variant="ghost" onClick={() => calculateAndSetValue(0.5)}>
        <Text variant="small">50%</Text>
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          if (action === 'deposit') {
            setVal(walletBalance)
          } else if (userConviction && price) {
            const maxEth =
              +formatUnits(BigInt(userConviction), 18) *
              +formatUnits(BigInt(price), 18)
            setVal(formatDecimal(maxEth))
          }
        }}
      >
        <Text variant="small">Max</Text>
      </Button>
    </div>
  )
}
