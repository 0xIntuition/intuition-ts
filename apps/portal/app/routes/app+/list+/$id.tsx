import { useEffect, useState } from 'react'

import { Button, Icon, InfoCard, ProfileCard } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimsService,
  IdentityPresenter,
} from '@0xintuition/api'

import AddIdentitiesListModal from '@components/list/add-identities-list-modal'
import { ListIdentityDisplayCard } from '@components/list/list-identity-display-card'
import NavigationButton from '@components/navigation-link'
import ImageModal from '@components/profile/image-modal'
import { addIdentitiesListModalAtom, imageModalAtom } from '@lib/state/store'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUser, requireUserWallet } from '@server/auth'
import {
  BLOCK_EXPLORER_URL,
  IPFS_GATEWAY_URL,
  NO_PARAM_ID_ERROR,
  NO_WALLET_ERROR,
  PATHS,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { useAtom } from 'jotai'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')

  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  const claim = await fetchWrapper(request, {
    method: ClaimsService.getClaimById,
    args: { id },
  })

  return json({
    claim,
    userWallet,
  })
}

export default function ListDetails() {
  const { claim, userWallet } = useLoaderData<{
    claim: ClaimPresenter
    userWallet: string
  }>()

  const [addIdentitiesListModalActive, setAddIdentitiesListModalActive] =
    useAtom(addIdentitiesListModalAtom)
  const [imageModalActive, setImageModalActive] = useAtom(imageModalAtom)
  const navigate = useNavigate()
  const location = useLocation()
  const [fromUrl, setFromUrl] = useState<string | number>(-1)

  useEffect(() => {
    const from = location.state?.from

    if (from) {
      setFromUrl(from.split('?')[0])
    } else if (document.referrer) {
      setFromUrl(document.referrer)
    } else {
      setFromUrl(-1)
    }
  }, [location.state])

  const leftPanel = (
    <div className="flex-col justify-start items-start gap-6 inline-flex max-lg:w-full">
      <NavigationButton variant="secondary" size="icon" to={fromUrl.toString()}>
        <Icon name="arrow-left" />
      </NavigationButton>
      <ProfileCard
        variant="non-user"
        avatarSrc={claim.object?.image ?? ''}
        name={claim.object?.display_name ?? ''}
        id={claim.object?.identity_id ?? ''}
        bio={claim.object?.description ?? ''}
        ipfsLink={
          claim.object?.is_user === true
            ? `${BLOCK_EXPLORER_URL}/address/${claim.object?.identity_id}`
            : `${IPFS_GATEWAY_URL}/${claim.object?.identity_id?.replace('ipfs://', '')}`
        }
        onAvatarClick={() => {
          if (claim.object) {
            setImageModalActive({
              isOpen: true,
              identity: claim.object,
            })
          }
        }}
      />
      <ListIdentityDisplayCard
        displayName={claim.object?.display_name ?? ''}
        avatarImgSrc={claim.object?.image ?? ''}
        onClick={() => {
          navigate(`/app/identity/${claim.object?.id}`)
        }}
        className="hover:cursor-pointer w-full"
      />
      <InfoCard
        variant="user"
        username={claim.creator?.display_name ?? claim.creator?.wallet ?? ''}
        avatarImgSrc={claim.creator?.image ?? ''}
        id={claim.creator?.wallet ?? ''}
        description={claim.creator?.description ?? ''}
        link={
          claim.creator?.id ? `${PATHS.PROFILE}/${claim.creator?.wallet}` : ''
        }
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${claim.creator?.wallet}`}
        timestamp={claim.created_at}
        className="w-full"
      />
      <Button
        variant="secondary"
        onClick={() => {
          navigate(`/app/identity/${claim.object?.id}`)
        }}
        className="w-full"
      >
        View Identity <Icon name={'arrow-up-right'} className="h-3 w-3" />{' '}
      </Button>
    </div>
  )

  return (
    <>
      <TwoPanelLayout leftPanel={leftPanel} rightPanel={<Outlet />} />
      <AddIdentitiesListModal
        identity={claim.object as IdentityPresenter}
        userWallet={userWallet}
        claimId={claim.claim_id}
        open={addIdentitiesListModalActive.isOpen}
        onClose={() =>
          setAddIdentitiesListModalActive({
            ...addIdentitiesListModalActive,
            isOpen: false,
          })
        }
      />
      {claim.object && (
        <ImageModal
          identity={claim.object}
          open={imageModalActive.isOpen}
          onClose={() =>
            setImageModalActive({
              ...imageModalActive,
              isOpen: false,
            })
          }
        />
      )}
    </>
  )
}
