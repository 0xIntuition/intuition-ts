import { useEffect, useState } from 'react'

import {
  Banner,
  Button,
  Icon,
  IconName,
  Identity,
  PieChartVariant,
  PositionCard,
  PositionCardLastUpdated,
  PositionCardOwnership,
  PositionCardStaked,
  ProfileCard,
  StakeCard,
  Tag,
  Tags,
  TagsButton,
  TagsContent,
  TagWithValue,
} from '@0xintuition/1ui'
import {
  ApiError,
  IdentityPresenter,
  TagEmbeddedPresenter,
  UserPresenter,
  UsersService,
  UserTotalsPresenter,
} from '@0xintuition/api'

import PrivyRevalidate from '@client/privy-revalidate'
import EditProfileModal from '@components/edit-profile/modal'
import EditSocialLinksModal from '@components/edit-social-links-modal'
import { ErrorPage } from '@components/error-page'
import SaveListModal from '@components/list/save-list-modal'
import NavigationButton from '@components/navigation-link'
import { ProfileSocialAccounts } from '@components/profile-social-accounts'
import ImageModal from '@components/profile/image-modal'
import { SegmentedNav } from '@components/segmented-nav'
import StakeModal from '@components/stake/stake-modal'
import TagsModal from '@components/tags/tags-modal'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getIdentityOrPending } from '@lib/services/identities'
import {
  editProfileModalAtom,
  editSocialLinksModalAtom,
  imageModalAtom,
  saveListModalAtom,
  stakeModalAtom,
  tagsModalAtom,
} from '@lib/state/store'
import logger from '@lib/utils/logger'
import {
  calculatePercentageOfTvl,
  formatBalance,
  getAtomImage,
  getAtomLabel,
  invariant,
} from '@lib/utils/misc'
import { User } from '@privy-io/react-auth'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import {
  Outlet,
  useMatches,
  useNavigate,
  useRevalidator,
} from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUser, requireUserWallet } from '@server/auth'
import { getVaultDetails } from '@server/multivault'
import {
  BLOCK_EXPLORER_URL,
  MULTIVAULT_CONTRACT_ADDRESS,
  NO_WALLET_ERROR,
  PATHS,
  userIdentityRouteOptions,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { VaultDetailsType } from 'app/types/vault'
import { useAtom } from 'jotai'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')
  const userWallet = user.wallet?.address

  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  let userObject
  try {
    userObject = await fetchWrapper(request, {
      method: UsersService.getUserByWalletPublic,
      args: {
        wallet: userWallet,
      },
    })
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 400 || error.status === 404)
    ) {
      if (!wallet) {
        throw redirect('/login')
      } else {
        throw redirect('/invite')
      }
    }
    logger('Error fetching userObject', error)
    throw error
  }

  const { identity: userIdentity, isPending } = await getIdentityOrPending(
    request,
    wallet,
  )

  if (!userIdentity) {
    throw redirect('/create') // this is an actual 404 and should redirect to /create
  }

  if (!userIdentity.creator) {
    throw new Response('Invalid or missing creator ID', { status: 404 })
  }

  const getCreatorId = (
    creator: string | UserPresenter | null | undefined,
  ): string | null | undefined => {
    if (creator === null || creator === undefined) {
      return creator // Returns null or undefined
    }
    if (typeof creator === 'string') {
      return creator
    }
    if ('id' in creator) {
      return creator.id
    }
    return undefined
  }

  const creatorId = getCreatorId(userIdentity.creator)
  if (!creatorId) {
    throw new Error('Invalid or missing creator ID')
  }

  const userTotals = await fetchWrapper(request, {
    method: UsersService.getUserTotals,
    args: {
      id: creatorId,
    },
  })

  if (!userTotals) {
    return logger('No user totals found')
  }

  let vaultDetails: VaultDetailsType | null = null

  if (userIdentity !== undefined && userIdentity.vault_id) {
    try {
      vaultDetails = await getVaultDetails(
        userIdentity.contract,
        userIdentity.vault_id,
        userWallet as `0x${string}`,
      )
    } catch (error) {
      logger('Failed to fetch vaultDetails', error)
      vaultDetails = null
    }
  }

  return json({
    privyUser: user,
    userWallet,
    userIdentity,
    userObject,
    userTotals,
    vaultDetails,
    isPending,
  })
}

export interface ProfileLoaderData {
  privyUser: User
  userWallet: string
  userIdentity: IdentityPresenter
  userObject: UserPresenter
  userTotals: UserTotalsPresenter
  vaultDetails: VaultDetailsType
  isPending: boolean
}

export default function Profile() {
  const {
    userObject: user,
    privyUser,
    userWallet,
    userIdentity,
    userTotals,
    vaultDetails,
    isPending,
  } = useLiveLoader<ProfileLoaderData>(['attest', 'create'])

  const { user_assets, assets_sum } = vaultDetails ? vaultDetails : userIdentity

  const [userObject, setUserObject] = useState<
    UserPresenter | null | undefined
  >(userIdentity.user ?? user)
  const [editProfileModalActive, setEditProfileModalActive] =
    useAtom(editProfileModalAtom)
  const [editSocialLinksModalActive, setEditSocialLinksModalActive] = useAtom(
    editSocialLinksModalAtom,
  )
  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)
  const [tagsModalActive, setTagsModalActive] = useAtom(tagsModalAtom)
  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)
  const [imageModalActive, setImageModalActive] = useAtom(imageModalAtom)

  const [selectedTag, setSelectedTag] = useState<TagEmbeddedPresenter>()

  useEffect(() => {
    if (saveListModalActive.tag) {
      setSelectedTag(saveListModalActive.tag)
    }
  }, [saveListModalActive])

  const revalidator = useRevalidator()
  const navigate = useNavigate()

  useEffect(() => {
    setEditProfileModalActive(false)
    setEditSocialLinksModalActive(false)
  }, [])

  useEffect(() => {
    if (!editProfileModalActive) {
      revalidator.revalidate()
    }
  }, [editProfileModalActive])

  const matches = useMatches()
  const currentPath = matches[matches.length - 1].pathname

  // List of paths that should not use the ProfileLayout
  const excludedPaths = [PATHS.PROFILE_CREATE]

  if (excludedPaths.includes(currentPath)) {
    return <Outlet />
  }

  if (!userObject) {
    return null
  }

  const leftPanel = (
    <div className="flex-col justify-start items-start gap-5 inline-flex max-lg:w-full">
      <ProfileCard
        variant="user"
        avatarSrc={userObject.image ?? ''}
        name={userObject.display_name ?? ''}
        id={userObject.ens_name ?? userObject.wallet}
        vaultId={userIdentity.vault_id}
        stats={{
          numberOfFollowers: userTotals.follower_count,
          numberOfFollowing: userTotals.followed_count,
          points: userTotals.total_points,
        }}
        bio={userObject.description ?? ''}
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${userObject.wallet}`}
        followingLink={`${PATHS.PROFILE_CONNECTIONS}?tab=following`}
        followerLink={`${PATHS.PROFILE_CONNECTIONS}?tab=followers`}
        onAvatarClick={() => {
          setImageModalActive({
            isOpen: true,
            identity: userIdentity,
          })
        }}
      >
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => setEditProfileModalActive(true)}
        >
          <Icon name={IconName.avatarSparkle} className="h-4 w-4" /> Edit
          Profile
        </Button>
      </ProfileCard>
      <ProfileSocialAccounts
        privyUser={JSON.parse(JSON.stringify(privyUser))}
        handleOpenEditSocialLinksModal={() =>
          setEditSocialLinksModalActive(true)
        }
      />
      {!isPending && (
        <>
          <Tags className="max-lg:items-center">
            {userIdentity?.tags && userIdentity?.tags.length > 0 && (
              <TagsContent numberOfTags={userIdentity?.tag_count ?? 0}>
                {userIdentity?.tags?.map((tag) => (
                  <TagWithValue
                    key={tag.identity_id}
                    label={tag.display_name}
                    value={tag.num_tagged_identities}
                    onStake={() => {
                      setSelectedTag(tag)
                      setSaveListModalActive({ isOpen: true, id: tag.vault_id })
                    }}
                  />
                ))}
              </TagsContent>
            )}
            <Tag
              className="w-fit border-dashed"
              onClick={() => {
                setTagsModalActive({ isOpen: true, mode: 'add' })
              }}
            >
              <Icon name="plus-small" className="w-5 h-5" />
              Add tags
            </Tag>

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
              <PositionCardLastUpdated timestamp={userIdentity.updated_at} />
            </PositionCard>
          ) : null}
          <StakeCard
            tvl={+formatBalance(assets_sum)}
            holders={userIdentity.num_positions}
            variant={userIdentity.is_user ? Identity.user : Identity.nonUser}
            identityImgSrc={getAtomImage(userIdentity)}
            identityDisplayName={getAtomLabel(userIdentity)}
            onBuyClick={() =>
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'deposit',
                modalType: 'identity',
                isOpen: true,
              }))
            }
            onViewAllClick={() => navigate(PATHS.PROFILE_DATA_ABOUT)}
          />
        </>
      )}
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
    <>
      <div className="flex flex-row justify-end mb-6 max-lg:justify-center">
        <SegmentedNav options={userIdentityRouteOptions} />
      </div>
      <Outlet />
    </>
  )

  return (
    <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel}>
      {!isPending && (
        <>
          <EditProfileModal
            userObject={userObject}
            setUserObject={setUserObject}
            open={editProfileModalActive}
            onClose={() => setEditProfileModalActive(false)}
          />
          <EditSocialLinksModal
            privyUser={JSON.parse(JSON.stringify(privyUser))}
            open={editSocialLinksModalActive}
            onClose={() => setEditSocialLinksModalActive(false)}
          />
          <StakeModal
            userWallet={userWallet}
            contract={userIdentity.contract}
            open={stakeModalActive.isOpen}
            identity={userIdentity}
            vaultDetails={vaultDetails}
            onClose={() => {
              setStakeModalActive((prevState) => ({
                ...prevState,
                isOpen: false,
              }))
            }}
          />
          <TagsModal
            identity={userIdentity}
            userWallet={userWallet}
            open={tagsModalActive.isOpen}
            mode={tagsModalActive.mode}
            onClose={() =>
              setTagsModalActive({
                ...tagsModalActive,
                isOpen: false,
              })
            }
          />
          {selectedTag && (
            <SaveListModal
              contract={userIdentity.contract ?? MULTIVAULT_CONTRACT_ADDRESS}
              tag={saveListModalActive.tag ?? selectedTag}
              identity={userIdentity}
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
          {selectedTag && (
            <SaveListModal
              contract={userIdentity.contract ?? MULTIVAULT_CONTRACT_ADDRESS}
              tag={saveListModalActive.tag ?? selectedTag}
              identity={userIdentity}
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
        identity={userIdentity}
        open={imageModalActive.isOpen}
        onClose={() =>
          setImageModalActive({
            ...imageModalActive,
            isOpen: false,
          })
        }
      />

      <PrivyRevalidate />
    </TwoPanelLayout>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/layout" />
}
