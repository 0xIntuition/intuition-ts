import React from 'react'

import { render } from '@testing-library/react'

import { Button, Popover, PopoverContent, PopoverTrigger, Text } from '..'

describe('Popover', () => {
  it('should render appropriate elements', () => {
    const { asFragment } = render(
      <Popover>
        <PopoverTrigger>
          <Button size="lg">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text variant="bodyLarge">Popover Content</Text>
          <Text variant="body">
            Here is some very long content to test out this popover. It is good
            to see how it looks with lots of text!
          </Text>
        </PopoverContent>
      </Popover>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          aria-controls="radix-:r0:"
          aria-expanded="false"
          aria-haspopup="dialog"
          data-state="closed"
          type="button"
        />
        <button
          class="flex justify-center items-center font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full shadow-md-subtle px-4 py-2 gap-2 text-base"
        >
          Open popover
        </button>
      </DocumentFragment>
    `)
  })
})
