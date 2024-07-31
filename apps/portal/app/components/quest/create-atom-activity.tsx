import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
  Identity,
  InfoCard,
  ProfileCard,
} from '@0xintuition/1ui'
import { IdentityPresenter, QuestStatus } from '@0xintuition/api'

import { sliceString } from '@lib/utils/misc'
import { BLOCK_EXPLORER_URL, IPFS_GATEWAY_URL } from 'consts'

import ActivityContainer from './activity-container'

export interface CreateAtomActivityProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: QuestStatus
  identity?: IdentityPresenter | null
  isLoading?: boolean
  isDisabled?: boolean
  handleClick: () => void
}

export default function CreateAtomActivity({
  status,
  identity,
  handleClick,
  isLoading = false,
  isDisabled = false,
  ...props
}: CreateAtomActivityProps) {
  return (
    <ActivityContainer status={status} {...props}>
      {identity ? (
        <div className="flex flex-col gap-5 theme-border rounded-md p-5">
          <ProfileCard
            variant={Identity.nonUser}
            avatarSrc={identity?.image ?? ''}
            name={identity?.display_name ?? ''}
            walletAddress={sliceString(identity?.identity_id, 6, 4)}
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
            timestamp={identity.created_at}
            className="p-0 border-none"
          />
        </div>
      ) : (
        <Button
          variant={ButtonVariant.secondary}
          size={ButtonSize.lg}
          onClick={handleClick}
          isLoading={isLoading}
          disabled={isDisabled || isLoading}
        >
          {!isLoading && <Icon name={IconName.fingerprint} />}
          Create Identity
        </Button>
      )}
    </ActivityContainer>
  )
}
