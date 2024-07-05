import type { Meta, StoryObj } from '@storybook/react'

import { TagsListInput } from './TagsListInput'

const meta: Meta<typeof TagsListInput> = {
  title: 'Components/TagsListInput',
  component: TagsListInput,
}

export default meta

type Story = StoryObj<typeof TagsListInput>

export const BasicUsage: Story = {
  render: () => (
    <div className="w-[250px]">
      <TagsListInput>HELL WORLD</TagsListInput>
    </div>
  ),
}
