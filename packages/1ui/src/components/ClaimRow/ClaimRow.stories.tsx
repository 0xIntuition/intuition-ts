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
    amountFor: '0.383 ETH',
  },
  render: (args) => (
    <div className="w-[600px]">
      <ClaimRow {...args}>
        <Claim
          size="sm"
          subject={{
            variant: 'default',
            label: '0xintuition',
          }}
          predicate={{ label: 'is really' }}
          object={{ label: 'cool' }}
        />
      </ClaimRow>
    </div>
  ),
}
