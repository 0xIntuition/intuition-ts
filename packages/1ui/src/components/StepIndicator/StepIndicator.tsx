import * as React from 'react'

import { Text, TextVariant } from 'components/Text'

import { cn } from '../../styles'
import { Button, ButtonProps, ButtonVariant } from '../Button'
import { Icon, IconName } from '../Icon'

export type StepStatus = 'upcoming' | 'current' | 'completed'

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
      className="flex items-center justify-center space-x-1"
      role="navigation"
      aria-label="Step progress"
    >
      {steps.map((step, index) => (
        <React.Fragment key={String(step.id)}>
          <button
            type="button"
            role="tab"
            className={cn('flex items-center', {
              'cursor-pointer':
                step.status === 'completed' || step.status === 'current',
            })}
            onClick={() => onStepClick(step.id)}
          >
            <div
              className={cn(
                'flex items-center justify-center w-5 h-5 rounded-full border',
                {
                  'bg-accent border-accent text-accent-foreground':
                    step.status === 'completed',
                  'border-accent bg-accent/10 text-accent':
                    step.status === 'current',
                  'border-[#1A1A1A] text-muted-foreground':
                    step.status === 'upcoming',
                },
              )}
            >
              {step.status === 'completed' ? (
                <Icon name={IconName.checkmark} className="h-2.5 w-2.5" />
              ) : (
                <Text variant={TextVariant.body}>{index + 1}</Text>
              )}
            </div>
            <Text
              variant={TextVariant.body}
              className={cn('ml-1.5', {
                'text-primary font-medium': step.status === 'current',
                'text-muted-foreground': step.status !== 'current',
              })}
            >
              {step.label}
            </Text>
          </button>
          {index < steps.length - 1 && (
            <Icon
              name={IconName.chevronRight}
              className={cn('h-3 w-3', {
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
      <div className="flex-none">
        {onBack &&
          (customBackButton ? (
            <Button
              variant={ButtonVariant.secondary}
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
            >
              Back
            </Button>
          ))}
      </div>
      <div className="flex-1 flex justify-center">{StepIndicatorContent}</div>
      <div className="flex-none">
        {onNext &&
          (customNextButton ? (
            <Button
              variant={ButtonVariant.secondary}
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
            >
              Next
            </Button>
          ))}
      </div>
    </div>
  )
}
