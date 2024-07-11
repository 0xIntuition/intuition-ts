import { render } from '@testing-library/react'

import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  const testCases = Array.from({ length: 11 }, (_, i) => i * 10)

  testCases.forEach((percentage) => {
    it(`should render appropriate element for ${percentage}%`, () => {
      const { asFragment } = render(<ProgressBar percentage={percentage} />)
      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="flex items-center h-[6px] mb-4"
          >
            <span
              class="h-full block rounded-l-sm bg-primary"
              style="min-width: ${percentage}%;"
            />
            <span
              class="h-full w-full block rounded-r-sm bg-muted"
            />
          </div>
        </DocumentFragment>
      `)
    })
  })
})
