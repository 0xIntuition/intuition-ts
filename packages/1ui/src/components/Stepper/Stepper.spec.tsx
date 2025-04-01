import React from 'react'

import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'

import { Stepper } from './Stepper'

const mockSteps = [
  { id: 1, label: 'Step 1' },
  { id: 2, label: 'Step 2' },
  { id: 3, label: 'Step 3' },
]

describe('Stepper', () => {
  it('renders all steps', () => {
    const { container } = render(<Stepper steps={mockSteps} currentStep={1} />)
    const stepElements = container.querySelectorAll('.rounded-full')
    expect(stepElements).toHaveLength(3)
  })

  it('shows current step correctly', () => {
    const { container } = render(<Stepper steps={mockSteps} currentStep={2} />)
    const stepElements = container.querySelectorAll('.rounded-full')
    expect(stepElements[1]).toHaveClass('border-accent')
  })

  it('disables back button on first step', () => {
    const { getByText } = render(<Stepper steps={mockSteps} currentStep={1} />)
    const backButton = getByText('Back')
    expect(backButton).toBeDisabled()
  })

  it('disables next button on last step', () => {
    const { getByText } = render(<Stepper steps={mockSteps} currentStep={3} />)
    const nextButton = getByText('Next')
    expect(nextButton).toBeDisabled()
  })

  it('calls onNext when next button is clicked', () => {
    const onNext = vi.fn()
    const { getByText } = render(
      <Stepper steps={mockSteps} currentStep={1} onNext={onNext} />,
    )
    const nextButton = getByText('Next')
    fireEvent.click(nextButton)
    expect(onNext).toHaveBeenCalled()
  })

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn()
    const { getByText } = render(
      <Stepper steps={mockSteps} currentStep={2} onBack={onBack} />,
    )
    const backButton = getByText('Back')
    fireEvent.click(backButton)
    expect(onBack).toHaveBeenCalled()
  })

  it('respects disableNext prop', () => {
    const { getByText } = render(
      <Stepper steps={mockSteps} currentStep={1} disableNext />,
    )
    const nextButton = getByText('Next')
    expect(nextButton).toBeDisabled()
  })

  it('respects disableBack prop', () => {
    const { getByText } = render(
      <Stepper steps={mockSteps} currentStep={2} disableBack />,
    )
    const backButton = getByText('Back')
    expect(backButton).toBeDisabled()
  })
})
