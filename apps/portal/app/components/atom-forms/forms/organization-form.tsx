import { Button } from '@0xintuition/1ui'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { FormField } from '../form-fields'
import { organizationAtomSchema, type Atom } from '../types'

interface OrganizationFormProps {
  onSubmit: (data: Atom) => void
  defaultValues?: Partial<Atom>
}

export function OrganizationForm({
  onSubmit,
  defaultValues,
}: OrganizationFormProps) {
  const form = useForm<Atom>({
    resolver: zodResolver(organizationAtomSchema),
    defaultValues: {
      type: 'Organization',
      ...defaultValues,
    },
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="name"
          label="Organization Name"
          placeholder="Enter organization name"
        />
        <FormField
          name="description"
          label="Description"
          placeholder="Enter organization description"
          multiline
        />
        <FormField
          name="image"
          label="Logo URL"
          placeholder="Enter organization logo URL"
        />
        <FormField
          name="url"
          label="Website URL"
          placeholder="Enter organization website URL"
        />
        <Button type="submit" className="w-full">
          Create Organization
        </Button>
      </form>
    </FormProvider>
  )
}
