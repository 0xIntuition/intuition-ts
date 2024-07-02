import {
  Button,
  Claim,
  ClaimStakeCard,
  Icon,
  InfoCard,
  Text,
} from '@0xintuition/1ui'
import {
  ApiError,
  ClaimPresenter,
  ClaimSortColumn,
  OpenAPI,
  SortDirection,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
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

  let claim
  try {
    claim = {
      against_assets_sum: '0',
      against_conviction_price: '0',
      against_conviction_sum: '0',
      against_num_positions: 0,
      assets_sum: '0',
      claim_id: 'placeholder_id',
      contract: 'placeholder_contract',
      counter_vault_id: 'placeholder_counter_vault_id',
      created_at: new Date().toISOString(),
      creator: null,
      for_assets_sum: '0',
      for_conviction_price: '0',
      for_conviction_sum: '0',
      for_num_positions: 0,
      num_positions: 0,
      object: null,
      predicate: null,
      status: 'pending',
      subject: null,
      updated_at: new Date().toISOString(),
      user_assets_against: '0',
      user_assets_for: '0',
      user_conviction_against: '0',
      user_conviction_for: '0',
      vault_id: 'placeholder_vault_id',
    }
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      claim = undefined
      console.log(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  return json({
    claim,
    sortBy,
    direction,
  })
}
export default function ClaimDetails() {
  const { claim } = useLoaderData<{
    claim: ClaimPresenter
  }>()
  const navigate = useNavigate()
  logger('claim on claim details page', claim)

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
      <div className="flex gap-8">
        <div className="flex-shrink-0 w-1/3 max-w-sm space-y-4 h-screen">
          <div className="flex flex-col space-y-4">
            <Text variant="headline" className="text-secondary-foreground">
              Left layout
            </Text>
            <ClaimStakeCard
              currency="ETH"
              totalTVL={4.928}
              tvlAgainst={0.567}
              tvlFor={3.643}
              amountAgainst={39}
              amountFor={124}
              onAgainstBtnClick={() => logger('against buttonn click')}
              onForBtnClick={() => logger('for button clicked')}
            />
            <InfoCard
              variant="user"
              username="super dave"
              avatarImgSrc="image.jpg"
              timestamp="2024-05-10T00:00:00Z"
            />
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
