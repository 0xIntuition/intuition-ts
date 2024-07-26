import { useState } from 'react'

import {
  PositionCard,
  PositionCardFeesAccrued,
  PositionCardLastUpdated,
  PositionCardOwnership,
  PositionCardStaked,
  ProfileCard,
  StakeCard,
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
import { NestedLayout } from '@components/nested-layout'
import StakeModal from '@components/stake/stake-modal'
import TagsModal from '@components/tags/tags-modal'
import {
  saveListModalAtom,
  stakeModalAtom,
  tagsModalAtom,
} from '@lib/state/store'
import logger from '@lib/utils/logger'
import {
  calculatePercentageOfTvl,
  fetchWrapper,
  formatBalance,
  invariant,
  sliceString,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData, useNavigate } from '@remix-run/react'
import { requireUser, requireUserWallet } from '@server/auth'
import { getVaultDetails } from '@server/multivault'
import { identityRouteOptions, NO_WALLET_ERROR } from 'consts'
import { useAtom } from 'jotai'
import { ExtendedIdentityPresenter } from 'types/identity'
import { VaultDetailsType } from 'types/vault'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')

  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  if (!params.id) {
    return
  }

  const identity = await fetchWrapper({
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
  const { identity, vaultDetails, userWallet } = useLoaderData<{
    identity: ExtendedIdentityPresenter
    vaultDetails: VaultDetailsType
    userWallet: string
  }>()
  const navigate = useNavigate()

  logger('identity', identity)

  const { user_assets, assets_sum } = vaultDetails ? vaultDetails : identity
  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)
  const [tagsModalActive, setTagsModalActive] = useAtom(tagsModalAtom)
  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)
  const [selectedTag, setSelectedTag] = useState<TagEmbeddedPresenter>()

  return (
    <NestedLayout outlet={Outlet} options={identityRouteOptions}>
      <div className="flex-col justify-start items-start inline-flex gap-6">
        <ProfileCard
          variant="non-user"
          avatarSrc={identity?.image ?? ''}
          name={identity?.display_name ?? ''}
          walletAddress={sliceString(identity?.identity_id, 6, 4)}
          bio={identity?.description ?? ''}
        />
        <Tags>
          {identity?.tags && identity?.tags.length > 0 && (
            <TagsContent numberOfTags={identity?.tag_count ?? 0}>
              {identity?.tags?.map((tag) => (
                <TagWithValue
                  key={tag.identity_id}
                  label={tag.display_name}
                  value={tag.num_positions}
                  onStake={() => {
                    setSelectedTag(tag)
                    setSaveListModalActive({ isOpen: true, id: tag.vault_id })
                  }}
                />
              ))}
            </TagsContent>
          )}
          <TagsButton
            onClick={() => {
              setTagsModalActive({ isOpen: true, mode: 'add' })
            }}
          />
        </Tags>
        {vaultDetails !== null && user_assets !== '0' ? (
          <PositionCard onButtonClick={() => logger('sell position clicked')}>
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
            <PositionCardFeesAccrued
              amount={
                identity.user_asset_delta
                  ? +formatBalance(
                      +identity.user_assets - +identity.user_asset_delta,
                      18,
                      5,
                    )
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
            navigate(`/app/identity/${identity.identity_id}/data-about`)
          }
        />
      </div>
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
          tag={selectedTag}
          identity={identity}
          contract={identity.contract}
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
    </NestedLayout>
  )
}
