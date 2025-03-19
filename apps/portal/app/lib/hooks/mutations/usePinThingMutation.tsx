import { useMutation } from '@tanstack/react-query'

import { type Atom } from '../../../components/atom-forms/types'

interface PinThingParams {
  type: Atom['type']
  name: string
  description?: string
  image?: string
  url?: string
}

export function usePinThingMutation() {
  return useMutation({
    mutationFn: async (params: PinThingParams) => {
      const response = await fetch('/api/pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error('Failed to pin thing')
      }

      const data = await response.json()
      return data.uri
    },
  })
}
