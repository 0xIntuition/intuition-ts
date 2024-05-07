import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { ButtonSize, ButtonVariant } from './types'

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
    children: {
      description: 'Button label',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    variant: {
      description: 'Variant of button',
      options: Object.values(ButtonVariant),
      table: {
        type: { summary: 'ButtonVariant' },
        defaultValue: { summary: ButtonVariant.Default },
      },
      control: 'select',
    },
    size: {
      description: 'Size of button',
      options: Object.values(ButtonSize),
      table: {
        type: { summary: 'ButtonSize' },
        defaultValue: { summary: ButtonSize.Default },
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
      <Button variant={ButtonVariant.Default} {...props}>
        Default
      </Button>
      <Button variant={ButtonVariant.Secondary} {...props}>
        Secondary
      </Button>
      <Button variant={ButtonVariant.Outline} {...props}>
        Outline
      </Button>
      <Button variant={ButtonVariant.Ghost} {...props}>
        Ghost
      </Button>
      <Button variant={ButtonVariant.Link} {...props}>
        Link
      </Button>
      <Button variant={ButtonVariant.Destructive} {...props}>
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
      <Button size={ButtonSize.Small}  {...props} />
      <Button size={ButtonSize.Default} {...props} />
      <Button size={ButtonSize.Large} {...props} />
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
      <Button isLoading variant={ButtonVariant.Default}  {...props}>
        isLoading
      </Button>
      <Button disabled variant={ButtonVariant.Default}  {...props}>
        disabled
      </Button>
    </div>
  ),
}
