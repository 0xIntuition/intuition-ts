import { FormField } from '@components/atom-forms/form-fields'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { Atom, thingAtomSchema } from '../types'

interface ThingFormProps {
  onSubmit: (data: Atom) => Promise<void>
  defaultValues?: Partial<Atom>
}

export function ThingForm({ onSubmit, defaultValues }: ThingFormProps) {
  const form = useForm<Atom>({
    resolver: zodResolver(thingAtomSchema),
    defaultValues: {
      type: 'Thing',
      ...defaultValues,
    },
  })

  return (
    <FormProvider {...form}>
      <form
        id="thing-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField name="name" label="Name" placeholder="Enter a name" />
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
          placeholder="Enter a website URL"
        />
      </form>
    </FormProvider>
  )
}
