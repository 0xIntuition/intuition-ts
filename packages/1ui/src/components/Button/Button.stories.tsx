import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { ChevronRight } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Displays a button or a component that looks like a button.',
      },
    },
    controls: {
      exclude: ['className', 'style', 'asChild'],
    },
  },
  argTypes: {
    children: {
      description: 'Button label',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    variant: {
      description: 'Variant of button',
      options: [
        'primary',
        'secondary',
        'ghost',
        'text',
        'accent',
        'warning',
        'success',
        'destructive',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      control: 'select',
    },
    size: {
      description: 'Size of button',
      options: ['default', 'medium', 'large', 'extraLarge'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
      control: 'select',
    },
    isLoading: {
      description: 'Variant of button',
      table: {
        type: { summary: 'boolean' },
      },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const BasicUsage: Story = {
  args: {
    children: 'I am a button',
  },
  render: (props) => <Button {...props} />,
}

export const Primary: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Button {...props}>Default</Button>
      <Button size="medium" {...props}>
        Medium
      </Button>
      <Button size="large" {...props}>
        Large
      </Button>
      <Button size="extraLarge" {...props}>
        Extra Large
      </Button>
      <Button {...props}>
        <ChevronRight />
      </Button>
      <Button isLoading {...props}>
        isLoading
      </Button>
      <Button disabled {...props}>
        Disabled
      </Button>
    </div>
  ),
}

export const Secondary: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Button variant="secondary" {...props}>
        Default
      </Button>
      <Button variant="secondary" size="medium" {...props}>
        Medium
      </Button>
      <Button variant="secondary" size="large" {...props}>
        Large
      </Button>
      <Button variant="secondary" size="extraLarge" {...props}>
        Extra Large
      </Button>
      <Button variant="secondary" {...props}>
        <ChevronRight />
      </Button>
      <Button variant="secondary" isLoading {...props}>
        isLoading
      </Button>
      <Button variant="secondary" disabled {...props}>
        Disabled
      </Button>
    </div>
  ),
}

export const Ghost: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Button variant="ghost" {...props}>
        Default
      </Button>
      <Button variant="ghost" size="medium" {...props}>
        Medium
      </Button>
      <Button variant="ghost" size="large" {...props}>
        Large
      </Button>
      <Button variant="ghost" size="extraLarge" {...props}>
        Extra Large
      </Button>
      <Button variant="ghost" aria-selected {...props}>
        Selected
      </Button>
      <Button variant="ghost" {...props}>
        <ChevronRight />
      </Button>
      <Button variant="ghost" isLoading {...props}>
        isLoading
      </Button>
      <Button variant="ghost" disabled {...props}>
        Disabled
      </Button>
    </div>
  ),
}

export const Text: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Button variant="text" {...props}>
        Default
      </Button>
      <Button variant="text" size="medium" {...props}>
        Medium
      </Button>
      <Button variant="text" size="large" {...props}>
        Large
      </Button>
      <Button variant="text" size="extraLarge" {...props}>
        Extra Large
      </Button>
      <Button variant="text" {...props}>
        <ChevronRight />
      </Button>
      <Button variant="text" isLoading {...props}>
        isLoading
      </Button>
      <Button variant="text" disabled {...props}>
        Disabled
      </Button>
    </div>
  ),
}

export const Accent: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Button variant="accent" {...props}>
        Default
      </Button>
      <Button variant="accent" size="medium" {...props}>
        Medium
      </Button>
      <Button variant="accent" size="large" {...props}>
        Large
      </Button>
      <Button variant="accent" size="extraLarge" {...props}>
        Extra Large
      </Button>
      <Button variant="accent" {...props}>
        <ChevronRight />
      </Button>
      <Button variant="accent" isLoading {...props}>
        isLoading
      </Button>
      <Button variant="accent" disabled {...props}>
        Disabled
      </Button>
    </div>
  ),
}

export const Warning: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Button variant="warning" {...props}>
        Default
      </Button>
      <Button variant="warning" size="medium" {...props}>
        Medium
      </Button>
      <Button variant="warning" size="large" {...props}>
        Large
      </Button>
      <Button variant="warning" size="extraLarge" {...props}>
        Extra Large
      </Button>
      <Button variant="warning" {...props}>
        <ChevronRight />
      </Button>
      <Button variant="warning" isLoading {...props}>
        isLoading
      </Button>
      <Button variant="warning" disabled {...props}>
        Disabled
      </Button>
    </div>
  ),
}

export const Success: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Button variant="success" {...props}>
        Default
      </Button>
      <Button variant="success" size="medium" {...props}>
        Medium
      </Button>
      <Button variant="success" size="large" {...props}>
        Large
      </Button>
      <Button variant="success" size="extraLarge" {...props}>
        Extra Large
      </Button>
      <Button variant="success" {...props}>
        <ChevronRight />
      </Button>
      <Button variant="success" isLoading {...props}>
        isLoading
      </Button>
      <Button variant="success" disabled {...props}>
        Disabled
      </Button>
    </div>
  ),
}

export const Destructive: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Button variant="destructive" {...props}>
        Default
      </Button>
      <Button variant="destructive" size="medium" {...props}>
        Medium
      </Button>
      <Button variant="destructive" size="large" {...props}>
        Large
      </Button>
      <Button variant="destructive" size="extraLarge" {...props}>
        Extra Large
      </Button>
      <Button variant="destructive" {...props}>
        <ChevronRight />
      </Button>
      <Button variant="destructive" isLoading {...props}>
        isLoading
      </Button>
      <Button variant="destructive" disabled {...props}>
        Disabled
      </Button>
    </div>
  ),
}
