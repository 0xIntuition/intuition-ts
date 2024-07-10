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
  title: 'Components/Form Elements/RadioGroup',
  component: RadioGroup,
}

export default meta

type Story = StoryObj<typeof RadioGroup>

const radioGroupData = [
  {
    id: 'minimum',
    value: 'minimum',
    displayValue: 'Minimum',
    displaySubValue: '+0.001 ETH',
  },
  {
    id: 'minimum',
    value: 'default',
    displayValue: 'Default',
    displaySubValue: '+0.01 ETH',
  },
  {
    id: 'minimum',
    value: 'strong',
    displayValue: 'Strong',
    displaySubValue: '+0.05 ETH',
  },
]

const numberOfRadioGroupItems = radioGroupData.length

export const BasicUsage: Story = {
  render: () => (
    <div className="w-[300px]">
      <RadioGroup defaultValue={radioGroupData[0].value}>
        {radioGroupData.map((item, index) => (
          <div key={index}>
            <RadioGroupItemContainer>
              <RadioGroupItemLabel
                htmlFor={item.id}
                value={item.displayValue}
                subValue={item.displaySubValue}
              />
              <RadioGroupItem value={item.value} id={item.id} />
            </RadioGroupItemContainer>
            {index + 1 < numberOfRadioGroupItems && <RadioGroupDivider />}
          </div>
        ))}
      </RadioGroup>
    </div>
  ),
}
