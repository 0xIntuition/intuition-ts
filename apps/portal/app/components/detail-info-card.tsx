import {
  Button,
  ButtonVariant,
  cn,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  Identity,
  IdentityTag,
  IdentityType,
  ProfileCard,
  Text,
  TextVariant,
  Trunctacular,
} from '@0xintuition/1ui'
import { ClaimPresenter } from '@0xintuition/api'

import { getListUrl } from '@lib/utils/misc'

export interface DetailInfoCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: IdentityType
  list?: ClaimPresenter
  username: string
  avatarImgSrc: string
  id: string
  description: string
  link: string
  ipfsLink: string
  timestamp: string
  readOnly?: boolean
}

const DetailInfoCard = ({
  variant = Identity.user,
  list,
  username,
  avatarImgSrc,
  id,
  description,
  link,
  ipfsLink,
  timestamp,
  className,
  readOnly = false,
  ...props
}: DetailInfoCardProps) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(timestamp))

  return (
    <div
      className={cn(
        `flex flex-col gap-5 theme-border p-5 rounded-lg max-sm:items-center`,
        className,
      )}
      {...props}
    >
      {list && (
        <div>
          <Text variant={TextVariant.caption} className="text-muted-foreground">
            List
          </Text>
          <div className="flex justify-start items-center gap-1">
            <a href={getListUrl(list.claim_id, '', readOnly)}>
              <IdentityTag
                variant={list.object?.user ? Identity.user : Identity.nonUser}
                imgSrc={list.object?.image ?? ''}
              >
                <Trunctacular
                  value={
                    list.object?.user_display_name ??
                    list.object?.display_name ??
                    'Unknown'
                  }
                  maxStringLength={32}
                />
              </IdentityTag>
            </a>
          </div>
        </div>
      )}
      <div>
        <Text variant={TextVariant.caption} className="text-muted-foreground">
          Creator
        </Text>
        <div className="flex justify-start items-center gap-1">
          <HoverCard openDelay={150} closeDelay={150}>
            <HoverCardTrigger>
              <a href={link}>
                <IdentityTag variant={variant} imgSrc={avatarImgSrc}>
                  <Trunctacular value={username} maxStringLength={18} />
                </IdentityTag>
              </a>
            </HoverCardTrigger>
            <HoverCardContent side="right" className="w-max">
              <div className="flex flex-col gap-4 w-80 max-md:w-[80%]">
                <ProfileCard
                  variant={variant}
                  avatarSrc={avatarImgSrc ?? ''}
                  name={username}
                  id={id ?? ''}
                  bio={description ?? ''}
                  ipfsLink={ipfsLink}
                  className="profile-card"
                />
                {link && (
                  <a href={link}>
                    <Button
                      variant={ButtonVariant.secondary}
                      className="w-full"
                    >
                      View Identity{' '}
                      <Icon name={'arrow-up-right'} className="h-3 w-3" />
                    </Button>
                  </a>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
          <span className="bg-muted-foreground h-[2px] w-[2px] block rounded-full" />
          <Text variant={TextVariant.body} className="text-muted-foreground">
            {formattedDate}
          </Text>
        </div>
      </div>
    </div>
  )
}

export { DetailInfoCard }
