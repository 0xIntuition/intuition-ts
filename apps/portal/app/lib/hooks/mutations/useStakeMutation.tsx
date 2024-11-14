import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { multivaultAbi } from '@lib/abis/multivault'
import { useDepositAtom } from '@lib/hooks/useDepositAtom'
import { useRedeemAtom } from '@lib/hooks/useRedeemAtom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Abi, formatUnits, parseUnits } from 'viem'

interface StakeMutationParams {
  val: string
  mode: 'deposit' | 'redeem' | undefined
  contract: string
  userWallet: string
  vaultId: string
  claim?: ClaimPresenter
  identity?: IdentityPresenter
  conviction_price?: string
}

export function useStakeMutation(contract: string, mode: 'deposit' | 'redeem') {
  const queryClient = useQueryClient()
  const depositHook = useDepositAtom(contract)
  const redeemHook = useRedeemAtom(contract)

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
      mutationFn: async (params: StakeMutationParams) => {
        const { val, userWallet, vaultId, claim, conviction_price } = params
        const parsedValue = parseUnits(val === '' ? '0' : val, 18)
        const actionType = mode === 'deposit' ? 'buy' : 'sell'

        return writeContractAsync({
          address: contract as `0x${string}`,
          abi: multivaultAbi as Abi,
          functionName:
            actionType === 'buy'
              ? claim !== undefined
                ? 'depositTriple'
                : 'depositAtom'
              : claim !== undefined
                ? 'redeemTriple'
                : 'redeemAtom',
          args:
            actionType === 'buy'
              ? [userWallet as `0x${string}`, vaultId]
              : [
                  parseUnits(
                    val === ''
                      ? '0'
                      : (
                          Number(val) /
                          Number(
                            formatUnits(BigInt(conviction_price || '0'), 18),
                          )
                        ).toString(),
                    18,
                  ),
                  userWallet as `0x${string}`,
                  vaultId,
                ],
          value: actionType === 'buy' ? parsedValue : undefined,
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
