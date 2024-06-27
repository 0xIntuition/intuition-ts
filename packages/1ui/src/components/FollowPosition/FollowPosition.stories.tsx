import type { Meta, StoryObj } from '@storybook/react'

import { FollowPosition } from './FollowPosition'

const meta: Meta<typeof FollowPosition> = {
  title: 'Components/FollowPosition',
  component: FollowPosition,
}

export default meta

type Story = StoryObj<typeof FollowPosition>

// Example story for the default state
export const BasicUsage: Story = {
  args: {
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
      <FollowPosition {...args}></FollowPosition>
    </div>
  ),
}
