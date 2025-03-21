import { Claim, ClaimPosition, IconName, Identity } from '@0xintuition/1ui'
import { GetPositionsQuery } from '@0xintuition/graphql'

import { ClaimPositionRow } from '@components/claim/claim-position-row'
import { ListHeader } from '@components/list/list-header'
import RemixLink from '@components/remix-link'
import { BLOCK_EXPLORER_URL } from '@consts/general'
import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
  getProfileUrl,
} from '@lib/utils/misc'
import { Atom } from 'app/types/atom'
import { PaginationType } from 'app/types/pagination'
import { formatUnits } from 'viem'

import { SortOption } from '../sort-select'
import { List } from './list'

type Position = NonNullable<GetPositionsQuery['positions']>[number]

interface ActivePositionsOnClaimsNewProps {
  positions: Position[]
  pagination: PaginationType | { aggregate?: { count: number } } | number
  readOnly?: boolean
  positionDirection?: string
  enableSearch?: boolean
  enableSort?: boolean
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
}

export function ActivePositionsOnClaimsNew({
  positions,
  pagination,
  readOnly = false,
  positionDirection,
  enableSearch = true,
  enableSort = true,
  onPageChange,
  onLimitChange,
}: ActivePositionsOnClaimsNewProps) {
  const positionsMapped = positions
    .map((p) => ({
      ...p,
      direction:
        p?.vault?.id === p?.vault?.triple?.counter_vault?.id
          ? ('against' as const)
          : ('for' as const),
    }))
    .filter((position) => {
      if (positionDirection === 'for') {
        return position.direction === 'for'
      }
      if (positionDirection === 'against') {
        return position.direction === 'against'
      }
      return true
    })

  // Convert pagination to the format expected by the List component
  const formattedPagination: PaginationType = (() => {
    if (typeof pagination === 'number') {
      return {
        currentPage: 1,
        limit: 10,
        totalEntries: pagination,
        totalPages: Math.ceil(pagination / 10),
      }
    }

    if ('aggregate' in pagination) {
      const count = pagination.aggregate?.count ?? 0
      return {
        currentPage: 1,
        limit: 10,
        totalEntries: count,
        totalPages: Math.ceil(count / 10),
      }
    }

    return pagination as PaginationType
  })()

  // Using GraphQL field names directly for sorting, only including fields that exist in positions_order_by
  const options: SortOption<string>[] = [
    { value: 'Position Amount', sortBy: 'shares' },
    { value: 'ID', sortBy: 'id' },
    { value: 'Account', sortBy: 'account_id' },
    { value: 'Vault ID', sortBy: 'vault_id' },
  ]

  return (
    <List<string>
      pagination={formattedPagination}
      paginationLabel="positions"
      options={options}
      paramPrefix="triplePositions"
      enableSearch={enableSearch}
      enableSort={enableSort}
      onPageChange={onPageChange}
      onLimitChange={onLimitChange}
    >
      <ListHeader
        items={[
          { label: 'Claim', icon: IconName.claim },
          { label: 'Position Amount', icon: IconName.ethereum },
        ]}
      />
      {positionsMapped.map((position) => (
        <div
          key={position.id}
          className={`grow shrink basis-0 self-stretch bg-black first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start items-start gap-5 inline-flex`}
        >
          <ClaimPositionRow
            variant="claim"
            position={
              position.direction === 'for'
                ? ClaimPosition.claimFor
                : ClaimPosition.claimAgainst
            }
            claimsFor={position?.vault?.triple?.vault?.position_count ?? 0}
            claimsAgainst={
              position?.vault?.triple?.counter_vault?.position_count ?? 0
            }
            claimsForValue={
              +formatBalance(
                position?.vault?.triple?.vault?.positions_aggregate?.aggregate
                  ?.sum?.shares ?? '0',
                18,
              )
            }
            claimsAgainstValue={
              +formatBalance(
                position?.vault?.triple?.counter_vault?.positions_aggregate
                  ?.aggregate?.sum?.shares ?? '0',
                18,
              )
            }
            amount={+formatBalance(BigInt(position.shares), 18)}
            feesAccrued={Number(
              formatUnits(
                // @ts-ignore // TODO: Fix this when we determine what the value should be
                BigInt(+position.shares - +(position.value ?? position.shares)),
                18,
              ),
            )}
            // updatedAt={position.updated_at} // TODO: Fix this when we have the updated_at

            link={getProfileUrl(position.account?.id, readOnly)}
            ipfsLink={`${BLOCK_EXPLORER_URL}/address/${position.account?.id}`}
          >
            {position?.vault?.triple && (
              <Claim
                size="md"
                subject={{
                  variant:
                    position?.vault?.triple?.subject?.type === 'Person'
                      ? Identity.user
                      : Identity.nonUser,
                  label: getAtomLabel(position?.vault?.triple?.subject as Atom),
                  imgSrc: getAtomImage(
                    position?.vault?.triple?.subject as Atom,
                  ),
                  id: position?.vault?.triple?.subject?.id,
                  description: getAtomDescription(
                    position?.vault?.triple?.subject as Atom,
                  ),
                  ipfsLink: getAtomIpfsLink(
                    position?.vault?.triple?.subject as Atom,
                  ),
                  link: getAtomLink(
                    position?.vault?.triple?.subject as Atom,
                    readOnly,
                  ),
                  linkComponent: RemixLink,
                }}
                predicate={{
                  variant:
                    position?.vault?.triple?.predicate?.type === 'Person'
                      ? Identity.user
                      : Identity.nonUser,
                  label: getAtomLabel(
                    position?.vault?.triple?.predicate as Atom,
                  ),
                  imgSrc: getAtomImage(
                    position?.vault?.triple?.predicate as Atom,
                  ),
                  id: position?.vault?.triple?.predicate?.id,
                  description: getAtomDescription(
                    position?.vault?.triple?.predicate as Atom,
                  ),
                  ipfsLink: getAtomIpfsLink(
                    position?.vault?.triple?.predicate as Atom,
                  ),
                  link: getAtomLink(
                    position?.vault?.triple?.predicate as Atom,
                    readOnly,
                  ),
                  linkComponent: RemixLink,
                }}
                object={{
                  variant:
                    position?.vault?.triple?.object?.type === 'Person'
                      ? Identity.user
                      : Identity.nonUser,
                  label: getAtomLabel(position?.vault?.triple?.object as Atom),
                  imgSrc: getAtomImage(position?.vault?.triple?.object as Atom),
                  id: position?.vault?.triple?.object?.id,
                  description: getAtomDescription(
                    position?.vault?.triple?.object as Atom,
                  ),
                  ipfsLink: getAtomIpfsLink(
                    position?.vault?.triple?.object as Atom,
                  ),
                  link: getAtomLink(
                    position?.vault?.triple?.object as Atom,
                    readOnly,
                  ),
                  linkComponent: RemixLink,
                }}
              />
            )}
          </ClaimPositionRow>
        </div>
      ))}
    </List>
  )
}
