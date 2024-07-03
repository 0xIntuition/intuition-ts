import {
  RadioGroup,
  RadioGroupDivider,
  RadioGroupItem,
  RadioGroupItemContainer,
  RadioGroupItemLabel,
} from '@0xintuition/1ui'

export default function FollowActions() {
  const radioGroupData = [
    { id: '0.001', value: 'Minimum', subValue: '+0.001 ETH' },
    { id: '0.01', value: 'Default', subValue: '+0.01 ETH' },
    { id: '0.05', value: 'Strong', subValue: '+0.05 ETH' },
  ]

  const numberOfRadioGroupItems = radioGroupData.length

  return (
    <div className="flex flex-row items-center justify-center gap-5">
      <RadioGroup defaultValue={radioGroupData[0].id}>
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
    </div>
  )
}
