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
            style="height: 80px; width: 80px; border-width: 10px;"
          />
        </div>
      </DocumentFragment>
    `)
  })
})
