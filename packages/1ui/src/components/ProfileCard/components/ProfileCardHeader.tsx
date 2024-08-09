import { Identity, IdentityType } from 'types'

import { Avatar, Copy, Trunctacular } from '../..'

interface ProfileCardHeaderProps {
  variant?: IdentityType
  avatarSrc?: string
  name: string
  id?: string
  link?: string
}

const ProfileCardHeader = ({
  variant = Identity.user,
  avatarSrc,
  name,
  id,
  link,
}: ProfileCardHeaderProps) => {
  return (
    <div className="flex items-center space-x-4 w-full">
      <Avatar variant={variant} src={avatarSrc} name={name} />
      <div>
        <Trunctacular
          value={name}
          variant="headline"
          weight="medium"
          className="text-primary"
          maxStringLength={24}
        />
        <div className="flex flex-row gap-1 items-center">
          {link && id && (
            <>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Trunctacular
                  value={id}
                  variant="body"
                  weight="medium"
                  className="text-muted-foreground"
                  maxStringLength={24}
                  disableTooltip
                />
              </a>
              <Copy text={id} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export { ProfileCardHeader }
