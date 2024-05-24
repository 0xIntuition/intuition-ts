import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Toaster, toast } from '.'
import { Button } from '@components/Button'

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: ['className', 'style'],
    },
    docs: {
      description: {
        component: 'A toaster component with a toast utility.',
      },
    },
  },
  argTypes: {
    // eslint-disable-next-line
    // @ts-ignore
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
    richColors: {
      description: 'Show rich colors (only applies to some toast types)',
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
    <div style={{ display: 'flex', width: '800px', height: '500px' }}>
      <Toaster {...args} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.5rem',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button size="lg" onClick={() => toast('I am a toast!')}>
          toast()
        </Button>
        <Button
          variant="accent"
          size="lg"
          onClick={() => toast.info('I am an info toast!')}
        >
          toast.info()
        </Button>
        <Button
          size="lg"
          variant="success"
          onClick={() => toast.success('I am a success toast!')}
        >
          toast.success()
        </Button>
        <Button
          size="lg"
          variant="destructive"
          onClick={() => toast.error('I am an error toast!')}
        >
          toast.error()
        </Button>
      </div>
    </div>
  ),
}
