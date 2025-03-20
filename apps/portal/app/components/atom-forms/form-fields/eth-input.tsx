import * as React from 'react'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
  Input,
  Text,
} from '@0xintuition/1ui'

import { useDebounce } from '@lib/hooks/useDebounce'
import { useFormContext } from 'react-hook-form'

interface EthInputProps {
  name: string
  label: string
  walletBalance: string
  placeholder?: string
  disabled?: boolean
}

export function EthInput({
  name,
  label,
  walletBalance,
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
          <FormLabel className="flex flex-row items-center justify-between">
            <Text>{label}</Text>
            <div className="flex items-center justify-end gap-4 text-sm">
              <div className="flex items-center gap-2 justify-end">
                {walletBalance && (
                  <span className="flex flex-row items-center gap-1 text-muted-foreground">
                    <Icon name="wallet" className="w-4 h-4" />{' '}
                    {Number(walletBalance).toFixed(5)} ETH
                  </span>
                )}
              </div>
            </div>
          </FormLabel>
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
