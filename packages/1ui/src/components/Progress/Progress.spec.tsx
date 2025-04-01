import * as React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'

import { Progress } from './Progress'

describe('Progress', () => {
  it('renders with default value', () => {
    render(<Progress value={0} />)
    const progress = screen.getByRole('progressbar')
    expect(progress).toBeInTheDocument()
  })

  it('renders with custom value', () => {
    render(<Progress value={50} />)
    const progress = screen.getByRole('progressbar')
    expect(progress).toHaveAttribute('data-value', '50')
  })

  it('applies custom className', () => {
    render(<Progress value={50} className="custom-class" />)
    const progress = screen.getByRole('progressbar')
    expect(progress).toHaveClass('custom-class')
  })

  it('renders in indeterminate state when no value provided', () => {
    render(<Progress />)
    const progress = screen.getByRole('progressbar')
    expect(progress).not.toHaveAttribute('data-value')
  })
})
