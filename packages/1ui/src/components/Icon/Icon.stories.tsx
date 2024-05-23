import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'
import { IconName } from './Icon.types'

const iconOptions = [
  'arrow-box-left',
  'arrow-left',
  'arrow-out-of-box',
  'arrow-right',
  'arrow-up-right',
  'arrows-repeat',
  'book',
  'bookmark-check',
  'brush-sparkle',
  'bubble-annotation',
  'calendar',
  'chevron-bottom',
  'chevron-double-left',
  'chevron-double-right',
  'chevron-down-small',
  'chevron-grabber-vertical',
  'chevron-large-down',
  'chevron-left',
  'chevron-left-small',
  'chevron-right',
  'chevron-right-small',
  'chevron-top-small',
  'circle',
  'circle-arrow',
  'circle-check',
  'circle-dots-center',
  'circle-plus',
  'circle-question-mark',
  'circle-x',
  'circles-three',
  'cross-large',
  'crypto-punk',
  'crystal-ball',
  'dot-grid',
  'eye-open',
  'eye-slash',
  'fast-forward',
  'filter-1',
  'filter-2',
  'floppy-disk-1',
  'floppy-disk-2',
  'folder',
  'graduate-cap',
  'group',
  'layout-grid',
  'layout-third',
  'loader',
  'lock',
  'magnifying-glass',
  'medal',
  'megaphone',
  'microphone',
  'moneybag',
  'person-circle',
  'play',
  'play-circle',
  'plus-large',
  'plus-small',
  'rescue-ring',
  'rocket',
  'settings-gear',
  'shield-check',
  'shield-check-filled',
  'shopping-bag',
  'sparkle',
  'square-arrow-top-right',
  'square-check',
  'square-check-empty',
  'square-plus',
  'square-x',
  'trash-can',
  'wallet',
  'wreath',
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
