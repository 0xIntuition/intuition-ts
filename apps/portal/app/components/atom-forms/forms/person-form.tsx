import { Button } from '@0xintuition/1ui'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { FormField } from '../form-fields'
import { personAtomSchema, type Atom } from '../types'

interface PersonFormProps {
  onSubmit: (data: Atom) => void
  defaultValues?: Partial<Atom>
}

export function PersonForm({ onSubmit, defaultValues }: PersonFormProps) {
  const form = useForm<Atom>({
    resolver: zodResolver(personAtomSchema),
    defaultValues: {
      type: 'Person',
      ...defaultValues,
    },
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField name="name" label="Name" placeholder="Enter your name" />
        <FormField
          name="description"
          label="Description"
          placeholder="Enter a description"
          multiline
        />
        <FormField
          name="image"
          label="Image URL"
          placeholder="Enter an image URL"
        />
        <FormField
          name="url"
          label="Website URL"
          placeholder="Enter your website URL"
        />
        <Button type="submit" className="w-full">
          Create Person
        </Button>
      </form>
    </FormProvider>
  )
}
