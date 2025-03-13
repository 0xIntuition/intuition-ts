import { multivaultAbi } from '@lib/abis/multivault'
import { useDepositAtom } from '@lib/hooks/useDepositAtom'
import { useRedeemAtom } from '@lib/hooks/useRedeemAtom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AtomType } from 'app/types/atom'
import { TripleType } from 'app/types/triple'
import { Abi, formatUnits, parseUnits } from 'viem'

interface StakeMutationParams {
  val: string
  mode: 'deposit' | 'redeem' | undefined
  contract: string
  wallet: string
  vaultId: string | number
  claim?: TripleType
  identity?: AtomType
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
        const { val, wallet, vaultId, claim, conviction_price } = params
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
              ? [wallet as `0x${string}`, vaultId]
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
                  wallet as `0x${string}`,
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
                counterVaultId === variables.claim?.counter_vault_id) ||
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
