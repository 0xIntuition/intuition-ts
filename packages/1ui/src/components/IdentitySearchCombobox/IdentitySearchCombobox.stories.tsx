import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import {
  IdentitySearchCombobox,
  IdentitySearchComboboxItem,
} from './IdentitySearchCombobox'

const meta: Meta<typeof IdentitySearchCombobox> = {
  title: 'Components/IdentitySearchCombobox',
  component: IdentitySearchCombobox,
  // eslint-disable-next-line
  // @ts-ignore
  subcomponents: { IdentitySearchComboboxItem },
}

export default meta

type Story = StoryObj<typeof IdentitySearchCombobox>

export const BasicUsage: Story = {
  render: () => (
    <IdentitySearchCombobox
      onCreateIdentityClick={() => console.log('Button clicked!')}
    >
      <IdentitySearchComboboxItem
        variant="non-user"
        name="mech"
        value={0.039}
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        socialCount={34}
        tagCount={34}
      />
      <IdentitySearchComboboxItem
        variant="non-user"
        name="mechanical"
        value={0.345}
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        socialCount={34}
        tagCount={34}
      />
      <IdentitySearchComboboxItem
        variant="non-user"
        name="mechanize"
        value={0.003}
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        socialCount={34}
        tagCount={34}
      />
      <IdentitySearchComboboxItem
        variant="non-user"
        name="mechanist"
        value={0.019}
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        socialCount={34}
        tagCount={34}
      />
    </IdentitySearchCombobox>
  ),
}

export const WithoutCreateIdentityButton: Story = {
  render: () => (
    <IdentitySearchCombobox>
      <IdentitySearchComboboxItem
        variant="non-user"
        name="mech"
        value={0.039}
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        socialCount={34}
        tagCount={34}
      />
      <IdentitySearchComboboxItem
        variant="non-user"
        name="mechanical"
        value={0.345}
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        socialCount={34}
        tagCount={34}
      />
      <IdentitySearchComboboxItem
        variant="non-user"
        name="mechanize"
        value={0.003}
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        socialCount={34}
        tagCount={34}
      />
      <IdentitySearchComboboxItem
        variant="non-user"
        name="mechanist"
        value={0.019}
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        socialCount={34}
        tagCount={34}
      />
    </IdentitySearchCombobox>
  ),
}
