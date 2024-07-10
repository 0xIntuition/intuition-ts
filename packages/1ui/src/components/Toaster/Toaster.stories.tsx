import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Button, toast, Toaster } from '..'

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toaster',
  component: Toaster,
  argTypes: {
    position: {
      type: 'string',
      description: 'Position for toasts',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      control: 'select',
    },
    expand: {
      description: 'Show all toasts',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    closeButton: {
      description: 'Show close button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Toaster>

export const BasicUsage: Story = {
  args: {
    position: 'top-right',
  },
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button size="lg" onClick={() => toast('I am a toast!')}>
        Launch toast
      </Button>
    </>
  ),
}

export const Info: Story = {
  args: {
    position: 'top-right',
  },
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button
        size="lg"
        variant="accent"
        onClick={() => toast.info('I am an info toast!')}
      >
        Launch toast
      </Button>
    </>
  ),
}

export const Success: Story = {
  args: {
    position: 'top-right',
  },
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button
        size="lg"
        variant="success"
        onClick={() => toast.success('I am a success toast!')}
      >
        Launch toast
      </Button>
    </>
  ),
}

export const Error: Story = {
  args: {
    position: 'top-right',
  },
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button
        size="lg"
        variant="destructive"
        onClick={() => toast.success('I am an error toast!')}
      >
        Launch toast
      </Button>
    </>
  ),
}
