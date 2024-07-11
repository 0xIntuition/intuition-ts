import { Identity, IdentityContentRow } from '@0xintuition/1ui'
import { IdentityPresenter, SortColumn } from '@0xintuition/api'

import { PaginationComponent } from '@components/pagination-component'
import { useSearchAndSortParamsHandler } from '@lib/hooks/useSearchAndSortParams'
import { formatBalance } from '@lib/utils/misc'
import { useNavigate } from '@remix-run/react'
import { PaginationType } from 'types/pagination'

import { SearchAndSort } from '../search-and-sort'
import { SortOption } from '../sort-select'

export function ExploreIdentities({
  identities,
  pagination,
}: {
  identities: IdentityPresenter[]
  pagination: PaginationType
}) {
  const navigate = useNavigate()
  const options: SortOption<SortColumn>[] = [
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Total Positions', sortBy: 'NumPositions' },
  ]

  const { handleSortChange, handleSearchChange, onPageChange, onLimitChange } =
    useSearchAndSortParamsHandler<SortColumn>()

  return (
    <div className="flex flex-col w-full gap-6">
      <SearchAndSort
        options={options}
        handleSortChange={handleSortChange}
        handleSearchChange={handleSearchChange}
      />
      <div className="flex flex-col w-full">
        {identities?.map((identity) => (
          <div
            key={identity.id}
            className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex`}
          >
            <IdentityContentRow
              variant={identity.is_user ? Identity.user : Identity.nonUser}
              avatarSrc={identity.user?.image ?? identity.image ?? ''}
              name={identity.user?.display_name ?? identity.display_name}
              walletAddress={identity.user?.wallet ?? identity.identity_id}
              amount={+formatBalance(BigInt(identity.user_assets), 18, 4)}
              totalFollowers={identity.num_positions}
              onClick={() => {
                navigate(
                  identity.is_user
                    ? `/app/profile/${identity.identity_id}`
                    : `/app/identity/${identity.identity_id}`,
                )
              }}
              className="hover:cursor-pointer"
            />
          </div>
        ))}
      </div>
      <PaginationComponent
        totalEntries={pagination.totalEntries ?? 0}
        currentPage={pagination.currentPage ?? 0}
        totalPages={pagination.totalPages ?? 0}
        limit={pagination.limit ?? 0}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        label="positions"
      />
    </div>
  )
}
