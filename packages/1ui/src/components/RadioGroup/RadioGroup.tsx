import * as React from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { Label } from '..'
import { cn } from '../../styles'

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        'grid bg-primary/5 theme-border rounded-lg w-full',
        className,
      )}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

interface RadioGroupItemContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const RadioGroupItemContainer = ({
  ...props
}: RadioGroupItemContainerProps) => {
  return (
    <div
      className="px-5 py-4 flex justify-between items-center w-full gap-10"
      {...props}
    />
  )
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-5 w-5 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className="h-3 w-3 block bg-current rounded-full" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

interface RadioGroupItemLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  value: string
  subValue: string
}

const RadioGroupItemLabel = ({
  value,
  subValue,
  ...props
}: RadioGroupItemLabelProps) => {
  return (
    <Label className="flex items-center gap-2" {...props}>
      {value}
      {subValue && (
        <span className="text-sm text-foreground/30">{subValue}</span>
      )}
    </Label>
  )
}

const RadioGroupDivider = () => {
  return <span className="w-full h-px block in-out-gradient" />
}

export {
  RadioGroup,
  RadioGroupItemContainer,
  RadioGroupItem,
  RadioGroupItemLabel,
  RadioGroupDivider,
}
