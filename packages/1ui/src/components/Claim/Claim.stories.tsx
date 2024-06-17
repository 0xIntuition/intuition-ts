// Import React
import React from 'react'

// Import Storybook meta and StoryObj type
import type { Meta, StoryObj } from '@storybook/react'
import { IdentitySize, IdentityVariant } from 'components/Identity'

// Import your actual component
import { Claim } from './Claim'

// Setup meta for the Storybook
const meta: Meta<typeof Claim> = {
  title: 'Components/Claim',
  component: Claim,
  argTypes: {
    subject: {
      description: 'Subject of the claim',
      table: {
        type: { summary: 'string' },
      },
    },
    predicate: {
      description: 'Predicate of the claim',
      table: {
        type: { summary: 'string' },
      },
    },
    object: {
      description: 'Object of the claim',
      table: {
        type: { summary: 'string' },
      },
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

// Define types for your stories
type Story = StoryObj<typeof Claim>

// Example story for the default variant
export const BasicUsage: Story = {
  args: {
    size: IdentitySize.Md,
    disabled: false,
    subject: {
      label: '0xintution',
    },
    predicate: {
      label: 'is really',
    },
    object: {
      label: 'cool',
    },
  },
  render: (args) => (
    <div className="w-[500px]">
      <Claim {...args} />
    </div>
  ),
}

// Example story for the User variant
export const User: Story = {
  render: () => (
    <div className="w-[500px]">
      <Claim
        size={IdentitySize.Md}
        subject={{
          variant: IdentityVariant.User,
          label: 'Alice',
          imgSrc:
            'https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg',
        }}
        predicate={{
          label: 'likes',
        }}
        object={{
          label: 'pizza',
        }}
      />
    </div>
  ),
}
