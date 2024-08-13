import { PositionPresenter, PositionsService } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { getAuthHeaders, invariant } from '@lib/utils/misc'
import { ActionFunctionArgs, json } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'
import { getPrivyTokens } from '@server/privy'

const LIMIT = 50
const DELAY = 1000

export async function action({ request }: ActionFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, 'User wallet is required')

  const formData = await request.formData()
  const singleId = formData.get('singleId') as string | null
  const timestampString = formData.get('timestamp') as string | null

  try {
    let positionIds: string[]
    let totalPositions: number

    if (singleId) {
      // Handle single position reconciliation
      positionIds = [singleId]
      totalPositions = 1
    } else {
      // Handle multiple positions reconciliation
      const timestamp = timestampString ? new Date(timestampString) : undefined
      positionIds = await getAllPositionIds({
        request,
        timestamp: timestamp?.getTime() ?? 0,
      })
      totalPositions = positionIds.length
    }

    const results = []
    const logs = []

    for (const id of positionIds) {
      try {
        await PositionsService.reconcilePosition({ id })
        results.push({ id, success: true })
        logs.push(`Successfully reconciled position ${id}`)
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        results.push({ id, success: false, error: errorMessage })
        logs.push(`Failed to reconcile position ${id}: ${errorMessage}`)
      }
    }

    return json({ totalPositions, results, logs })
  } catch (error) {
    return json(
      {
        error: `An error occurred: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}

async function getAllPositionIds({
  request,
  timestamp,
}: {
  request: Request
  timestamp?: number
}): Promise<string[]> {
  const allPositions: PositionPresenter[] = []
  const allIds: string[] = []
  let total: number | undefined
  let offset = 0

  logger('Starting to fetch all position IDs')

  let shouldContinue = true
  while (shouldContinue) {
    try {
      const { data, newTotal } = await fetchPositionPage(request, offset)
      if (total === undefined) {
        total = newTotal
      }

      allPositions.push(...data)
      allIds.push(...data.map((position: PositionPresenter) => position.id))
      logProgress(allIds, total, offset)

      if (shouldStopFetching(data.length, allIds.length, total)) {
        shouldContinue = false
      } else {
        offset += LIMIT
        await delay(DELAY)
      }
    } catch (error) {
      logger('Error fetching positions:', error)
      shouldContinue = false
    }
  }

  const filteredIds = allIds.filter((id) => {
    const position = allPositions.find((p) => p.id === id)
    return (
      !timestamp || new Date(position?.updated_at ?? '').getTime() >= timestamp
    )
  })

  const uniqueIds = [...new Set(filteredIds)]
  const duplicatesRemoved = filteredIds.length - uniqueIds.length

  logger(
    `Finished fetching all position IDs. Total retrieved: ${allIds.length}`,
  )
  logger(
    `Filtered ${allIds.length - filteredIds.length} positions based on timestamp`,
  )
  logger(
    `Removed ${duplicatesRemoved} duplicate IDs. Final count: ${uniqueIds.length}`,
  )
  logger(`Fetched ${Math.floor(offset / LIMIT) + 1} pages in total`)

  return uniqueIds
}

async function fetchPositionPage(request: Request, offset: number) {
  const apiUrl = process.env.API_URL
  invariant(apiUrl, 'API_URL is not set')
  const { accessToken } = getPrivyTokens(request)
  invariant(accessToken, 'Access token is required')

  const response = await fetch(
    `${apiUrl}/positions?limit=${LIMIT}&offset=${offset}`,
    {
      headers: getAuthHeaders(accessToken),
      signal: request.signal,
    },
  )

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status}, ${response.statusText}`,
    )
  }

  const data = await response.json()

  return {
    data: data.data,
    newTotal: data.total,
  }
}

function logProgress(
  allIds: string[],
  total: number | undefined,
  offset: number,
) {
  logger(`Retrieved ${allIds.length} IDs (total: ${allIds.length}/${total})`)
  logger(`Fetched ${Math.floor(offset / LIMIT) + 1} pages in total`)
}

function shouldStopFetching(
  newIdsLength: number,
  totalIdsLength: number,
  total?: number,
): boolean {
  return (
    newIdsLength < LIMIT || (total !== undefined && totalIdsLength >= total)
  )
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
