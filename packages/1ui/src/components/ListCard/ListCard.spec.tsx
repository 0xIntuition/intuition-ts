import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import { Currency } from 'types'

import { ListCard } from './ListCard'

describe('ListCard', () => {
  const defaultProps = {
    displayName: 'Test List',
    imgSrc: 'test-image.jpg',
    identitiesCount: 42,
    savedAmount: '4.928',
    currency: Currency.ETH,
  }

  it('renders correctly with all props', () => {
    const { asFragment } = render(<ListCard {...defaultProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('calls onViewClick when view button is clicked', () => {
    const onViewClick = jest.fn()
    render(<ListCard {...defaultProps} onViewClick={onViewClick} />)

    fireEvent.click(screen.getByText('View List'))
    expect(onViewClick).toHaveBeenCalled()
  })

  it('calls onSaveClick when save button is clicked', () => {
    const onSaveClick = jest.fn()
    render(<ListCard {...defaultProps} onSaveClick={onSaveClick} />)

    fireEvent.click(screen.getByRole('button', { name: /save/i }))
    expect(onSaveClick).toHaveBeenCalled()
  })
})
