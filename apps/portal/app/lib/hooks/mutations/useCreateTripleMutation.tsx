import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateTriple } from '@lib/hooks/useCreateTriple'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Abi, parseUnits } from 'viem'

interface CreateTripleMutationParams {
  val: string
  contract: string
  userWallet: string
  subjectId: string
  predicateId: string
  objectId: string
}

export function useCreateTripleMutation(contract: string) {
  const queryClient = useQueryClient()
  const createTriple = useCreateTriple()

  const {
    writeContractAsync,
    receipt: txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    reset,
  } = createTriple

  return {
    ...useMutation({
      mutationFn: async (params: CreateTripleMutationParams) => {
        const { val, subjectId, predicateId, objectId } = params

        const parsedValue = parseUnits(val === '' ? '0' : val, 18)

        try {
          return writeContractAsync({
            address: contract as `0x${string}`,
            abi: multivaultAbi as Abi,
            functionName: 'createTriple',
            args: [subjectId, predicateId, objectId],
            value: parsedValue,
          })
        } catch (error) {
          console.error('Failed to create triple:', error)
          throw error
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get-triples'] })
      },
      onError: (error) => {
        console.error('Create mutation error:', error)
        reset()
      },
    }),
    txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    reset,
  }
}
