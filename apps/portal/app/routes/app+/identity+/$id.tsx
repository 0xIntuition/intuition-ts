import { useEffect, useState } from 'react'

import {
  Banner,
  Icon,
  Identity,
  IdentityStakeCard,
  PieChartVariant,
  PositionCard,
  PositionCardLastUpdated,
  PositionCardOwnership,
  PositionCardStaked,
  ProfileCard,
  Tag,
  Tags,
  TagsButton,
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
import SaveListModal from '@components/save-list/save-list-modal'
import ShareCta from '@components/share-cta'
import ShareModal from '@components/share-modal'
import StakeModal from '@components/stake/stake-modal'
import TagsModal from '@components/tags/tags-modal'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getIdentityOrPending } from '@lib/services/identities'
import { getTags } from '@lib/services/tags'
import {
  imageModalAtom,
  saveListModalAtom,
  shareModalAtom,
  stakeModalAtom,
  tagsModalAtom,
} from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import {
  calculatePercentageOfTvl,
  formatBalance,
  getAtomDescription,
  getAtomId,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  invariant,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useNavigate } from '@remix-run/react'
import { requireUser, requireUserWallet } from '@server/auth'
import { getVaultDetails } from '@server/multivault'
import {
  BLOCK_EXPLORER_URL,
  CURRENT_ENV,
  MULTIVAULT_CONTRACT_ADDRESS,
  NO_WALLET_ERROR,
  PATHS,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { VaultDetailsType } from 'app/types/vault'
import { useAtom } from 'jotai'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')

  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

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
      vaultDetails = await getVaultDetails(
        identity.contract,
        identity.vault_id,
        userWallet as `0x${string}`,
      )
    } catch (error) {
      logger('Failed to fetch vaultDetails:', error)
      vaultDetails = null
    }
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const { tagClaims } = await getTags({
    request,
    subjectId: identity.id,
    searchParams,
  })

  logger('[$ID] -- END')
  return json({
    identity,
    list,
    isPending,
    vaultDetails,
    userWallet,
    tagClaims,
  })
}

export interface IdentityLoaderData {
  identity: IdentityPresenter
  list: ClaimPresenter
  vaultDetails: VaultDetailsType
  userWallet: string
  isPending: boolean
  tagClaims: ClaimPresenter[]
}

export default function IdentityDetails() {
  const { identity, list, vaultDetails, userWallet, isPending, tagClaims } =
    useLiveLoader<IdentityLoaderData>(['attest', 'create'])
  const navigate = useNavigate()

  const { user_assets, assets_sum } = vaultDetails ? vaultDetails : identity
  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)
  const [tagsModalActive, setTagsModalActive] = useAtom(tagsModalAtom)
  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)
  const [imageModalActive, setImageModalActive] = useAtom(imageModalAtom)
  const [selectedTag, setSelectedTag] = useState<
    IdentityPresenter | null | undefined
  >(null)
  const [shareModalActive, setShareModalActive] = useAtom(shareModalAtom)

  useEffect(() => {
    if (saveListModalActive.tag) {
      setSelectedTag(saveListModalActive.tag)
    }
  }, [saveListModalActive])

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

      {!isPending && (
        <>
          <Tags>
            <div className="flex flex-col gap-2">
              {Array.isArray(tagClaims) && tagClaims.length > 0 ? (
                <TagsContent numberOfTags={tagClaims?.length ?? 0}>
                  {tagClaims.slice(0, 5).map((tagClaim) => (
                    <TagWithValue
                      key={tagClaim.claim_id}
                      label={tagClaim.object?.display_name}
                      value={tagClaim.num_positions}
                      onStake={() => {
                        setSelectedTag(tagClaim.object)
                        setSaveListModalActive({
                          isOpen: true,
                          id: tagClaim.vault_id,
                          tag: tagClaim.object,
                        })
                      }}
                    />
                  ))}
                </TagsContent>
              ) : null}
              <Tag
                className="w-fit border-dashed"
                onClick={() => {
                  setTagsModalActive({ isOpen: true, mode: 'add' })
                }}
              >
                <Icon name="plus-small" className="w-5 h-5" />
                Add tags
              </Tag>
            </div>

            <TagsButton
              onClick={() => {
                setTagsModalActive({ isOpen: true, mode: 'view' })
              }}
            />
          </Tags>
          {vaultDetails !== null && user_assets !== '0' ? (
            <PositionCard
              onButtonClick={() =>
                setStakeModalActive((prevState) => ({
                  ...prevState,
                  mode: 'redeem',
                  modalType: 'identity',
                  identity,
                  isOpen: true,
                }))
              }
            >
              <PositionCardStaked
                amount={user_assets ? +formatBalance(user_assets, 18) : 0}
              />
              <PositionCardOwnership
                percentOwnership={
                  user_assets !== null && assets_sum
                    ? +calculatePercentageOfTvl(user_assets ?? '0', assets_sum)
                    : 0
                }
                variant={PieChartVariant.default}
              />
              <PositionCardLastUpdated timestamp={identity.updated_at} />
            </PositionCard>
          ) : null}
          <IdentityStakeCard
            tvl={+formatBalance(assets_sum, 18)}
            holders={identity?.num_positions}
            variant={identity.is_user ? Identity.user : Identity.nonUser}
            identityImgSrc={getAtomImage(identity)}
            identityDisplayName={getAtomLabel(identity)}
            onBuyClick={() =>
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'deposit',
                modalType: 'identity',
                identity,
                isOpen: true,
              }))
            }
            onViewAllClick={() =>
              navigate(`${PATHS.IDENTITY}/${identity.vault_id}#positions`)
            }
          />
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
            ? `${PATHS.PROFILE}/${identity.creator?.wallet}`
            : ''
        }
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${identity.creator?.wallet}`}
        timestamp={identity.created_at}
        className="w-full"
      />
      <ShareCta
        onShareClick={() =>
          setShareModalActive({
            isOpen: true,
            currentPath: location.pathname,
          })
        }
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
      {!isPending && (
        <>
          <StakeModal
            userWallet={userWallet}
            contract={identity.contract}
            open={stakeModalActive.isOpen}
            identity={identity}
            vaultDetailsProp={vaultDetails}
            onClose={() => {
              setStakeModalActive((prevState) => ({
                ...prevState,
                isOpen: false,
                mode: undefined,
              }))
            }}
          />
          <TagsModal
            identity={identity}
            tagClaims={tagClaims}
            userWallet={userWallet}
            open={tagsModalActive.isOpen}
            mode={tagsModalActive.mode}
            onClose={() => {
              setTagsModalActive({
                ...tagsModalActive,
                isOpen: false,
              })
              setSelectedTag(undefined)
            }}
          />
          {selectedTag && (
            <SaveListModal
              contract={identity.contract ?? MULTIVAULT_CONTRACT_ADDRESS}
              tag={saveListModalActive.tag ?? selectedTag}
              identity={identity}
              userWallet={userWallet}
              open={saveListModalActive.isOpen}
              onClose={() =>
                setSaveListModalActive({
                  ...saveListModalActive,
                  isOpen: false,
                })
              }
            />
          )}
        </>
      )}
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
      <ShareModal
        currentPath={location.pathname}
        open={shareModalActive.isOpen}
        onClose={() =>
          setShareModalActive({
            ...shareModalActive,
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
