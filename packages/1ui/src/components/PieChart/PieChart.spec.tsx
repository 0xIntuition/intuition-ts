import React from 'react'

import { render } from '@testing-library/react'

import { PieChart } from './PieChart'

describe('PieChart', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(<PieChart percentage={50} />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="grid"
        >
          <span
            class="col-[1] row-[1] rounded-full block"
            style="height: 80px; width: 80px; mask: radial-gradient(farthest-side,#0000 calc(99% - 10px),#000 calc(100% - 10px);"
          />
          <span
            class="col-[1] row-[1] border-muted-foreground rounded-full block"
            style="border-width: 10px;"
          />
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given size `sm`', () => {
    const { asFragment } = render(<PieChart percentage={25} size="sm" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="grid"
        >
          <span
            class="col-[1] row-[1] rounded-full block"
            style="height: 22px; width: 22px; mask: radial-gradient(farthest-side,#0000 calc(99% - 2px),#000 calc(100% - 2px);"
          />
          <span
            class="col-[1] row-[1] border-muted-foreground rounded-full block"
            style="border-width: 2px;"
          />
        </div>
      </DocumentFragment>
    `)
  })
  it('should render appropriate element when given size `lg`', () => {
    const { asFragment } = render(<PieChart percentage={75} size="lg" />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="grid"
        >
          <span
            class="col-[1] row-[1] rounded-full block"
            style="height: 120px; width: 120px; mask: radial-gradient(farthest-side,#0000 calc(99% - 14px),#000 calc(100% - 14px);"
          />
          <span
            class="col-[1] row-[1] border-muted-foreground rounded-full block"
            style="border-width: 14px;"
          />
        </div>
      </DocumentFragment>
    `)
  })
})
