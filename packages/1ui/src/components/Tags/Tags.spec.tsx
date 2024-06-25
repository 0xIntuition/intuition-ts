import React from 'react'

import { render } from '@testing-library/react'

import { Tags, TagsButton, TagsContent, TagWithValue } from './Tags'

describe('Tags', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <Tags>
        <TagsContent numberOfTags={42}>
          <TagWithValue label="keyboard" value={192} />
          <TagWithValue label="ergonomic" value={168} />
          <TagWithValue label="wireless" value={143} />
          <TagWithValue label="gaming" value={132} />
          <TagWithValue label="mechanical" value={128} />
          <TagWithValue label="tech" value={122} />
          <TagWithValue label="innovation" value={118} />
          <TagWithValue label="typing" value={111} />
          <TagWithValue label="quality" value={98} />
          <TagWithValue label="brand" value={94} />
        </TagsContent>
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
            <button
              class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal"
            >
              keyboard
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              192
            </button>
            <button
              class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal"
            >
              ergonomic
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              168
            </button>
            <button
              class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal"
            >
              wireless
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              143
            </button>
            <button
              class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal"
            >
              gaming
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              132
            </button>
            <button
              class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal"
            >
              mechanical
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              128
            </button>
            <button
              class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal"
            >
              tech
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              122
            </button>
            <button
              class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal"
            >
              innovation
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              118
            </button>
            <button
              class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal"
            >
              typing
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              111
            </button>
            <button
              class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal"
            >
              quality
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              98
            </button>
            <button
              class="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal"
            >
              brand
              <span
                class="h-[2px] w-[2px] bg-primary"
              />
              94
            </button>
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
