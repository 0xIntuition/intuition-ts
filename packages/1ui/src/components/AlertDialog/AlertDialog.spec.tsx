import React from 'react'

import { render } from '@testing-library/react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './AlertDialog'

describe('AlertDialog', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <AlertDialog>
        <AlertDialogTrigger>Open alert dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
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
          Open alert dialog
        </button>
      </DocumentFragment>
    `)
  })
})
