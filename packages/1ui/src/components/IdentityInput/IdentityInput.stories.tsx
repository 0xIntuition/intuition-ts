import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { IdentityInput } from './IdentityInput'

const meta: Meta<typeof IdentityInput> = {
  title: 'Components/IdentityInput',
  component: IdentityInput,
}

export default meta

type Story = StoryObj<typeof IdentityInput>

export const BasicUsage: Story = {
  render: () => (
    <IdentityInput
      showLabels
      primary={{
        selectedValue: { name: 'Super Dave' },
      }}
      secondary={{
        selectedValue: { name: 'is a', variant: 'non-user' },
      }}
      tertiary={{
        selectedValue: { name: 'daredevil', variant: 'non-user' },
      }}
    />
  ),
}

export const Other: Story = {
  render: () => (
    <IdentityInput
      primary={{
        placeholder: 'Select an identity',
        selectedValue: {},
      }}
      secondary={{
        placeholder: 'Select an identity',
        selectedValue: {},
      }}
      tertiary={{
        placeholder: 'Select an identity',
        selectedValue: {},
      }}
    />
  ),
}
