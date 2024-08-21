import {
  RadioGroup,
  RadioGroupDivider,
  RadioGroupItem,
  RadioGroupItemContainer,
  RadioGroupItemLabel,
} from '@0xintuition/1ui'

import ErrorList from '@components/error-list'
import { formatUnits } from 'viem'

interface FollowActionsProps {
  min_deposit: string
  setVal: (val: string) => void
  showErrors: boolean
  setShowErrors: (show: boolean) => void
  validationErrors: string[]
  setValidationErrors: (errors: string[]) => void
}

export default function FollowActions({
  min_deposit,
  setVal,
  showErrors,
  setShowErrors,
  validationErrors,
  setValidationErrors,
}: FollowActionsProps) {
  const formattedMinDeposit = formatUnits(BigInt(min_deposit), 18)
  const radioGroupData = [
    {
      id: formattedMinDeposit,
      value: 'Minimum',
      subValue: `+${formattedMinDeposit} ETH`,
    },
    { id: '0.001', value: 'Default', subValue: '+0.001 ETH' },
    { id: '0.01', value: 'Strong', subValue: '+0.01 ETH' },
  ]

  const numberOfRadioGroupItems = radioGroupData.length

  return (
    <div className="flex flex-col items-center justify-center">
      <RadioGroup
        defaultValue={radioGroupData[0].id}
        onValueChange={setVal}
        onChange={(e) => {
          e.preventDefault()
          setShowErrors(false)
          setValidationErrors([])
        }}
      >
        {radioGroupData.map((item, index) => (
          <div key={index}>
            <RadioGroupItemContainer>
              <RadioGroupItemLabel
                htmlFor={item.id}
                value={item.value}
                subValue={item.subValue}
              />
              <RadioGroupItem value={item.id} id={item.id} />
            </RadioGroupItemContainer>
            {index + 1 < numberOfRadioGroupItems && <RadioGroupDivider />}
          </div>
        ))}
      </RadioGroup>
      <div className={`h-2 px-2 ${!showErrors && 'invisible'}`}>
        <ErrorList errors={validationErrors} />
      </div>
    </div>
  )
}
