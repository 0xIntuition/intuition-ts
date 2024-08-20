import {
  Button,
  ButtonSize,
  ButtonVariant,
  Identity,
  InfoCard,
  PieChartVariant,
  PositionCard,
  PositionCardLastUpdated,
  PositionCardOwnership,
  PositionCardStaked,
  ProfileCard,
  StakeCard,
} from '@0xintuition/1ui'
import {
  GetPositionByIdResponse,
  IdentityPresenter,
  QuestStatus,
} from '@0xintuition/api'

import { calculatePercentageOfTvl, formatBalance } from '@lib/utils/misc'
import { BLOCK_EXPLORER_URL, IPFS_GATEWAY_URL, PATHS } from 'app/consts'
import { VaultDetailsType } from 'app/types'

import ActivityContainer from '../activity-container'
import { IdentityWithHoverable } from '../detail/identity-with-hoverable'

export interface StakeIdentityActivityProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: QuestStatus
  identity: IdentityPresenter
  vaultDetails: VaultDetailsType
  position?: GetPositionByIdResponse | null
  handleDepositIdentityClick: () => void
  handleRedeemIdentityClick: () => void
  isLoading?: boolean
  disabled?: boolean
}

export default function StakeIdentityActivity({
  status,
  identity,
  position,
  vaultDetails,
  handleDepositIdentityClick,
  handleRedeemIdentityClick,
  isLoading = false,
  disabled = false,
  ...props
}: StakeIdentityActivityProps) {
  const { user_assets, assets_sum } = vaultDetails

  return (
    <ActivityContainer status={status} {...props}>
      {position ? (
        <div className="flex flex-col items-center gap-5 rounded-lg border border-border/10 bg-background overflow-hidden">
          <div className="w-full border-b border-border/15 bg-background p-2.5">
            <div className="w-fit">
              <IdentityWithHoverable identity={identity} />
            </div>
          </div>

          <div className="flex gap-5 items-start pb-5 px-5">
            <div className="w-full min-w-80 h-full">
              <StakeCard
                className="bg-primary/5"
                tvl={+formatBalance(identity?.assets_sum)}
                holders={identity?.num_positions}
                onBuyClick={handleDepositIdentityClick}
              />
            </div>
            <PositionCard
              onButtonClick={handleRedeemIdentityClick}
              className="bg-primary/5"
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
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col gap-5 theme-border rounded-md p-5">
            <ProfileCard
              variant={Identity.nonUser}
              avatarSrc={identity?.image ?? ''}
              name={identity?.display_name ?? ''}
              id={identity?.identity_id}
              bio={identity?.description ?? ''}
              ipfsLink={
                identity.is_user === true
                  ? `${BLOCK_EXPLORER_URL}/address/${identity.identity_id}`
                  : `${IPFS_GATEWAY_URL}/${identity?.identity_id?.replace('ipfs://', '')}`
              }
            />
            <InfoCard
              variant={Identity.user}
              username={identity.creator?.display_name ?? ''}
              avatarImgSrc={identity.creator?.image ?? ''}
              id={identity.creator?.id ?? ''}
              description={identity.creator?.description ?? ''}
              link={
                identity.creator?.id
                  ? `${PATHS.PROFILE}/${identity.creator?.wallet}`
                  : ''
              }
              ipfsLink={`${BLOCK_EXPLORER_URL}/address/${identity.creator?.wallet}`}
              timestamp={identity.created_at}
              className="p-0 border-none"
            />
          </div>
          <Button
            variant={ButtonVariant.primary}
            size={ButtonSize.lg}
            onClick={handleDepositIdentityClick}
            disabled={isLoading || disabled}
            isLoading={isLoading}
          >
            {isLoading ? 'Loading...' : 'Deposit For'}
          </Button>
        </div>
      )}
    </ActivityContainer>
  )
}
