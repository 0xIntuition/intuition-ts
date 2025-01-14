import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { FormImageUpload, FormInput, FormTextarea } from '../form-fields'
import { PersonAtom, personAtomSchema } from '../types'

interface PersonFormProps {
  onSubmit: (data: PersonAtom) => Promise<void>
  defaultValues?: Partial<PersonAtom>
}

export function PersonForm({ onSubmit, defaultValues }: PersonFormProps) {
  const form = useForm<PersonAtom>({
    resolver: zodResolver(personAtomSchema),
    defaultValues: {
      type: 'Person',
      ...defaultValues,
    },
  })

  return (
    <FormProvider {...form}>
      <form
        id="person-form"
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
