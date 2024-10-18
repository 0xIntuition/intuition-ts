// Import React

// Import Storybook meta and StoryObj type
import type { Meta, StoryObj } from '@storybook/react'

// Import your actual component
import { ScrollArea } from './ScrollArea'

// Setup meta for the Storybook
const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
}

export default meta

// Define types for your stories
type Story = StoryObj<typeof ScrollArea>

// Example story for the default state
export const BasicUsage: Story = {
  // eslint-disable-next-line
  render: (args) => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      Jokester began sneaking into the castle in the middle of the night and
      leaving jokes all over the place: under the king&apos;s pillow, in his
      soup, even in the royal toilet. The king was furious, but he couldn&apos;t
      seem to stop Jokester. And then, one day, the people of the kingdom
      discovered that the jokes left by Jokester were so funny that they
      couldn&apos;t help but laugh. And once they started laughing, they
      couldn&apos;t stop.
    </ScrollArea>
  ),
}
