import React from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { IdentityPosition } from './IdentityPosition'

describe('IdentityPosition', () => {
  it('should render children', () => {
    render(
      <IdentityPosition
        variant="user"
        name="John Doe"
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        amount={1.21}
      >
        <p>Extra Content</p>
      </IdentityPosition>,
    )

    expect(screen.getByText('Extra Content')).toBeDefined()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <IdentityPosition
        variant="user"
        name="John Doe"
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        amount={1.21}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
