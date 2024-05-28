import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './Command'

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
}

export default meta

type Story = StoryObj<typeof Command>

export const BasicUsage: Story = {
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Command {...args}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
}
