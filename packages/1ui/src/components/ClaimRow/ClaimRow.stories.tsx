import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Claim } from '..'
import { ClaimRow } from './ClaimRow'

const meta: Meta<typeof ClaimRow> = {
  title: 'Components/ClaimRow',
  component: ClaimRow,
}

export default meta

type Story = StoryObj<typeof ClaimRow>

export const BasicUsage: Story = {
  args: {
    claimsFor: 736,
    claimsAgainst: 234,
    amount: 0.383,
  },
  render: (args) => (
    <div className="w-[600px]">
      <ClaimRow {...args}>
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
      </ClaimRow>
    </div>
  ),
}
