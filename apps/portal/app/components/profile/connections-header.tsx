import {
  Claim,
  Identity,
  MonetaryValue,
  Text,
  TextVariant,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import {
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'

export const ConnectionsHeaderVariants = {
  followers: 'followers',
  following: 'following',
} as const

export type ConnectionsHeaderVariantType =
  (typeof ConnectionsHeaderVariants)[keyof typeof ConnectionsHeaderVariants]

interface ConnectionsHeaderProps {
  variant: ConnectionsHeaderVariantType
  userIdentity: IdentityPresenter
  followClaim?: ClaimPresenter
  totalFollowers: number
  totalStake: string
}

export const ConnectionsHeader: React.FC<ConnectionsHeaderProps> = ({
  variant,
  userIdentity,
  totalFollowers,
  totalStake = '0',
}) => {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="p-6 bg-black rounded-xl border border-neutral-300/20 flex flex-col gap-5">
        <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-3">
          <div className="flex gap-10 max-sm:flex-col max-sm:gap-3 max-sm:m-auto">
            <div className="flex flex-col items-start max-sm:items-center">
              <Text
                variant="caption"
                weight="regular"
                className="text-secondary-foreground"
              >
                {variant === 'followers' ? 'Followers' : 'Following'}
              </Text>
              <div className="text-white text-xl font-medium">
                {totalFollowers ?? '0'}
              </div>
            </div>
            <div className="flex flex-col items-start max-sm:items-center">
              <Text
                variant="caption"
                weight="regular"
                className="text-secondary-foreground"
              >
                {variant === 'followers'
                  ? 'Total stake in the Follow Claim'
                  : 'Total stake'}
              </Text>
              <MonetaryValue
                value={+totalStake}
                currency="ETH"
                textVariant={TextVariant.headline}
              />
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 max-sm:hidden">
            <Text
              variant="caption"
              weight="regular"
              className="text-secondary-foreground"
            >
              Follow Claim
            </Text>
            <Claim
              size="md"
              subject={{
                variant: Identity.nonUser,
                label: 'I',
                imgSrc: '',
                id: 'ipfs://QmUt9aQX5bSdwvqETtdr2x7HZbBidnbXNaoywyFTexFsbU',
                description:
                  'A first-person singular pronoun used by a speaker to refer to themselves. For example, "I am studying for a test". "I" can also be used to refer to the narrator of a first-person singular literary work.',
                ipfsLink:
                  'https://ipfs.io/ipfs/QmUt9aQX5bSdwvqETtdr2x7HZbBidnbXNaoywyFTexFsbU',
              }}
              predicate={{
                variant: Identity.nonUser,
                label: 'am following',
                imgSrc: '',
                id: 'https://schema.org/FollowAction',
                description:
                  'The act of forming a personal connection with someone/something (object) unidirectionally/asymmetrically to get updates polled from.',
                ipfsLink: 'https://schema.org/FollowAction',
              }}
              object={
                variant === 'followers'
                  ? {
                      variant: Identity.user,
                      label: getAtomLabel(userIdentity),
                      imgSrc: getAtomImage(userIdentity),
                      id: userIdentity?.identity_id,
                      description: getAtomDescription(userIdentity),
                      ipfsLink: getAtomIpfsLink(userIdentity),
                      link: getAtomLink(userIdentity),
                    }
                  : {
                      variant: Identity.nonUser,
                      label: '?',
                      imgSrc: '',
                      id: '?',
                      description: '?',
                      ipfsLink: '',
                      link: '',
                    }
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
