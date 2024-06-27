import type { Meta, StoryObj } from '@storybook/react'
import { Claim } from 'components/Claim'

import { ClaimStatus } from './components'
import { Dataset } from './Dataset'

// Setup meta for the Storybook
const meta: Meta = {
  title: 'Components/Dataset',
  component: Dataset,
}

export default meta

type ClaimStatusStory = StoryObj<typeof ClaimStatus>
export const ClaimStatusUsage: ClaimStatusStory = {
  args: {
    claimsFor: 10,
    claimsAgainst: 5,
  },
  render: (args) => (
    <ClaimStatus {...args}>
      <Claim
        size="sm"
        subject={{
          variant: 'default',
          label: '0xintuition',
        }}
        predicate={{ label: 'is really' }}
        object={{ label: 'cool' }}
      />
    </ClaimStatus>
  ),
}
