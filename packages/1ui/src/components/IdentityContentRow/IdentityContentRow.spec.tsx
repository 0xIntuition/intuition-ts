import React from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { IdentityContentRow } from './IdentityContentRow'

describe('IdentityContentRow', () => {
  it('should render with required props', () => {
    render(
      <IdentityContentRow
        variant="user"
        name="John Doe"
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        amount="1.210 ETH"
        totalFollowers={305}
      />,
    )

    expect(screen.getByText('John Doe')).toBeDefined()
    expect(screen.getByText('1.210 ETH')).toBeDefined()
    expect(screen.getByText('305')).toBeDefined()
    expect(screen.getByText('0x1234...cdef')).toBeDefined()
  })

  // Test if the component renders with tags
  it('should render with tags', () => {
    const tags = [
      { label: 'keyboard', value: 34 },
      { label: 'ergonomic', value: 56 },
      { label: 'wireless', value: 12 },
      { label: 'gaming', value: 77 },
      { label: 'work', value: 11 },
      { label: 'home', value: 34 },
    ]

    render(
      <IdentityContentRow
        variant="user"
        name="John Doe"
        walletAddress="0x1234567890abcdef1234567890abcdef12345678"
        avatarSrc="https://avatars.githubusercontent.com/u/94311139?s=200&v=4"
        amount="1.210 ETH"
        totalFollowers={305}
        tags={tags}
      />,
    )

    expect(screen.getByText('keyboard')).toBeDefined()
    expect(screen.getByText('ergonomic')).toBeDefined()
    expect(screen.getByText('wireless')).toBeDefined()
    expect(screen.getByText('gaming')).toBeDefined()
    // Ensure only the first 4 tags are rendered
    expect(screen.queryByText('work')).not.toBeDefined()
    expect(screen.queryByText('home')).not.toBeDefined()
  })

  // Test if the component renders children
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

  // Snapshot test
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
