import { Loader2Icon } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@styles'

const buttonVariants = cva('flex items-center', {
  variants: {
    variant: {
      primary:
        'bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full disabled:bg-muted disabled:text-muted-foreground',
      secondary: 'bg-primary-300 text-primary-900 hover:bg-primary-100',
      ghost:
        'hover:bg-none hover:text-accent-foreground text-primary-300 transition-colors duration-150',
    },
    size: {
      default: 'px-[12px] py-[4px] gap-[8px]',
      medium: 'px-[16px] py-[6px] gap-[8px]',
      large: 'px-[16px] py-[8px] gap-[16px]',
      extraLarge: 'px-[20px] py-[10px] gap-[20px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

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
        {isLoading ? (
          <Loader2Icon className={`${isLoading && 'animate-spin'} h-6 w-6`} />
        ) : (
          props.children
        )}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
