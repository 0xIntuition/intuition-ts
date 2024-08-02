import { Claim, Identity, MonetaryValue, Text } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { BLOCK_EXPLORER_URL, IPFS_GATEWAY_URL, PATHS } from 'consts'

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
              <MonetaryValue value={+totalStake} currency="ETH" />
            </div>
          </div>
          <div className="flex flex-col items-end max-sm:items-center max-sm:m-auto gap-2">
            <Text
              variant="caption"
              weight="regular"
              className="text-secondary-foreground"
            >
              Follow Claim
            </Text>
            <Claim
              subject={{
                variant: subject?.is_user ? Identity.user : Identity.nonUser,
                label:
                  subject?.user?.display_name ??
                  subject?.display_name ??
                  subject?.identity_id ??
                  '',
                imgSrc: subject?.is_user
                  ? subject?.user?.image
                  : subject?.image,
                id: subject?.identity_id,
                description: subject?.is_user
                  ? subject?.user?.description
                  : subject?.description,
                ipfsLink:
                  subject?.is_user === true
                    ? `${BLOCK_EXPLORER_URL}/address/${subject?.identity_id}`
                    : `${IPFS_GATEWAY_URL}/${subject?.identity_id?.replace('ipfs://', '')}`,
                link:
                  subject?.is_user === true
                    ? `${PATHS.PROFILE}/${subject?.identity_id}`
                    : `${PATHS.IDENTITY}/${subject?.identity_id?.replace('ipfs://', '')}`,
              }}
              predicate={{
                variant: predicate?.is_user ? Identity.user : Identity.nonUser,
                label:
                  predicate?.user?.display_name ??
                  predicate?.display_name ??
                  predicate?.identity_id ??
                  '',
                imgSrc: predicate?.is_user
                  ? predicate?.user?.image
                  : predicate?.image,
                id: predicate?.identity_id,
                description: predicate?.is_user
                  ? predicate?.user?.description
                  : predicate?.description,
                ipfsLink:
                  predicate?.is_user === true
                    ? `${BLOCK_EXPLORER_URL}/address/${predicate?.identity_id}`
                    : `${IPFS_GATEWAY_URL}/${predicate?.identity_id?.replace('ipfs://', '')}`,
                link:
                  predicate?.is_user === true
                    ? `${PATHS.PROFILE}/${predicate?.identity_id}`
                    : `${PATHS.IDENTITY}/${predicate?.identity_id?.replace('ipfs://', '')}`,
              }}
              object={
                object === null
                  ? {
                      variant: 'user',
                      label: '?',
                      imgSrc: '',
                    }
                  : {
                      variant: object?.is_user ? 'user' : 'non-user',
                      label:
                        object?.user?.display_name ??
                        object?.display_name ??
                        object?.identity_id ??
                        '',
                      imgSrc: object?.is_user
                        ? object?.user?.image
                        : object?.image,
                      id: object?.identity_id,
                      description: object?.is_user
                        ? object?.user?.description
                        : object?.description,
                      ipfsLink:
                        object?.is_user === true
                          ? `${BLOCK_EXPLORER_URL}/address/${object?.identity_id}`
                          : `${IPFS_GATEWAY_URL}/${object?.identity_id?.replace('ipfs://', '')}`,
                      link:
                        object?.is_user === true
                          ? `${PATHS.PROFILE}/${object?.identity_id}`
                          : `${PATHS.IDENTITY}/${object?.identity_id?.replace('ipfs://', '')}`,
                    }
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
