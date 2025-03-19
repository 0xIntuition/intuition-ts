import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parseUnits } from 'viem'
import type { UseWriteContractParameters } from 'wagmi'

import { useCreateAtom } from '../useCreateAtom'

interface CreateAtomParams {
  val: string
  uri: string
}

export function useCreateAtomMutation() {
  const queryClient = useQueryClient()
  const { writeContractAsync } = useCreateAtom()

  return useMutation({
    mutationFn: async ({ val, uri }: CreateAtomParams) => {
      // @ts-expect-error TODO: Fix type for useContractWriteAndWait in useCreateAtom
      await writeContractAsync({
        functionName: 'createAtom',
        args: [uri],
        value: parseUnits(val, 18),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-atoms'] })
    },
  })
}
