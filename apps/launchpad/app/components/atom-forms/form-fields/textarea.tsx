import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@0xintuition/1ui'

import { useFormContext } from 'react-hook-form'

interface FormTextareaProps {
  name: string
  label: string
  placeholder?: string
}

export function FormTextarea({ name, label, placeholder }: FormTextareaProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
