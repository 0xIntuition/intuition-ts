import React from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { IdentityContentRow } from './IdentityContentRow'

describe('IdentityContentRow', () => {
  it('should render children', () => {
    render(
      <IdentityContentRow
        variant="user"
        name="John Doe"
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        amount="1.210 ETH"
        totalFollowers={305}
      >
        <p>Extra Content</p>
      </IdentityContentRow>,
    )

    expect(screen.getByText('Extra Content')).toBeDefined()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <IdentityContentRow
        variant="user"
        name="John Doe"
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        amount="1.210 ETH"
        totalFollowers={305}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
