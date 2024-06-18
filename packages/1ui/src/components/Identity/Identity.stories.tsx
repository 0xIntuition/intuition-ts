import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Identity, IdentitySize, IdentityVariant } from '.'

const meta: Meta<typeof Identity> = {
  title: 'Components/Identity',
  component: Identity,
  argTypes: {
    variant: {
      description: 'Variant of component',
      options: Object.values(IdentityVariant),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
      control: 'select',
    },
    size: {
      description: 'Size of component',
      options: Object.values(IdentitySize),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof Identity>

export const BasicUsage: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'identity name',
    imgSrc: '',
    disabled: false,
  },
  render: (args) => <Identity {...args} />,
}

export const User: Story = {
  render: () => (
    <Identity
      variant={'user'}
      imgSrc="https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg"
    >
      super dave
    </Identity>
  ),
}
