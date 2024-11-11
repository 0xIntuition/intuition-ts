import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import { multivaultAbi } from '@lib/abis/multivault'
import { useCreateTriple } from '@lib/hooks/useCreateTriple'
import { useDepositTriple } from '@lib/hooks/useDepositTriple'
import { useRedeemTriple } from '@lib/hooks/useRedeemTriple'
import { getSpecialPredicate } from '@lib/utils/app'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CURRENT_ENV } from 'app/consts'
import { Abi, parseUnits } from 'viem'

interface FollowMutationParams {
  val: string
  userWallet: string
  vaultId: string
  claim?: ClaimPresenter
  identity?: IdentityPresenter
  userVaultId?: string
  tripleCost?: bigint
}

export function useFollowMutation(
  contract: string,
  claim: ClaimPresenter,
  user_conviction: string,
  mode: 'follow' | 'unfollow',
) {
  const queryClient = useQueryClient()
  const depositHook = useDepositTriple(contract)
  const redeemHook = useRedeemTriple(contract)
  const createHook = useCreateTriple()

  const activeHook = !claim
    ? createHook
    : mode === 'follow'
      ? depositHook
      : redeemHook
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
      mutationFn: async (params: FollowMutationParams) => {
        const { val, userWallet, vaultId, claim, userVaultId, tripleCost } =
          params
        const parsedValue = parseUnits(val === '' ? '0' : val, 18)

        return writeContractAsync({
          address: contract as `0x${string}`,
          abi: multivaultAbi as Abi,
          functionName: !claim
            ? 'createTriple'
            : mode === 'follow'
              ? 'depositTriple'
              : 'redeemTriple',
          args: !claim
            ? [
                getSpecialPredicate(CURRENT_ENV).iPredicate.vaultId,
                getSpecialPredicate(CURRENT_ENV).amFollowingPredicate.vaultId,
                userVaultId,
              ]
            : mode === 'follow'
              ? [userWallet as `0x${string}`, vaultId]
              : [user_conviction, userWallet as `0x${string}`, vaultId],
          value:
            !claim && tripleCost
              ? tripleCost + parsedValue
              : mode === 'follow'
                ? parsedValue
                : undefined,
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
