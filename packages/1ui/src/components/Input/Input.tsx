import * as React from 'react'

import { cn } from 'styles'

import { Icon, IconName, IconNameType, Text, TextVariant, TextWeight } from '..'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: IconNameType | string
  endAdornment?: IconNameType | string
}

const isValueAnIconName = (value: string) =>
  Object.values(IconName).includes(value as IconNameType)

const Adornment = ({
  position,
  value,
}: {
  position: 'start' | 'end'
  value: IconNameType | string
}) => {
  return isValueAnIconName(value) ? (
    <Icon
      name={value as IconNameType}
      className="text-secondary-foreground/80"
    />
  ) : (
    <div
      className={`border-0 border-border/10 py-2 min-w-16 ${position === 'start' ? 'border-r' : 'border-l text-right'}`}
    >
      <Text
        variant={TextVariant.body}
        weight={TextWeight.medium}
        className="text-secondary-foreground/80"
      >
        {value}
      </Text>
    </div>
  )
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ startAdornment, endAdornment, className, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex justify-between gap-2 items-center h-10 px-3 bg-primary/10 theme-border rounded-md text-base',
          className,
        )}
      >
        {startAdornment && (
          <Adornment position="start" value={startAdornment} />
        )}
        <input
          type={type}
          className="flex w-full px-2 bg-transparent ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[0.5px] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ref={ref}
          {...props}
        />
        {endAdornment && <Adornment position="end" value={endAdornment} />}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
