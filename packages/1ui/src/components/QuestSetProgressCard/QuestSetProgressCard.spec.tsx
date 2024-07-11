import React from 'react'

import { render } from '@testing-library/react'

import { QuestSetProgressCard } from './QuestSetProgressCard'

describe('QuestSetProgressCard', () => {
  it('should render appropriate elements', () => {
    const { asFragment } = render(
      <QuestSetProgressCard
        image={
          'https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg'
        }
        title={'Tutorial Island: The Primitive Elements'}
        numberQuests={10}
        numberCompletedQuests={5}
        onButtonClick={() => console.log('Button clicked')}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex align-center w-full theme-border rounded-lg"
        >
          <img
            alt="Tutorial Island: The Primitive Elements"
            class="object-cover w-52 h-52 rounded-l-lg theme-border"
            src="https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg"
          />
          <div
            class="flex flex-col justify-between gap-2 w-full px-6 py-5"
          >
            <h6
              class="text-primary text-xl font-normal"
            >
              Tutorial Island: The Primitive Elements
            </h6>
            <div
              class="flex flex-col"
            >
              <div
                class="flex items-center justify-between py-2.5"
              >
                <p
                  class="text-base text-muted-foreground"
                >
                  50% Complete
                </p>
                <p
                  class="text-base text-muted-foreground"
                >
                  <span
                    class="text-primary"
                  >
                    5
                  </span>
                   / 10
                </p>
              </div>
              <div
                class="flex items-center h-[6px] mb-4"
              >
                <span
                  class="h-full block rounded-l-sm bg-primary"
                  style="min-width: 50%;"
                />
                <span
                  class="h-full w-full block rounded-r-sm bg-muted"
                />
              </div>
              <div
                class="flex w-full justify-end"
              >
                <button
                  class="flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-4 py-1.5"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
