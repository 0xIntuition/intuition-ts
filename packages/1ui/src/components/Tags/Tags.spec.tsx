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
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                keyboard
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              192
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                ergonomic
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              168
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                wireless
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              143
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                gaming
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              132
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                mechanical
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              128
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                tech
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              122
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                innovation
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              118
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                typing
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              111
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                quality
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              98
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                brand
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
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
            class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
          >
            View all tags
          </button>
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when there are no additional tags not shown', () => {
    const { asFragment } = render(
      <Tags>
        <TagsContent numberOfTags={10}>
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
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                keyboard
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              192
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                ergonomic
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              168
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                wireless
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              143
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                gaming
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              132
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                mechanical
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              128
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                tech
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              122
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                innovation
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              118
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                typing
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              111
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                quality
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              98
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <p
                class="text-primary text-base font-normal"
              >
                brand
              </p>
              <span
                class="h-[2px] w-[2px] bg-primary mx-1"
              />
              94
            </button>
          </div>
          <button
            class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
          >
            View all tags
          </button>
        </div>
      </DocumentFragment>
    `)
  })
})
