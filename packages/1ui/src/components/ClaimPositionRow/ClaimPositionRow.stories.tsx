import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Claim } from 'components'

import { ClaimPositionRow } from './ClaimPositionRow'

const meta: Meta<typeof ClaimPositionRow> = {
  title: 'Components/Claim/ClaimPositionRow',
  component: ClaimPositionRow,
}

export default meta

type Story = StoryObj<typeof ClaimPositionRow>

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
      <ClaimPositionRow {...args}></ClaimPositionRow>
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
      <ClaimPositionRow {...args}>
        <Claim
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
      </ClaimPositionRow>
    </div>
  ),
}
