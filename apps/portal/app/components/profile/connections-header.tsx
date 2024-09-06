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
import { NO_FOLLOW_CLAIM_ERROR, NO_WALLET_ERROR } from '@consts/errors'
import { createClaimModalAtom } from '@lib/state/store'
import {
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
  invariant,
} from '@lib/utils/misc'
import { useLocation, useRouteLoaderData } from '@remix-run/react'
import { useAtom } from 'jotai'

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

interface RouteLoaderData {
  userWallet: string
  followClaim: ClaimPresenter
}

export const ConnectionsHeader: React.FC<ConnectionsHeaderProps> = ({
  variant,
  userIdentity,
  totalFollowers,
  totalStake = '0',
}) => {
  const [createClaimModalActive, setCreateClaimModalActive] =
    useAtom(createClaimModalAtom)

  const location = useLocation()
  const routeLoaderKey =
    location.pathname === '/app/profile/connections'
      ? 'routes/app+/profile+/_index+/_layout'
      : 'routes/app+/profile+/$wallet'

  const { userWallet, followClaim } =
    useRouteLoaderData<RouteLoaderData>(routeLoaderKey) ?? {}
  invariant(followClaim, NO_FOLLOW_CLAIM_ERROR)
  invariant(userWallet, NO_WALLET_ERROR)

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
                label: getAtomLabel(followClaim.subject),
                imgSrc: getAtomImage(followClaim.subject),
                id: followClaim.subject?.identity_id,
                description: getAtomDescription(followClaim.subject),
                ipfsLink: getAtomIpfsLink(followClaim.subject),
                link: getAtomLink(followClaim.subject),
              }}
              predicate={{
                variant: Identity.nonUser,
                label: getAtomLabel(followClaim.predicate),
                imgSrc: getAtomImage(followClaim.predicate),
                id: followClaim.predicate?.identity_id,
                description: getAtomDescription(followClaim.predicate),
                ipfsLink: getAtomIpfsLink(followClaim.predicate),
                link: getAtomLink(followClaim.predicate),
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
              onClick={
                variant === 'following'
                  ? () =>
                      setCreateClaimModalActive({
                        isOpen: true,
                        subject: followClaim.subject,
                        predicate: followClaim.predicate,
                      })
                  : undefined
              }
            />
          </div>
        </div>
      </div>
      <CreateClaimModal
        open={createClaimModalActive.isOpen}
        wallet={userWallet}
        onClose={() =>
          setCreateClaimModalActive({
            isOpen: false,
            subject: null,
            predicate: null,
            object: null,
          })
        }
      />
    </div>
  )
}
