import { multivaultAbi } from '@lib/abis/multivault'
import { useDepositTriple } from '@lib/hooks/useDepositTriple'
import { useRedeemTriple } from '@lib/hooks/useRedeemTriple'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Abi, parseUnits } from 'viem'

interface SaveListMutationParams {
  val: string
  userWallet: string
  vaultId: string
}

export function useSaveListMutation(
  contract: string,
  user_conviction: string,
  mode: 'deposit' | 'redeem',
) {
  const queryClient = useQueryClient()
  const depositHook = useDepositTriple(contract)
  const redeemHook = useRedeemTriple(contract)

  const activeHook = mode === 'deposit' ? depositHook : redeemHook
  const {
    writeContractAsync,
    receipt: txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    reset,
  } = activeHook

  return {
    ...useMutation({
      mutationFn: async (params: SaveListMutationParams) => {
        const { val, userWallet, vaultId } = params
        const parsedValue = parseUnits(val === '' ? '0' : val, 18)

        return writeContractAsync({
          address: contract as `0x${string}`,
          abi: multivaultAbi as Abi,
          functionName: mode === 'deposit' ? 'depositTriple' : 'redeemTriple',
          args:
            mode === 'deposit'
              ? [userWallet as `0x${string}`, vaultId]
              : [user_conviction, userWallet as `0x${string}`, vaultId],
          value: mode === 'deposit' ? parsedValue : undefined,
        })
      },
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ['get-stats'] })
      },
    }),
    txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    reset,
  }
}
