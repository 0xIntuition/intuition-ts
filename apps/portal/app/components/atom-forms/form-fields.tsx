import { Input, Label, Textarea } from '@0xintuition/1ui'

import { Path, useFormContext } from 'react-hook-form'

interface FormFieldProps<T extends Record<string, string | number>> {
  name: Path<T>
  label: string
  placeholder?: string
  multiline?: boolean
  type?: string
}

export function FormField<T extends Record<string, string | number>>({
  name,
  label,
  placeholder,
  multiline,
  type,
}: FormFieldProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>()

  const error = errors[name]?.message as string | undefined

  return (
    <div className="space-y-2">
      <Label htmlFor={name.toString()}>{label}</Label>
      {multiline ? (
        <Textarea
          id={name.toString()}
          placeholder={placeholder}
          {...register(name)}
          className="theme-border"
        />
      ) : (
        <Input
          id={name.toString()}
          placeholder={placeholder}
          type={type}
          {...register(name)}
        />
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
