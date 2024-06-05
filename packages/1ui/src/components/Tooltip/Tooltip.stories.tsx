import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Button, Text } from '..'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const BasicUsage: Story = {
  render: (args) => (
    <TooltipProvider {...args}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="lg">
            Hover
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <Text variant="body">Some text</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
