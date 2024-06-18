import { useNavigate } from '@remix-run/react'

import EthIcon from './svg/eth-icon'

interface IdentityDisplayNameProps {
  display_name: string
  isUser?: boolean
  size?: 'default' | 'lg' | 'sm'
  identity_id: string
  currentPath?: string
}

/**
 * The IdentityDisplayName component displays an identity's display name along with an optional Ethereum icon for users.
 * It takes a display name as a string and a boolean indicating whether the identity is a user.
 * If the identity is a user, an Ethereum icon is displayed next to the name.
 */
export function IdentityDisplayName({
  display_name,
  isUser,
  size,
  identity_id,
  currentPath,
}: IdentityDisplayNameProps) {
  const navigate = useNavigate()

  return (
    <button
      className="flex flex-row items-center gap-1"
      onClick={() =>
        navigate(`/app/identity/${identity_id}/`, {
          state: { from: currentPath },
        })
      }
    >
      <div
        className={`group flex gap-1 truncate text-sm text-neutral-400 transition-colors duration-300 group-hover:text-neutral-200 ${
          (size === 'sm' && 'text-xs') || (size === 'lg' && '!text-lg')
        }`}
      >
        {display_name}
      </div>
      {isUser && <EthIcon />}
    </button>
  )
}
