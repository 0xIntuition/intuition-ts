import * as React from 'react'

import { PrimitiveButtonProps } from '@radix-ui/react-dialog'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'

import { Text, TextVariant } from '..'
import { cn } from '../../styles'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('flex items-center mb-2 last:mr-0', className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTriggerVariant = {
  default: 'default',
  alternate: 'alternate',
}

const tabsTriggerVariants = cva(
  'group inline-flex items-center py-1 px-4 theme-border whitespace-nowrap ring-offset-background transition-all disabled:border-border/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        [TabsTriggerVariant.default]:
          'rounded-2xl w-[180px] hover:bg-primary/5 hover:border-border/10 data-[state=active]:bg-primary/10 mr-2',
        [TabsTriggerVariant.alternate]:
          'w-full border-0 border-b-2 data-[state=active]:border-border',
      },
    },
    defaultVariants: {
      variant: TabsTriggerVariant.default,
    },
  },
)

export interface TabsTriggerProps
  extends PrimitiveButtonProps,
    VariantProps<typeof tabsTriggerVariants> {
  value: string
  label: string
  totalCount?: number
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ variant, label, totalCount, className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      cn(tabsTriggerVariants({ variant })),
      totalCount ? 'justify-between' : 'justify-center',
      className,
    )}
    {...props}
  >
    <Text
      variant={TextVariant.bodyLarge}
      className={cn(
        'group-disabled:text-muted',
        variant === TabsTriggerVariant.alternate &&
          'text-primary/30 group-data-[state=active]:text-primary',
      )}
    >
      {label}
    </Text>
    <Text
      variant={TextVariant.body}
      className="text-muted-foreground group-disabled:text-muted"
    >
      {totalCount}
    </Text>
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
