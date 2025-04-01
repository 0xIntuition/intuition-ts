import * as React from 'react'

import { cn } from '../../styles'
import { Button, ButtonProps, ButtonSize, ButtonVariant } from '../Button'
import { Icon, IconName } from '../Icon'
import { Step, StepStatus } from './Step'

export type { StepStatus }

export type Step<T = string> = {
  id: T
  label: string
  status: StepStatus
}

export type CustomButtonConfig = {
  content: React.ReactNode
  props?: Omit<ButtonProps, 'children'>
}

export interface StepIndicatorProps<T = string> {
  steps: Step<T>[]
  onStepClick: (stepId: T) => void
  showNavigation?: boolean
  onNext?: () => void
  onBack?: () => void
  disableNext?: boolean
  disableBack?: boolean
  className?: string
  /** Override the next button with custom content */
  customNextButton?: CustomButtonConfig
  /** Override the back button with custom content */
  customBackButton?: CustomButtonConfig
}

export function StepIndicator<T = string>({
  steps,
  onStepClick,
  showNavigation,
  onNext,
  onBack,
  disableNext,
  disableBack,
  className,
  customNextButton,
  customBackButton,
}: StepIndicatorProps<T>) {
  const StepIndicatorContent = (
    <div
      className="flex items-center justify-between md:space-x-2 w-full md:px-8"
      role="navigation"
      aria-label="Step progress"
    >
      {steps.map((step, index) => (
        <React.Fragment key={String(step.id)}>
          <Step
            step={index + 1}
            label={step.label}
            status={step.status}
            onClick={() => onStepClick(step.id)}
          />
          {index < steps.length - 1 && (
            <Icon
              name={IconName.chevronRight}
              className={cn('h-4 w-4', {
                'text-primary': step.status === 'completed',
                'text-border/50': step.status !== 'completed',
              })}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )

  if (!showNavigation) {
    return StepIndicatorContent
  }

  return (
    <div className={cn('flex items-center gap-6 w-full', className)}>
      <div className={`flex-none ${!onBack && 'opacity-0'}`}>
        {customBackButton ? (
          <Button
            variant={ButtonVariant.secondary}
            size={ButtonSize.md}
            {...customBackButton.props}
            onClick={onBack}
            disabled={disableBack}
            className={cn(customBackButton.props?.className)}
          >
            {customBackButton.content}
          </Button>
        ) : (
          <Button
            onClick={onBack}
            disabled={disableBack}
            variant={ButtonVariant.secondary}
            size={ButtonSize.md}
          >
            Back
          </Button>
        )}
      </div>
      <div className="flex-1 flex w-full justify-between">
        {StepIndicatorContent}
      </div>
      <div className="flex-none">
        {onNext &&
          (customNextButton ? (
            <Button
              variant={ButtonVariant.secondary}
              size={ButtonSize.md}
              {...customNextButton.props}
              onClick={onNext}
              disabled={disableNext}
              className={cn(customNextButton.props?.className)}
            >
              {customNextButton.content}
            </Button>
          ) : (
            <Button
              onClick={onNext}
              disabled={disableNext}
              variant={ButtonVariant.secondary}
              size={ButtonSize.md}
            >
              Next
            </Button>
          ))}
      </div>
    </div>
  )
}
