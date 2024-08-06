import type { Meta, StoryObj } from '@storybook/react'
import { Claim } from 'components/Claim'

import { ClaimStatus } from './ClaimStatus'

// Setup meta for the Storybook
const meta: Meta = {
  title: 'Components/Claim/ClaimStatus',
  component: ClaimStatus,
}

export default meta

type Story = StoryObj<typeof ClaimStatus>

export const BasicUsage: Story = {
  args: {
    claimsFor: 2,
    claimsAgainst: 1,
    claimsForValue: 10,
    claimsAgainstValue: 5,
  },
  render: (args) => (
    <ClaimStatus {...args} className="w-[800px]">
      <Claim
        subject={{ label: '0xintuition' }}
        predicate={{ label: 'is really' }}
        object={{ label: 'cool' }}
      />
    </ClaimStatus>
  ),
}
