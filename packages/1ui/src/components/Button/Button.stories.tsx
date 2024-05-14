import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

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
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
        'tooltip',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
      control: 'select',
    },
    size: {
      description: 'Size of button',
      options: ['default', 'sm', 'lg', 'icon', 'lg-icon'],
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
      <Button variant="text" disabled {...props}>
        Disabled
      </Button>
    </div>
  ),
}

export const Variants: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Button {...props}>Primary</Button>
      <Button variant="secondary" {...props}>
        Secondary
      </Button>
      <Button variant="ghost" {...props}>
        Ghost
      </Button>
      <Button variant="text" {...props}>
        Text
      </Button>
    </div>
  ),
}

export const Sizes: Story = {
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
    </div>
  ),
}

export const States: Story = {
  parameters: {
    controls: {
      exclude: ['className', 'children', 'asChild', 'style'],
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Button isLoading {...props}>
        isLoading
      </Button>
      <Button disabled {...props}>
        disabled
      </Button>
    </div>
  ),
}
