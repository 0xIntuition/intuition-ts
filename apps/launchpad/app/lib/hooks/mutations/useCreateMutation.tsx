import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateAtom } from '@lib/hooks/useCreateAtom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Abi, parseUnits } from 'viem'

interface CreateMutationParams {
  val: string
  contract: string
  userWallet: string
  uri: string
}

export function useCreateMutation(contract: string) {
  const queryClient = useQueryClient()
  const createAtom = useCreateAtom()

  const {
    writeContractAsync,
    receipt: txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    reset,
  } = createAtom

  return {
    ...useMutation({
      mutationFn: async (params: CreateMutationParams) => {
        const { val, uri } = params
        const parsedValue = parseUnits(val === '' ? '0' : val, 18)
        console.log('val', val)
        console.log('parsedValue', parsedValue)
        console.log('uri', uri)

        try {
          return writeContractAsync({
            address: contract as `0x${string}`,
            abi: multivaultAbi as Abi,
            functionName: 'createAtom',
            args: [uri],
            value: parsedValue,
          })
        } catch (error) {
          console.error('Failed to create atom:', error)
          throw error
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get-atoms'] })
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
