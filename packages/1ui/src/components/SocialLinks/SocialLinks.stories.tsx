import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import {
  SocialLinks,
  SocialLinksBadge,
  SocialLinksBadges,
  SocialLinksButton,
} from './SocialLinks'

const meta: Meta<typeof SocialLinks> = {
  title: 'Components/SocialLinks',
  component: SocialLinks,
}

export default meta

type Story = StoryObj<typeof SocialLinks>

export const BasicUsage: Story = {
  render: () => (
    <div className="w-[300px]">
      <SocialLinks>
        <SocialLinksBadges>
          <SocialLinksBadge
            platform="discord"
            isVerified
            username="@superdave"
          />
          <SocialLinksBadge platform="x" isVerified username="@superdave" />
          <SocialLinksBadge platform="farcaster" username="@superdave" />
          <SocialLinksBadge platform="lens" username="@superdave" />
          <SocialLinksBadge
            platform="calendly"
            isVerified
            username="@superdave"
          />
          <SocialLinksBadge platform="github" username="@superdave" />
          <SocialLinksBadge platform="medium" username="@superdave" />
        </SocialLinksBadges>
        <SocialLinksButton />
      </SocialLinks>
    </div>
  ),
}
