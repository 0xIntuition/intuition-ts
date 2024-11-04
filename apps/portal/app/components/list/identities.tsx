import { IconName, Identity, IdentityRow } from '@0xintuition/1ui'
import { IdentityPresenter, SortColumn } from '@0xintuition/api'

import { ListHeader } from '@components/list/list-header'
import { stakeModalAtom } from '@lib/state/store'
import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { PaginationType } from 'app/types/pagination'
import { useSetAtom } from 'jotai'

import { SortOption } from '../sort-select'
import { List } from './list'

export function IdentitiesList({
  identities,
  pagination,
  paramPrefix,
  enalbeHeader = true,
  enableSearch = true,
  enableSort = true,
  readOnly = false,
}: {
  variant?: 'explore' | 'positions'
  identities: IdentityPresenter[]
  pagination?: PaginationType
  paramPrefix?: string
  enalbeHeader?: boolean
  enableSearch?: boolean
  enableSort?: boolean
  readOnly?: boolean
}) {
  const options: SortOption<SortColumn>[] = [
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Total Positions', sortBy: 'NumPositions' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  const setStakeModalActive = useSetAtom(stakeModalAtom)

  return (
    <List<SortColumn>
      pagination={pagination}
      paginationLabel="identities"
      options={options}
      paramPrefix={paramPrefix}
      enableSearch={enableSearch}
      enableSort={enableSort}
    >
      {enalbeHeader && (
        <ListHeader
          items={[
            { label: 'Identity', icon: IconName.fingerprint },
            { label: 'TVL', icon: IconName.ethereum },
          ]}
        />
      )}
      {identities.map((identity) => {
        if (!identity || typeof identity !== 'object') {
          return null
        }
        return (
          <div
            key={identity.id}
            className={`grow shrink basis-0 self-stretch bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start items-start gap-5 inline-flex`}
          >
            <IdentityRow
              variant={identity.is_user ? Identity.user : Identity.nonUser}
              avatarSrc={getAtomImage(identity)}
              name={getAtomLabel(identity)}
              description={getAtomDescription(identity)}
              id={identity.user?.wallet ?? identity.identity_id}
              totalTVL={formatBalance(BigInt(identity.assets_sum), 18)}
              currency={'ETH'}
              numPositions={identity.num_positions}
              link={getAtomLink(identity, readOnly)}
              ipfsLink={getAtomIpfsLink(identity)}
              tags={
                identity.tags?.map((tag) => ({
                  label: tag.display_name,
                  value: tag.num_tagged_identities,
                })) ?? undefined
              }
              userPosition={formatBalance(identity.user_assets, 18)}
              onStakeClick={() =>
                setStakeModalActive((prevState) => ({
                  ...prevState,
                  mode: 'deposit',
                  modalType: 'identity',
                  isOpen: true,
                  identity,
                  vaultId: identity.vault_id,
                }))
              }
              className="border-none rounded-none"
            />
          </div>
        )
      })}
    </List>
  )
}
