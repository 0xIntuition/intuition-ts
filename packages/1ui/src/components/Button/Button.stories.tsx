import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
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
    children: { control: 'text' },
    variant: { control: 'select' },
    size: { control: 'select' },
    isLoading: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const BasicUsage: Story = {
  args: {
    children: 'Example Button',
  },
  render: (props) => <Button {...props} />,
}

export const Variants: Story = {
  parameters: {
    controls: {
      exclude: ['className', 'asChild', 'style', 'variant'],
    },
  },
  render: (props) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)', // Adjusted column count to match number of buttons
        gridTemplateRows: '1fr',
        gap: '2rem',
      }}
    >
      <Button variant="default" {...props}>
        Default
      </Button>
      <Button variant="secondary" {...props}>
        Secondary
      </Button>
      <Button variant="outline" {...props}>
        Outline
      </Button>
      <Button variant="ghost" {...props}>
        Ghost
      </Button>
      <Button variant="link" {...props}>
        Link
      </Button>
      <Button variant="destructive" {...props}>
        Destructive
      </Button>
    </div>
  ),
}

export const Sizes: Story = {
  args: {
    children: 'Hello, there',
  },
  parameters: {
    controls: {
      exclude: ['className', 'asChild', 'style', 'size'],
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm" {...props} />
      <Button size="default" {...props} />
      <Button size="lg" {...props} />
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
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Button isLoading variant="default" {...props}>
        isLoading
      </Button>
      <Button disabled variant="default" {...props}>
        disabled
      </Button>
    </div>
  ),
}
