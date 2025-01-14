import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@0xintuition/1ui'

import { useFormContext } from 'react-hook-form'

interface FormInputProps {
  name: string
  label: string
  type?: string
  placeholder?: string
}

export function FormInput({
  name,
  label,
  type = 'text',
  placeholder,
}: FormInputProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
