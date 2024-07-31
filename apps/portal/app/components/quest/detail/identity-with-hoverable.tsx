import {
  formatWalletAddress,
  Identity,
  IdentityTag,
  IdentityTagSize,
  ProfileCard,
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { BLOCK_EXPLORER_URL, IPFS_GATEWAY_URL } from 'consts'

export interface ClaimWithHoverableProps {
  size?: keyof typeof IdentityTagSize
  disabled?: boolean
  subject: IdentityPresenter
  predicate: IdentityPresenter
  object: IdentityPresenter
}

export const IdentityWithHoverable = ({
  identity,
  disabled,
}: {
  identity: IdentityPresenter
  disabled?: boolean
}) => {
  return (
    <IdentityTag
      variant={identity?.is_user ? Identity.user : Identity.nonUser}
      imgSrc={identity?.image ?? ''}
      disabled={disabled}
      size={IdentityTagSize.lg}
      className="group-hover:border-primary group-hover:bg-primary/20"
      hoverCardContent={
        <div>
          <ProfileCard
            className="w-fit max-w-64"
            variant={identity?.is_user ? Identity.user : Identity.nonUser}
            avatarSrc={identity?.image ?? ''}
            name={
              identity?.is_user
                ? identity?.user?.display_name ?? ''
                : identity?.display_name
            }
            walletAddress={
              identity?.is_user
                ? identity?.user?.ens_name ??
                  formatWalletAddress(identity?.identity_id)
                : identity?.identity_id
            }
            stats={
              identity?.is_user
                ? {
                    numberOfFollowers: identity?.follower_count ?? 0,
                    numberOfFollowing: identity?.followed_count ?? 0,
                  }
                : undefined
            }
            bio={
              identity?.is_user
                ? identity?.user?.description ?? ''
                : identity?.description ?? ''
            }
            ipfsLink={
              identity.is_user === true
                ? `${BLOCK_EXPLORER_URL}/address/${identity.identity_id}`
                : `${IPFS_GATEWAY_URL}/${identity?.identity_id?.replace('ipfs://', '')}`
            }
          />
        </div>
      }
    >
      <Trunctacular value={identity.display_name} />
    </IdentityTag>
  )
}
