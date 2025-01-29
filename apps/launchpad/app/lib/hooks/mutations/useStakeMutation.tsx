import { multivaultAbi } from '@lib/abis/multivault'
import { useDepositAtom } from '@lib/hooks/useDepositAtom'
import { useRedeemAtom } from '@lib/hooks/useRedeemAtom'
import { useMutation } from '@tanstack/react-query'
import { AtomType, TripleType } from 'app/types'
import { Abi, parseUnits } from 'viem'

interface StakeMutationParams {
  val: string
  mode: 'deposit' | 'redeem' | undefined
  contract: string
  userWallet: string
  vaultId: string
  atom?: AtomType | null
  triple?: TripleType | null
}

export function useStakeMutation(contract: string, mode: 'deposit' | 'redeem') {
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
    }),
    txReceipt,
    awaitingWalletConfirmation,
    awaitingOnChainConfirmation,
    isError,
    reset,
  }
}
