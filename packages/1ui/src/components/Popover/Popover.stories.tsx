import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Button, Popover, PopoverContent, PopoverTrigger, Text } from '..'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    // eslint-disable-next-line
    // @ts-ignore
    side: {
      describe: 'Side the content will open on',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom' },
      },
      options: ['top', 'right', 'bottom', 'left'],
      control: 'select',
    },
    align: {
      describe: 'Where to align content to trigger',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'center' },
      },
      options: ['start', 'center', 'end'],
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof Popover>

export const BasicUsage: Story = {
  render: (args) => (
    <Popover>
      <PopoverTrigger>
        <Button size="lg">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent {...args}>
        <Text variant="bodyLarge">Popover Content</Text>
        <Text variant="body">
          Here is some very long content to test out this popover. It is good to
          see how it looks with lots of text!
        </Text>
      </PopoverContent>
    </Popover>
  ),
}
