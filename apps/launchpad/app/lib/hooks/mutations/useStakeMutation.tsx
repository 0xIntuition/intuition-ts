import { GetAtomQuery, GetTripleQuery } from '@0xintuition/graphql'

import { multivaultAbi } from '@lib/abis/multivault'
import { useDepositAtom } from '@lib/hooks/useDepositAtom'
import { useRedeemAtom } from '@lib/hooks/useRedeemAtom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Abi, parseUnits } from 'viem'

interface StakeMutationParams {
  val: string
  mode: 'deposit' | 'redeem' | undefined
  contract: string
  userWallet: string
  vaultId: string
  triple?: GetTripleQuery['triple']
  atom?: GetAtomQuery['atom']
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
        const { val, userWallet, vaultId, triple } = params
        const parsedValue = parseUnits(val === '' ? '0' : val, 18)
        const actionType = mode === 'deposit' ? 'buy' : 'sell'

        return writeContractAsync({
          address: contract as `0x${string}`,
          abi: multivaultAbi as Abi,
          functionName:
            actionType === 'buy'
              ? triple !== undefined
                ? 'depositTriple'
                : 'depositAtom'
              : triple !== undefined
                ? 'redeemTriple'
                : 'redeemAtom',
          args:
            actionType === 'buy'
              ? [userWallet as `0x${string}`, vaultId]
              : [
                  parseUnits(val === '' ? '0' : (val ?? '0').toString(), 18),
                  userWallet as `0x${string}`,
                  vaultId,
                ],
          value: actionType === 'buy' ? parsedValue : undefined,
        })
      },
      onSuccess: async (_, variables) => {
        await queryClient.invalidateQueries({
          predicate: (query) => {
            const [key, contract, vaultId, counterVaultId] = query.queryKey
            return (
              (key === 'get-vault-details' && // TODO: This doesn't seem to be working at the moment, but it's not a big deal. We can figure it out later.
                contract === variables.contract &&
                vaultId === variables.vaultId &&
                counterVaultId === variables.triple?.counter_vault_id) ||
              key === 'get-stats' ||
              key === 'get-triple' ||
              key === 'get-vault-details' // TODO: Remove this once we figure out the issue with the above queryKey for get-vault-details.
            )
          },
        })
      },
    }),
    txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    reset,
  }
}
