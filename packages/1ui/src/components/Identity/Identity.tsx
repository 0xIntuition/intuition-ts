import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { Icon } from '..'
import { cn } from '../../styles'

const identityVariants = cva(
  'border border-solid border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center',
  {
    variants: {
      variant: {
        default: '',
        user: 'rounded-full [&>span]:rounded-full [&>span]:overflow-hidden',
      },
      size: {
        sm: 'text-sm [&>span]:h-4 [&>span]:w-4',
        default: 'text-base [&>span]:h-[1.375rem] [&>span]:w-[1.375rem]',
        md: 'text-lg [&>span]:h-6 [&>span]:w-6',
        lg: 'text-xl [&>span]:h-8 [&>span]:w-8',
        xl: 'text-2xl [&>span]:h-10 [&>span]:w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)
export interface IdentityProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof identityVariants> {
  imgSrc?: string
}

const Identity = ({
  className,
  imgSrc,
  variant,
  size,
  children,
  ...props
}: IdentityProps) => {
  return (
    <button
      className={cn(identityVariants({ variant, size }), className)}
      {...props}
    >
      <span>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="identity avatar"
            className="h-full w-full rounded-full"
          />
        ) : (
          <span className="bg-primary/15 p-[10%] flex justify-center items-center h-full w-full">
            <Icon name="fingerprint" className="h-full w-full" />
          </span>
        )}
      </span>
      {children}
    </button>
  )
}

export { Identity }
