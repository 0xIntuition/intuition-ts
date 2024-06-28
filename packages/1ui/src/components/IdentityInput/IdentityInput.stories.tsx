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
        defaultValue: 'Select an identity',
        selectedValue: { name: 'Super Dave' },
      }}
      secondary={{
        defaultValue: 'Select an identity',
        selectedValue: { name: 'Super Dave' },
      }}
      tertiary={{
        defaultValue: 'Select an identity',
        selectedValue: { name: 'Super Dave' },
      }}
    />
  ),
}

export const Other: Story = {
  render: () => (
    <IdentityInput
      primary={{
        defaultValue: 'Select an identity',
        selectedValue: {},
      }}
      secondary={{
        defaultValue: 'Select an identity',
        selectedValue: {},
      }}
      tertiary={{
        defaultValue: 'Select an identity',
        selectedValue: {},
      }}
    />
  ),
}
