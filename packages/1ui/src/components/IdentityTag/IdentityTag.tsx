import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import { Identity, IdentityType } from 'types'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  IconName,
} from '..'
import { cn } from '../../styles'

export const IdentityTagSize = {
  default: 'default',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
} as const
export type IdentityTagSizeType = keyof typeof IdentityTagSize

export const identityTagVariants = cva(
  'theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/20 disabled:pointer-events-none flex gap-2 items-center',
  {
    variants: {
      variant: {
        [Identity.user]:
          'rounded-full [&>span]:rounded-full [&>span]:overflow-hidden',
        [Identity.nonUser]: 'rounded-sm',
      },
      size: {
        [IdentityTagSize.default]: 'text-base [&>span]:h-6 [&>span]:w-6',
        [IdentityTagSize.md]: 'text-base [&>span]:h-7 [&>span]:w-7',
        [IdentityTagSize.lg]: 'text-lg [&>span]:h-8 [&>span]:w-8',
        [IdentityTagSize.xl]: 'text-xl [&>span]:h-11 [&>span]:w-11',
      },
      disabled: {
        true: 'disabled:bg-muted disabled:text-muted-foreground disabled:border-muted cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: Identity.user,
      size: IdentityTagSize.default,
      disabled: false,
    },
  },
)

const IdentityTagButton = ({
  className,
  imgSrc,
  variant,
  size,
  disabled,
  children,
  ...props
}: IdentityTagProps) => {
  return (
    <button
      className={cn(
        identityTagVariants({ variant, size, disabled }),
        className,
      )}
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
            <Icon name={IconName.fingerprint} className="h-full w-full" />
          </span>
        )}
      </span>
      {children}
    </button>
  )
}

export interface IdentityTagProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof identityTagVariants> {
  disabled?: boolean
  imgSrc?: string | null
  variant?: IdentityType
  hoverCardContent?: React.ReactNode | null
}

const IdentityTag = ({
  hoverCardContent = null,
  ...props
}: IdentityTagProps) => {
  return hoverCardContent ? (
    <HoverCard>
      <HoverCardTrigger>
        <IdentityTagButton {...props} />
      </HoverCardTrigger>
      <HoverCardContent>{hoverCardContent}</HoverCardContent>
    </HoverCard>
  ) : (
    <IdentityTagButton {...props} />
  )
}

export { IdentityTag }
