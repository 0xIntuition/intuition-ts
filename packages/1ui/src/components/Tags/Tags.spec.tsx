import React from 'react'

import { render } from '@testing-library/react'

import { Tags, TagsBadge, TagsBadges, TagsButton } from './Tags'

describe('Tags', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <Tags>
        <TagsBadges numberOfTags={42}>
          <TagsBadge label="keyboard" value={192} />
          <TagsBadge label="ergonomic" value={168} />
          <TagsBadge label="wireless" value={143} />
          <TagsBadge label="gaming" value={132} />
          <TagsBadge label="mechanical" value={128} />
          <TagsBadge label="tech" value={122} />
          <TagsBadge label="innovation" value={118} />
          <TagsBadge label="typing" value={111} />
          <TagsBadge label="quality" value={98} />
          <TagsBadge label="brand" value={94} />
        </TagsBadges>
        <TagsButton />
      </Tags>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col gap-4 w-full"
        >
          <div
            class="flex flex-wrap gap-2 items-center"
          >
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-1 w-min text-sm font-normal"
            >
              keyboard
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              192
            </div>
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-1 w-min text-sm font-normal"
            >
              ergonomic
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              168
            </div>
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-1 w-min text-sm font-normal"
            >
              wireless
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              143
            </div>
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-1 w-min text-sm font-normal"
            >
              gaming
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              132
            </div>
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-1 w-min text-sm font-normal"
            >
              mechanical
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              128
            </div>
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-1 w-min text-sm font-normal"
            >
              tech
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              122
            </div>
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-1 w-min text-sm font-normal"
            >
              innovation
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              118
            </div>
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-1 w-min text-sm font-normal"
            >
              typing
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              111
            </div>
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-1 w-min text-sm font-normal"
            >
              quality
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              98
            </div>
            <div
              class="items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md-subtle text-foreground border-border/30 hover:bg-primary/20 flex gap-1 w-min text-sm font-normal"
            >
              brand
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              94
            </div>
            <p
              class="text-primary text-base font-normal"
            >
              + 32 more
            </p>
          </div>
          <button
            class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-3 py-1"
          >
            Add tags
          </button>
        </div>
      </DocumentFragment>
    `)
  })
})
