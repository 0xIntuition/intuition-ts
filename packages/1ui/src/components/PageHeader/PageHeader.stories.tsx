import type { Meta, StoryObj } from '@storybook/react'

import { PageHeader } from './PageHeader'

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Network',
    lastUpdated: '3s',
  },
}

export const WithSubtitle: Story = {
  args: {
    title: 'Network',
    subtitle: 'View and manage your network connections',
    lastUpdated: '3s',
  },
}

export const TitleOnly: Story = {
  args: {
    title: 'Network',
  },
}
