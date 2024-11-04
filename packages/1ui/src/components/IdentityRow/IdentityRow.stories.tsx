import type { Meta, StoryObj } from '@storybook/react'
import { Identity } from 'types'

import { IdentityRow } from './IdentityRow'

const meta: Meta<typeof IdentityRow> = {
  title: 'Components/Identity/IdentityRow',
  component: IdentityRow,
  parameters: {
    docs: {
      description: {
        component: 'Displays identity information with TVL and stake actions.',
      },
    },
    controls: {
      exclude: ['className', 'style'],
    },
  },
  argTypes: {
    variant: {
      description: 'Type of identity',
      options: Object.values(Identity),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'user' },
      },
      control: 'select',
    },
    totalTVL: {
      description: 'Total TVL amount',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '420.69' },
      },
      control: 'number',
    },
    numPositions: {
      description: 'Number of positions',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '69' },
      },
      control: 'number',
    },
    userPosition: {
      description: 'Amount staked by the user',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3.19' },
      },
      control: 'number',
    },
  },
}

export default meta

type Story = StoryObj<typeof IdentityRow>

export const BasicUsage: Story = {
  args: {
    variant: Identity.user,
    totalTVL: '420.69',
    currency: 'ETH',
    name: 'John Doe',
    avatarSrc: 'https://avatars.githubusercontent.com/u/1?v=4',
    link: '/identity/1',
    numPositions: 69,
    onStakeClick: () => console.log('Clicked!'),
  },
  render: (args) => (
    <div className="w-[800px]">
      <IdentityRow {...args} />
    </div>
  ),
}

export const WithUserPosition: Story = {
  args: {
    ...BasicUsage.args,
    userPosition: '3.19',
  },
  render: BasicUsage.render,
}
