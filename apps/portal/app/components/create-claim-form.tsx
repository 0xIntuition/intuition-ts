import { useState } from 'react'

import { DialogHeader, Text } from '@0xintuition/1ui'
import { ClaimPresenter } from '@0xintuition/api'

import { useLoaderFetcher } from '@lib/hooks/useLoaderFetcher'
import {
  initialTransactionState,
  transactionReducer,
  useTransactionState,
} from '@lib/hooks/useTransactionReducer'
import { CREATE_RESOURCE_ROUTE } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { CreateLoaderData } from '@routes/resources+/create'
import { TransactionActionType, TransactionStateType } from 'types/transaction'

// import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

interface ClaimFormProps {
  onSuccess?: () => void
  onClose: () => void
}

export function ClaimForm({ onSuccess, onClose }: ClaimFormProps) {
  const { state, dispatch } = useTransactionState<
    TransactionStateType,
    TransactionActionType
  >(transactionReducer, initialTransactionState)

  const [transactionResponseData, setTransactionResponseData] =
    useState<ClaimPresenter | null>(null)

  const isTransactionStarted = [
    'approve',
    'review',
    'confirm',
    'complete',
    'error',
  ].includes(state.status)

  logger(onClose, onSuccess)
  return (
    <>
      <>
        {!isTransactionStarted && (
          <DialogHeader className="py-4">
            <div className="absolute top-5 flex flex-row items-center gap-2 align-baseline text-primary-400">
              <div className="flex flex-col gap-1">
                <Text variant="headline" className="text-foreground-secondary">
                  Make a claim about an identity{' '}
                </Text>
                <Text variant="caption" className="text-foreground-secondary">
                  Additional text about this.
                </Text>
              </div>
            </div>
          </DialogHeader>
        )}
        <CreateClaimForm
          state={state}
          dispatch={dispatch}
          onClose={onClose}
          setTransactionResponseData={setTransactionResponseData}
          transactionResponseData={transactionResponseData}
        />
      </>
    </>
  )
}

interface CreateClaimFormProps {
  state: TransactionStateType
  dispatch: TransactionActionType
  setTransactionResponseData: React.Dispatch<
    React.SetStateAction<ClaimPresenter | null>
  >
  transactionResponseData: ClaimPresenter | null
  onClose: () => void
}

function CreateClaimForm({
  state,
  dispatch,
  setTransactionResponseData,
  transactionResponseData,
}: CreateClaimFormProps) {
  const feeFetcher = useLoaderFetcher<CreateLoaderData>(CREATE_RESOURCE_ROUTE)
  logger(state, dispatch, setTransactionResponseData, transactionResponseData)
  const { atomCost: atomCostAmount } =
    (feeFetcher.data as CreateLoaderData) ?? {
      vaultId: BigInt(0),
      atomCost: BigInt(0),
      protocolFee: BigInt(0),
      entryFee: BigInt(0),
    }

  // const {
  //   tripleCreationFeeRaw: tripleCostAmountRaw,
  //   atomEquityFeeRaw: atomEquityFee,
  //   atomCost,
  // } = (feeFetcher.data as CreateLoaderData) ?? {
  //   tripleCreationFeeRaw: BigInt(0),
  //   atomEquityFeeRaw: BigInt(0),
  //   atomCost: BigInt(0),
  // }

  // const feeCalculation =
  //   BigInt(atomEquityFee) * BigInt(3) +
  //   BigInt(tripleCostAmountRaw) +
  //   BigInt(atomCost)

  // const { data: walletClient } = useWalletClient()
  // const publicClient = usePublicClient()
  // const { address } = useAccount()

  // const {
  //   writeAsync: writeCreateTriple,
  //   awaitingWalletConfirmation,
  //   awaitingOnChainConfirmation,
  //   reset,
  // } = useCreateTriple()

  logger('atomCostAmount', atomCostAmount)
  return (
    <div>
      create claim form
      {/* <pre>atom cost test:}</pre> */}
    </div>
  )
}
