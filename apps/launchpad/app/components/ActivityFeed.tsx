import { useState } from 'react'

import {
  Button,
  cn,
  IconNameType,
  Identity,
  IdentityTag,
  Skeleton,
  Text,
  Trunctacular,
} from '@0xintuition/1ui'
import { Events, GetEventsQuery } from '@0xintuition/graphql'

import { BLOCK_EXPLORER_URL } from '@consts/general'
import { formatDistanceToNow } from 'date-fns'
import { Badge, Filter, SortAsc, SortDesc } from 'lucide-react'

export type ActivityItem = {
  id: string
  user: {
    address: string
    name: string
    avatar?: string
  }
  type: 'created' | 'redeemed' | 'deposited'
  indicator?: {
    text: string
    icon?: IconNameType
    isUser?: boolean
  }
  amount?: string
  direction?: 'from' | 'on' | 'for' | 'against'
  target?: string
  tags?: string[]
  timestamp: string
  hash: string
}

export interface ActivityFeedProps {
  activities?: GetEventsQuery
  isLoading?: boolean
}

function ActivityRow({ activity }: { activity: Events }) {
  let direction: 'on' | 'from' | undefined

  if (activity.type === 'Deposited') {
    direction = 'on'
  } else if (activity.type === 'Redeemed') {
    direction = 'from'
  } else if (activity.type === 'AtomCreated') {
    direction = undefined
  } else if (activity.type === 'TripleCreated') {
    direction = undefined
  }

  const value =
    activity.type === 'Deposited'
      ? activity.deposit?.shares_for_receiver // #TODO: we should be showing assets here, but we only get shares. In addition, we should know the share price at the time of the deposit, otherwise we have to use the current share price which will skew the value, since we are going to show $USD.
      : activity.type === 'Redeemed'
        ? activity.redemption?.shares_redeemed_by_sender
        : null

  // Basic required fields with fallbacks
  const timestamp = activity.block_timestamp
    ? new Date(parseInt(activity.block_timestamp.toString()) * 1000)
    : new Date()

  // Get creator from either atom or triple
  const creator = activity.atom?.creator || activity.triple?.creator

  const dataType = activity.atom
    ? 'atom'
    : activity.triple
      ? 'triple'
      : 'unknown'

  const getAmountColor = (type: string, amount?: string) => {
    if (!amount) {
      return 'text-primary'
    }
    return type === 'redeemed' ? 'text-red-500' : 'text-green-500'
  }

  function formatTransactionHash(txHash: string): string {
    return `0x${txHash.replace('\\x', '')}`
  }

  return (
    <div key={activity.id} className="flex items-start gap-3 py-2 group">
      <div className="relative flex flex-col items-center pt-2">
        <div className="w-4 h-4 rounded-full bg-background theme-border flex items-center justify-center relative">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm">
          <IdentityTag variant={Identity.user} imgSrc={creator?.image}>
            {creator?.label}
          </IdentityTag>
          <span className="text-muted-foreground">
            {activity.type.toLowerCase()}
          </span>
          {value && (
            <Badge
              className={cn(
                getAmountColor(activity.type, value),
                'bg-transparent theme-border',
              )}
            >
              {value}
            </Badge>
          )}
          {direction && (
            <span className="text-muted-foreground">{direction}</span>
          )}
          {dataType && <span className="text-primary">{dataType}</span>}
          <IdentityTag
            variant={
              dataType === 'triple'
                ? Identity.user
                : activity.atom?.type === ('Default' || 'Account')
                  ? Identity.user
                  : Identity.nonUser
            }
            icon={dataType === 'triple' ? 'claim' : 'fingerprint'}
          >
            <Text>
              {activity.atom?.label ||
                [
                  activity.triple?.subject?.label,
                  activity.triple?.predicate?.label,
                  activity.triple?.object?.label,
                ]
                  .filter(Boolean)
                  .join('')}
            </Text>
          </IdentityTag>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
          <a
            href={`${BLOCK_EXPLORER_URL}/tx/${formatTransactionHash(activity.transaction_hash)}`} //#TODO: this is not a transaction hash, I believe it's a block hash? It doesn't resolve to a transaction on basescan
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent hover:text-primary truncate"
          >
            <Trunctacular
              value={formatTransactionHash(activity.transaction_hash)}
            />
          </a>
        </div>
      </div>
    </div>
  )
}

const ActivityFeed = ({
  activities = { events: [], total: { aggregate: { count: 0 } } },
  isLoading,
}: ActivityFeedProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="w-3 h-3 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <RealtimeSort />
        <Button variant="secondary">
          <Filter className="w-4 h-4" />
          <Text>Filter</Text>
        </Button>
      </div>

      <div className="relative space-y-1 pl-3">
        <div className="absolute left-[19px] top-0 w-[2px] h-full bg-muted" />
        {activities.events.map((activity) => (
          <ActivityRow key={activity.id} activity={activity as Events} />
        ))}
      </div>
    </div>
  )
}

interface RealtimeSortProps {
  onSortChange?: (direction: 'asc' | 'desc') => void
}

const RealtimeSort = ({ onSortChange }: RealtimeSortProps) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const handleSortClick = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    setSortDirection(newDirection)
    onSortChange?.(newDirection)
  }

  return (
    <Button
      variant="text"
      className="flex items-center gap-2 text-sm text-accent hover:text-foreground"
      onClick={handleSortClick}
    >
      {sortDirection === 'asc' ? (
        <SortAsc className="w-4 h-4" />
      ) : (
        <SortDesc className="w-4 h-4" />
      )}
      <Text className="text-inherit">Realtime</Text>
    </Button>
  )
}

export default ActivityFeed
