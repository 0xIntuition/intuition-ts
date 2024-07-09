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

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ startAdornment, endAdornment, className, type, ...props }, ref) => {
    return (
      <div className="flex justify-between gap-2 items-center h-10 px-3 bg-primary/10 theme-border rounded-md text-base">
        {startAdornment &&
          (isValueAnIconName(startAdornment) ? (
            <Icon
              name={startAdornment as IconNameType}
              className="text-secondary-foreground/80"
            />
          ) : (
            <div className="border-0 border-r border-border/10 py-2 min-w-16">
              <Text
                variant={TextVariant.body}
                weight={TextWeight.medium}
                className="text-secondary-foreground/80"
              >
                {startAdornment}
              </Text>
            </div>
          ))}
        <input
          type={type}
          className={cn(
            'flex w-full px-2 bg-transparent ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[0.5px] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {endAdornment &&
          (isValueAnIconName(endAdornment) ? (
            <Icon
              name={endAdornment as IconNameType}
              className="text-secondary-foreground/80"
            />
          ) : (
            <div className="border-0 border-l border-border/10 py-2 min-w-16 text-right">
              <Text
                variant={TextVariant.body}
                weight={TextWeight.medium}
                className="text-secondary-foreground/80"
              >
                {endAdornment}
              </Text>
            </div>
          ))}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
