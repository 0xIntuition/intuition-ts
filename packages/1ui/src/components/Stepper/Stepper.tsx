import * as React from 'react'

import { Button } from 'components/Button'
import { cn } from 'styles'

export interface StepperProps {
  steps: {
    id: string | number
    label: string
  }[]
  currentStep: string | number
  onNext?: () => void
  onBack?: () => void
  disableNext?: boolean
  disableBack?: boolean
  className?: string
}

export function Stepper({
  steps,
  currentStep,
  onNext,
  onBack,
  disableNext,
  disableBack,
  className,
}: StepperProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full border transition-colors',
                  currentIndex === index
                    ? 'border-accent bg-accent/10 text-accent'
                    : index < currentIndex
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-[#1A1A1A] text-muted-foreground',
                )}
              >
                {index < currentIndex ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
              <span className="text-sm text-muted-foreground">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-[1px]',
                  index < currentIndex ? 'bg-accent' : 'bg-[#1A1A1A]',
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Button
          variant="secondary"
          onClick={onBack}
          disabled={disableBack || currentIndex === 0}
        >
          Back
        </Button>
        <Button
          variant="secondary"
          onClick={onNext}
          className="bg-[#1A1A1A]"
          disabled={disableNext || currentIndex === steps.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
