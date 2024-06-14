import {
  ActivitiesService,
  ApiError,
  OpenAPI,
  SortColumn,
  SortDirection,
} from '@0xintuition/api'

import { calculateTotalPages, getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ request, params }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>
  const wallet = params.wallet

  if (!wallet) {
    throw new Error('Wallet is undefined.')
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const sortBy: SortColumn =
    (searchParams.get('sortBy') as SortColumn) ?? 'createdAt'
  const direction: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  let activity
  try {
    activity = await ActivitiesService.getActivities({
      fromAddress: wallet,
      page: page,
      limit: Number(limit),
      offset: 0,
      sortBy: sortBy,
      direction: direction,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      activity = undefined
      console.log(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  const totalPages = calculateTotalPages(activity?.total ?? 0, Number(limit))

  return json({
    activity,
    sortBy,
    direction,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: activity?.total,
      totalPages,
    },
  })
}

export default function ProfileActivity() {
  const { activity } = useLoaderData<typeof loader>()
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">Profile Activity Route</div>
      <div>{JSON.stringify(activity)}</div>
    </div>
  )
}
