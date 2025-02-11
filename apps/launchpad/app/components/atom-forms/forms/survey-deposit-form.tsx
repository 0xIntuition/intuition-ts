import {
  Button,
  ButtonSize,
  ButtonVariant,
  cn,
  Icon,
  IconName,
  Text,
} from '@0xintuition/1ui'
import { useGetAtomByDataQuery } from '@0xintuition/graphql'

import SubmitButton from '@components/submit-button'
import { zodResolver } from '@hookform/resolvers/zod'
import { ipfsUrl } from '@lib/utils/app'
import { Link } from '@remix-run/react'
import { Book } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

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
  validationErrors?: string[]
  showErrors?: boolean
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
  validationErrors = [],
  showErrors = false,
}: SurveyDepositFormProps) {
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

  const form = useForm<DepositFormData>({
    resolver: zodResolver(createDepositSchema(minDeposit)),
    defaultValues: {
      amount: minDeposit,
      ...defaultValues,
    },
  })

  return (
    <FormProvider {...form}>
      <form
        id="deposit-form"
        className="flex flex-col min-h-[300px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col flex-1 min-h-0 space-y-6">
          <div className="flex flex-col gap-1 flex-shrink-0">
            <h3 className="text-xl font-semibold">Ready to Create Your Atom</h3>
            <p className="flex flex-row gap-1 text-sm text-muted-foreground items-center">
              <Book className="h-4 w-4 text-primary/70" />
              Review your atom details before creating it on Intuition. Learn
              more in our{' '}
              <Link
                to="https://tech.docs.intuition.systems/primitives-atom"
                target="_blank"
                rel="noreferrer"
                className="text-primary font-semibold hover:text-accent"
              >
                documentation
              </Link>
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

          <div className="flex flex-col justify-between items-center pt-5 flex-shrink-0 gap-4">
            {showErrors && validationErrors.length > 0 && (
              <div className="flex flex-col gap-2 w-full">
                {validationErrors.map((error, index) => (
                  <Text key={index} className="text-destructive text-sm">
                    {error}
                  </Text>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center w-full">
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
              <SubmitButton
                disabled={
                  isSubmitting ||
                  isLoadingConfig ||
                  isCheckingAtom ||
                  atomExists
                }
                className="min-w-32"
                buttonText="Create Atom"
                loadingText="Creating..."
                loading={isSubmitting || isLoadingConfig || isCheckingAtom}
                actionText="Create"
                onClick={() => {
                  form.handleSubmit(onSubmit)()
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
