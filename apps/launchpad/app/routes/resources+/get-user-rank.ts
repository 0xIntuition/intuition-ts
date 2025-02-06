import { fetchUserRank } from '@lib/services/points'
import type { LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const address = url.searchParams.get('address')

  if (!address) {
    return new Response(JSON.stringify({ rank: null }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const rankData = await fetchUserRank(address)

    return new Response(JSON.stringify(rankData), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching user rank:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch user rank',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
