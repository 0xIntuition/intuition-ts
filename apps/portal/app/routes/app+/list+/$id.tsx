import { Button, Icon, InfoCard, ProfileCard } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimsService,
  IdentityPresenter,
} from '@0xintuition/api'

import AddIdentitiesListModal from '@components/list/add-identities-list-modal'
import { ListIdentityDisplayCard } from '@components/list/list-identity-display-card'
import NavigationButton from '@components/navigation-link'
import { addIdentitiesListModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { invariant, sliceString } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import FullPageLayout from 'app/layouts/full-page-layout'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { BLOCK_EXPLORER_URL, IPFS_GATEWAY_URL, NO_PARAM_ID_ERROR } from 'consts'
import { useAtom } from 'jotai'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  const claim = await fetchWrapper(request, {
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

  logger('claim on list route', claim)
  const [addIdentitiesListModalActive, setAddIdentitiesListModalActive] =
    useAtom(addIdentitiesListModalAtom)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from

  const leftPanel = (
    <div className="flex flex-col item-center gap-6">
      <ProfileCard
        variant="non-user"
        avatarSrc={claim.object?.image ?? ''}
        name={claim.object?.display_name ?? ''}
        walletAddress={sliceString(claim.object?.identity_id, 6, 4)}
        bio={claim.object?.description ?? ''}
        ipfsLink={
          claim.object?.is_user === true
            ? `${BLOCK_EXPLORER_URL}/address/${claim.object?.identity_id}`
            : `${IPFS_GATEWAY_URL}/${claim.object?.identity_id?.replace('ipfs://', '')}`
        }
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
  )

  return (
    <FullPageLayout>
      <div className="flex w-full items-center justify-between mb-6">
        <NavigationButton variant="secondary" size="icon" to={from ?? -1}>
          <Icon name="arrow-left" />
        </NavigationButton>
        <Button
          variant="primary"
          onClick={() => {
            setAddIdentitiesListModalActive({
              isOpen: true,
              id: claim?.object?.id ?? null,
            })
          }}
        >
          <Icon name="plus-small" />
          Add to list
        </Button>
      </div>
      <TwoPanelLayout leftPanel={leftPanel} rightPanel={<Outlet />} />
      <AddIdentitiesListModal
        identity={claim.object as IdentityPresenter}
        claimId={claim.claim_id}
        open={addIdentitiesListModalActive.isOpen}
        onClose={() =>
          setAddIdentitiesListModalActive({
            ...addIdentitiesListModalActive,
            isOpen: false,
          })
        }
      />
    </FullPageLayout>
  )
}
