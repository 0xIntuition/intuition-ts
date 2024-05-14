import { Loader2Icon } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@styles'

const buttonVariants = cva(
  'flex items-center gap-[8px] text-sm font-medium border-solid border-[1px] disabled:bg-muted disabled:text-muted-foreground disabled:border-muted shadow-md-subtle',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full',
        secondary:
          'bg-gradient-to-b from-primary/10 to-primary/5 text-primary/60 border-primary/10 rounded-[8px] hover:text-primary disabled:from-muted disabled:to-muted',
        ghost:
          'bg-gradient-to-b from-transparent to-transparent text-primary/70 border-primary/70 rounded-[8px] hover:text-primary hover:border-primary disabled:bg-transparent aria-selected:from-primary/10 aria-selected:to-primary/5 aria-selected:border-primary/10',
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
        default: 'px-[12px] py-[4px]',
        medium: 'px-[16px] py-[6px]',
        large: 'px-[16px] py-[8px] gap-[16px] text-base',
        extraLarge: 'px-[20px] py-[10px] gap-[20px] text-lg',
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
