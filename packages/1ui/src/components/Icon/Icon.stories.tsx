import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Displays an icon.',
      },
    },
  },
  argTypes: {
    name: {
      description: 'Icon name',
      options: [
        'arrow-left',
        'arrow-right',
        'arrow-up-right',
        'square-arrow-top-right',
        'rescue-ring',
        'bubble-annotation',
        'megaphone',
        'graduate-cap',
        'play-circle',
        'play',
        'book',
        'bookmark-check',
        'shield-check',
        'square-check',
        'square-check-empty',
        'folder',
        'circle-question-mark',
        'circle-arrow',
        'trash-can',
        'settings-gear',
        'floppy-disk-1',
        'floppy-disk-2',
      ],
      table: {
        type: { summary: 'string' },
      },
      control: 'select',
    },
    className: {
      description: 'class',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof Icon>

export const BasicUsage: Story = {
  render: (args) => <Icon {...args} />,
  args: {
    name: 'arrow-left',
    className: 'text-accent h-9 w-9',
  },
}

export const AllIcons: Story = {
  render: (args) => (
    <div
      style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', width: '505px' }}
      {...args}
    >
      <Icon name="arrow-left" />
      <Icon name="arrow-right" />
      <Icon name="arrow-up-right" />
      <Icon name="square-arrow-top-right" />
      <Icon name="rescue-ring" />
      <Icon name="bubble-annotation" />
      <Icon name="megaphone" />
      <Icon name="graduate-cap" />
      <Icon name="play-circle" />
      <Icon name="play" />
      <Icon name="book" />
      <Icon name="bookmark-check" />
      <Icon name="shield-check" />
      <Icon name="square-check" />
      <Icon name="square-check-empty" />
      <Icon name="folder" />
      <Icon name="circle-question-mark" />
      <Icon name="circle-arrow" />
      <Icon name="trash-can" />
      <Icon name="settings-gear" />
      <Icon name="floppy-disk-1" />
      <Icon name="floppy-disk-2" />
      <Icon name="" />
      <Icon name="" />
      <Icon name="" />
    </div>
  ),
}
