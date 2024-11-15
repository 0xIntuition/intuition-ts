import * as React from 'react'

import { Button } from '@0xintuition/1ui'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { FormImageUpload, FormInput, FormTextarea } from '../form-fields'
import { OrganizationAtom, organizationAtomSchema } from '../types'

interface OrganizationFormProps {
  onSubmit: (data: OrganizationAtom) => Promise<void>
  defaultValues?: Partial<OrganizationAtom>
}

export function OrganizationForm({
  onSubmit,
  defaultValues,
}: OrganizationFormProps) {
  const form = useForm<OrganizationAtom>({
    resolver: zodResolver(organizationAtomSchema),
    defaultValues: {
      type: 'Organization',
      ...defaultValues,
    },
  })

  return (
    <FormProvider {...form}>
      <form
        id="organization-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormInput name="name" label="Name" placeholder="Enter name" />
        <FormImageUpload name="image" label="Image" />
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
