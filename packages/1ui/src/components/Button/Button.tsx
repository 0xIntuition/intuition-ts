import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { Icon, IconName } from '..'
import { cn } from '../../styles'

export const ButtonVariant = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'ghost',
  text: 'text',
  accent: 'accent',
  warning: 'warning',
  success: 'success',
  destructive: 'destructive',
  navigation: 'navigation',
  accentOutline: 'accentOutline',
  warningOutline: 'warningOutline',
  successOutline: 'successOutline',
  destructiveOutline: 'destructiveOutline',
  for: 'for',
  against: 'against',
}

export const ButtonSize = {
  default: 'default',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  icon: 'icon',
  iconMd: 'iconMd',
  iconLg: 'iconLg',
  iconXl: 'iconXl',
}

const buttonVariants = cva(
  'flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted',
  {
    variants: {
      variant: {
        [ButtonVariant.primary]:
          'bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full shadow-md-subtle',
        [ButtonVariant.secondary]:
          'primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted shadow-md-subtle',
        [ButtonVariant.ghost]:
          'bg-gradient-to-b from-transparent to-transparent text-primary/70 border-primary/70 rounded-lg hover:text-primary hover:border-primary disabled:bg-transparent aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle',
        [ButtonVariant.text]:
          'bg-transparent text-primary/70 border-transparent hover:text-primary disabled:border-transparent disabled:bg-transparent shadow-md-subtle',
        [ButtonVariant.accent]:
          'bg-accent text-accent-foreground border-accent rounded-full hover:bg-accent/70 hover:border-accent/30 shadow-md-subtle',
        [ButtonVariant.warning]:
          'bg-warning text-warning-foreground border-warning rounded-full hover:bg-warning/70 hover:border-warning/30 shadow-md-subtle',
        [ButtonVariant.success]:
          'bg-success text-success-foreground border-success rounded-full hover:bg-success/70 hover:border-success/30 shadow-md-subtle',
        [ButtonVariant.destructive]:
          'bg-destructive text-destructive-foreground border-destructive rounded-full hover:bg-destructive/70 hover:border-destructive/30 shadow-md-subtle',
        [ButtonVariant.navigation]:
          'bg-transparent text-secondary-foreground/70 border-transparent rounded-lg  hover:text-secondary-foreground hover:border-border/20 aria-selected:bg-primary/10 aria-selected:text-secondary-foreground/80 disabled:text-muted-foreground',
        [ButtonVariant.accentOutline]:
          'bg-transparent text-accent border-accent rounded-full hover:bg-accent/30 hover:border-accent/30 shadow-md-subtle',
        [ButtonVariant.warningOutline]:
          'bg-transparent text-warning border-warning rounded-full hover:bg-warning/30 hover:border-warning/30 shadow-md-subtle',
        [ButtonVariant.successOutline]:
          'bg-transparent text-success border-success rounded-full hover:bg-success/30 hover:border-success/30 shadow-md-subtle',
        [ButtonVariant.destructiveOutline]:
          'bg-transparent text-destructive border-destructive rounded-full hover:bg-destructive/30 hover:border-destructive/30 shadow-md-subtle',
        [ButtonVariant.for]:
          'bg-for text-for-foreground border-for rounded-full hover:bg-for/70 hover:border-for/30 shadow-md-subtle',
        [ButtonVariant.against]:
          'bg-against text-against-foreground border-against rounded-full hover:bg-against/70 hover:border-against/30 shadow-md-subtle',
      },
      size: {
        [ButtonSize.default]: 'px-3 py-1',
        [ButtonSize.md]: 'px-4 py-1.5',
        [ButtonSize.lg]: 'px-4 py-2 gap-3 text-base',
        [ButtonSize.xl]: 'px-5 py-2.5 gap-5 text-lg',
        [ButtonSize.icon]: 'p-1',
        [ButtonSize.iconMd]: 'p-1.5',
        [ButtonSize.iconLg]: 'p-2',
        [ButtonSize.iconXl]: 'p-2.5',
      },
    },
    defaultVariants: {
      variant: ButtonVariant.primary,
      size: ButtonSize.default,
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isLoading = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <Icon name={IconName.inProgress} className="h-6 w-6 animate-spin" />
        )}
        {props.children}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
