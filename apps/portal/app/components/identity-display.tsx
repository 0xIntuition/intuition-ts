import { Avatar, AvatarFallback, AvatarImage } from '@0xintuition/1ui'

import { useNavigate } from '@remix-run/react'

import { IdentityDisplayName } from './identity-display-name'
import { IdentityID } from './identity-id'

interface IdentityDisplayProps {
  identity_id: string
  display_name: string
  image?: string
  isUser?: boolean
  size?: 'default' | 'lg' | 'sm'
  currentPath?: string
}

/**
 * The IdentityDisplay component presents an identity's details, including the display name, avatar, and unique identifier.
 * It takes the display name, avatar image, user status, and unique identifier as individual props.
 * If the identity is a user, the component displays the avatar and the Ethereum icon alongside the name.
 * This component contains the Avatar, IdentityDisplayName, and IdentityID components.
 */
export function IdentityDisplay({
  identity_id,
  display_name,
  image,
  isUser,
  size = 'default',
  currentPath,
}: IdentityDisplayProps) {
  const navigate = useNavigate()
  return (
    <div className="item-center group flex flex-row gap-2">
      {image && (
        <button
          onClick={() =>
            navigate(`/app/identity/${identity_id}/`, {
              state: { from: currentPath },
            })
          }
        >
          <Avatar>
            <AvatarImage
              src={image}
              alt={display_name}
              className="group group-hover:cursor-pointer"
            />
          </Avatar>
          <AvatarFallback>IN</AvatarFallback>
        </button>
      )}
      <div className="flex flex-col justify-center">
        <IdentityDisplayName
          display_name={display_name}
          identity_id={identity_id}
          isUser={isUser}
          size={size}
          currentPath={currentPath}
        />
        <IdentityID identity_id={identity_id} />
      </div>
    </div>
  )
}
