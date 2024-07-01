import { Button, Claim, Icon, Text } from '@0xintuition/1ui'
import {
  ApiError,
  ClaimSortColumn,
  ClaimsService,
  OpenAPI,
  SortDirection,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { calculateTotalPages, getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ request, params }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>
  const id = params.id

  if (!id) {
    throw new Error('vault_id is undefined.')
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const sortBy: ClaimSortColumn =
    (searchParams.get('sortBy') as ClaimSortColumn) ?? 'createdAt'
  const direction: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  let claims
  try {
    claims = await ClaimsService.searchClaims({
      vault: id,
      page: page,
      limit: Number(limit),
      offset: 0,
      sortBy: sortBy,
      direction: direction,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      claims = undefined
      console.log(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  const totalPages = calculateTotalPages(claims?.total ?? 0, Number(limit))

  logger('claims', claims)

  return json({
    claims,
    sortBy,
    direction,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: claims?.total,
      totalPages,
    },
  })
}
export default function ClaimDetails() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col h-screen mx-8">
      <div className="flex items-center gap-6 my-10">
        <Button variant="secondary" onClick={() => navigate('/app/claims')}>
          <Icon name="arrow-left" />
        </Button>
        <Claim
          size="md"
          subject={{
            variant: 'non-user',
            label: '0xintuition',
          }}
          predicate={{
            variant: 'non-user',
            label: 'is really',
          }}
          object={{
            variant: 'non-user',
            label: 'cool',
          }}
        />
      </div>
      <div className="flex">
        <div className="flex-shrink-0 w-1/3 max-w-xs space-y-4 h-screen">
          <div className="flex flex-col space-y-4">
            <Text variant="headline" className="text-secondary-foreground">
              Left layout
            </Text>
          </div>
        </div>
        <div className="flex-grow ml-8">
          <Text variant="headline" className="text-secondary-foreground">
            Positions on this Claim
          </Text>
        </div>
      </div>
    </div>
  )
}
