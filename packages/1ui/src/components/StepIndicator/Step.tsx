import { ComponentProps } from 'react'

import { cn } from '../../styles'
import { Text, TextVariant } from '../Text'

export type StepStatus = 'upcoming' | 'current' | 'completed'

interface StepProps {
  step: number
  label: string
  status: StepStatus
  onClick?: () => void
}

function CheckIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export function Step({ step, label, status, onClick }: StepProps) {
  return (
    <button
      type="button"
      role="tab"
      className={cn('flex items-center', {
        'cursor-pointer': status === 'completed' || status === 'current',
      })}
      onClick={onClick}
    >
      <div className="relative">
        <div
          className={cn(
            'relative flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-200 bg-accent border-accent text-accent-foreground',
            {
              'scale-110': status !== 'completed',
              'border-[#1A1A1A] bg-muted text-muted-foreground':
                status === 'upcoming',
            },
          )}
        >
          <div className="flex items-center justify-center">
            {status === 'completed' ? (
              <CheckIcon className="h-4 w-4 text-white" />
            ) : (
              <Text variant={TextVariant.body}>{step}</Text>
            )}
          </div>
        </div>
      </div>
      <Text
        variant={TextVariant.body}
        className={cn('ml-1.5 hidden md:block', {
          'text-primary font-medium': status === 'current',
          'text-muted-foreground': status !== 'current',
        })}
      >
        {label}
      </Text>
    </button>
  )
}
