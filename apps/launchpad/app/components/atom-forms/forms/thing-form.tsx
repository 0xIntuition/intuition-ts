import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { FormImageUpload, FormInput, FormTextarea } from '../form-fields'
import { ThingAtom, thingAtomSchema } from '../types'

interface ThingFormProps {
  onSubmit: (data: ThingAtom) => Promise<void>
  defaultValues?: Partial<ThingAtom>
}

export function ThingForm({ onSubmit, defaultValues }: ThingFormProps) {
  const form = useForm<ThingAtom>({
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
        className="space-y-2.5"
      >
        <FormInput name="name" label="Name" placeholder="Enter name" />
        <FormImageUpload name="image" label="Image" control={form.control} />
        <FormTextarea
          name="description"
          label="Description"
          placeholder="Enter description"
        />
        <FormInput
          name="url"
          type="url"
          label="URL"
          placeholder="Enter website URL"
        />
      </form>
    </FormProvider>
  )
}
