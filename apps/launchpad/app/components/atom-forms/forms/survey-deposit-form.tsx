import {
  Button,
  ButtonSize,
  ButtonVariant,
  cn,
  Icon,
  IconName,
} from '@0xintuition/1ui'
import { useGetAtomByDataQuery } from '@0xintuition/graphql'

import { zodResolver } from '@hookform/resolvers/zod'
import { ipfsUrl } from '@lib/utils/app'
import { FormProvider, useForm } from 'react-hook-form'
import { useAccount, useBalance } from 'wagmi'

import { Atom, createDepositSchema, DepositFormData } from '../types'

interface SurveyDepositFormProps {
  onSubmit: (data: DepositFormData) => Promise<void>
  defaultValues?: Partial<DepositFormData>
  minDeposit: string
  isSubmitting?: boolean
  atomData: Atom
  ipfsUri: string
  isLoadingConfig?: boolean
  onBack?: () => void
}

export function SurveyDepositForm({
  onSubmit,
  defaultValues,
  minDeposit,
  isSubmitting,
  atomData,
  ipfsUri,
  isLoadingConfig,
  onBack,
}: SurveyDepositFormProps) {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })

  const { data: existingAtomData, isLoading: isCheckingAtom } =
    useGetAtomByDataQuery(
      {
        data: ipfsUri,
      },
      {
        queryKey: ['get-atom', { id: ipfsUri }],
      },
    )

  console.log('existingAtomData', existingAtomData)
  const atomExists = existingAtomData?.atoms?.[0]?.data === ipfsUri

  const form = useForm<DepositFormData>({
    resolver: zodResolver(createDepositSchema(minDeposit, balance?.value)),
    defaultValues: {
      amount: minDeposit,
      ...defaultValues,
    },
  })

  return (
    <FormProvider {...form}>
      <form
        id="deposit-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col min-h-[300px]"
      >
        <div className="flex flex-col flex-1 min-h-0 space-y-6">
          <div className="flex flex-col gap-1 flex-shrink-0">
            <h3 className="text-xl font-semibold">Ready to Create Your Atom</h3>
            <p className="text-sm text-muted-foreground">
              Review your atom details to get started
            </p>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="flex flex-col h-full justify-evenly gap-4">
              <div className="rounded-lg bg-muted/50 p-4 space-y-4">
                <div className="flex items-center gap-4">
                  {atomData.image ? (
                    <img
                      src={atomData.image}
                      alt={atomData.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center">
                      <Icon
                        name={IconName.fingerprint}
                        className="w-8 h-8 text-primary/40"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="text-base text-muted-foreground">
                      {atomData.type}
                    </div>
                    <div className="font-medium text-lg">{atomData.name}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/10">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Document: </span>
                    <a
                      className="text-accent flex items-center gap-1"
                      href={ipfsUrl(ipfsUri)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {ipfsUri}
                      <Icon
                        name={IconName.squareArrowTopRight}
                        className="w-4 h-4"
                      />
                    </a>
                  </div>
                </div>

                {atomExists && (
                  <div className="px-4 py-2 bg-success/10 border border-success/30 rounded-lg">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <Icon
                          name={IconName.circleCheck}
                          className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
                        />
                        <p className="text-success text-base">
                          This atom already exists on the network
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-5 flex-shrink-0">
            <Button
              type="button"
              variant={
                atomExists ? ButtonVariant.primary : ButtonVariant.secondary
              }
              size={ButtonSize.md}
              onClick={onBack}
              className={cn(onBack ? 'visible' : 'hidden', 'rounded-full')}
            >
              Back
            </Button>
            <Button
              type="submit"
              size={ButtonSize.md}
              disabled={
                isSubmitting || isLoadingConfig || isCheckingAtom || atomExists
              }
              className="min-w-32"
            >
              {isSubmitting && (
                <Icon name={IconName.inProgress} className="animate-spin" />
              )}
              {isSubmitting ? 'Creating...' : 'Create Atom'}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
