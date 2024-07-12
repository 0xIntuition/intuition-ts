import { Identity, IdentityContentRow } from '@0xintuition/1ui'
import { IdentityPresenter, SortColumn } from '@0xintuition/api'

import { formatBalance } from '@lib/utils/misc'
import { useNavigate } from '@remix-run/react'
import { PaginationType } from 'types/pagination'

import { SortOption } from '../sort-select'
import { List } from './list'

export function IdentitiesList({
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
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Total Positions', sortBy: 'NumPositions' },
  ]

  return (
    <List<SortColumn>
      pagination={pagination}
      paginationLabel="identities"
      options={options}
      paramPrefix={paramPrefix}
      enableSearch={false}
    >
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
    </List>
  )
}
