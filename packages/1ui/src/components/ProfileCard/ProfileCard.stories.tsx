import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'components/Button'
import { Subject } from 'types'

import { ProfileCard, ProfileCardProps } from './ProfileCard'

const meta: Meta<typeof ProfileCard> = {
  title: 'Components/ProfileCard',
  component: ProfileCard,
  argTypes: {
    variant: {
      description: 'Variant of avatar',
      options: Object.values(Subject),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'user' },
      },
      control: 'select',
    },
    avatarSrc: {
      description: 'URL of the avatar image',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      description: 'Name of the user or entity',
      table: {
        type: { summary: 'string' },
      },
    },
    walletAddress: {
      description: 'Wallet address of the user or entity',
      table: {
        type: { summary: 'string' },
      },
    },
    stats: {
      description: 'Statistics related to the user or entity',
      table: {
        type: {
          summary:
            '{ numberOfFollowers: number, numberOfFollowing?: number, points?: number }',
        },
      },
    },
    link: {
      description: 'Link related to the entity (optional)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    bio: {
      description: 'Bio or description of the user or entity',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ProfileCard>

export const BasicUsage: Story = {
  args: {
    variant: 'user',
    avatarSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4"',
    name: 'John Doe',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    stats: {
      numberOfFollowers: 123,
      numberOfFollowing: 45,
      points: 671234,
    },
    bio: 'John Doe is a blockchain enthusiast. He loves to learn new things and share his knowledge with others. He is also a contributor to various open-source projects.',
  },
  render: (args: ProfileCardProps) => (
    <div className="w-[500px]">
      <ProfileCard {...args}>
        <Button
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={() => window.open('https://example.com', '_blank')}
        >
          Follow
        </Button>
      </ProfileCard>
    </div>
  ),
}

export const EntityProfile: Story = {
  args: {
    variant: 'entity',
    avatarSrc: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4"',
    name: 'Blockchain Corp',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    stats: {
      numberOfFollowers: 300,
    },
    link: 'https://blockchaincorp.com',
    bio: 'Blockchain Corp is a leading company in blockchain technology. Visit our website for more information about how you can benefit from our services.',
  },
  render: (args: ProfileCardProps) => (
    <div className="w-[500px]">
      <ProfileCard {...args} />
    </div>
  ),
}
