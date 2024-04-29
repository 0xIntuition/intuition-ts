import { Loader2Icon } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/styles';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm shadow-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:text-primary-700 disabled:bg-primary-500 transition-colors duration-300',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        // destructive:
        //   'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        destructive:
          // 'bg-red-100 text-destructive-foreground hover:bg-destructive/90',
          'bg-red-100 text-red-900 hover:bg-red-100/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-primary-300 text-primary-900 hover:bg-primary-100',
        ghost:
          'hover:bg-none hover:text-accent-foreground text-primary-300 transition-colors duration-150',
        link: 'text-primary underline-offset-4 hover:underline',
        tooltip:
          '!text-primary-300 transition-colors duration-300 border rounded-lg border-primary-50/20 hover:border-primary-50/40 hover:text-primary-200 text-xxs',
      },
      size: {
        default: 'h-8 px-4 py-2',
        sm: 'h-6 px-3',
        lg: 'h-10 px-8',
        icon: 'h-8 w-8',
        'lg-icon': 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isLoading = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        data-testid="int-button"
        {...props}
      >
        {isLoading ? (
          <Loader2Icon className={`${isLoading && 'animate-spin'} h-6 w-6`} />
        ) : (
          props.children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
