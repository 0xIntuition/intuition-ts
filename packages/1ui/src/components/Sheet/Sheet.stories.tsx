// Import React

// Import Storybook meta and StoryObj type
import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../Button'
// Import your actual component
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet'

// Setup meta for the Storybook
const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
}

export default meta

// Define types for your stories
type Story = StoryObj<typeof Sheet>

// Example story for the default state
export const Default: Story = {
  args: {
    children: (
      <>
        <SheetTrigger asChild>
          <Button variant="outline">Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>
              This is a description of the sheet content.
            </SheetDescription>
          </SheetHeader>
          <div className="py-6">Sheet content goes here</div>
        </SheetContent>
      </>
    ),
  },
}

export const WithCustomPosition: Story = {
  args: {
    children: (
      <>
        <SheetTrigger asChild>
          <Button variant="outline">Open Right Sheet</Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px]">
          <SheetHeader>
            <SheetTitle>Right-sided Sheet</SheetTitle>
            <SheetDescription>
              This sheet slides in from the right side.
            </SheetDescription>
          </SheetHeader>
          <div className="py-6">Custom positioned sheet content</div>
        </SheetContent>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'The Sheet component can be configured to slide in from different sides.',
      },
    },
  },
}
