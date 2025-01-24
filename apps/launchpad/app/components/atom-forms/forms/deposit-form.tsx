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
import { formatBalance } from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { FormProvider, useForm } from 'react-hook-form'
import { formatUnits } from 'viem'
import { useAccount, useBalance } from 'wagmi'

import { EthInput } from '../form-fields'
import { Atom, createDepositSchema, DepositFormData } from '../types'

interface DepositFormProps {
  onSubmit: (data: DepositFormData) => Promise<void>
  defaultValues?: Partial<DepositFormData>
  minDeposit: string
  isSubmitting?: boolean
  atomData: Atom
  ipfsUri: string
  isLoadingConfig?: boolean
  onBack?: () => void
}

export function DepositForm({
  onSubmit,
  defaultValues,
  minDeposit,
  isSubmitting,
  atomData,
  ipfsUri,
  isLoadingConfig,
  onBack,
}: DepositFormProps) {
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

  const atomExists = existingAtomData?.atoms?.[0]?.data === ipfsUri
  const existingAtomId = existingAtomData?.atoms?.[0]?.id

  const form = useForm<DepositFormData>({
    resolver: zodResolver(createDepositSchema(minDeposit)),
    defaultValues: {
      amount: minDeposit,
      ...defaultValues,
    },
  })

  const handleSetMin = () => {
    form.setValue('amount', minDeposit, { shouldValidate: true })
  }

  const handleSetMax = () => {
    if (balance) {
      form.setValue('amount', formatUnits(balance.value, 18), {
        shouldValidate: true,
      })
    }
  }

  return (
    <FormProvider {...form}>
      <form
        id="deposit-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full"
      >
        <div className="flex flex-col flex-1 min-h-0 space-y-6">
          <div className="flex flex-col gap-1 flex-shrink-0">
            <h3 className="text-xl font-semibold">Ready to Create Your Atom</h3>
            <p className="text-sm text-muted-foreground">
              Review your atom details and set an initial deposit to get started
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
                      <Link to={`/app/atoms/${existingAtomId}`}>
                        <Button
                          variant={ButtonVariant.successOutline}
                          size={ButtonSize.default}
                        >
                          View Atom
                          <Icon
                            name={IconName.squareArrowTopRight}
                            className="ml-1 w-4 h-4"
                          />
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={cn(
                  'rounded-lg border border-border/20 p-4 space-y-4',
                  atomExists ? 'opacity-50' : 'opacity-100',
                )}
              >
                <div className="flex flex-col gap-1">
                  <h4 className="font-medium">Set Initial Deposit</h4>
                  <p className="text-sm text-muted-foreground">
                    Your initial deposit helps establish your atom&apos;s
                    presence and enables interactions
                  </p>
                </div>

                <EthInput
                  name="amount"
                  label="Deposit Amount"
                  placeholder={`Min. ${minDeposit} ETH`}
                  disabled={!!isLoadingConfig || atomExists}
                />

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">
                    Minimum deposit: {minDeposit} ETH
                  </span>
                  <div className="flex items-center gap-2">
                    {balance && (
                      <span className="text-muted-foreground">
                        {formatBalance(balance.value, 18)} ETH
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant={ButtonVariant.secondary}
                        onClick={handleSetMin}
                        disabled={isLoadingConfig || atomExists}
                      >
                        Min
                      </Button>
                      <Button
                        type="button"
                        variant={ButtonVariant.secondary}
                        onClick={handleSetMax}
                        disabled={isLoadingConfig || !balance || atomExists}
                      >
                        Max
                      </Button>
                    </div>
                  </div>
                </div>
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
