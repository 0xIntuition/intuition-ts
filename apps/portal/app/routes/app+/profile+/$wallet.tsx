import { useEffect, useState } from 'react'

import {
  Button,
  Icon,
  IconName,
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
  ClaimPresenter,
  ClaimsService,
  IdentitiesService,
  IdentityPresenter,
  TagEmbeddedPresenter,
  UsersService,
  UserTotalsPresenter,
} from '@0xintuition/api'

import FollowModal from '@components/follow/follow-modal'
import SaveListModal from '@components/list/save-list-modal'
import ImageModal from '@components/profile/image-modal'
import { SegmentedNav } from '@components/segmented-nav'
import StakeModal from '@components/stake/stake-modal'
import TagsModal from '@components/tags/tags-modal'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import {
  followModalAtom,
  imageModalAtom,
  saveListModalAtom,
  stakeModalAtom,
  tagsModalAtom,
} from '@lib/state/store'
import logger from '@lib/utils/logger'
import {
  calculatePercentageOfTvl,
  formatBalance,
  invariant,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet, useNavigate } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
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

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const wallet = params.wallet

  if (!wallet) {
    throw new Error('Wallet is undefined in params')
  }

  if (wallet.toLowerCase() === userWallet.toLowerCase()) {
    throw redirect(PATHS.PROFILE)
  }

  const userIdentity = await fetchWrapper(request, {
    method: IdentitiesService.getIdentityById,
    args: {
      id: wallet,
    },
  })

  if (!userIdentity) {
    return logger('No user identity found')
  }

  if (!userIdentity.creator || typeof userIdentity.creator.id !== 'string') {
    logger('Invalid or missing creator ID')
    return
  }

  const userTotals = await fetchWrapper(request, {
    method: UsersService.getUserTotals,
    args: {
      id: userIdentity.creator.id,
    },
  })

  if (!userTotals) {
    return logger('No user totals found')
  }

  let vaultDetails: VaultDetailsType | null = null

  if (userIdentity !== null && userIdentity.vault_id) {
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

  let followClaim: ClaimPresenter | null = null
  let followVaultDetails: VaultDetailsType | null = null

  if (userIdentity.follow_claim_id) {
    followClaim = await fetchWrapper(request, {
      method: ClaimsService.getClaimById,
      args: {
        id: userIdentity.follow_claim_id,
      },
    })
  }

  if (userIdentity.user && followClaim && followClaim.vault_id) {
    try {
      followVaultDetails = await getVaultDetails(
        followClaim.contract,
        followClaim.vault_id,
        userWallet as `0x${string}`,
      )
    } catch (error) {
      logger('Failed to fetch followVaultDetails', error)
      followVaultDetails = null
    }
  }

  return json({
    wallet,
    userWallet,
    userIdentity,
    userTotals,
    followClaim,
    followVaultDetails,
    vaultDetails,
  })
}

export default function Profile() {
  const {
    wallet,
    userWallet,
    userIdentity,
    userTotals,
    followClaim,
    followVaultDetails,
    vaultDetails,
  } = useLiveLoader<{
    wallet: string
    userWallet: string
    userIdentity: IdentityPresenter
    userTotals: UserTotalsPresenter
    followClaim: ClaimPresenter
    followVaultDetails: VaultDetailsType
    vaultDetails: VaultDetailsType
  }>(['attest', 'create'])
  const navigate = useNavigate()

  const { user_assets, assets_sum } = vaultDetails ? vaultDetails : userIdentity

  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)
  const [tagsModalActive, setTagsModalActive] = useAtom(tagsModalAtom)
  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)
  const [followModalActive, setFollowModalActive] = useAtom(followModalAtom)
  const [imageModalActive, setImageModalActive] = useAtom(imageModalAtom)
  const [selectedTag, setSelectedTag] = useState<TagEmbeddedPresenter>()

  useEffect(() => {
    if (saveListModalActive.tag) {
      setSelectedTag(saveListModalActive.tag)
    }
  }, [saveListModalActive])

  const leftPanel = (
    <div className="flex-col justify-start items-start gap-5 inline-flex max-lg:w-full">
      <ProfileCard
        variant="user"
        avatarSrc={userIdentity?.user?.image ?? ''}
        name={userIdentity?.user?.display_name ?? ''}
        id={
          userIdentity?.user?.ens_name ??
          userIdentity?.user?.wallet ??
          userIdentity.identity_id
        }
        vaultId={userIdentity.vault_id}
        stats={{
          numberOfFollowers: userTotals.follower_count,
          numberOfFollowing: userTotals.followed_count,
          points: userTotals.total_points,
        }}
        bio={userIdentity?.user?.description ?? ''}
        ipfsLink={`${BLOCK_EXPLORER_URL}/address/${userIdentity.identity_id}`}
        followingLink={`${PATHS.PROFILE}/${wallet}/connections?tab=following`}
        followerLink={`${PATHS.PROFILE}/${wallet}/connections?tab=followers`}
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
          onClick={() =>
            setFollowModalActive((prevState) => ({
              ...prevState,
              isOpen: true,
            }))
          }
        >
          {followVaultDetails &&
          (followVaultDetails.user_conviction ?? '0') > '0' ? (
            <>
              <Icon name={IconName.peopleAddFilled} className="h-4 w-4" />
              Following ·{' '}
              {formatBalance(followVaultDetails.user_assets ?? '0', 18)} ETH
            </>
          ) : (
            <>
              <Icon name={IconName.peopleAdd} className="h-4 w-4" />
              Follow
            </>
          )}
        </Button>
      </ProfileCard>
      {/* TODO: Determine whether we need this or not */}
      {/* <ProfileSocialAccounts
      privyUser={JSON.parse(JSON.stringify(user))}
      handleOpenEditSocialLinksModal={() =>
        setEditSocialLinksModalActive(true)
      }
    /> */}
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
          />
          <PositionCardLastUpdated timestamp={userIdentity.updated_at} />
        </PositionCard>
      ) : null}
      <StakeCard
        tvl={+formatBalance(assets_sum ?? '0')}
        holders={userIdentity.num_positions}
        onBuyClick={() =>
          setStakeModalActive((prevState) => ({
            ...prevState,
            mode: 'deposit',
            modalType: 'identity',
            isOpen: true,
          }))
        }
        onViewAllClick={() => navigate(`/app/profile/${wallet}/data-about`)}
      />
    </div>
  )

  const rightPanel = (
    <>
      <div className="flex flex-row justify-end mb-6 max-lg:justify-center">
        <SegmentedNav options={userIdentityRouteOptions} />
      </div>
      <Outlet />
    </>
  )

  return (
    <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel}>
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
      <FollowModal
        userWallet={userWallet}
        contract={userIdentity.contract}
        open={followModalActive.isOpen}
        identity={userIdentity}
        claim={followClaim}
        vaultDetails={followVaultDetails}
        onClose={() => {
          setFollowModalActive((prevState) => ({
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
    </TwoPanelLayout>
  )
}
