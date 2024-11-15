import * as React from 'react'

import { Icon, IconName } from '@0xintuition/1ui'

type Step = {
  id: string
  label: string
  status: 'upcoming' | 'current' | 'completed'
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: string
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center space-x-2">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center">
            <div
              className={`rounded-full p-2 ${
                step.status === 'completed'
                  ? 'bg-primary text-primary-foreground'
                  : step.status === 'current'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.status === 'completed' ? (
                <Icon name={IconName.checkmark} className="h-4 w-4" />
              ) : (
                <span className="h-4 w-4 flex items-center justify-center text-sm">
                  {index + 1}
                </span>
              )}
            </div>
            <span
              className={`ml-2 text-sm ${
                step.status === 'current'
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-px w-8 ${
                step.status === 'completed' ? 'bg-primary' : 'bg-border'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
