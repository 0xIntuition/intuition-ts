import React from 'react'

import { render } from '@testing-library/react'

import {
  SocialLinks,
  SocialLinksBadge,
  SocialLinksBadges,
  SocialLinksButton,
} from './SocialLinks'

describe('SocialLinks', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
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
      </SocialLinks>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-4 w-full"
        >
          <div
            class="flex flex-wrap gap-2"
          >
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-2 w-min text-sm font-normal"
            >
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
            </div>
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-2 w-min text-sm font-normal"
            >
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
            </div>
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-2 w-min text-sm font-normal"
            >
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
            </div>
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-2 w-min text-sm font-normal"
            >
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
            </div>
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-2 w-min text-sm font-normal"
            >
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
            </div>
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-2 w-min text-sm font-normal"
            >
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
            </div>
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-2 w-min text-sm font-normal"
            >
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
            </div>
          </div>
          <button
            class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-3 py-1"
          >
            Edit Social Links
          </button>
        </div>
      </DocumentFragment>
    `)
  })
})
