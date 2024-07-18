import { render } from '@testing-library/react'

import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(<Skeleton className="h-[1rem] w-20" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="animate-pulse rounded-md bg-muted h-[1rem] w-20"
        />
      </DocumentFragment>
    `)
  })
})
