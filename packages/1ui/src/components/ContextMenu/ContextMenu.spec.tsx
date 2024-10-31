import React from 'react'

import { render } from '@testing-library/react'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './ContextMenu'

describe('ContextMenu', () => {
  it('should render basic context menu', () => {
    const { asFragment } = render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem>Settings</ContextMenuItem>
          <ContextMenuItem>Logout</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <span
          data-state="closed"
        >
          Right click me
        </span>
      </DocumentFragment>
    `)
  })
})
