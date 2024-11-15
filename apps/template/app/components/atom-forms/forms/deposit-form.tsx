import {
  Button,
  ButtonSize,
  ButtonVariant,
  formatWalletAddress,
  Icon,
  IconName,
} from '@0xintuition/1ui'

import { zodResolver } from '@hookform/resolvers/zod'
import { ipfsUrl } from '@lib/utils/app'
import { formatBalance } from '@lib/utils/misc'
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
  ipfsCid: string
  isLoadingCost?: boolean
}

export function DepositForm({
  onSubmit,
  defaultValues,
  minDeposit,
  isSubmitting,
  atomData,
  ipfsCid,
  isLoadingCost,
}: DepositFormProps) {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })
  const form = useForm<DepositFormData>({
    resolver: zodResolver(createDepositSchema(minDeposit, balance?.value)),
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
      <form id="deposit-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold">Ready to Create Your Atom</h3>
            <p className="text-sm text-muted-foreground">
              Review your atom details and set an initial deposit to get started
            </p>
          </div>

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
                  href={ipfsUrl(ipfsCid)}
                  target="_blank"
                  rel="noreferrer"
                >
                  ipfs://{formatWalletAddress(ipfsCid)}
                  <Icon
                    name={IconName.squareArrowTopRight}
                    className="w-4 h-4"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border/20 p-4 space-y-4">
            <div className="flex flex-col gap-1">
              <h4 className="font-medium">Set Initial Deposit</h4>
              <p className="text-sm text-muted-foreground">
                Your initial deposit helps establish your atom's presence and
                enables interactions
              </p>
            </div>

            <EthInput
              name="amount"
              label="Deposit Amount"
              placeholder={`Min. ${minDeposit} ETH`}
              disabled={!!isLoadingCost}
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
                    disabled={isLoadingCost}
                  >
                    Min
                  </Button>
                  <Button
                    type="button"
                    variant={ButtonVariant.secondary}
                    onClick={handleSetMax}
                    disabled={isLoadingCost || !balance}
                  >
                    Max
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              size={ButtonSize.md}
              disabled={isSubmitting || isLoadingCost}
              className="min-w-32"
            >
              {isSubmitting ? 'Creating...' : 'Create Atom'}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
