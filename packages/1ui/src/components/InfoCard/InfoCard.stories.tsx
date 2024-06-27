import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Identity } from 'types'

import { InfoCard } from './InfoCard'

const meta: Meta<typeof InfoCard> = {
  title: 'Components/InfoCard',
  component: InfoCard,
  argTypes: {
    variant: {
      description: 'Variant of identity tag component',
      options: Object.values(Identity),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'user' },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof InfoCard>

export const BasicUsage: Story = {
  args: {
    variant: 'user',
    username: 'super dave',
    avatarImgSrc:
      'https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg',
    timestamp: '2024-05-10T00:00:00Z',
  },
  render: (args) => <InfoCard {...args} />,
}
