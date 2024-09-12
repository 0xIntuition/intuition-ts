import {
  Banner,
  BannerVariant,
  Identity,
  ProfileCard,
  Tags,
  TagsContent,
  TagWithValue,
} from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimsService,
  IdentityPresenter,
} from '@0xintuition/api'

import { DetailInfoCard } from '@components/detail-info-card'
import { ErrorPage } from '@components/error-page'
import NavigationButton from '@components/navigation-link'
import ImageModal from '@components/profile/image-modal'
import ReadOnlyBanner from '@components/read-only-banner'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getIdentityOrPending } from '@lib/services/identities'
import { imageModalAtom } from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import {
  getAtomDescription,
  getAtomId,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { getVaultDetails } from '@server/multivault'
import { BLOCK_EXPLORER_URL, CURRENT_ENV, PATHS } from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { VaultDetailsType } from 'app/types/vault'
import { useAtom } from 'jotai'

export async function loader({ request, params }: LoaderFunctionArgs) {
  logger('[$ID] -- START')

  if (!params.id) {
    return
  }

  const { identity, isPending } = await getIdentityOrPending(request, params.id)

  if (!identity) {
    throw new Response('Not Found', { status: 404 })
  }

  let list: ClaimPresenter | null = null

  try {
    const listResult = await ClaimsService.searchClaims({
      predicate: getSpecialPredicate(CURRENT_ENV).tagPredicate.id,
      object: identity.id,
    })

    if (listResult && listResult.data.length > 0) {
      list = listResult.data[0]
    }
  } catch (error) {
    logger('Failed to fetch list:', error)
  }

  let vaultDetails: VaultDetailsType | null = null

  if (!!identity && identity.vault_id) {
    try {
      vaultDetails = await getVaultDetails(identity.contract, identity.vault_id)
    } catch (error) {
      logger('Failed to fetch vaultDetails:', error)
      vaultDetails = null
    }
  }

  logger('[$ID] -- END')
  return json({
    identity,
    list,
    isPending,
    vaultDetails,
  })
}

export interface ReadOnlyIdentityLoaderData {
  identity: IdentityPresenter
  list: ClaimPresenter
  vaultDetails: VaultDetailsType
  userWallet: string
  isPending: boolean
}

export default function ReadOnlyIdentityDetails() {
  const { identity, list, isPending } =
    useLiveLoader<ReadOnlyIdentityLoaderData>(['attest', 'create'])

  const [imageModalActive, setImageModalActive] = useAtom(imageModalAtom)

  const leftPanel = (
    <div className="flex-col justify-start items-start inline-flex gap-6 max-lg:w-full">
      <ProfileCard
        variant={Identity.nonUser}
        avatarSrc={getAtomImage(identity)}
        name={getAtomLabel(identity)}
        id={getAtomId(identity)}
        vaultId={identity?.vault_id}
        bio={getAtomDescription(identity)}
        ipfsLink={getAtomIpfsLink(identity)}
        externalLink={identity.external_reference ?? ''}
        onAvatarClick={() => {
          setImageModalActive({
            isOpen: true,
            identity,
          })
        }}
      />

      {!isPending && identity?.tags && identity?.tags.length > 0 && (
        <>
          <Tags>
            <div className="flex flex-row gap-2 md:flex-col">
              {identity?.tags && identity?.tags.length > 0 && (
                <TagsContent numberOfTags={identity?.tag_count ?? 0}>
                  {identity?.tags?.map((tag) => (
                    <TagWithValue
                      key={tag.identity_id}
                      label={tag.display_name}
                      value={tag.num_tagged_identities}
                    />
                  ))}
                </TagsContent>
              )}
            </div>
          </Tags>
        </>
      )}

      <DetailInfoCard
        variant={Identity.user}
        list={list}
        username={identity.creator?.display_name ?? '?'}
        avatarImgSrc={identity.creator?.image ?? ''}
        id={identity.creator?.wallet ?? ''}
        description={identity.creator?.description ?? ''}
        link={
          identity.creator?.id
            ? `${PATHS.READONLY_PROFILE}/${identity.creator?.wallet}`
            : ''
        }
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${identity.creator?.wallet}`}
        timestamp={identity.created_at}
        className="w-full"
      />
      <ReadOnlyBanner
        variant={BannerVariant.warning}
        to={`${PATHS.IDENTITY}/${identity.id}`}
      />
    </div>
  )

  const rightPanel = isPending ? (
    <Banner
      variant="warning"
      title="Please Refresh the Page"
      message="It looks like the on-chain transaction was successful, but we're still waiting for the information to update. Please refresh the page to ensure everything is up to date."
    >
      <NavigationButton
        reloadDocument
        variant="secondary"
        to=""
        className="max-lg:w-full"
      >
        Refresh
      </NavigationButton>
    </Banner>
  ) : (
    <Outlet />
  )

  return (
    <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel}>
      <ImageModal
        identity={identity}
        open={imageModalActive.isOpen}
        onClose={() =>
          setImageModalActive({
            ...imageModalActive,
            isOpen: false,
          })
        }
      />
    </TwoPanelLayout>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="identity/$id" />
}
