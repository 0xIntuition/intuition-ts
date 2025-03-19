import { Button } from '@0xintuition/1ui'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { FormField } from '../form-fields'
import { createDepositSchema, type DepositFormData } from '../types'

interface DepositFormProps {
  onSubmit: (data: DepositFormData) => void
  defaultValues?: Partial<DepositFormData>
  minDeposit: number
}

export function DepositForm({
  onSubmit,
  defaultValues,
  minDeposit,
}: DepositFormProps) {
  const form = useForm<DepositFormData>({
    resolver: zodResolver(createDepositSchema(minDeposit)),
    defaultValues: {
      ...defaultValues,
    },
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField<DepositFormData>
          name="amount"
          label="Deposit Amount"
          placeholder={`Enter amount (min: ${minDeposit.toString()})`}
          type="number"
        />
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </FormProvider>
  )
}
