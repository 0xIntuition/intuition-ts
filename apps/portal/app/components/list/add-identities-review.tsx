import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
  Identity,
  IdentityTag,
  IdentityTagSize,
  Tags,
  Text,
  toast,
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { multivaultAbi } from '@lib/abis/multivault'
import { useBatchCreateTriple } from '@lib/hooks/useBatchCreateTriple'
import { useLoaderFetcher } from '@lib/hooks/useLoaderFetcher'
import logger from '@lib/utils/logger'
import { CreateLoaderData } from '@routes/resources+/create'
import {
  CREATE_RESOURCE_ROUTE,
  GENERIC_ERROR_MSG,
  MULTIVAULT_CONTRACT_ADDRESS,
} from 'consts'
import { TransactionActionType } from 'types/transaction'
import { formatUnits } from 'viem'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

import { createIdentityArrays } from './list-utils'

interface AddIdentitiesReviewProps {
  dispatch: (action: TransactionActionType) => void
  objectVaultId: string
  identitiesToAdd: IdentityPresenter[]
}

export default function AddIdentitiesReview({
  dispatch,
  objectVaultId,
  identitiesToAdd,
}: AddIdentitiesReviewProps) {
  const feeFetcher = useLoaderFetcher<CreateLoaderData>(CREATE_RESOURCE_ROUTE)

  const { tripleCost, minDeposit } = (feeFetcher.data as CreateLoaderData) ?? {
    tripleCost: BigInt(0),
    minDeposit: BigInt(0),
  }

  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()
  const { address } = useAccount()

  const {
    writeContractAsync: writeBatchCreateTriple,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
  } = useBatchCreateTriple()

  const {
    subjectIdentityVaultIds,
    predicateHasTagVaultIds,
    objectIdentityVaultIds,
  } = createIdentityArrays(identitiesToAdd, objectVaultId)

  const estimatedFees = formatUnits(
    BigInt(tripleCost) * BigInt(subjectIdentityVaultIds.length) +
      BigInt(minDeposit) * BigInt(objectIdentityVaultIds.length),
    18,
  )

  async function handleOnChainCreateTags() {
    if (
      walletClient &&
      !awaitingOnChainConfirmation &&
      !awaitingWalletConfirmation &&
      publicClient &&
      writeBatchCreateTriple &&
      address
    ) {
      try {
        dispatch({ type: 'APPROVE_TRANSACTION' })
        logger('[BEGIN ONCHAIN CREATE')
        logger('subjectIdentityVaultIds:', subjectIdentityVaultIds)
        logger('predicateHasTagVaultIds:', predicateHasTagVaultIds)
        logger('objectIdentityVaultIds:', objectIdentityVaultIds)
        const txHash = await writeBatchCreateTriple({
          address: MULTIVAULT_CONTRACT_ADDRESS,
          abi: multivaultAbi,
          functionName: 'batchCreateTriple',
          args: [
            subjectIdentityVaultIds,
            predicateHasTagVaultIds,
            objectIdentityVaultIds,
          ],
          value:
            BigInt(tripleCost) * BigInt(objectIdentityVaultIds.length) +
            BigInt(minDeposit) * BigInt(objectIdentityVaultIds.length),
        })
        dispatch({ type: 'TRANSACTION_PENDING' })
        if (txHash) {
          const receipt = await publicClient.waitForTransactionReceipt({
            hash: txHash,
          })
          dispatch({
            type: 'TRANSACTION_COMPLETE',
            txHash,
            txReceipt: receipt,
          })
        }
      } catch (error) {
        logger('ERROR', error)
        console.error('error', error)
        if (error instanceof Error) {
          let errorMessage = 'Error in onchain transaction.'
          if (error.message.includes('insufficient')) {
            errorMessage =
              'Insufficient funds. Please add more OP to your wallet and try again.'
          }
          if (error.message.includes('rejected')) {
            errorMessage = 'Transaction rejected. Try again when you are ready.'
          }
          dispatch({
            type: 'TRANSACTION_ERROR',
            error: errorMessage,
          })
          toast.error(GENERIC_ERROR_MSG)
          return
        }
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      <DialogHeader>
        <DialogTitle className="justify-between">
          <div className="flex flex-row gap-2">
            <Button
              onClick={(e) => {
                e.preventDefault()
                dispatch({ type: 'START_TRANSACTION' })
              }}
              variant="ghost"
              size="icon"
            >
              <Icon name="arrow-left" className="h-4 w-4" />
            </Button>
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col justify-center items-center gap-5">
        <Icon name="await-action" className="h-20 w-20 text-neutral-50/30" />
        <div className="gap-5 flex flex-col items-center">
          <Text
            variant="headline"
            weight="medium"
            className="text-secondary-foreground/70"
          >
            Review your Tags
          </Text>
        </div>
        <div className="items-center">
          <Tags>
            <div className="flex flex-wrap gap-2 items-center">
              {identitiesToAdd.map((identity) => (
                <IdentityTag
                  key={identity.id}
                  size={IdentityTagSize.md}
                  variant={Identity.nonUser}
                  imgSrc={identity.image ?? ''}
                >
                  <Trunctacular value={identity.display_name} />
                </IdentityTag>
              ))}
            </div>
          </Tags>
        </div>
        {!!estimatedFees && (
          <Text variant="body" className="text-primary/50">
            Estimated Fees: {estimatedFees}
          </Text>
        )}
      </div>
      <div className="mt-auto py-4 bg-neutral-950">
        <DialogFooter className="!justify-center !items-center">
          <div className="flex flex-col items-center gap-1 ">
            <Button variant="primary" onClick={handleOnChainCreateTags}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </div>
    </div>
  )
}
