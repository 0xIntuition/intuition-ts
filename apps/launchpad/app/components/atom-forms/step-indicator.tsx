import * as React from 'react'

import { cn, Icon, IconName } from '@0xintuition/1ui'

import Step from '../step'

type Step = {
  id: string
  label: string
  status: 'upcoming' | 'current' | 'completed'
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: string
  onStepClick: (stepId: string) => void
}

export function StepIndicator({
  steps,
  currentStep,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div
      className="flex items-center md:justify-between space-x-2"
      role="navigation"
      aria-label="Step progress"
    >
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <button
            type="button"
            role="tab"
            className={cn('flex items-center', {
              'cursor-pointer':
                step.status === 'completed' || step.status === 'current',
            })}
            onClick={() => onStepClick(step.id)}
          >
            <Step
              step={index + 1}
              currentStep={steps.findIndex((s) => s.id === currentStep) + 1}
            />
            <span
              className={`ml-2 text-sm ${
                step.status === 'current'
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </span>
          </button>
          {index < steps.length - 1 && (
            <Icon
              name={IconName.chevronRight}
              className={`h-4 w-4 ${
                step.status === 'completed' ? 'text-primary' : 'text-border/50'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
