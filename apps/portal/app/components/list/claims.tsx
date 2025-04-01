import {
  Claim,
  ClaimPosition,
  ClaimRow,
  IconName,
  Identity,
} from '@0xintuition/1ui'

import { ListHeader } from '@components/list/list-header'
import RemixLink from '@components/remix-link'
import { stakeModalAtom } from '@lib/state/store'
import { formatBalance, getAtomLink, getClaimUrl } from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { PaginationType } from 'app/types'
import { Triple } from 'app/types/triple'
import { useSetAtom } from 'jotai'

import { SortOption } from '../sort-select'
import { List } from './list'

// TODO: (ENG-4830) Add ReadOnly support back in and update our util functions that use it
interface ClaimsListNewProps {
  claims: Triple[]
  pagination: PaginationType | { aggregate?: { count: number } } | number
  paramPrefix?: string
  enableHeader?: boolean
  enableSearch?: boolean
  enableSort?: boolean
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
  isConnected?: boolean
}

export function ClaimsListNew({
  claims,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  onPageChange,
  onLimitChange,
  isConnected = false,
}: ClaimsListNewProps) {
  const setStakeModalActive = useSetAtom(stakeModalAtom)

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

  // Using GraphQL field names directly for sorting
  const options: SortOption<string>[] = [
    { value: 'Total ETH', sortBy: 'vault.total_shares', direction: 'desc' },
    { value: 'ETH For', sortBy: 'vault.total_shares', direction: 'desc' },
    {
      value: 'ETH Against',
      sortBy: 'counter_vault.total_shares',
      direction: 'desc',
    },
    {
      value: 'Total Positions',
      sortBy: 'vault.position_count',
      direction: 'desc',
    },
    {
      value: 'Positions For',
      sortBy: 'vault.position_count',
      direction: 'desc',
    },
    {
      value: 'Positions Against',
      sortBy: 'counter_vault.position_count',
      direction: 'desc',
    },
    { value: 'Updated At', sortBy: 'block_timestamp', direction: 'desc' },
    { value: 'Created At', sortBy: 'block_timestamp', direction: 'desc' },
  ]

  console.log('claims', claims)

  return (
    <List<string>
      pagination={formattedPagination}
      paginationLabel="claims"
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
            { label: 'Claim', icon: IconName.claim },
            { label: 'TVL', icon: IconName.ethereum },
          ]}
        />
      )}
      {claims.map((triple, index) => (
        <div
          key={triple.id}
          className="grow shrink basis-0 self-stretch bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start gap-5 inline-flex"
        >
          <ClaimRow
            numPositionsFor={triple.vault?.position_count ?? 0}
            numPositionsAgainst={triple.counter_vault?.position_count ?? 0}
            tvlFor={formatBalance(triple.vault?.total_shares ?? '0', 18)}
            tvlAgainst={formatBalance(
              triple.counter_vault?.total_shares ?? '0',
              18,
            )}
            totalTVL={formatBalance(
              BigInt(triple.vault?.total_shares ?? '0') +
                BigInt(triple.counter_vault?.total_shares ?? '0'),
              18,
            )}
            userPosition={(() => {
              let totalPosition = BigInt(0)

              // Check main vault position
              if (
                triple?.vault?.current_share_price &&
                triple?.vault?.positions?.[0]?.shares
              ) {
                totalPosition +=
                  (BigInt(triple.vault.current_share_price) *
                    BigInt(triple.vault.positions[0].shares)) /
                  BigInt(10 ** 18)
              }

              // Check counter vault position
              if (
                triple?.counter_vault?.current_share_price &&
                triple?.counter_vault?.positions?.[0]?.shares
              ) {
                totalPosition +=
                  (BigInt(triple.counter_vault.current_share_price) *
                    BigInt(triple.counter_vault.positions[0].shares)) /
                  BigInt(10 ** 18)
              }

              return formatBalance(totalPosition, 18)
            })()}
            positionDirection={
              triple.vault?.positions?.[0]?.shares
                ? ClaimPosition.claimFor
                : triple.counter_vault?.positions?.[0]?.shares
                  ? ClaimPosition.claimAgainst
                  : undefined
            }
            onStakeForClick={() =>
              // @ts-ignore // TODO: Fix the staking actions to use correct types
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'deposit',
                modalType: 'claim',
                direction: ClaimPosition.claimFor,
                isOpen: true,
                claim: triple,
                vaultId: triple?.id,
              }))
            }
            onStakeAgainstClick={() =>
              // @ts-ignore // TODO: Fix the staking actions to use correct types
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'deposit',
                modalType: 'claim',
                direction: ClaimPosition.claimAgainst,
                isOpen: true,
                claim: triple,
                vaultId: triple?.counter_vault_id,
              }))
            }
            isFirst={!enableHeader && index === 0}
            isLast={index === claims.length - 1}
            className="border-none rounded-none"
            isConnected={isConnected}
          >
            <Link
              to={getClaimUrl(triple?.id?.toString() ?? '')}
              prefetch="intent"
            >
              <Claim
                size="md"
                subject={{
                  variant: Identity.nonUser,
                  label: triple.subject?.label ?? '',
                  imgSrc: triple.subject?.image ?? '',
                  id: triple.subject?.data,
                  description:
                    triple.subject?.value?.thing?.description ??
                    triple.subject?.value?.organization?.description ??
                    triple.subject?.value?.person?.description ??
                    '',
                  ipfsLink: triple.subject?.data ?? '',
                  link: getAtomLink(triple.subject),
                  linkComponent: RemixLink,
                }}
                predicate={{
                  variant: Identity.nonUser,
                  label: triple.predicate?.label ?? '',
                  imgSrc: triple.predicate?.image ?? '',
                  id: triple.predicate?.data,
                  description:
                    triple.predicate?.value?.thing?.description ??
                    triple.predicate?.value?.organization?.description ??
                    triple.predicate?.value?.person?.description ??
                    '',
                  ipfsLink: triple.predicate?.data ?? '',
                  link: getAtomLink(triple.predicate),
                  linkComponent: RemixLink,
                }}
                object={{
                  variant: Identity.nonUser,
                  label: triple.object?.label ?? '',
                  imgSrc: triple.object?.image ?? '',
                  id: triple.object?.data,
                  description:
                    triple.object?.value?.thing?.description ??
                    triple.object?.value?.organization?.description ??
                    triple.object?.value?.person?.description ??
                    '',
                  ipfsLink: triple.object?.data ?? '',
                  link: getAtomLink(triple.object),
                  linkComponent: RemixLink,
                }}
                isClickable={true}
              />
            </Link>
          </ClaimRow>
        </div>
      ))}
    </List>
  )
}
