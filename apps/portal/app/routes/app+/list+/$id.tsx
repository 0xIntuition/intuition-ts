import { Button, Icon, InfoCard, ProfileCard } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  IdentityPresenter,
  PositionSortColumn,
} from '@0xintuition/api'

import { NestedLayout } from '@components/nested-layout'
import { TAG_PREDICATE_VAULT_ID_TESTNET } from '@lib/utils/constants'
import { NO_PARAMS_ID_ERROR } from '@lib/utils/errors'
import logger from '@lib/utils/logger'
import { fetchWrapper, invariant, sliceString } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from '@remix-run/react'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAMS_ID_ERROR)

  const claim = await fetchWrapper({
    method: ClaimsService.getClaimById,
    args: { id },
  })

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
    defaultSortByValue: PositionSortColumn.CREATED_AT,
  })

  invariant(claim.subject?.vault_id, 'Claim subject id is missing')
  invariant(claim.object?.vault_id, 'Claim object or id is missing')

  const tagClaims = await fetchWrapper({
    method: ClaimsService.searchClaims,
    args: {
      page,
      limit,
      sortBy: sortBy as ClaimSortColumn,
      direction,
      subject: claim.subject.id,
      predicate: TAG_PREDICATE_VAULT_ID_TESTNET,
      // object: 'b5f6cf04-0d3f-4d19-9716-a42c6afb400e',
      object: claim.object.id,
    },
  })

  logger('subj', claim.subject.vault_id)
  logger('pred', TAG_PREDICATE_VAULT_ID_TESTNET)
  logger('obj', id)

  logger('list claim', claim)
  logger('tag claims', tagClaims)
  return json({
    identity,
    claim,
  })
}

export default function ListDetails() {
  const { claim } = useLoaderData<{
    claim: ClaimPresenter
  }>()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from
  const goBack = () => {
    if (from) {
      navigate(from)
    } else {
      navigate(-1)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between gap-6 mx-8 mt-10">
        <Button variant="secondary" size="icon" onClick={() => goBack}>
          <Icon name="arrow-left" />
        </Button>
        <Button variant="primary" onClick={() => logger('add to list clicked')}>
          <Icon name="plus-small" />
          Add to list
        </Button>
      </div>
      <NestedLayout outlet={Outlet}>
        <ProfileCard
          variant="non-user"
          avatarSrc={claim.object?.image ?? ''}
          name={claim.object?.display_name ?? ''}
          walletAddress={sliceString(claim.object?.identity_id, 6, 4)}
          bio={claim.object?.description ?? ''}
        />
        <InfoCard
          variant="user"
          username={claim.creator?.display_name ?? ''}
          avatarImgSrc={claim.creator?.image ?? ''}
          timestamp={claim.created_at}
          onClick={() => {
            navigate(`/app/profile/${claim.creator?.wallet}`)
          }}
          className="hover:cursor-pointer w-full"
        />
      </NestedLayout>
    </>
  )
}
