import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Banner, BannerVariant } from './Banner'

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  argTypes: {
    variant: {
      description: 'Variant of banner',
      options: Object.values(BannerVariant),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'info' },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof Banner>

export const BasicUsage: Story = {
  args: {
    variant: 'info',
    title: 'Info',
    message: 'Here is some information.',
  },
  render: (args) => (
    <div className="w-[500px]">
      <Banner {...args} />
    </div>
  ),
}

export const Warning: Story = {
  render: () => (
    <div className="w-[500px]">
      <Banner
        variant={BannerVariant.warning}
        title="Warning"
        message="There is something going on!"
      />
    </div>
  ),
}

export const Error: Story = {
  render: () => (
    <div className="w-[500px]">
      <Banner
        variant={BannerVariant.error}
        title="Error"
        message="There is something horrible going on!"
      />
    </div>
  ),
}
