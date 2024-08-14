import {
  Identity,
  IdentityTag,
  IdentityTagSize,
  ProfileCard,
  Trunctacular,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import {
  getAtomDescription,
  getAtomId,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
} from '@lib/utils/misc'

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
      imgSrc={getAtomImage(identity)}
      disabled={disabled}
      size={IdentityTagSize.lg}
      className="group-hover:border-primary group-hover:bg-primary/20"
      hoverCardContent={
        <div>
          <ProfileCard
            className="w-fit max-w-64"
            variant={identity?.is_user ? Identity.user : Identity.nonUser}
            avatarSrc={getAtomImage(identity)}
            name={getAtomLabel(identity)}
            id={getAtomId(identity)}
            stats={
              identity?.is_user
                ? {
                    numberOfFollowers: identity?.follower_count ?? 0,
                    numberOfFollowing: identity?.followed_count ?? 0,
                  }
                : undefined
            }
            bio={getAtomDescription(identity)}
            ipfsLink={getAtomIpfsLink(identity)}
          />
        </div>
      }
    >
      <Trunctacular value={getAtomLabel(identity)} />
    </IdentityTag>
  )
}
