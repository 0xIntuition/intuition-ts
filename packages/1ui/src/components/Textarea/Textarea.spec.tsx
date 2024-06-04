import React from 'react'

import { render } from '@testing-library/react'

import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <Textarea placeholder="This is a placeholder." />,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <textarea
          class="flex min-h-[80px] w-full rounded-md border border-solid border-input/30 bg-primary/10 px-3 py-2 text-sm ring-offset-background placeholder:text-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="This is a placeholder."
        />
      </DocumentFragment>
    `)
  })
})
