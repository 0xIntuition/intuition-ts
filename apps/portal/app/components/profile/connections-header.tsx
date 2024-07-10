import { Claim, MonetaryValue, Text } from '@0xintuition/1ui'

import { formatBalance } from '@lib/utils/misc'

export const ConnectionsHeaderVariants = {
  followers: 'followers',
  following: 'following',
} as const

export type ConnectionsHeaderVariantType =
  (typeof ConnectionsHeaderVariants)[keyof typeof ConnectionsHeaderVariants]

interface ConnectionsHeaderProps {
  variant: ConnectionsHeaderVariantType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userIdentity: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userTotals: any
}

export const ConnectionsHeader: React.FC<ConnectionsHeaderProps> = ({
  variant,
  userIdentity,
  userTotals,
}) => {
  const totalPositionValue = +formatBalance(
    userTotals?.total_position_value ?? '0',
    18,
    4,
  )

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
                {userTotals?.total_positions ?? '0'}
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
              <MonetaryValue value={totalPositionValue} currency="ETH" />
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
            {/* TODO: Insert actual values here */}
            <Claim
              subject={{
                variant: 'non-user',
                label: userIdentity?.name,
              }}
              predicate={{
                variant: 'non-user',
                label: 'is really',
              }}
              object={{
                variant: 'non-user',
                label: 'cool',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
