import { Identity, IdentityPosition } from '@0xintuition/1ui'
import { IdentityPresenter, SortColumn } from '@0xintuition/api'

import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { PaginationType } from 'app/types/pagination'

import { SortOption } from '../sort-select'
import { List } from './list'

export function ActivePositionsOnIdentities({
  identities,
  pagination,
}: {
  identities: IdentityPresenter[]
  pagination: PaginationType
}) {
  const options: SortOption<SortColumn>[] = [
    { value: 'Position Amount', sortBy: 'UserAssets' },
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  return (
    <List<SortColumn>
      pagination={pagination}
      paginationLabel="positions"
      options={options}
      paramPrefix="activeIdentities"
    >
      {identities.map((identity) => (
        <div
          key={identity.id}
          className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex`}
        >
          <IdentityPosition
            variant={identity.is_user ? Identity.user : Identity.nonUser}
            avatarSrc={getAtomImage(identity)}
            name={getAtomLabel(identity)}
            description={getAtomDescription(identity)}
            id={identity.user?.wallet ?? identity.identity_id}
            amount={+formatBalance(BigInt(identity.user_assets), 18, 4)}
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
            link={getAtomLink(identity)}
            ipfsLink={getAtomIpfsLink(identity)}
          />
        </div>
      ))}
    </List>
  )
}
