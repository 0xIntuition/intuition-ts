import { useEffect, useState } from 'react'

import {
  Icon,
  Identity,
  InfoCard,
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
  IdentitiesService,
  IdentityPresenter,
  TagEmbeddedPresenter,
} from '@0xintuition/api'

import SaveListModal from '@components/list/save-list-modal'
import ImageModal from '@components/profile/image-modal'
import StakeModal from '@components/stake/stake-modal'
import TagsModal from '@components/tags/tags-modal'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import {
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
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useNavigate } from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUser, requireUserWallet } from '@server/auth'
import { getVaultDetails } from '@server/multivault'
import {
  IPFS_GATEWAY_URL,
  MULTIVAULT_CONTRACT_ADDRESS,
  NO_WALLET_ERROR,
  PATHS,
} from 'app/consts'
import TwoPanelLayout from 'app/layouts/two-panel-layout'
import { ExtendedIdentityPresenter } from 'app/types/identity'
import { VaultDetailsType } from 'app/types/vault'
import { useAtom } from 'jotai'

export async function loader({ request, params }: LoaderFunctionArgs) {
  logger('[$ID] -- START')
  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')

  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  if (!params.id) {
    return
  }

  const identity = await fetchWrapper(request, {
    method: IdentitiesService.getIdentityById,
    args: {
      id: params.id,
    },
  })

  if (!identity) {
    return null
  }

  let vaultDetails: VaultDetailsType | null = null

  logger('[identity id] wallet:', userWallet)
  if (identity !== undefined && identity.vault_id) {
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

  logger('[$ID] -- END')
  return json({
    identity,
    vaultDetails,
    userWallet,
  })
}

export interface IdentityLoaderData {
  identity: IdentityPresenter
  vaultDetails: VaultDetailsType
  userWallet: string
}

export default function IdentityDetails() {
  const { identity, vaultDetails, userWallet } = useLiveLoader<{
    identity: ExtendedIdentityPresenter
    vaultDetails: VaultDetailsType
    userWallet: string
  }>(['attest', 'create'])
  const navigate = useNavigate()

  const { user_assets, assets_sum } = vaultDetails ? vaultDetails : identity
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

  const leftPanel = (
    <div className="flex-col justify-start items-start inline-flex gap-6 max-lg:w-full">
      <ProfileCard
        variant={Identity.nonUser}
        avatarSrc={identity?.image ?? ''}
        name={identity?.display_name ?? ''}
        id={identity?.identity_id}
        vaultId={identity?.vault_id}
        bio={identity?.description ?? ''}
        ipfsLink={`${IPFS_GATEWAY_URL}/${identity?.identity_id?.replace('ipfs://', '')}`}
        externalLink={identity?.external_reference ?? ''}
        onAvatarClick={() => {
          setImageModalActive({
            isOpen: true,
            identity,
          })
        }}
      />

      <Tags className="max-lg:items-center">
        {identity?.tags && identity?.tags.length > 0 && (
          <TagsContent numberOfTags={identity?.tag_count ?? 0}>
            {identity?.tags?.map((tag) => (
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
            amount={user_assets ? +formatBalance(user_assets, 18, 4) : 0}
          />
          <PositionCardOwnership
            percentOwnership={
              user_assets !== null && assets_sum
                ? +calculatePercentageOfTvl(user_assets ?? '0', assets_sum)
                : 0
            }
          />
          <PositionCardLastUpdated timestamp={identity.updated_at} />
        </PositionCard>
      ) : null}
      <StakeCard
        tvl={+formatBalance(identity?.assets_sum)}
        holders={identity?.num_positions}
        onBuyClick={() =>
          setStakeModalActive((prevState) => ({
            ...prevState,
            mode: 'deposit',
            modalType: 'identity',
            isOpen: true,
          }))
        }
        onViewAllClick={() =>
          navigate(`${PATHS.IDENTITY}/${identity.id}#positions`)
        }
      />
      <InfoCard
        variant={identity.is_user ? Identity.user : Identity.nonUser}
        username={identity.creator?.display_name ?? ''}
        avatarImgSrc={identity.creator?.image ?? ''}
        timestamp={identity.created_at}
        onClick={() => {
          navigate(`/app/profile/${identity.creator?.wallet}`)
        }}
        className="hover:cursor-pointer w-full"
      />
    </div>
  )

  const rightPanel = <Outlet />

  return (
    <TwoPanelLayout leftPanel={leftPanel} rightPanel={rightPanel}>
      <StakeModal
        userWallet={userWallet}
        contract={identity.contract}
        open={stakeModalActive.isOpen}
        identity={identity}
        vaultDetails={vaultDetails}
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
