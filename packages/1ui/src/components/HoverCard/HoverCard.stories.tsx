import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Avatar, Button, Text } from '..'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './HoverCard'

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
}

export default meta

type Story = StoryObj<typeof HoverCard>

export const BasicUsage: Story = {
  args: {},
  render: (args) => (
    <div className="h-[200px]">
      <HoverCard {...args}>
        <HoverCardTrigger asChild>
          <Button variant="text">@super_dave</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-60">
          <div className="flex gap-4">
            <Avatar
              src="https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg"
              name="Super Dave"
            />
            <div>
              <Text variant="body">Super Dave</Text>
              <Text variant="caption" className="text-primary/50">
                @super_dave
              </Text>
            </div>
          </div>
          <Text variant="caption">
            I am Super Dave, the most super Dave you&apos;ll ever meet.
          </Text>
          <div className="flex gap-10">
            <div>
              <Text variant="body">9122</Text>
              <Text variant="caption" className="text-primary/50">
                followers
              </Text>
            </div>
            <div>
              <Text variant="body">1239</Text>
              <Text variant="caption" className="text-primary/50">
                following
              </Text>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
}
