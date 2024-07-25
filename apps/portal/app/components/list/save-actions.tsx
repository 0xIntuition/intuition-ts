import {
  RadioGroup,
  RadioGroupDivider,
  RadioGroupItem,
  RadioGroupItemContainer,
  RadioGroupItemLabel,
} from '@0xintuition/1ui'

import ErrorList from '@components/error-list'

interface SaveActions {
  setVal: (val: string) => void
  showErrors: boolean
  setShowErrors: (show: boolean) => void
  validationErrors: string[]
  setValidationErrors: (errors: string[]) => void
}

export default function SaveActions({
  setVal,
  showErrors,
  setShowErrors,
  validationErrors,
  setValidationErrors,
}: FollowActionsProps) {
  const radioGroupData = [
    { id: '0.001', value: 'Minimum', subValue: '+0.001 ETH' },
    { id: '0.01', value: 'Default', subValue: '+0.01 ETH' },
    { id: '0.05', value: 'Strong', subValue: '+0.05 ETH' },
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
