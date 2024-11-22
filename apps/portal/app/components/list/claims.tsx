import {
  Claim,
  ClaimPosition,
  ClaimRow,
  IconName,
  Identity,
} from '@0xintuition/1ui'
import { ClaimSortColumn } from '@0xintuition/api'
import { GetTriplesWithPositionsQuery } from '@0xintuition/graphql'

import { ListHeader } from '@components/list/list-header'
import RemixLink from '@components/remix-link'
import { stakeModalAtom } from '@lib/state/store'
import { getClaimUrl } from '@lib/utils/misc'
import { Link } from '@remix-run/react'
import { useSetAtom } from 'jotai'

import { SortOption } from '../sort-select'
import { List } from './list'

type Triple = NonNullable<
  NonNullable<GetTriplesWithPositionsQuery['triples']>[number]
>

// TODO: (ENG-4830) Add ReadOnly support back in and update our util functions that use it
interface ClaimsListProps {
  claims: Triple[]
  pagination: { aggregate?: { count: number } } | number
  paramPrefix?: string
  enableHeader?: boolean
  enableSearch?: boolean
  enableSort?: boolean
  // readOnly?: boolean
}

export function ClaimsList({
  claims,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  // readOnly = false,
}: ClaimsListProps) {
  const setStakeModalActive = useSetAtom(stakeModalAtom)

  const paginationCount =
    typeof pagination === 'number'
      ? pagination
      : pagination?.aggregate?.count ?? 0

  const options: SortOption<ClaimSortColumn>[] = [
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'ETH For', sortBy: 'ForAssetsSum' },
    { value: 'ETH Against', sortBy: 'AgainstAssetsSum' },
    { value: 'Total Positions', sortBy: 'NumPositions' },
    { value: 'Positions For', sortBy: 'ForNumPositions' },
    { value: 'Positions Against', sortBy: 'AgainstNumPositions' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  return (
    <List<ClaimSortColumn>
      pagination={{
        currentPage: 1,
        limit: 10,
        totalEntries: paginationCount,
        totalPages: Math.ceil(paginationCount / 10),
      }}
      paginationLabel="claims"
      options={options}
      paramPrefix={paramPrefix}
      enableSearch={enableSearch}
      enableSort={enableSort}
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
            numPositionsFor={0}
            numPositionsAgainst={0}
            tvlFor="0"
            tvlAgainst="0"
            totalTVL="0"
            userPosition="0"
            positionDirection={undefined}
            onStakeForClick={() =>
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'deposit',
                modalType: 'claim',
                direction: ClaimPosition.claimFor,
                isOpen: true,
                claim: triple,
                vaultId: triple.vault?.id,
              }))
            }
            onStakeAgainstClick={() =>
              setStakeModalActive((prevState) => ({
                ...prevState,
                mode: 'deposit',
                modalType: 'claim',
                direction: ClaimPosition.claimAgainst,
                isOpen: true,
                claim: triple,
                vaultId: triple.vault?.id,
              }))
            }
            isFirst={!enableHeader && index === 0}
            isLast={index === claims.length - 1}
            className="border-none rounded-none"
          >
            <Link to={getClaimUrl(triple.vault?.id ?? '')} prefetch="intent">
              <Claim
                size="md"
                subject={{
                  variant: Identity.nonUser,
                  label: triple.subject?.label ?? '',
                  imgSrc: triple.subject?.image ?? '',
                  id: triple.subject?.id,
                  description: '',
                  ipfsLink: '',
                  link: '',
                  linkComponent: RemixLink,
                }}
                predicate={{
                  variant: Identity.nonUser,
                  label: triple.predicate?.label ?? '',
                  imgSrc: triple.predicate?.image ?? '',
                  id: triple.predicate?.id,
                  description: '',
                  ipfsLink: '',
                  link: '',
                  linkComponent: RemixLink,
                }}
                object={{
                  variant: Identity.nonUser,
                  label: triple.object?.label ?? '',
                  imgSrc: triple.object?.image ?? '',
                  id: triple.object?.id,
                  description: '',
                  ipfsLink: '',
                  link: '',
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
