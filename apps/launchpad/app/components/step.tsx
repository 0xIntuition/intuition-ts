import * as React from 'react'
import { ComponentProps } from 'react'

import { motion } from 'framer-motion'

export default function Step({
  step,
  currentStep,
}: {
  step: number
  currentStep: number
}) {
  const status =
    currentStep === step
      ? 'active'
      : currentStep < step
        ? 'inactive'
        : 'complete'

  return (
    <motion.div animate={status} className="relative">
      <motion.div
        variants={{
          active: {
            scale: 1,
            transition: {
              delay: 0,
              duration: 0.2,
            },
          },
          complete: {
            scale: 1.25,
          },
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          type: 'tween',
          ease: 'circOut',
        }}
        className="absolute inset-0 rounded-full"
      />

      <motion.div
        initial={false}
        variants={{
          inactive: {
            backgroundColor: 'var(--muted)', // muted-foreground
            borderColor: 'var(--muted)',
            color: 'var(--muted-foreground)', // muted-foreground
          },
          active: {
            backgroundColor: 'var(--accent)',
            borderColor: 'var(--accent)',
            color: 'var(--accent-foreground)',
          },
          complete: {
            backgroundColor: 'var(--accent)',
            borderColor: 'var(--accent)',
            color: 'var(--accent-foreground)',
          },
        }}
        transition={{ duration: 0.2 }}
        className="relative flex h-5 w-5 items-center justify-center rounded-full border font-medium text-sm"
      >
        <div className="flex items-center justify-center">
          {status === 'complete' ? (
            <CheckIcon className="h-4 w-4 text-white" />
          ) : (
            <span>{step}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
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
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.2,
          type: 'tween',
          ease: 'easeOut',
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}
