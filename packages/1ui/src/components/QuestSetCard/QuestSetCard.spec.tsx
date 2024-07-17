import { render } from '@testing-library/react'

import { QuestSetCard } from './QuestSetCard'

describe('QuestSetCard', () => {
  it('should render appropriate elements', () => {
    const { asFragment } = render(
      <QuestSetCard
        imgSrc={
          'https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg'
        }
        title={'Tutorial Island: The Primitive Elements'}
        description={'This is a description of the quest set'}
        numberQuests={10}
        numberCompletedQuests={5}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="bg-popover flex flex-col justify-center align-center theme-border rounded-lg p-8 gap-5"
        >
          <img
            alt="Tutorial Island: The Primitive Elements"
            class="object-cover w-full h-auto rounded-lg theme-border"
            src="https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg"
          />
          <div
            class="space-y-2.5"
          >
            <h6
              class="text-primary text-xl font-medium"
            >
              Tutorial Island: The Primitive Elements
            </h6>
            <p
              class="text-lg text-foreground/70"
            >
              This is a description of the quest set
            </p>
          </div>
          <div
            class="flex flex-col"
          >
            <div
              class="flex items-center justify-between py-2.5"
            >
              <p
                class="text-lg text-muted-foreground"
              >
                50% Complete
              </p>
              <p
                class="text-lg text-muted-foreground"
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
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when disabled', () => {
    const { asFragment } = render(
      <QuestSetCard
        imgSrc={
          'https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg'
        }
        title={'Tutorial Island: The Primitive Elements'}
        description={'This is a description of the quest set'}
        numberQuests={10}
        numberCompletedQuests={5}
        disabled={true}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="bg-popover flex flex-col justify-center align-center theme-border rounded-lg p-8 gap-5 cursor-not-allowed opacity-50"
        >
          <img
            alt="Tutorial Island: The Primitive Elements"
            class="object-cover w-full h-auto rounded-lg theme-border"
            src="https://m.media-amazon.com/images/M/MV5BNDhiMWYzMjgtNTRiYi00ZTA3LThlODctNDRkMDk0NzFkMWI3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg0MTkzMzA@._V1_.jpg"
          />
          <div
            class="space-y-2.5"
          >
            <h6
              class="text-primary text-xl font-medium"
            >
              Tutorial Island: The Primitive Elements
            </h6>
            <p
              class="text-lg text-foreground/70"
            >
              This is a description of the quest set
            </p>
          </div>
          <div
            class="flex flex-col"
          >
            <div
              class="flex items-center justify-between py-2.5"
            >
              <p
                class="text-lg text-muted-foreground"
              >
                50% Complete
              </p>
              <p
                class="text-lg text-muted-foreground"
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
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
