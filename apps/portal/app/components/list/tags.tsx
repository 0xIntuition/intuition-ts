import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
  Identity,
  IdentityRow,
} from '@0xintuition/1ui'

import { ListHeader } from '@components/list/list-header'
import { saveListModalAtom, stakeModalAtom } from '@lib/state/store'
import {
  formatBalance,
  getAtomDescriptionGQL,
  getAtomImageGQL,
  getAtomIpfsLinkGQL,
  getAtomLabelGQL,
  getAtomLinkGQL,
  getClaimUrl,
} from '@lib/utils/misc'
import { Atom } from 'app/types/atom'
import { PaginationType } from 'app/types/pagination'
import { useSetAtom } from 'jotai'

import { SortOption } from '../sort-select'
import { List } from './list'

/*
 * TagsList component for displaying tags with pagination and sorting
 * The implementation is aligned with how the ClaimsListNew component handles pagination and sorting
 * Key points:
 * - Uses block_timestamp as the default sort field (matches claims implementation)
 * - Uses mapSortToOrderBy function to translate sort parameters to GraphQL queries
 * - Sort options match field formats used in ClaimsListNew for consistency
 * - Uses the common List component for pagination UI
 */

// Define a more flexible interface for the triples we receive from GraphQL
interface TripleData {
  id: string | number
  vault_id: string | number
  counter_vault_id: string | number
  subject: {
    id?: string | number
    wallet_id?: string
    label?: string | null
    type?: string
    image?: string | null
    description?: string | null
    tags?: {
      nodes?: Array<{
        object?: {
          label?: string
          taggedIdentities?: { aggregate?: { count?: number } }
        }
      }>
    }
    vault?: Record<string, unknown>
  }
  predicate: {
    id?: string | number
    label?: string | null
    description?: string | null
    type?: string
  }
  object: {
    id?: string | number
    label?: string | null
    description?: string | null
    type?: string
  }
  vault?: {
    positions_aggregate?: {
      aggregate?: {
        count?: number
        sum?: {
          shares?: string | number
        }
      }
    }
    current_share_price?: string | number
    positions?: Array<{
      id?: string | number
      account: { id: string; label?: string | null }
      shares: string | number
    }>
  }
  __typename?: string
  block_timestamp?: string | number
  block_number?: string | number
  created_at?: string
  updated_at?: string
}

// Function to map sort parameters from URL to GraphQL order_by object
export function mapSortToOrderBy(sortBy: string, direction: string) {
  // Default to block_timestamp if not provided
  if (!sortBy) {
    return {
      block_timestamp: direction.toLowerCase() as 'asc' | 'desc',
    }
  }

  // Handle nested fields like 'vault.total_shares'
  if (sortBy.includes('.')) {
    const [parent, field] = sortBy.split('.')
    return {
      [parent]: {
        [field]: direction.toLowerCase() as 'asc' | 'desc',
      },
    }
  }

  // Handle simple fields
  return {
    [sortBy]: direction.toLowerCase() as 'asc' | 'desc',
  }
}

export function TagsList({
  triples,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  readOnly = false,
  onPageChange,
  onLimitChange,
}: {
  triples: TripleData[]
  pagination?: PaginationType
  paramPrefix?: string
  enableHeader?: boolean
  enableSearch?: boolean
  enableSort?: boolean
  readOnly?: boolean
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
}) {
  // Using GraphQL field names directly for sorting
  const options: SortOption<string>[] = [
    { value: 'Total ETH', sortBy: 'vault.total_shares' },
    { value: 'Total Positions', sortBy: 'vault.position_count' },
    { value: 'Updated At', sortBy: 'block_timestamp' },
    { value: 'Created At', sortBy: 'block_timestamp' },
  ]

  const setSaveListModalActive = useSetAtom(saveListModalAtom)
  const setStakeModalActive = useSetAtom(stakeModalAtom)

  // Filter out any invalid triples (where subject, predicate, or object is null)
  const validTriples = triples.filter(
    (triple) => triple?.subject && triple?.predicate && triple?.object,
  )

  return (
    <>
      <List<string>
        pagination={pagination}
        paginationLabel="identities"
        options={options}
        paramPrefix={paramPrefix}
        enableSearch={enableSearch}
        enableSort={enableSort}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      >
        {enableHeader && (
          <ListHeader
            items={[
              { label: 'Tag', icon: IconName.bookmark },
              { label: 'TVL', icon: IconName.ethereum },
            ]}
          />
        )}
        {validTriples.map((triple) => {
          const identity = triple.subject
          // TODO: ENG-0000: Show filled save if user has a position on claim
          // TODO: ENG-0000: Show only user position if user is on filtering by you.

          return (
            <div
              key={triple.subject?.id}
              className={`grow shrink basis-0 self-stretch bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start hover:bg-secondary/10 transition-colors duration-200 items-start gap-5 inline-flex`}
            >
              <div className="flex flex-row gap-2 w-full">
                <IdentityRow
                  variant={
                    triple.subject?.type === 'Account' ||
                    triple.subject?.type === 'Default'
                      ? Identity.user
                      : Identity.nonUser
                  }
                  avatarSrc={getAtomImageGQL(triple.subject as unknown as Atom)}
                  name={getAtomLabelGQL(triple.subject as unknown as Atom)}
                  description={getAtomDescriptionGQL(
                    triple.subject as unknown as Atom,
                  )}
                  id={
                    typeof triple.subject?.wallet_id === 'string'
                      ? triple.subject.wallet_id
                      : typeof triple.subject?.id === 'string'
                        ? triple.subject.id
                        : triple.subject?.id?.toString() ?? ''
                  }
                  claimLink={getClaimUrl(
                    triple.vault_id.toString() ?? '',
                    readOnly,
                  )}
                  // tags={
                  //   triple.subject?.tags?.nodes?.map((tag) => ({
                  //     label: tag.object?.label ?? '',
                  //     value:
                  //       tag.object?.taggedIdentities?.aggregate?.count ?? 0,
                  //   })) ?? undefined
                  // }
                  totalTVL={formatBalance(
                    BigInt(
                      triple?.vault?.positions_aggregate?.aggregate?.sum
                        ?.shares || 0,
                    ),
                    18,
                  )}
                  numPositions={
                    triple?.vault?.positions_aggregate?.aggregate?.count || 0
                  }
                  link={getAtomLinkGQL(identity as unknown as Atom, readOnly)}
                  ipfsLink={getAtomIpfsLinkGQL(identity as unknown as Atom)}
                  onStakeClick={() =>
                    setStakeModalActive((prevState) => ({
                      ...prevState,
                      mode: 'deposit',
                      modalType: 'claim',
                      direction: 'for',
                      isOpen: true,
                      claim: triple,
                      predicate: triple.predicate,
                      subject: triple.subject,
                      updated_at: new Date().toISOString(),
                      user_assets: '0',
                      user_assets_against: '0',
                      user_assets_for: '0',
                      user_conviction: '0',
                      user_conviction_against: '0',
                      user_conviction_for: '0',
                      vaultId: triple?.vault_id.toString() ?? '0',
                    }))
                  }
                  readOnly
                  className={`w-full hover:bg-transparent ${readOnly ? '' : 'pr-0'}`}
                />
                {readOnly === false && (
                  <Button
                    variant={ButtonVariant.text}
                    size={ButtonSize.icon}
                    onClick={() => {
                      setSaveListModalActive({
                        isOpen: true,
                        id: triple.vault_id.toString(),
                        identity: triple.subject,
                        tag: triple.object,
                      })
                    }}
                  >
                    <Icon name={IconName.bookmark} className="h-6 w-6" />
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </List>
    </>
  )
}
