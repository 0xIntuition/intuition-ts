import * as React from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { Label } from '..'
import { cn } from '../../styles'

const RadioGroupVariant = {
  simple: 'simple',
  default: 'default',
} as const

export type RadioGroupVariantType =
  (typeof RadioGroupVariant)[keyof typeof RadioGroupVariant]

interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  variant?: RadioGroupVariantType
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ variant, className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        variant === RadioGroupVariant.simple
          ? 'flex gap-4'
          : 'grid bg-primary/5 theme-border rounded-lg w-full',
        className,
      )}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

interface RadioGroupItemContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: RadioGroupVariantType
}

const RadioGroupItemContainer = ({
  variant,
  ...props
}: RadioGroupItemContainerProps) => {
  return (
    <div
      className={
        variant === RadioGroupVariant.simple
          ? 'flex gap-2'
          : 'px-5 py-4 flex justify-between items-center w-full gap-10'
      }
      {...props}
    />
  )
}

const RadioGroupItemSize = {
  small: 'small',
  default: 'default',
} as const

export type RadioGroupItemSizeType =
  (typeof RadioGroupItemSize)[keyof typeof RadioGroupItemSize]

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  size?: RadioGroupItemSizeType
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ size, className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        size === RadioGroupItemSize.small ? 'h-4 w-4' : 'h-5 w-5',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span
          className={cn(
            'block bg-current rounded-full',
            size === RadioGroupItemSize.small ? 'h-2 w-2' : 'h-3 w-3 ',
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

interface RadioGroupItemLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  value: string
  subValue?: string
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
