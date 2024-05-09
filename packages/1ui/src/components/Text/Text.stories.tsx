import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Displays a text component',
      },
    },
  },
  argTypes: {
    children: {
      description: 'Text value',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    variant: {
      description: 'Variant of text',
      options: [
        'heading1',
        'heading2',
        'heading3',
        'heading4',
        'heading5',
        'headline',
        'bodyLarge',
        'body',
        'caption',
        'footnote',
        'small',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'body' },
      },
      control: 'select',
    },
    weight: {
      description: 'Weight of text',
      options: ['normal', 'semibold', 'bold'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'normal' },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof Text>

export const BasicUsage: Story = {
  args: {
    children: 'I am text!',
  },
  render: (props) => <Text {...props} />,
}

export const Variants: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (props) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Text variant="heading1" {...props}>
        Heading 1
      </Text>
      <Text variant="heading2" {...props}>
        Heading 2
      </Text>
      <Text variant="heading3" {...props}>
        Heading 3
      </Text>
      <Text variant="heading4" {...props}>
        Heading 4
      </Text>
      <Text variant="heading5" {...props}>
        Heading 5
      </Text>
      <Text variant="headline" {...props}>
        Headline
      </Text>
      <Text variant="bodyLarge" {...props}>
        Body Large
      </Text>
      <Text variant="body" {...props}>
        Body
      </Text>
      <Text variant="caption" {...props}>
        Caption
      </Text>
      <Text variant="footnote" {...props}>
        Footnote
      </Text>
      <Text variant="small" {...props}>
        Small
      </Text>
    </div>
  ),
}

export const Weights: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (props) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Text {...props}>Default</Text>
      <Text weight="semibold" {...props}>
        Semibold
      </Text>
      <Text weight="bold" {...props}>
        Bold
      </Text>
    </div>
  ),
}
