import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'components/Button'

import { ProfileCard, ProfileCardProps } from './ProfileCard'
import { ProfileVariant } from './ProfileCard.utils'

const meta: Meta<typeof ProfileCard> = {
  title: 'Components/ProfileCard',
  component: ProfileCard,
  argTypes: {
    type: {
      description: 'Type of the profile card (user or entity)',
      options: Object.keys(ProfileVariant),
      control: { type: 'radio' },
      table: {
        type: { summary: 'user | entity' },
      },
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
    type: 'user',
    avatarSrc: 'https://example.com/avatar.jpg',
    name: 'John Doe',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    stats: {
      numberOfFollowers: 123,
      numberOfFollowing: 45,
      points: 67,
    },
    bio: 'A short bio about John Doe',
  },
  render: (args: ProfileCardProps) => (
    <div className="w-[500px]">
      <ProfileCard {...args}>
        <Button
          variant="accent"
          onClick={() => window.open('https://example.com', '_blank')}
        >
          Follow
        </Button>
      </ProfileCard>
    </div>
  ),
}

export const UserProfile: Story = {
  args: {
    type: 'user',
    avatarSrc: 'https://example.com/avatar.jpg',
    name: 'Alice',
    walletAddress: 'someperson.eth',
    stats: {
      numberOfFollowers: 100,
      numberOfFollowing: 50,
      points: 200,
    },
    bio: 'Alice is a blockchain enthusiast.',
  },
  render: (args: ProfileCardProps) => (
    <div className="w-[500px]">
      <ProfileCard {...args} />
    </div>
  ),
}

export const EntityProfile: Story = {
  args: {
    type: 'entity',
    avatarSrc: 'https://example.com/avatar.jpg',
    name: 'Blockchain Corp',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    stats: {
      numberOfFollowers: 300,
    },
    link: 'https://blockchaincorp.com',
    bio: 'Blockchain Corp is a leading company in blockchain technology.',
  },
  render: (args: ProfileCardProps) => (
    <div className="w-[500px]">
      <ProfileCard {...args} />
    </div>
  ),
}
