import * as React from 'react'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@0xintuition/1ui'

import { useDebounce } from '@lib/hooks/useDebounce'
import { useFormContext } from 'react-hook-form'

interface EthInputProps {
  name: string
  label: string
  placeholder?: string
  disabled?: boolean
}

export function EthInput({
  name,
  label,
  placeholder,
  disabled,
}: EthInputProps) {
  const { control, trigger } = useFormContext()
  const [value, setLocalValue] = React.useState('')
  const debouncedValue = useDebounce(value, 500)

  React.useEffect(() => {
    if (debouncedValue) {
      trigger(name)
    }
  }, [debouncedValue, trigger, name])

  const sanitizeValue = (inputValue: string) => {
    if (inputValue.startsWith('.')) {
      inputValue = `0${inputValue}`
    }
    let sanitizedValue = inputValue.replace(/[^0-9.]/g, '')
    const parts = sanitizedValue.split('.')
    if (parts.length > 2) {
      sanitizedValue = `${parts[0]}.${parts.slice(1).join('')}`
    }
    if (parts.length === 2 && parts[1].length > 18) {
      sanitizedValue = `${parts[0]}.${parts[1].slice(0, 18)}`
    }
    return sanitizedValue
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    const sanitizedValue = sanitizeValue(e.target.value)
    setLocalValue(sanitizedValue)
    onChange(sanitizedValue)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                inputMode="decimal"
                placeholder={placeholder}
                {...field}
                value={field.value || ''}
                onChange={(e) => handleChange(e, field.onChange)}
                disabled={disabled}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <span className="text-sm text-muted-foreground">ETH</span>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
