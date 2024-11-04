import type { Meta, StoryObj } from '@storybook/react'
import { Claim } from 'components/Claim'
import { ClaimPosition } from 'types'

import { ClaimRow } from './ClaimRow'

const meta: Meta<typeof ClaimRow> = {
  title: 'Components/Claim/ClaimRow',
  component: ClaimRow,
  parameters: {
    docs: {
      description: {
        component: 'Displays a claim with TVL and stake actions.',
      },
    },
    controls: {
      exclude: ['className', 'style'],
    },
  },
  argTypes: {
    numPositionsFor: {
      description: 'Number of positions for the claim',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '69' },
      },
      control: 'number',
    },
    numPositionsAgainst: {
      description: 'Number of positions against the claim',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '42' },
      },
      control: 'number',
    },
    totalTVL: {
      description: 'Total TVL amount',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '420.69' },
      },
      control: 'number',
    },
    tvlFor: {
      description: 'TVL amount for the "For" positions',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '240.69' },
      },
      control: 'number',
    },
    currency: {
      description: 'The currency symbol',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'ETH' },
      },
      control: 'text',
    },
    userPosition: {
      description: 'Amount staked by the user',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3.19' },
      },
      control: 'number',
    },
    positionDirection: {
      description: 'Direction of the user position',
      table: {
        type: { summary: 'ClaimPosition' },
        defaultValue: { summary: 'claimFor' },
      },
      control: 'select',
      options: Object.values(ClaimPosition),
    },
  },
}

export default meta

type Story = StoryObj<typeof ClaimRow>

export const BasicUsage: Story = {
  args: {
    numPositionsFor: 69,
    numPositionsAgainst: 42,
    totalTVL: '420.69',
    tvlFor: '240.69',
    currency: 'ETH',
    onStakeForClick: () => console.log('Clicked!'),
    onStakeAgainstClick: () => console.log('Clicked!'),
  },
  render: (args) => (
    <div className="w-[800px]">
      <ClaimRow {...args}>
        <Claim
          subject={{ variant: 'non-user', label: '0xintuition' }}
          predicate={{ variant: 'non-user', label: 'is really' }}
          object={{ variant: 'non-user', label: 'cool' }}
        />
      </ClaimRow>
    </div>
  ),
}

export const WithUserPosition: Story = {
  args: {
    ...BasicUsage.args,
    userPosition: '3.19',
    positionDirection: ClaimPosition.claimFor,
  },
  render: BasicUsage.render,
}
