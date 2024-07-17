import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { IdentityInput } from './IdentityInput'

const meta: Meta<typeof IdentityInput> = {
  title: 'Components/Identity/IdentityInput',
  component: IdentityInput,
}

export default meta

type Story = StoryObj<typeof IdentityInput>

export const BasicUsage: Story = {
  args: {
    showLabels: true,
    subject: {
      selectedValue: { name: 'Super Dave' },
    },
    predicate: {
      selectedValue: { name: 'is a', variant: 'non-user' },
    },
    object: {
      selectedValue: { name: 'daredevil', variant: 'non-user' },
    },
  },
  render: (args) => <IdentityInput {...args} />,
}

export const Other: Story = {
  render: () => (
    <IdentityInput
      subject={{
        placeholder: 'Select an identity',
        selectedValue: {},
        onClick: () => {
          console.log('subject clicked')
        },
      }}
      predicate={{
        placeholder: 'Select an identity',
        selectedValue: {},
        onClick: () => {
          console.log('predicate clicked')
        },
      }}
      object={{
        placeholder: 'Select an identity',
        selectedValue: {},
        onClick: () => {
          console.log('object clicked')
        },
      }}
    />
  ),
}
