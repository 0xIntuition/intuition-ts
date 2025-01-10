import { FormEvent, useState } from 'react'

import { Button, Input, Label } from '@0xintuition/1ui'

export function StakeEthForm({
  onStake,
  currentStake,
}: {
  onStake: (amount: number) => void
  currentStake: number
}) {
  const [stakeAmount, setStakeAmount] = useState(currentStake.toString())

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onStake(parseFloat(stakeAmount))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="stakeAmount">ETH to Stake</Label>
        <Input
          id="stakeAmount"
          type="number"
          step="0.01"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Stake ETH</Button>
    </form>
  )
}
