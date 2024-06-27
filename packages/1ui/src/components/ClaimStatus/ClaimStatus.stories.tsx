import type { Meta, StoryObj } from '@storybook/react'
import { Claim } from 'components/Claim'

import { ClaimStatus } from './ClaimStatus'

// Setup meta for the Storybook
const meta: Meta = {
  title: 'Components/Dataset/ClaimStatus',
  component: ClaimStatus,
}

export default meta

type Story = StoryObj<typeof ClaimStatus>

export const BasicUsage: Story = {
  args: {
    claimsFor: 10,
    claimsAgainst: 5,
  },
  render: (args) => (
    <ClaimStatus {...args} className="w-[800px]">
      <Claim
        size="sm"
        subject={{ label: '0xintuition' }}
        predicate={{ label: 'is really' }}
        object={{ label: 'cool' }}
      />
    </ClaimStatus>
  ),
}
