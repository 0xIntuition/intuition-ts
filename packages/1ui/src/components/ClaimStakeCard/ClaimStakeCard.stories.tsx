import type { Meta, StoryObj } from '@storybook/react'

import { Currency } from '../../types'
import { ClaimStakeCard } from './ClaimStakeCard'

const meta: Meta<typeof ClaimStakeCard> = {
  title: 'Components/ClaimStakeCard',
  component: ClaimStakeCard,
  argTypes: {
    currency: {
      description: 'Currency type',
      options: Object.values(Currency),
      table: {
        type: { summary: 'string' },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof ClaimStakeCard>

export const BasicUsage: Story = {
  args: {
    currency: 'ETH',
    totalTVL: 4.928,
    tvlAgainst: 0.567,
    tvlFor: 3.643,
    amountAgainst: 39,
    amountFor: 124,
    disableAgainstBtn: false,
    disableForBtn: false,
    onAgainstBtnClick: () => console.log('Against button clicked!'),
    onForBtnClick: () => console.log('For button clicked!'),
  },
  render: (args) => <ClaimStakeCard {...args} />,
}
