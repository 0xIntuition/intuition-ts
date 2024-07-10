import { Claim, MonetaryValue, Text } from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

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
  object: IdentityPresenter | string
  total: string
}

export const ConnectionsHeader: React.FC<ConnectionsHeaderProps> = ({
  variant,
  subject,
  predicate,
  object,
  total,
}) => {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="p-6 bg-black rounded-xl border border-neutral-300/20 flex flex-col gap-5">
        <div className="flex justify-between items-start">
          <div className="flex gap-10">
            <div className="flex flex-col items-start">
              <Text
                variant="caption"
                weight="regular"
                className="text-secondary-foreground"
              >
                {variant === 'followers' ? 'Followers' : 'Following'}
              </Text>
              <div className="text-white text-xl font-medium">
                {total ?? '0'}
              </div>
            </div>
            <div className="flex flex-col items-start">
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
              <MonetaryValue value={+total} currency="ETH" />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Text
              variant="caption"
              weight="regular"
              className="text-secondary-foreground"
            >
              Follow Claim
            </Text>
            <Claim
              subject={{
                variant: 'non-user',
                label: subject?.display_name ?? subject?.identity_id ?? '',
                imgSrc: subject?.image ?? '',
              }}
              predicate={{
                variant: 'non-user',
                label: predicate?.display_name ?? predicate?.identity_id ?? '',
                imgSrc: predicate?.image ?? '',
              }}
              object={
                typeof object === 'string'
                  ? {
                      variant: 'user',
                      label: '?',
                      imgSrc: '',
                    }
                  : {
                      variant: 'user',
                      label: object?.user?.display_name ?? '',
                      imgSrc: object?.user?.image ?? '',
                    }
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
