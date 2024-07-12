import { render } from '@testing-library/react'

import { QuestStatusIndicator } from './QuestStatusIndicator'

describe('QuestStatusIndicator', () => {
  it('should render appropriate elements when given `not-started` status', () => {
    const { asFragment } = render(<QuestStatusIndicator status="not-started" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
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
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when given `in-progress` status', () => {
    const { asFragment } = render(<QuestStatusIndicator status="in-progress" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
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
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when given `claimable` status', () => {
    const { asFragment } = render(<QuestStatusIndicator status="claimable" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
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
      </DocumentFragment>
    `)
  })

  it('should render appropriate elements when given `completed` status', () => {
    const { asFragment } = render(<QuestStatusIndicator status="completed" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
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
      </DocumentFragment>
    `)
  })
})
