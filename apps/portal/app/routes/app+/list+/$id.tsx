import { NO_PARAM_ID_ERROR } from 'constants'

import { Button, Icon, InfoCard, ProfileCard } from '@0xintuition/1ui'
import { ClaimPresenter, ClaimsService } from '@0xintuition/api'

import { ListIdentityDisplayCard } from '@components/list/list-identity-display-card'
import { NestedLayout } from '@components/nested-layout'
import logger from '@lib/utils/logger'
import { fetchWrapper, invariant, sliceString } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from '@remix-run/react'

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  const claim = await fetchWrapper({
    method: ClaimsService.getClaimById,
    args: { id },
  })

  return json({
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
        <div className="flex flex-col item-center gap-6">
          <ProfileCard
            variant="non-user"
            avatarSrc={claim.object?.image ?? ''}
            name={claim.object?.display_name ?? ''}
            walletAddress={sliceString(claim.object?.identity_id, 6, 4)}
            bio={claim.object?.description ?? ''}
          />
          <ListIdentityDisplayCard
            displayName={claim.object?.display_name ?? ''}
            avatarImgSrc={claim.object?.image ?? ''}
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
          <Button
            variant="secondary"
            onClick={() => {
              navigate(`/app/identity/${claim.object?.id}`)
            }}
          >
            View identity
            <Icon name="arrow-up-right" />
          </Button>
        </div>
      </NestedLayout>
    </>
  )
}
