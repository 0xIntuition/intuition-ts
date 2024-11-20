import {
  Claim,
  Identity,
  MonetaryValue,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter } from '@0xintuition/api'

import CreateClaimModal from '@components/create-claim/create-claim-modal'
import RemixLink from '@components/remix-link'
import { NO_FOLLOW_CLAIM_ERROR, NO_WALLET_ERROR } from '@consts/errors'
import { BLOCK_EXPLORER_URL } from '@consts/general'
import { createClaimModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import {
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
  getClaimUrl,
  getProfileUrl,
  invariant,
} from '@lib/utils/misc'
import { Link, useLocation, useRouteLoaderData } from '@remix-run/react'
import { useAtom } from 'jotai'

export const ConnectionsHeaderVariants = {
  followers: 'followers',
  following: 'following',
} as const

export type ConnectionsHeaderVariantType =
  (typeof ConnectionsHeaderVariants)[keyof typeof ConnectionsHeaderVariants]

interface ConnectionsHeaderProps {
  variant: ConnectionsHeaderVariantType
  totalFollowers: number
  totalStake: string
  triples?: any[]
}

export const ConnectionsHeader: React.FC<ConnectionsHeaderProps> = ({
  variant,
  totalFollowers,
  totalStake = '0',
  triples,
}) => {
  const triple = triples?.[0]
  logger('triple', triple)

  return (
    <div className="flex flex-col w-full gap-3">
      <div className="p-6 bg-black rounded-xl theme-border flex flex-col gap-5">
        <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-3">
          <div className="flex gap-10 max-sm:flex-col max-sm:gap-3 max-sm:m-auto">
            <div className="flex flex-col items-start max-sm:items-center">
              <Text
                variant="body"
                weight={TextWeight.medium}
                className="text-foreground/70"
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
                Total Follow Value
              </Text>
              <MonetaryValue
                value={+totalStake}
                currency="ETH"
                textVariant={TextVariant.headline}
              />
            </div>
          </div>

          {triple && (
            <div className="flex flex-col items-end gap-2 max-sm:hidden">
              <Text
                variant="caption"
                weight="regular"
                className="text-secondary-foreground"
              >
                Follow Claim
              </Text>
              <Link to={getClaimUrl(triple.vault?.id)} prefetch="intent">
                <Claim
                  size="md"
                  subject={{
                    variant: Identity.nonUser,
                    label: triple.subject?.label ?? '',
                    imgSrc: triple.subject?.image ?? '',
                    id: triple.subject?.id,
                    description: triple.subject?.description ?? '',
                    ipfsLink: `${BLOCK_EXPLORER_URL}/address/${triple.subject?.id}`,
                    link: getProfileUrl(triple.subject?.id),
                    linkComponent: RemixLink,
                  }}
                  predicate={{
                    variant: Identity.nonUser,
                    label: triple.predicate?.label ?? '',
                    imgSrc: triple.predicate?.image ?? '',
                    id: triple.predicate?.id,
                    description: triple.predicate?.description ?? '',
                    ipfsLink: `${BLOCK_EXPLORER_URL}/address/${triple.predicate?.id}`,
                    link: getProfileUrl(triple.predicate?.id),
                    linkComponent: RemixLink,
                  }}
                  object={
                    variant === 'followers'
                      ? {
                          variant: Identity.user,
                          label: triple.object?.label ?? '',
                          imgSrc: triple.object?.image ?? '',
                          id: triple.object?.id,
                          description: triple.object?.description ?? '',
                          ipfsLink: `${BLOCK_EXPLORER_URL}/address/${triple.object?.id}`,
                          link: getProfileUrl(triple.object?.id),
                          linkComponent: RemixLink,
                        }
                      : {
                          variant: Identity.nonUser,
                          label: '?',
                          imgSrc: '',
                          id: '?',
                          description: '?',
                          ipfsLink: '',
                        }
                  }
                  isClickable={variant === 'followers'}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
