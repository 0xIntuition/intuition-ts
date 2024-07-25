import {
  Button,
  ButtonSize,
  ButtonVariant,
  cn,
  Icon,
  IconName,
  Identity,
  InfoCard,
  ProfileCard,
} from '@0xintuition/1ui'
import { IdentityPresenter, QuestStatus } from '@0xintuition/api'

import { sliceString } from '@lib/utils/misc'

export interface CreateAtomActivityProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: QuestStatus
  identity?: IdentityPresenter | null
  handleClick: () => void
}

const getCreateActivityComponentData = (status: QuestStatus) => {
  switch (status) {
    case QuestStatus.NOT_STARTED:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-muted-foreground',
        containerClass: 'bg-primary/5 theme-border',
      }
    case QuestStatus.STARTED:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-muted-foreground',
        containerClass: 'bg-primary/5 border border-accent/20 border-dashed',
      }
    case QuestStatus.CLAIMABLE:
      return {
        iconName: IconName.circleCheckFilled,
        iconClass: 'text-success',
        containerClass: 'bg-primary/5 border border-success border-solid',
      }
    case QuestStatus.COMPLETED:
      return {
        iconName: IconName.circleCheckFilled,
        iconClass: 'text-success',
        containerClass: 'bg-primary/5 border border-success border-solid',
      }
    default:
      return {
        iconName: IconName.awaitAction,
        iconClass: 'text-muted-foreground',
        containerClass: 'bg-primary/5 theme-border',
      }
  }
}

export default function CreateAtomActivity({
  status,
  identity,
  handleClick,
  ...props
}: CreateAtomActivityProps) {
  const activityComponentData = getCreateActivityComponentData(status)
  return (
    <div
      className={cn(
        'rounded-lg p-5 flex flex-col w-full justify-center items-center gap-5',
        activityComponentData.containerClass,
      )}
      {...props}
    >
      <div className="w-full justify-start flex items-center">
        <Icon
          className={cn(activityComponentData.iconClass, 'h-6 w-6')}
          name={activityComponentData.iconName}
        />
      </div>
      <div className="pb-12">
        {identity ? (
          <div className="flex flex-col gap-5 theme-border rounded-md p-5">
            <ProfileCard
              variant={Identity.nonUser}
              avatarSrc={identity?.image ?? ''}
              name={identity?.display_name ?? ''}
              walletAddress={sliceString(identity?.identity_id, 6, 4)}
              bio={identity?.description ?? ''}
            />
            <InfoCard
              variant={Identity.user}
              username={identity.creator?.display_name ?? ''}
              avatarImgSrc={identity.creator?.image ?? ''}
              timestamp={identity.created_at}
              onClick={() => {}}
              className="p-0 border-none"
            />
          </div>
        ) : (
          <Button
            variant={ButtonVariant.secondary}
            size={ButtonSize.lg}
            onClick={handleClick}
          >
            <Icon name={IconName.fingerprint} />
            Create Identity
          </Button>
        )}
      </div>
    </div>
  )
}
