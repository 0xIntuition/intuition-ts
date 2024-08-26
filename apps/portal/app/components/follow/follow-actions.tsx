import { useState } from 'react'

import {
  Input,
  RadioGroup,
  RadioGroupDivider,
  RadioGroupItem,
  RadioGroupItemContainer,
  RadioGroupItemLabel,
} from '@0xintuition/1ui'

import ErrorList from '@components/error-list'
import { MIN_DEPOSIT } from '@consts/general'

interface FollowActionsProps {
  min_deposit?: string
  setVal: (val: string) => void
  showErrors: boolean
  setShowErrors: (show: boolean) => void
  validationErrors: string[]
  setValidationErrors: (errors: string[]) => void
}

export default function FollowActions({
  setVal,
  showErrors,
  setShowErrors,
  validationErrors,
  setValidationErrors,
}: FollowActionsProps) {
  const [customValue, setCustomValue] = useState('')
  const [selectedValue, setSelectedValue] = useState(MIN_DEPOSIT)

  const radioGroupData = [
    {
      id: MIN_DEPOSIT,
      value: 'Minimum',
      subValue: `+${MIN_DEPOSIT} ETH`,
    },
    { id: '0.001', value: 'Default', subValue: '+0.001 ETH' },
    { id: '0.01', value: 'Strong', subValue: '+0.01 ETH' },
  ]

  const numberOfRadioGroupItems = radioGroupData.length

  const handleValueChange = (value: string) => {
    setSelectedValue(value)
    if (value !== 'custom') {
      setVal(value)
    } else {
      setVal(customValue)
    }
    setShowErrors(false)
    setValidationErrors([])
  }

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomValue(value)
    if (selectedValue === 'custom') {
      e.preventDefault()
      let inputValue = e.target.value
      if (inputValue.startsWith('.')) {
        inputValue = `0${inputValue}`
      }
      const sanitizedValue = inputValue.replace(/[^0-9.]/g, '')
      if (sanitizedValue.split('.').length > 2) {
        return
      }
      setVal(sanitizedValue)
      setShowErrors(false)
      setValidationErrors([])
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <RadioGroup
        defaultValue={radioGroupData[0].id}
        value={selectedValue}
        onValueChange={handleValueChange}
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
        <RadioGroupDivider />
        <div key="custom">
          <RadioGroupItemContainer className="justify-between flex flex-row px-5 py-4">
            <div className="flex flex-row gap-1 items-center">
              <RadioGroupItemLabel htmlFor="custom" value="Custom" />
              <Input
                id="position"
                autoComplete="off"
                type="text"
                value={customValue}
                onChange={handleCustomInputChange}
                min={'0'}
                placeholder={'Enter a custom amount'}
                className="p-0 h-auto border-none bg-transparent text-sm w-full"
              />
            </div>
            <RadioGroupItem value="custom" id="custom" />
          </RadioGroupItemContainer>
        </div>
      </RadioGroup>
      <div className={`h-2 px-2 ${!showErrors && 'invisible'}`}>
        <ErrorList errors={validationErrors} />
      </div>
    </div>
  )
}
