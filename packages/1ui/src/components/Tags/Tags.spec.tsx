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
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  keyboard
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  192
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  ergonomic
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  168
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  wireless
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  143
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  gaming
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  132
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  mechanical
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  128
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  tech
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  122
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  innovation
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  118
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  typing
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  111
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  quality
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  98
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  brand
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  94
                </div>
              </div>
            </button>
            <a>
              <p
                class="text-primary text-base font-normal"
              >
                + 32 more
              </p>
            </a>
          </div>
          <button
            class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted aria-disabled:from-muted disabled:to-muted aria-disabled:to-muted shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
          >
            <svg
              class="w-4 h-4"
            >
              <use
                href="/src/components/Icon/Icon.sprites.svg#bookmark"
              />
            </svg>
            View All Tags
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
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  keyboard
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  192
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  ergonomic
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  168
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  wireless
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  143
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  gaming
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  132
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  mechanical
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  128
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  tech
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  122
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  innovation
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  118
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  typing
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  111
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  quality
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  98
                </div>
              </div>
            </button>
            <button
              class="gap-1 rounded-full px-1.5 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground bg-primary/10 text-primary/90 border-primary/40 hover:bg-primary/30 hover:text-primary hover:border-primary/60 text-base font-normal flex items-center cursor-default pl-2"
            >
              <div
                class="flex flex-row gap-2 items-center"
              >
                <p
                  class="text-primary text-base font-normal"
                >
                  brand
                </p>
                <div
                  class="flex flex-row gap-1.5 items-center"
                >
                  <span
                    class="h-[2px] w-[2px] bg-primary"
                  />
                  94
                </div>
              </div>
            </button>
          </div>
          <button
            class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted aria-disabled:from-muted disabled:to-muted aria-disabled:to-muted shadow-md-subtle px-3 py-1 max-sm:py-2 max-sm:text-base"
          >
            <svg
              class="w-4 h-4"
            >
              <use
                href="/src/components/Icon/Icon.sprites.svg#bookmark"
              />
            </svg>
            View All Tags
          </button>
        </div>
      </DocumentFragment>
    `)
  })
})
