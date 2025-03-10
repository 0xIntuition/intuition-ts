import { GetStatsQuery } from '@0xintuition/graphql'

import { useQuery } from '@tanstack/react-query'

const LINEA_API_URL = 'https://prod.linea.intuition-api.com/v1/graphql'

const fetchLineaStats = async () => {
  console.log('🟡 Fetching Linea stats...')

  const response = await fetch(LINEA_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetStats {
          stats(limit: 1, order_by: { id: desc }) {
            contract_balance
            total_accounts
            total_fees
            total_atoms
            total_triples
            total_positions
            total_signals
          }
        }
      `,
    }),
  })

  if (!response.ok) {
    console.error('❌ Linea stats fetch failed:', response.statusText)
    throw new Error('Network response was not ok')
  }

  const json = await response.json()
  console.log('✅ Linea stats response:', json.data?.stats[0])
  return json.data as GetStatsQuery
}

export function useLineaStats() {
  return useQuery<GetStatsQuery, Error>({
    queryKey: ['get-linea-stats'],
    queryFn: fetchLineaStats,
  })
}
