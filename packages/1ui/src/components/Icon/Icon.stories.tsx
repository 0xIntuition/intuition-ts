import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Icon, IconName } from './Icon'

const iconOptions = [
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
  'medal',
  'wreath',
  'chevron-large-down',
  'chevron-bottom',
  'chevron-right',
  'chevron-left',
  'sparkle',
  'arrow-box-left',
  'lock',
  'magnifying-glass',
  'filter-1',
  'fast-forward',
  'crystal-ball',
  'circle-dots-center',
  'arrow-out-of-box',
  'cross-large',
  'circle-x',
  'square-x',
  'moneybag',
  'rocket',
  'brush-sparkle',
  'fork-knife',
  'shopping-bag',
  'layout-third',
  'layout-grid',
  'filter-2',
  'chevron-double-left',
  'chevron-double-right',
  'chevron-left-small',
  'chevron-right-small',
  'arrows-repeat',
  'loader',
  'group',
  'wallet',
  'chevron-top-small',
  'chevron-down-small',
  'chevron-grabber-vertical',
  'circle-check',
  'crypto-punk',
  'person-circle',
  'shield-check',
  'plus-large',
  'plus-small',
  'circle-plus',
  'square-plus',
  'eye-open',
  'eye-slash',
  'calendar',
  'shield-check-blue',
  'dot-grid',
  'circles-three',
  'circle',
  'microphone',
]

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
      options: iconOptions,
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
    name: 'crystal-ball',
    className: 'h-10 w-10',
  },
}

export const AllIcons: Story = {
  render: (args) => (
    <div
      style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', width: '700px' }}
      {...args}
    >
      {iconOptions.map((iconName, index) => (
        <Icon key={index} name={iconName as IconName} />
      ))}
    </div>
  ),
}
