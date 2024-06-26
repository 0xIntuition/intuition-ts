import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import {
  IdentitySearchCombobox,
  IdentitySearchComboboxItem,
} from './IdentitySearchCombobox'

const meta: Meta<typeof IdentitySearchCombobox> = {
  title: 'Components/IdentitySearchCombobox',
  component: IdentitySearchCombobox,
}

export default meta

type Story = StoryObj<typeof IdentitySearchCombobox>

export const BasicUsage: Story = {
  args: {},
  render: (args) => (
    <IdentitySearchCombobox {...args}>
      <IdentitySearchComboboxItem value="1" />
      <IdentitySearchComboboxItem value="2" />
      <IdentitySearchComboboxItem value="3" />
    </IdentitySearchCombobox>
  ),
}
