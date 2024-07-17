import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
  Tags,
  TagWithValue,
  Text,
  toast,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import Toast from '@components/toast'
import { multivaultAbi } from '@lib/abis/multivault'
import { useBatchCreateTriple } from '@lib/hooks/useBatchCreateTriple'
import { useLoaderFetcher, useLoaderFetcher } from '@lib/hooks/useLoaderFetcher'
import {
  CREATE_RESOURCE_ROUTE,
  MULTIVAULT_CONTRACT_ADDRESS,
  TAG_RESOURCE_ROUTE,
} from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import { CreateLoaderData } from '@routes/resources+/create'
import { getTripleHashFromAtoms } from '@server/multivault'
// import logger from '@lib/utils/logger'
import { TransactionActionType } from 'types/transaction'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

import { createTagArrays } from './tag-utils'
import { TagLoaderData } from '@routes/resources+/tag'
import { publicClient } from '@server/viem'

interface TagsReviewProps {
  dispatch: (action: TransactionActionType) => void
  subjectVaultId: string
  tags: IdentityPresenter[]
}

export default function TagsReview({
  dispatch,
  subjectVaultId,
  tags,
}: TagsReviewProps) {
  // TODO: decide where this lives after it works
  const feeFetcher = useLoaderFetcher<CreateLoaderData>(CREATE_RESOURCE_ROUTE)

  const { tripleCost } = (feeFetcher.data as CreateLoaderData) ?? {
    tripleCost: BigInt(0),
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
    objectTagVaultIds,
  } = createTagArrays(tags, subjectVaultId)

  // async function testGetTripleHashFromAtoms(
  //   subjectId: number,
  //   predicateId: number,
  //   objectId: number,
  // ) {
  //   try {
  //     const result = await getTripleHashFromAtoms(
  //       BigInt(subjectId),
  //       BigInt(predicateId),
  //       BigInt(objectId),
  //     )
  //     console.log('Triple Hash:', result)
  //   } catch (error) {
  //     console.error('Error fetching triple hash:', error)
  //   }
  // }

  const tagResourceFetcher = useLoaderFetcher<TagLoaderData>(TAG_RESOURCE_ROUTE)

  const { result } = (tagResourceFetcher.data as TagLoaderData)
  logger('result', result)

  async function handleOnChainCreateTags() {
    if (
      !awaitingOnChainConfirmation &&
      !awaitingWalletConfirmation &&
      publicClient &&
      writeBatchCreateTriple &&
      address
    ) {
      try {
        dispatch({ type: 'APPROVE_TRANSACTION' })
        logger('[BEGIN ONCHAIN CREATE')
        logger('subjectVaultIds:', subjectIdentityVaultIds)
        logger('predicateHasTagVaultIds:', predicateHasTagVaultIds)
        logger('objectTagVaultIds:', objectTagVaultIds)
        const txHash = await writeBatchCreateTriple({
          address: MULTIVAULT_CONTRACT_ADDRESS,
          abi: multivaultAbi,
          functionName: 'batchCreateTriple',
          args: [
            subjectIdentityVaultIds,
            predicateHasTagVaultIds,
            objectTagVaultIds,
          ],
          value: BigInt(tripleCost) * BigInt(subjectIdentityVaultIds.length),
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
          toast.custom(
            () => (
              <Toast
                title="Error"
                description="error"
                icon={
                  <Icon
                    name="triangle-exclamation"
                    className="h-3 w-3 text-destructive"
                  />
                }
              />
            ),
            {
              duration: 5000,
            },
          )
          return
        }
      }
    }
  }

  return (
    <>
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
              {tags.map((tag, index) => (
                <TagWithValue
                  key={index}
                  label={tag.display_name}
                  value={tag.num_positions}
                />
              ))}
            </div>
          </Tags>
        </div>
        <Text variant="body" className="text-primary/50">
          Estimated Fees: 0.001 ETH{' '}
          {/* TODO: [ENG-2519] placeholder for actual cost */}
        </Text>
      </div>
      <DialogFooter className="!justify-center !items-center mt-20">
        <div className="flex flex-col items-center gap-1">
          <Button variant="primary" onClick={handleOnChainCreateTags}>
            Confirm
          </Button>
          <Button onClick={() => testGetTripleHashFromAtoms(195, 194, 175)}>
            TEST LIST CLAIM
          </Button>
        </div>
      </DialogFooter>
    </>
  )
}
