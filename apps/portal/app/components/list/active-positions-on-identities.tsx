import { IconName, Identity } from '@0xintuition/1ui'
import { IdentityPresenter, SortColumn } from '@0xintuition/api'

import { IdentityPositionRow } from '@components/identity/identity-position-row'
import { ListHeader } from '@components/list/list-header'
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
      <ListHeader
        items={[
          { label: 'Identity', icon: IconName.fingerprint },
          { label: 'Position Amount', icon: IconName.ethereum },
        ]}
      />
      {identities.map((identity) => (
        <div
          key={identity.id}
          className={`grow shrink basis-0 self-stretch bg-black first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start items-start gap-5 inline-flex`}
        >
          <IdentityPositionRow
            variant={identity.is_user ? Identity.user : Identity.nonUser}
            avatarSrc={getAtomImage(identity)}
            name={getAtomLabel(identity)}
            description={getAtomDescription(identity)}
            id={identity.user?.wallet ?? identity.identity_id}
            amount={+formatBalance(BigInt(identity.user_assets), 18)}
            feesAccrued={
              identity.user_asset_delta
                ? +formatBalance(
                    +identity.user_assets - +identity.user_asset_delta,
                    18,
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
