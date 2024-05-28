import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Button, Popover, PopoverContent, PopoverTrigger, Text } from '..'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
}

export default meta

type Story = StoryObj<typeof Popover>

export const BasicUsage: Story = {
  args: {},
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>
        <Button size="lg">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Text variant="bodyLarge">Popover Content</Text>
        <Text variant="body">
          Here is some very long content to test out this popover. It is good to
          see how it looks with lots of text!
        </Text>
      </PopoverContent>
    </Popover>
  ),
}
