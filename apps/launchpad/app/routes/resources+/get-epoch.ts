import { fetchEpochById } from '@lib/services/epochs'
import logger from '@lib/utils/logger'
import { json } from '@remix-run/node'

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url)
  const epochId = url.searchParams.get('epochId')

  if (!epochId) {
    return json({ error: 'Epoch ID is required' }, { status: 400 })
  }

  try {
    const epoch = await fetchEpochById(parseInt(epochId, 10))
    return json({ epoch })
  } catch (error) {
    logger('Error fetching epoch:', error)
    return json(
      {
        error: 'Failed to fetch epoch',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
