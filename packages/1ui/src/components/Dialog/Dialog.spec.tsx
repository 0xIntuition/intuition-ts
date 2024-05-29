import React from 'react'

import { render } from '@testing-library/react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog'

describe('Dialog', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          aria-controls="radix-:r0:"
          aria-expanded="false"
          aria-haspopup="dialog"
          data-state="closed"
          type="button"
        >
          Open dialog
        </button>
      </DocumentFragment>
    `)
  })
})
