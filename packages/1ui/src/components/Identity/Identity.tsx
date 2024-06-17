import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { Icon } from '..'
import { cn } from '../../styles'

export enum IdentitySize {
  Sm = 'sm',
  Default = 'default',
  Md = 'md',
  Lg = 'lg',
  Xl = 'xl',
}

export enum IdentityVariant {
  Default = 'default',
  User = 'user',
}

export const identityVariants = cva(
  'border border-border/20 font-medium py-1 px-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center',
  {
    variants: {
      variant: {
        [IdentityVariant.Default]: '',
        [IdentityVariant.User]:
          'rounded-full [&>span]:rounded-full [&>span]:overflow-hidden',
      },
      size: {
        [IdentitySize.Default]: 'text-sm [&>span]:h-4 [&>span]:w-4',
        [IdentitySize.Sm]:
          'text-base [&>span]:h-[1.375rem] [&>span]:w-[1.375rem]',
        [IdentitySize.Md]: 'text-lg [&>span]:h-6 [&>span]:w-6',
        [IdentitySize.Lg]: 'text-xl [&>span]:h-8 [&>span]:w-8',
        [IdentitySize.Xl]: 'text-2xl [&>span]:h-10 [&>span]:w-10',
      },
      disabled: {
        true: 'disabled:bg-muted disabled:text-muted-foreground disabled:border-muted cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: IdentityVariant.Default,
      size: IdentitySize.Default,
      disabled: false,
    },
  },
)

export interface IdentityProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof identityVariants> {
  disabled?: boolean
  imgSrc?: string
}

const Identity = ({
  className,
  imgSrc,
  variant,
  size,
  disabled,
  children,
  ...props
}: IdentityProps) => {
  return (
    <button
      className={cn(identityVariants({ variant, size, disabled }), className)}
      disabled={disabled}
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
