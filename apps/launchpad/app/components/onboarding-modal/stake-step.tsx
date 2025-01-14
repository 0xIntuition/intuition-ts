import { Badge, Button, Icon, Text, TextVariant } from '@0xintuition/1ui'

import { ArrowBigDown, ArrowBigUp, Loader2 } from 'lucide-react'

import { StakeStepProps } from './types'

export function StakeStep({
  selectedTopic,
  ticks,
  val,
  walletBalance,
  onTicksChange,
  onStake,
  onBack,
  isLoading,
  validationErrors,
  showErrors,
  txState,
}: StakeStepProps) {
  return (
    <div className="flex flex-col gap-4 p-8">
      <Text variant="headline" className="text-center mb-8">
        Stake on {selectedTopic.triple?.subject.label}{' '}
        {selectedTopic.triple?.predicate.label}{' '}
        {selectedTopic.triple?.object.label}
      </Text>

      <div
        className={`flex w-full items-center gap-4 rounded-lg border transition-colors h-[72px] border-[#1A1A1A]`}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded bg-[#1A1A1A] flex-shrink-0 ml-1">
            {selectedTopic.image && (
              <img
                src={selectedTopic.image}
                alt={selectedTopic.name}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
          <Text variant="title">{selectedTopic.name}</Text>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2 justify-end">
            <Button
              variant="text"
              onClick={() => onTicksChange(Math.max(1, ticks - 1))}
              disabled={ticks <= 1 || isLoading}
            >
              <ArrowBigDown className="text-destructive fill-destructive" />
            </Button>
            <Text variant="title" className="w-8 text-center">
              {ticks}
            </Text>
            <Button
              variant="text"
              onClick={() => onTicksChange(ticks + 1)}
              disabled={isLoading}
            >
              <ArrowBigUp className="text-success fill-success" />
            </Button>
          </div>
        </div>
      </div>

      {showErrors && validationErrors.length > 0 && (
        <div className="flex flex-col gap-2">
          {validationErrors.map((error, index) => (
            <Text key={index} variant="body" className="text-destructive">
              {error}
            </Text>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="secondary" onClick={onBack} disabled={isLoading}>
          Back
        </Button>
        <div className="flex flex-row gap-2">
          <Badge className="flex items-center gap-1 px-2">
            <Icon name="wallet" className="h-4 w-4 text-secondary/50" />
            <Text
              variant={TextVariant.caption}
              className="text-nowrap text-secondary/50"
            >
              {(+walletBalance).toFixed(2)} ETH
            </Text>
          </Badge>
          <Button variant="primary" onClick={onStake} disabled={isLoading}>
            {isLoading || txState.status === 'transaction-pending' ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" /> Processing...
              </>
            ) : (
              `Stake ${val} ETH`
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
