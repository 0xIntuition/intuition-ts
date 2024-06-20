import * as React from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'

import { Text, TextVariant } from '..'
import { cn } from '../../styles'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('flex items-center gap-2 mb-2', className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

export interface TabsTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  totalCount: string
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ label, totalCount, className, ...props }: TabsTriggerProps, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'rounded-2xl border border-border/30 py-1 px-4 w-[180px] hover:bg-primary/5 hover:border-border/10 disabled:border-border/10 group inline-flex items-center justify-between whitespace-nowrap ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=active]:bg-primary/10',
      className,
    )}
    {...props}
  >
    <Text variant={TextVariant.bodyLarge} className="group-disabled:text-muted">
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
