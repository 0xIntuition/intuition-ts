import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import {
  RadioGroup,
  RadioGroupDivider,
  RadioGroupItem,
  RadioGroupItemContainer,
  RadioGroupItemLabel,
} from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
}

export default meta

type Story = StoryObj<typeof RadioGroup>

const radioGroupData = [
  { id: 'minimum', value: 'Minimum', subValue: '+0.001 ETH' },
  { id: 'default', value: 'Default', subValue: '+0.01 ETH' },
  { id: 'strong', value: 'Strong', subValue: '+0.05 ETH' },
]

const numberOfRadioGroupItems = radioGroupData.length

export const BasicUsage: Story = {
  render: () => (
    <div className="w-[300px]">
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
  ),
}
