import {
  Button,
  ButtonSize,
  ButtonVariant,
  cn,
  IconName,
  Identity,
  IdentityRow,
} from '@0xintuition/1ui'

import { ListHeader } from '@components/list/list-header'
import { saveListModalAtom, stakeModalAtom } from '@lib/state/store'
import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
  getClaimUrl,
} from '@lib/utils/misc'
import { Triple } from 'app/types'
import { Atom } from 'app/types/atom'
import { PaginationType } from 'app/types/pagination'
import { useSetAtom } from 'jotai'
import { Bookmark } from 'lucide-react'

import { SortOption } from '../sort-select'
import { List } from './list'

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
  onPageChange,
  onLimitChange,
  isConnected = false,
}: {
  triples: Triple[]
  pagination?: PaginationType
  paramPrefix?: string
  enableHeader?: boolean
  enableSearch?: boolean
  enableSort?: boolean
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
  isConnected?: boolean
}) {
  // Using GraphQL field names directly for sorting
  const options: SortOption<string>[] = [
    { value: 'Total ETH', sortBy: 'vault.total_shares', direction: 'desc' },
    {
      value: 'Total Positions',
      sortBy: 'vault.position_count',
      direction: 'desc',
    },
    { value: 'Updated At', sortBy: 'block_timestamp', direction: 'desc' },
    { value: 'Created At', sortBy: 'block_timestamp', direction: 'desc' },
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
                  avatarSrc={getAtomImage(triple.subject as unknown as Atom)}
                  name={getAtomLabel(triple.subject as unknown as Atom)}
                  description={getAtomDescription(
                    triple.subject as unknown as Atom,
                  )}
                  id={
                    typeof triple.subject?.wallet_id === 'string'
                      ? triple.subject.wallet_id
                      : typeof triple.subject?.id === 'string'
                        ? triple.subject.id
                        : triple.subject?.id?.toString() ?? ''
                  }
                  claimLink={getClaimUrl(triple.vault_id.toString() ?? '')}
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
                  link={getAtomLink(identity as unknown as Atom)}
                  ipfsLink={getAtomIpfsLink(identity as unknown as Atom)}
                  onStakeClick={() =>
                    setStakeModalActive((prevState) => ({
                      ...prevState,
                      mode: 'deposit',
                      modalType: 'claim',
                      direction: 'for',
                      isOpen: true,
                      triple,
                      vaultId: triple?.vault_id.toString() ?? '0',
                    }))
                  }
                  className={`w-full border-0 bg-transparent ${'pr-0'}`}
                  isConnected={isConnected}
                />
                {isConnected && (
                  <Button
                    variant={ButtonVariant.text}
                    size={ButtonSize.icon}
                    onClick={() => {
                      setSaveListModalActive({
                        isOpen: true,
                        id: triple.vault_id.toString(),
                        identity: triple.subject as Atom,
                        tag: triple.object as Atom,
                      })
                    }}
                  >
                    <Bookmark
                      className={cn(
                        `h-6 w-6`,
                        triple?.vault?.positions?.[0]?.shares &&
                          +triple?.vault?.positions?.[0]?.shares > 0 &&
                          `fill-primary`,
                      )}
                    />
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
