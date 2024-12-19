import type { Meta, StoryObj } from '@storybook/react'

import { AppSidebar } from './AppSidebar'

const meta: Meta<typeof AppSidebar> = {
  title: 'Components/AppSidebar',
  component: AppSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal'],
    },
  },
}

export default meta
type Story = StoryObj<typeof AppSidebar>

export const Default: Story = {
  args: {
    variant: 'default',
  },
}

export const Minimal: Story = {
  args: {
    variant: 'minimal',
  },
}

export const WithActiveItem: Story = {
  args: {
    variant: 'default',
    activeItem: 'Dashboard',
  },
}

export const WithCustomUser: Story = {
  args: {
    variant: 'default',
    user: {
      name: 'Alice Johnson',
      avatar: '/path/to/custom-avatar.jpg',
    },
  },
}
