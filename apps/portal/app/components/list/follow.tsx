import { ClaimPositionRow, EmptyStateCard, Identity } from '@0xintuition/1ui'
import { IdentityPresenter, SortColumn } from '@0xintuition/api'

import { SortOption } from '@components/sort-select'
import { formatBalance } from '@lib/utils/misc'
import { useNavigate } from '@remix-run/react'
import { PaginationType } from 'types/pagination'

import { List } from './list'

export function FollowList({
  identities,
  pagination,
  paramPrefix,
}: {
  identities: IdentityPresenter[]
  pagination: PaginationType
  paramPrefix?: string
}) {
  const navigate = useNavigate()
  const options: SortOption<SortColumn>[] = [
    { value: 'Position Amount', sortBy: 'UserAssets' },
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  if (!identities.length) {
    return <EmptyStateCard message="No users found." />
  }

  return (
    <List<SortColumn>
      pagination={pagination}
      paginationLabel={paramPrefix ?? ''}
      options={options}
      paramPrefix={paramPrefix}
    >
      {identities.map((identity) => (
        <div
          key={identity.id}
          className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex`}
        >
          <ClaimPositionRow
            variant={Identity.user}
            position={'claimFor'}
            avatarSrc={identity.user?.image ?? identity.image ?? ''}
            name={identity.user?.display_name ?? identity.display_name ?? ''}
            walletAddress={identity.user?.wallet ?? identity.identity_id ?? ''}
            amount={+formatBalance(BigInt(identity.user_assets || ''), 18, 4)}
            feesAccrued={
              identity.user_asset_delta
                ? +formatBalance(
                    +identity.user_assets - +identity.user_asset_delta,
                    18,
                    5,
                  )
                : 0
            }
            updatedAt={identity.updated_at}
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
    </List>
  )
}
