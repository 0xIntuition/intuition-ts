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
  ClaimsService,
  OpenAPI,
  SortDirection,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { formatBalance, getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ request, params }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  logger('accessToken', accessToken)
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
    if (!params.id) {
      return
    }

    claim = await ClaimsService.getClaimById({
      id: params.id,
    })
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
            variant: claim.subject?.is_user ? 'user' : 'non-user',
            label: claim.subject?.is_user
              ? claim.subject?.user?.display_name ?? claim.subject?.display_name
              : claim.subject?.display_name ?? '',
            imgSrc: claim.subject?.is_user
              ? claim.subject?.user?.image ?? claim.subject?.image
              : claim.subject?.image ?? null,
          }}
          predicate={{
            variant: claim.predicate?.is_user ? 'user' : 'non-user',
            label: claim.predicate?.is_user
              ? claim.predicate?.user?.display_name ??
                claim.predicate?.display_name
              : claim.predicate?.display_name ?? '',
            imgSrc: claim.predicate?.is_user
              ? claim.predicate?.user?.image ?? claim.predicate?.image
              : claim.predicate?.image ?? null,
          }}
          object={{
            variant: claim.object?.is_user ? 'user' : 'non-user',
            label: claim.object?.is_user
              ? claim.object?.user?.display_name ?? claim.object?.display_name
              : claim.object?.display_name ?? '',
            imgSrc: claim.object?.is_user
              ? claim.object?.user?.image ?? claim.object?.image
              : claim.object?.image ?? null,
          }}
        />
      </div>
      <div className="flex gap-8">
        <div className="flex-shrink-0 w-1/3 max-w-sm space-y-4 h-screen">
          <div className="flex flex-col space-y-4 ">
            <ClaimStakeCard
              currency="ETH"
              totalTVL={+formatBalance(claim.assets_sum)}
              tvlAgainst={+formatBalance(claim.user_assets_against)}
              tvlFor={+formatBalance(claim.user_assets_for)}
              amountAgainst={+formatBalance(claim.against_assets_sum)}
              amountFor={+formatBalance(claim.for_assets_sum)}
              onAgainstBtnClick={() => logger('against button click')}
              onForBtnClick={() => logger('for button clicked')}
            />
            <InfoCard
              variant="user"
              username={claim.creator?.display_name ?? ''}
              avatarImgSrc={claim.creator?.image ?? ''}
              timestamp={claim.created_at}
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
