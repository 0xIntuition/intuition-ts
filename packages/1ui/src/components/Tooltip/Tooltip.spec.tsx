import React from 'react'
import { render } from '@testing-library/react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './Tooltip'

describe('Tooltip', () => {
  it('should render appropriate element', async () => {
    const { asFragment } = render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Hover</button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Text</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          data-state="closed"
        >
          Hover
        </button>
      </DocumentFragment>
    `)
  })
})
