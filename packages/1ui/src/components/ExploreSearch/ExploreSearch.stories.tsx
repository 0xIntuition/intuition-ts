import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { ExploreSearch } from './ExploreSearch'

const meta: Meta<typeof ExploreSearch> = {
  title: 'Components/Identity/ExploreSearch',
  component: ExploreSearch,
  // eslint-disable-next-line
  // @ts-ignore
  subcomponents: { ExploreSearchItem },
}

export default meta

type Story = StoryObj<typeof ExploreSearch>

export const BasicUsage: Story = {
  render: () => (
    <ExploreSearch
      onCreateIdentityClick={() => console.log('Button clicked!')}
    ></ExploreSearch>
  ),
}

export const WithoutCreateIdentityButton: Story = {
  render: () => <ExploreSearch></ExploreSearch>,
}
