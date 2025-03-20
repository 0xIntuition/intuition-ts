import { IconName, Identity, IdentityRow } from '@0xintuition/1ui'

import { ListHeader } from '@components/list/list-header'
import { stakeModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import { formatBalance, getAtomIpfsLink, getAtomLink } from '@lib/utils/misc'
import { AtomArray } from 'app/types/atom'
import { PaginationType } from 'app/types/pagination'
import { useSetAtom } from 'jotai'

import { SortOption } from '../sort-select'
import { List } from './list'

export function IdentitiesListNew({
  identities,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  readOnly = false,
  onPageChange,
  onLimitChange,
}: {
  variant?: 'explore' | 'positions'
  identities: AtomArray
  pagination: PaginationType
  paramPrefix?: string
  enableHeader?: boolean
  enableSearch?: boolean
  enableSort?: boolean
  readOnly?: boolean
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
}) {
  // Using GraphQL field names directly for sorting
  const options: SortOption<string>[] = [
    { value: 'Total ETH', sortBy: 'vault.total_shares' },
    { value: 'Total Positions', sortBy: 'vault.position_count' },
    { value: 'Created At', sortBy: 'block_timestamp' },
  ]

  const setStakeModalActive = useSetAtom(stakeModalAtom)

  logger('identities', identities)

  return (
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
            { label: 'Identity', icon: IconName.fingerprint },
            { label: 'TVL', icon: IconName.ethereum },
          ]}
        />
      )}
      {identities.map((identity, index) => {
        if (!identity || typeof identity !== 'object') {
          return null
        }
        return (
          <div
            key={identity.id}
            className={`grow shrink basis-0 self-stretch bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start items-start inline-flex gap-8`}
          >
            <IdentityRow
              variant={
                identity.type === 'user' ? Identity.user : Identity.nonUser
              }
              avatarSrc={identity?.image ?? ''}
              name={identity?.label ?? identity?.data ?? ''}
              description={identity?.label ?? identity?.data ?? ''}
              id={identity?.creator?.id ?? ''}
              totalTVL={formatBalance(
                BigInt(identity?.vault?.total_shares ?? '0'),
                18,
              )}
              currency={'ETH'}
              numPositions={identity?.vault?.position_count ?? 0}
              link={getAtomLink(identity, readOnly)}
              ipfsLink={getAtomIpfsLink(identity)}
              // tags={
              //   identity.tags?.map((tag) => ({
              //     label: tag.display_name,
              //     value: tag.num_tagged_identities,
              //   })) ?? undefined
              // } // TODO: (ENG-4939) -- Update query/component to use new tags
              userPosition={formatBalance(
                identity?.vault?.positions?.[0]?.shares ?? '0',
                18,
              )}
              onStakeClick={() =>
                setStakeModalActive((prevState) => ({
                  ...prevState,
                  mode: 'deposit',
                  modalType: 'identity',
                  isOpen: true,
                  identity,
                  vaultId: identity?.id.toString(),
                }))
              }
              isFirst={!enableHeader && index === 0}
              isLast={index === identities.length - 1}
              className="border-none rounded-none"
            />
          </div>
        )
      })}
    </List>
  )
}
