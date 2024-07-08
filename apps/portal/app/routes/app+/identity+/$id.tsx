import {
  Button,
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
import { ApiError, IdentitiesService, OpenAPI } from '@0xintuition/api'

import { NestedLayout } from '@components/nested-layout'
import StakeModal from '@components/stake/stake-modal'
import { stakeModalAtom } from '@lib/state/store'
import { identityRouteOptions } from '@lib/utils/constants'
import logger from '@lib/utils/logger'
import {
  calculatePercentageGain,
  formatBalance,
  getAuthHeaders,
  sliceString,
} from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { getVaultDetails } from '@server/multivault'
import { getPrivyAccessToken } from '@server/privy'
import { useAtom } from 'jotai'
import { ExtendedIdentityPresenter } from 'types/identity'
import { SessionUser } from 'types/user'
import { VaultDetailsType } from 'types/vault'

export async function loader({ context, request, params }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const session = context.get(SessionContext)
  const user = session.get('user')

  if (!user?.details?.wallet?.address) {
    return logger('No user found in session')
  }

  if (!params.id) {
    return
  }

  let identity
  try {
    identity = await IdentitiesService.getIdentityById({
      id: params.id,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      identity = undefined
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
    } else {
      throw error
    }
  }

  logger('identity', identity)

  let vaultDetails: VaultDetailsType | null = null

  if (identity !== undefined && identity.vault_id) {
    try {
      vaultDetails = await getVaultDetails(
        identity.contract,
        identity.vault_id,
        user.details.wallet.address as `0x${string}`,
      )
    } catch (error) {
      logger('Failed to fetch vaultDetails:', error)
      vaultDetails = null
    }
  }

  return json({
    identity: identity,
    vaultDetails,
    user,
  })
}

export default function IdentityDetails() {
  const { identity, vaultDetails, user } = useLoaderData<{
    identity: ExtendedIdentityPresenter
    vaultDetails: VaultDetailsType
    user: SessionUser
  }>()

  const user_assets = vaultDetails ? vaultDetails.user_conviction_value : '0'
  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)

  return (
    <NestedLayout outlet={Outlet} options={identityRouteOptions}>
      <div className="flex flex-col">
        <div className="w-[300px] h-[230px] flex-col justify-start items-start  inline-flex gap-6">
          <ProfileCard
            variant="non-user"
            avatarSrc={identity?.image ?? ''}
            name={identity?.display_name ?? ''}
            walletAddress={sliceString(identity?.identity_id, 6, 4)}
            bio={identity?.description ?? ''}
          >
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => logger('follow functionality')}
            >
              Follow
            </Button>
          </ProfileCard>
          {identity?.tags !== null && (
            <Tags>
              <TagsContent numberOfTags={identity?.tag_count ?? 0}>
                {identity?.tags?.map((tag, index) => (
                  <TagWithValue
                    key={index}
                    label={tag.display_name}
                    value={tag.num_positions}
                  />
                ))}
              </TagsContent>
              <TagsButton onClick={() => 'add tags clicked'} />
            </Tags>
          )}
          {vaultDetails !== null && user_assets !== '0' ? (
            <PositionCard onButtonClick={() => logger('sell position clicked')}>
              <PositionCardStaked
                amount={user_assets ? +formatBalance(user_assets, 18, 4) : 0}
              />
              <PositionCardOwnership
                percentOwnership={
                  identity.user_asset_delta !== null && identity.user_assets
                    ? +calculatePercentageGain(
                        +identity.user_assets - +identity.user_asset_delta,
                        +identity.user_assets,
                      ).toFixed(1)
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
            onViewAllClick={() => logger('click view all')} // this will navigate to the data-about positions
          />
        </div>
        <StakeModal
          user={user}
          contract={identity.contract}
          open={stakeModalActive.isOpen}
          identity={identity}
          min_deposit={vaultDetails.min_deposit}
          modalType="identity"
          onClose={() => {
            setStakeModalActive((prevState) => ({
              ...prevState,
              isOpen: false,
              mode: undefined,
            }))
          }}
        />
      </div>
    </NestedLayout>
  )
}
