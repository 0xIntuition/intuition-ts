import { render } from '@testing-library/react'
import { QuestCriteriaStatus, QuestStatus } from 'types'

import { QuestCard } from './QuestCard'

describe('QuestCard', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <QuestCard
        imgSrc="https://via.placeholder.com/150"
        title="Quest Title"
        description="Quest Description"
        questStatus={QuestStatus.notStarted}
        label="Quest Label"
        points={100}
        questCriteria="Quest Criteria"
        questCriteriaStatus={QuestCriteriaStatus.notStarted}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-stretch theme-border rounded-lg overflow-hidden relative h-full"
        >
          <div
            class="w-52 h-52 flex-shrink-0 relative"
            style="background-image: url(https://via.placeholder.com/150);"
          >
            <div
              class="absolute top-2.5 left-2.5 "
            >
              <p
                class="text-base font-normal text-foreground/70 bg-background/70 backdrop-blur-md px-2 py-1 rounded-md theme-border"
              >
                Quest Label
              </p>
            </div>
            <div
              class="w-full h-full bg-cover bg-center"
            />
          </div>
          <div
            class="flex flex-col justify-center -ml-[29px] z-10"
          >
            <div
              class="relative w-[58px] h-[64px]"
            >
              <svg
                fill="none"
                height="64"
                viewBox="0 0 58 64"
                width="58"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-muted shadow-md stroke-primary/20"
                  d="M51.9628 12.6802L34.25 2.45374C31.0013 0.578094 26.9987 0.578094 23.75 2.45374L6.03719 12.6802C2.78848 14.5559 0.787188 18.0222 0.787188 21.7735V42.2265C0.787188 45.9778 2.78848 49.4441 6.03719 51.3198L23.75 61.5463C26.9987 63.4219 31.0013 63.4219 34.25 61.5463L51.9628 51.3198C55.2115 49.4441 57.2128 45.9778 57.2128 42.2265V21.7735C57.2128 18.0222 55.2115 14.5559 51.9628 12.6802Z"
                />
              </svg>
              <div
                class="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  class="text-muted-foreground w-8 h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#await-action"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            class="flex-1 flex flex-col justify-between p-6"
          >
            <div
              class="space-y-2.5"
            >
              <h6
                class="text-primary text-xl font-normal"
              >
                Quest Title
              </h6>
              <p
                class="text-lg font-normal text-foreground/70"
              >
                Quest Description
              </p>
            </div>
            <p
              class="text-base font-medium text-foreground/70 flex items-center gap-2"
            >
              <svg
                class="w-4 h-4 text-muted-foreground"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#circle"
                />
              </svg>
              Quest Criteria
            </p>
          </div>
          <div
            class="flex flex-col gap-2 items-center p-6"
          >
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-4 py-2 gap-3 text-base"
            >
              <svg
                class="w-5 h-5"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#sparkle"
                />
              </svg>
              Start Quest
            </button>
            <p
              class="text-base font-normal text-muted-foreground"
            >
              +100 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when quest status is not started', () => {
    const { asFragment } = render(
      <QuestCard
        imgSrc="https://via.placeholder.com/150"
        title="Quest Title"
        description="Quest Description"
        questStatus={QuestStatus.notStarted}
        label="Quest Label"
        points={100}
        questCriteria="Quest Criteria"
        questCriteriaStatus={QuestCriteriaStatus.notStarted}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-stretch theme-border rounded-lg overflow-hidden relative h-full"
        >
          <div
            class="w-52 h-52 flex-shrink-0 relative"
            style="background-image: url(https://via.placeholder.com/150);"
          >
            <div
              class="absolute top-2.5 left-2.5 "
            >
              <p
                class="text-base font-normal text-foreground/70 bg-background/70 backdrop-blur-md px-2 py-1 rounded-md theme-border"
              >
                Quest Label
              </p>
            </div>
            <div
              class="w-full h-full bg-cover bg-center"
            />
          </div>
          <div
            class="flex flex-col justify-center -ml-[29px] z-10"
          >
            <div
              class="relative w-[58px] h-[64px]"
            >
              <svg
                fill="none"
                height="64"
                viewBox="0 0 58 64"
                width="58"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-muted shadow-md stroke-primary/20"
                  d="M51.9628 12.6802L34.25 2.45374C31.0013 0.578094 26.9987 0.578094 23.75 2.45374L6.03719 12.6802C2.78848 14.5559 0.787188 18.0222 0.787188 21.7735V42.2265C0.787188 45.9778 2.78848 49.4441 6.03719 51.3198L23.75 61.5463C26.9987 63.4219 31.0013 63.4219 34.25 61.5463L51.9628 51.3198C55.2115 49.4441 57.2128 45.9778 57.2128 42.2265V21.7735C57.2128 18.0222 55.2115 14.5559 51.9628 12.6802Z"
                />
              </svg>
              <div
                class="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  class="text-muted-foreground w-8 h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#await-action"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            class="flex-1 flex flex-col justify-between p-6"
          >
            <div
              class="space-y-2.5"
            >
              <h6
                class="text-primary text-xl font-normal"
              >
                Quest Title
              </h6>
              <p
                class="text-lg font-normal text-foreground/70"
              >
                Quest Description
              </p>
            </div>
            <p
              class="text-base font-medium text-foreground/70 flex items-center gap-2"
            >
              <svg
                class="w-4 h-4 text-muted-foreground"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#circle"
                />
              </svg>
              Quest Criteria
            </p>
          </div>
          <div
            class="flex flex-col gap-2 items-center p-6"
          >
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-4 py-2 gap-3 text-base"
            >
              <svg
                class="w-5 h-5"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#sparkle"
                />
              </svg>
              Start Quest
            </button>
            <p
              class="text-base font-normal text-muted-foreground"
            >
              +100 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when quest status is in progress', () => {
    const { asFragment } = render(
      <QuestCard
        imgSrc="https://via.placeholder.com/150"
        title="Quest Title"
        description="Quest Description"
        questStatus={QuestStatus.inProgress}
        label="Quest Label"
        points={100}
        questCriteria="Quest Criteria"
        questCriteriaStatus={QuestCriteriaStatus.notStarted}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-stretch theme-border rounded-lg overflow-hidden relative h-full"
        >
          <div
            class="w-52 h-52 flex-shrink-0 relative"
            style="background-image: url(https://via.placeholder.com/150);"
          >
            <div
              class="absolute top-2.5 left-2.5 "
            >
              <p
                class="text-base font-normal text-foreground/70 bg-background/70 backdrop-blur-md px-2 py-1 rounded-md theme-border"
              >
                Quest Label
              </p>
            </div>
            <div
              class="w-full h-full bg-cover bg-center"
            />
          </div>
          <div
            class="flex flex-col justify-center -ml-[29px] z-10"
          >
            <div
              class="relative w-[58px] h-[64px]"
            >
              <svg
                fill="none"
                height="64"
                viewBox="0 0 58 64"
                width="58"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-muted shadow-md stroke-primary/20"
                  d="M51.9628 12.6802L34.25 2.45374C31.0013 0.578094 26.9987 0.578094 23.75 2.45374L6.03719 12.6802C2.78848 14.5559 0.787188 18.0222 0.787188 21.7735V42.2265C0.787188 45.9778 2.78848 49.4441 6.03719 51.3198L23.75 61.5463C26.9987 63.4219 31.0013 63.4219 34.25 61.5463L51.9628 51.3198C55.2115 49.4441 57.2128 45.9778 57.2128 42.2265V21.7735C57.2128 18.0222 55.2115 14.5559 51.9628 12.6802Z"
                />
              </svg>
              <div
                class="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  class="text-warning w-8 h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#await-action"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            class="flex-1 flex flex-col justify-between p-6"
          >
            <div
              class="space-y-2.5"
            >
              <h6
                class="text-primary text-xl font-normal"
              >
                Quest Title
              </h6>
              <p
                class="text-lg font-normal text-foreground/70"
              >
                Quest Description
              </p>
            </div>
            <p
              class="text-base font-medium text-foreground/70 flex items-center gap-2"
            >
              <svg
                class="w-4 h-4 text-muted-foreground"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#circle"
                />
              </svg>
              Quest Criteria
            </p>
          </div>
          <div
            class="flex flex-col gap-2 items-center p-6"
          >
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-4 py-2 gap-3 text-base"
            >
              <svg
                class="w-5 h-5"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#sparkle"
                />
              </svg>
              Continue Quest
            </button>
            <p
              class="text-base font-normal text-muted-foreground"
            >
              +100 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when quest status is claimable', () => {
    const { asFragment } = render(
      <QuestCard
        imgSrc="https://via.placeholder.com/150"
        title="Quest Title"
        description="Quest Description"
        questStatus={QuestStatus.claimable}
        label="Quest Label"
        points={100}
        questCriteria="Quest Criteria"
        questCriteriaStatus={QuestCriteriaStatus.notStarted}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-stretch theme-border rounded-lg overflow-hidden relative h-full"
        >
          <div
            class="w-52 h-52 flex-shrink-0 relative"
            style="background-image: url(https://via.placeholder.com/150);"
          >
            <div
              class="absolute top-2.5 left-2.5 "
            >
              <p
                class="text-base font-normal text-foreground/70 bg-background/70 backdrop-blur-md px-2 py-1 rounded-md theme-border"
              >
                Quest Label
              </p>
            </div>
            <div
              class="w-full h-full bg-cover bg-center"
            />
          </div>
          <div
            class="flex flex-col justify-center -ml-[29px] z-10"
          >
            <div
              class="relative w-[58px] h-[64px]"
            >
              <svg
                fill="none"
                height="64"
                viewBox="0 0 58 64"
                width="58"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-muted shadow-md stroke-primary/20"
                  d="M51.9628 12.6802L34.25 2.45374C31.0013 0.578094 26.9987 0.578094 23.75 2.45374L6.03719 12.6802C2.78848 14.5559 0.787188 18.0222 0.787188 21.7735V42.2265C0.787188 45.9778 2.78848 49.4441 6.03719 51.3198L23.75 61.5463C26.9987 63.4219 31.0013 63.4219 34.25 61.5463L51.9628 51.3198C55.2115 49.4441 57.2128 45.9778 57.2128 42.2265V21.7735C57.2128 18.0222 55.2115 14.5559 51.9628 12.6802Z"
                />
              </svg>
              <div
                class="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  class="text-success w-8 h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#circle-check"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            class="flex-1 flex flex-col justify-between p-6"
          >
            <div
              class="space-y-2.5"
            >
              <h6
                class="text-primary text-xl font-normal"
              >
                Quest Title
              </h6>
              <p
                class="text-lg font-normal text-foreground/70"
              >
                Quest Description
              </p>
            </div>
            <p
              class="text-base font-medium text-foreground/70 flex items-center gap-2"
            >
              <svg
                class="w-4 h-4 text-muted-foreground"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#circle"
                />
              </svg>
              Quest Criteria
            </p>
          </div>
          <div
            class="flex flex-col gap-2 items-center p-6"
          >
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-4 py-2 gap-3 text-base"
            >
              <svg
                class="w-5 h-5"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#sparkle"
                />
              </svg>
              Continue Quest
            </button>
            <p
              class="text-base font-normal text-foreground"
            >
              +100 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when quest status is completed', () => {
    const { asFragment } = render(
      <QuestCard
        imgSrc="https://via.placeholder.com/150"
        title="Quest Title"
        description="Quest Description"
        questStatus={QuestStatus.completed}
        label="Quest Label"
        points={100}
        questCriteria="Quest Criteria"
        questCriteriaStatus={QuestCriteriaStatus.notStarted}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-stretch theme-border rounded-lg overflow-hidden relative h-full"
        >
          <div
            class="w-52 h-52 flex-shrink-0 relative"
            style="background-image: url(https://via.placeholder.com/150);"
          >
            <div
              class="absolute top-2.5 left-2.5 "
            >
              <p
                class="text-base font-normal text-foreground/70 bg-background/70 backdrop-blur-md px-2 py-1 rounded-md theme-border"
              >
                Quest Label
              </p>
            </div>
            <div
              class="w-full h-full bg-cover bg-center"
            />
          </div>
          <div
            class="flex flex-col justify-center -ml-[29px] z-10"
          >
            <div
              class="relative w-[58px] h-[64px]"
            >
              <svg
                fill="none"
                height="64"
                viewBox="0 0 58 64"
                width="58"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-success shadow-md stroke-primary/20"
                  d="M51.9628 12.6802L34.25 2.45374C31.0013 0.578094 26.9987 0.578094 23.75 2.45374L6.03719 12.6802C2.78848 14.5559 0.787188 18.0222 0.787188 21.7735V42.2265C0.787188 45.9778 2.78848 49.4441 6.03719 51.3198L23.75 61.5463C26.9987 63.4219 31.0013 63.4219 34.25 61.5463L51.9628 51.3198C55.2115 49.4441 57.2128 45.9778 57.2128 42.2265V21.7735C57.2128 18.0222 55.2115 14.5559 51.9628 12.6802Z"
                />
              </svg>
              <div
                class="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  class="text-primary w-8 h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#circle-check"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            class="flex-1 flex flex-col justify-between p-6"
          >
            <div
              class="space-y-2.5"
            >
              <h6
                class="text-primary text-xl font-normal"
              >
                Quest Title
              </h6>
              <p
                class="text-lg font-normal text-foreground/70"
              >
                Quest Description
              </p>
            </div>
            <p
              class="text-base font-medium text-foreground/70 flex items-center gap-2"
            >
              <svg
                class="w-4 h-4 text-muted-foreground"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#circle"
                />
              </svg>
              Quest Criteria
            </p>
          </div>
          <div
            class="flex flex-col gap-2 items-center p-6"
          >
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-4 py-2 gap-3 text-base"
            >
              <svg
                class="w-5 h-5"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#circle-check"
                />
              </svg>
              Completed
            </button>
            <p
              class="text-base font-normal text-success"
            >
              +100 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when quest status is disabled', () => {
    const { asFragment } = render(
      <QuestCard
        imgSrc="https://via.placeholder.com/150"
        title="Quest Title"
        description="Quest Description"
        questStatus={QuestStatus.disabled}
        label="Quest Label"
        points={100}
        questCriteria="Quest Criteria"
        questCriteriaStatus={QuestCriteriaStatus.notStarted}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-stretch theme-border rounded-lg overflow-hidden relative h-full opacity-70"
        >
          <div
            class="w-52 h-52 flex-shrink-0 relative"
            style="background-image: url(https://via.placeholder.com/150);"
          >
            <div
              class="absolute top-2.5 left-2.5 "
            >
              <p
                class="text-base font-normal text-foreground/70 bg-background/70 backdrop-blur-md px-2 py-1 rounded-md theme-border"
              >
                Quest Label
              </p>
            </div>
            <div
              class="w-full h-full bg-cover bg-center"
            />
          </div>
          <div
            class="flex flex-col justify-center -ml-[29px] z-10"
          >
            <div
              class="relative w-[58px] h-[64px]"
            >
              <svg
                fill="none"
                height="64"
                viewBox="0 0 58 64"
                width="58"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-muted shadow-md stroke-primary/20"
                  d="M51.9628 12.6802L34.25 2.45374C31.0013 0.578094 26.9987 0.578094 23.75 2.45374L6.03719 12.6802C2.78848 14.5559 0.787188 18.0222 0.787188 21.7735V42.2265C0.787188 45.9778 2.78848 49.4441 6.03719 51.3198L23.75 61.5463C26.9987 63.4219 31.0013 63.4219 34.25 61.5463L51.9628 51.3198C55.2115 49.4441 57.2128 45.9778 57.2128 42.2265V21.7735C57.2128 18.0222 55.2115 14.5559 51.9628 12.6802Z"
                />
              </svg>
              <div
                class="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  class="text-muted-foreground w-8 h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#await-action"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            class="flex-1 flex flex-col justify-between p-6"
          >
            <div
              class="space-y-2.5"
            >
              <h6
                class="text-primary text-xl font-normal"
              >
                Quest Title
              </h6>
              <p
                class="text-lg font-normal text-foreground/70"
              >
                Quest Description
              </p>
            </div>
            <p
              class="text-base font-medium text-foreground/70 flex items-center gap-2"
            >
              <svg
                class="w-4 h-4 text-muted-foreground"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#circle"
                />
              </svg>
              Quest Criteria
            </p>
          </div>
          <div
            class="flex flex-col gap-2 items-center p-6"
          >
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-4 py-2 gap-3 text-base"
              disabled=""
            >
              <svg
                class="w-5 h-5"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#lock"
                />
              </svg>
              Locked
            </button>
            <p
              class="text-base font-normal text-muted-foreground"
            >
              +100 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when quest criteria status is not started', () => {
    const { asFragment } = render(
      <QuestCard
        imgSrc="https://via.placeholder.com/150"
        title="Quest Title"
        description="Quest Description"
        questStatus={QuestStatus.notStarted}
        label="Quest Label"
        points={100}
        questCriteria="Quest Criteria"
        questCriteriaStatus={QuestCriteriaStatus.notStarted}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-stretch theme-border rounded-lg overflow-hidden relative h-full"
        >
          <div
            class="w-52 h-52 flex-shrink-0 relative"
            style="background-image: url(https://via.placeholder.com/150);"
          >
            <div
              class="absolute top-2.5 left-2.5 "
            >
              <p
                class="text-base font-normal text-foreground/70 bg-background/70 backdrop-blur-md px-2 py-1 rounded-md theme-border"
              >
                Quest Label
              </p>
            </div>
            <div
              class="w-full h-full bg-cover bg-center"
            />
          </div>
          <div
            class="flex flex-col justify-center -ml-[29px] z-10"
          >
            <div
              class="relative w-[58px] h-[64px]"
            >
              <svg
                fill="none"
                height="64"
                viewBox="0 0 58 64"
                width="58"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-muted shadow-md stroke-primary/20"
                  d="M51.9628 12.6802L34.25 2.45374C31.0013 0.578094 26.9987 0.578094 23.75 2.45374L6.03719 12.6802C2.78848 14.5559 0.787188 18.0222 0.787188 21.7735V42.2265C0.787188 45.9778 2.78848 49.4441 6.03719 51.3198L23.75 61.5463C26.9987 63.4219 31.0013 63.4219 34.25 61.5463L51.9628 51.3198C55.2115 49.4441 57.2128 45.9778 57.2128 42.2265V21.7735C57.2128 18.0222 55.2115 14.5559 51.9628 12.6802Z"
                />
              </svg>
              <div
                class="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  class="text-muted-foreground w-8 h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#await-action"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            class="flex-1 flex flex-col justify-between p-6"
          >
            <div
              class="space-y-2.5"
            >
              <h6
                class="text-primary text-xl font-normal"
              >
                Quest Title
              </h6>
              <p
                class="text-lg font-normal text-foreground/70"
              >
                Quest Description
              </p>
            </div>
            <p
              class="text-base font-medium text-foreground/70 flex items-center gap-2"
            >
              <svg
                class="w-4 h-4 text-muted-foreground"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#circle"
                />
              </svg>
              Quest Criteria
            </p>
          </div>
          <div
            class="flex flex-col gap-2 items-center p-6"
          >
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-4 py-2 gap-3 text-base"
            >
              <svg
                class="w-5 h-5"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#sparkle"
                />
              </svg>
              Start Quest
            </button>
            <p
              class="text-base font-normal text-muted-foreground"
            >
              +100 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when quest criteria status is partially fulfilled', () => {
    const { asFragment } = render(
      <QuestCard
        imgSrc="https://via.placeholder.com/150"
        title="Quest Title"
        description="Quest Description"
        questStatus={QuestStatus.notStarted}
        label="Quest Label"
        points={100}
        questCriteria="Quest Criteria"
        questCriteriaStatus={QuestCriteriaStatus.partiallyFulfilled}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-stretch theme-border rounded-lg overflow-hidden relative h-full"
        >
          <div
            class="w-52 h-52 flex-shrink-0 relative"
            style="background-image: url(https://via.placeholder.com/150);"
          >
            <div
              class="absolute top-2.5 left-2.5 "
            >
              <p
                class="text-base font-normal text-foreground/70 bg-background/70 backdrop-blur-md px-2 py-1 rounded-md theme-border"
              >
                Quest Label
              </p>
            </div>
            <div
              class="w-full h-full bg-cover bg-center"
            />
          </div>
          <div
            class="flex flex-col justify-center -ml-[29px] z-10"
          >
            <div
              class="relative w-[58px] h-[64px]"
            >
              <svg
                fill="none"
                height="64"
                viewBox="0 0 58 64"
                width="58"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-muted shadow-md stroke-primary/20"
                  d="M51.9628 12.6802L34.25 2.45374C31.0013 0.578094 26.9987 0.578094 23.75 2.45374L6.03719 12.6802C2.78848 14.5559 0.787188 18.0222 0.787188 21.7735V42.2265C0.787188 45.9778 2.78848 49.4441 6.03719 51.3198L23.75 61.5463C26.9987 63.4219 31.0013 63.4219 34.25 61.5463L51.9628 51.3198C55.2115 49.4441 57.2128 45.9778 57.2128 42.2265V21.7735C57.2128 18.0222 55.2115 14.5559 51.9628 12.6802Z"
                />
              </svg>
              <div
                class="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  class="text-muted-foreground w-8 h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#await-action"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            class="flex-1 flex flex-col justify-between p-6"
          >
            <div
              class="space-y-2.5"
            >
              <h6
                class="text-primary text-xl font-normal"
              >
                Quest Title
              </h6>
              <p
                class="text-lg font-normal text-foreground/70"
              >
                Quest Description
              </p>
            </div>
            <p
              class="text-base font-medium text-warning flex items-center gap-2"
            >
              <svg
                class="w-4 h-4 text-warning"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#circle"
                />
              </svg>
              Quest Criteria
            </p>
          </div>
          <div
            class="flex flex-col gap-2 items-center p-6"
          >
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-4 py-2 gap-3 text-base"
            >
              <svg
                class="w-5 h-5"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#sparkle"
                />
              </svg>
              Start Quest
            </button>
            <p
              class="text-base font-normal text-muted-foreground"
            >
              +100 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when quest criteria status is fulfilled', () => {
    const { asFragment } = render(
      <QuestCard
        imgSrc="https://via.placeholder.com/150"
        title="Quest Title"
        description="Quest Description"
        questStatus={QuestStatus.notStarted}
        label="Quest Label"
        points={100}
        questCriteria="Quest Criteria"
        questCriteriaStatus={QuestCriteriaStatus.fulfilled}
      />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex items-stretch theme-border rounded-lg overflow-hidden relative h-full"
        >
          <div
            class="w-52 h-52 flex-shrink-0 relative"
            style="background-image: url(https://via.placeholder.com/150);"
          >
            <div
              class="absolute top-2.5 left-2.5 "
            >
              <p
                class="text-base font-normal text-foreground/70 bg-background/70 backdrop-blur-md px-2 py-1 rounded-md theme-border"
              >
                Quest Label
              </p>
            </div>
            <div
              class="w-full h-full bg-cover bg-center"
            />
          </div>
          <div
            class="flex flex-col justify-center -ml-[29px] z-10"
          >
            <div
              class="relative w-[58px] h-[64px]"
            >
              <svg
                fill="none"
                height="64"
                viewBox="0 0 58 64"
                width="58"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-muted shadow-md stroke-primary/20"
                  d="M51.9628 12.6802L34.25 2.45374C31.0013 0.578094 26.9987 0.578094 23.75 2.45374L6.03719 12.6802C2.78848 14.5559 0.787188 18.0222 0.787188 21.7735V42.2265C0.787188 45.9778 2.78848 49.4441 6.03719 51.3198L23.75 61.5463C26.9987 63.4219 31.0013 63.4219 34.25 61.5463L51.9628 51.3198C55.2115 49.4441 57.2128 45.9778 57.2128 42.2265V21.7735C57.2128 18.0222 55.2115 14.5559 51.9628 12.6802Z"
                />
              </svg>
              <div
                class="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  class="text-muted-foreground w-8 h-8"
                >
                  <use
                    href="/src/components/Icon/Icon.sprites.svg#await-action"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            class="flex-1 flex flex-col justify-between p-6"
          >
            <div
              class="space-y-2.5"
            >
              <h6
                class="text-primary text-xl font-normal"
              >
                Quest Title
              </h6>
              <p
                class="text-lg font-normal text-foreground/70"
              >
                Quest Description
              </p>
            </div>
            <p
              class="text-base font-medium text-success flex items-center gap-2"
            >
              <svg
                class="w-4 h-4 text-success"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#circle-check-filled"
                />
              </svg>
              Quest Criteria
            </p>
          </div>
          <div
            class="flex flex-col gap-2 items-center p-6"
          >
            <button
              class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle px-4 py-2 gap-3 text-base"
            >
              <svg
                class="w-5 h-5"
              >
                <use
                  href="/src/components/Icon/Icon.sprites.svg#sparkle"
                />
              </svg>
              Start Quest
            </button>
            <p
              class="text-base font-normal text-muted-foreground"
            >
              +100 Points
            </p>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
