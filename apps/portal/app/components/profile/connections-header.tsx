import {
  Claim,
  Identity,
  MonetaryValue,
  Text,
  TextVariant,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

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
  subject: IdentityPresenter
  predicate: IdentityPresenter
  object: IdentityPresenter | null
  totalFollowers: number
  totalStake: string
}

export const ConnectionsHeader: React.FC<ConnectionsHeaderProps> = ({
  variant,
  subject,
  predicate,
  object,
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
              {/*TODO: Add actual value when BE updates presenter */}
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
                variant: subject?.is_user ? Identity.user : Identity.nonUser,
                label: getAtomLabel(subject),
                imgSrc: getAtomImage(subject),
                id: subject?.identity_id,
                description: getAtomDescription(subject),
                ipfsLink: getAtomIpfsLink(subject),
                link: getAtomLink(subject),
              }}
              predicate={{
                variant: predicate?.is_user ? Identity.user : Identity.nonUser,
                label: getAtomLabel(predicate),
                imgSrc: getAtomImage(predicate),
                id: predicate?.identity_id,
                description: getAtomDescription(predicate),
                ipfsLink: getAtomIpfsLink(predicate),
                link: getAtomLink(predicate),
              }}
              object={{
                variant: object?.is_user ? Identity.user : Identity.nonUser,
                label: getAtomLabel(object),
                imgSrc: getAtomImage(object),
                id: object?.identity_id,
                description: getAtomDescription(object),
                ipfsLink: getAtomIpfsLink(object),
                link: getAtomLink(object),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
