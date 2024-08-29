import { cn, Identity, IdentityTag, Text } from '@0xintuition/1ui'

export interface ListIdentityDisplayCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  displayName: string
  avatarImgSrc?: string
}

export function ListIdentityDisplayCard({
  displayName,
  avatarImgSrc,
  className,
  ...props
}: ListIdentityDisplayCardProps) {
  return (
    <div
      className={cn(
        `flex flex-col gap-2 theme-border p-5 rounded-lg max-sm:items-center`,
        className,
      )}
      {...props}
    >
      <Text variant="caption" className="text-muted-foreground">
        Tag Identity
      </Text>
      <div className="flex justify-between items-center gap-1">
        <IdentityTag variant={Identity.nonUser} imgSrc={avatarImgSrc}>
          {displayName}
        </IdentityTag>
      </div>
    </div>
  )
}
