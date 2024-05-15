import { Loader2Icon } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@styles'

const buttonVariants = cva(
  'flex items-center gap-2 text-sm font-medium border-solid border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted shadow-md-subtle',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full',
        secondary:
          'primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted disabled:to-muted',
        ghost:
          'bg-gradient-to-b from-transparent to-transparent text-primary/70 border-primary/70 rounded-lg hover:text-primary hover:border-primary disabled:bg-transparent aria-selected:primary-gradient-subtle aria-selected:border-primary/10',
        text: 'bg-transparent text-primary/70 border-transparent hover:text-primary disabled:border-transparent disabled:bg-transparent',
        accent:
          'bg-accent text-accent-foreground border-accent rounded-full hover:bg-accent/70 hover:border-accent/30',
        warning:
          'bg-warning text-warning-foreground border-warning rounded-full hover:bg-warning/70 hover:border-warning/30',
        success:
          'bg-success text-success-foreground border-success rounded-full hover:bg-success/70 hover:border-success/30',
        destructive:
          'bg-destructive text-destructive-foreground border-destructive rounded-full hover:bg-destructive/70 hover:border-destructive/30',
      },
      size: {
        default: 'px-3 py-1',
        medium: 'px-4 py-1.5',
        large: 'px-4 py-2 gap-4 text-base',
        extraLarge: 'px-5 py-2.5 gap-5 text-lg',
        icon: 'p-1',
        iconMd: 'p-1.5',
        iconLg: 'p-2',
        iconXl: 'p-2.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
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
        {isLoading && <Loader2Icon className="h-6 w-6 animate-spin" />}
        {props.children}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
