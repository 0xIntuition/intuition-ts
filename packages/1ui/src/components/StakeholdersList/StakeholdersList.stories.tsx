import type { Meta, StoryObj } from '@storybook/react'

import { StakeholdersList } from './StakeholdersList'

const meta: Meta<typeof StakeholdersList> = {
  title: 'Components/StakeholdersList',
  component: StakeholdersList,
}

export default meta

type Story = StoryObj<typeof StakeholdersList>

export const BasicUsage: Story = {
  args: {
    stakeholders: [
      {
        name: 'John Doe',
        avatar: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
      },
      {
        name: 'Jane Smith',
        avatar: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
      },
    ],
  },
  render: (args) => (
    <div className="w-[600px]">
      <StakeholdersList {...args} />
    </div>
  ),
}

export const SingleStakeholder: Story = {
  args: {
    stakeholders: [
      {
        name: 'John Doe',
        avatar: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
      },
    ],
  },
}

export const MultipleStakeholders: Story = {
  args: {
    stakeholders: [
      {
        name: 'John Doe',
        avatar: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
      },
      {
        name: 'Jane Smith',
        avatar: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
      },
      {
        name: 'Bob Wilson',
        avatar: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
      },
    ],
  },
}
