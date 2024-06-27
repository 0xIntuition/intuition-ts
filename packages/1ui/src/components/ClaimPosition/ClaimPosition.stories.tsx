import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Claim } from 'components'

import { ClaimPosition } from './ClaimPosition'

const meta: Meta<typeof ClaimPosition> = {
  title: 'Components/ClaimPosition',
  component: ClaimPosition,
}

export default meta

type Story = StoryObj<typeof ClaimPosition>

// Example story for the default state
export const UserVariant: Story = {
  args: {
    variant: 'user',
    position: 'claimFor',
    name: 'John Doe',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    avatarSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4"',
    amount: 1.21,
    feesAccrued: 0.005,
    updatedAt: '2021-10-01T16:00:00Z',
  },
  render: (args) => (
    <div className="w-[800px]">
      <ClaimPosition {...args}></ClaimPosition>
    </div>
  ),
}

export const IdentityVariant: Story = {
  args: {
    variant: 'claim',
    position: 'claimAgainst',
    claimsFor: 30,
    claimsAgainst: 70,
    amount: 1.21,
    feesAccrued: 0.005,
  },
  render: (args) => (
    <div className="w-[800px]">
      <ClaimPosition {...args}>
        <Claim
          size="sm"
          subject={{
            variant: 'non-user',
            label: '0xintuition',
          }}
          predicate={{
            variant: 'non-user',
            label: 'is really',
          }}
          object={{
            variant: 'non-user',
            label: 'cool',
          }}
        />
      </ClaimPosition>
    </div>
  ),
}
