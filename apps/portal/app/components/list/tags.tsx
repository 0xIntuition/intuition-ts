import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
  Identity,
  IdentityRow,
} from '@0xintuition/1ui'
import { SortColumn } from '@0xintuition/api'
import { GetAtomQuery, GetListDetailsQuery } from '@0xintuition/graphql'

import { ListHeader } from '@components/list/list-header'
import { saveListModalAtom, stakeModalAtom } from '@lib/state/store'
import {
  formatBalance,
  getAtomDescriptionGQL,
  getAtomImageGQL,
  getAtomIpfsLinkGQL,
  getAtomLabelGQL,
  getAtomLinkGQL,
  getClaimUrl,
} from '@lib/utils/misc'
import { PaginationType } from 'app/types/pagination'
import { useSetAtom } from 'jotai'

import { SortOption } from '../sort-select'
import { List } from './list'

export function TagsList({
  triples,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  readOnly = false,
}: {
  triples: GetListDetailsQuery['globalTriples']
  pagination?: PaginationType
  paramPrefix?: string
  enableHeader?: boolean
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

  const setSaveListModalActive = useSetAtom(saveListModalAtom)
  const setStakeModalActive = useSetAtom(stakeModalAtom)

  return (
    <>
      <List<SortColumn>
        pagination={pagination}
        paginationLabel="identities"
        options={options}
        paramPrefix={paramPrefix}
        enableSearch={enableSearch}
        enableSort={enableSort}
      >
        {enableHeader && (
          <ListHeader
            items={[
              { label: 'Tag', icon: IconName.bookmark },
              { label: 'TVL', icon: IconName.ethereum },
            ]}
          />
        )}
        {triples.map((triple) => {
          const identity = triple.subject
          // TODO: ENG-0000: Show filled save if user has a position on claim
          // TODO: ENG-0000: Show only user position if user is on filtering by you.

          return (
            <div
              key={triple.subject?.id}
              className={`grow shrink basis-0 self-stretch bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start hover:bg-secondary/10 transition-colors duration-200 items-start gap-5 inline-flex`}
            >
              <div className="flex flex-row gap-2 w-full">
                <IdentityRow
                  variant={
                    triple.subject?.type === 'Account' ||
                    triple.subject?.type === 'Default'
                      ? Identity.user
                      : Identity.nonUser
                  }
                  avatarSrc={getAtomImageGQL(
                    triple.subject as GetAtomQuery['atom'],
                  )}
                  name={getAtomLabelGQL(triple.subject as GetAtomQuery['atom'])}
                  description={getAtomDescriptionGQL(
                    triple.subject as GetAtomQuery['atom'],
                  )}
                  id={triple.subject?.walletId ?? triple.subject?.id ?? ''}
                  claimLink={getClaimUrl(triple.vaultId ?? '', readOnly)}
                  tags={
                    triple.subject?.tags?.nodes?.map((tag) => ({
                      label: tag.object?.label ?? '',
                      value:
                        tag.object?.taggedIdentities?.aggregate?.count ?? 0,
                    })) ?? undefined
                  }
                  totalTVL={formatBalance(
                    BigInt(
                      triple?.vault?.positions_aggregate?.aggregate?.sum
                        ?.shares || 0,
                    ),
                    18,
                  )}
                  numPositions={
                    triple?.vault?.positions_aggregate?.aggregate?.count || 0
                  }
                  link={getAtomLinkGQL(
                    identity as GetAtomQuery['atom'],
                    readOnly,
                  )}
                  ipfsLink={getAtomIpfsLinkGQL(
                    identity as GetAtomQuery['atom'],
                  )}
                  onStakeClick={() =>
                    setStakeModalActive((prevState) => ({
                      ...prevState,
                      mode: 'deposit',
                      modalType: 'identity',
                      isOpen: true,
                      identity: (identity as GetAtomQuery['atom']) ?? undefined,
                      vaultId:
                        (identity as GetAtomQuery['atom'])?.vaultId ?? '0',
                    }))
                  }
                  className={`w-full hover:bg-transparent ${readOnly ? '' : 'pr-0'}`}
                />
                {readOnly === false && (
                  <Button
                    variant={ButtonVariant.text}
                    size={ButtonSize.icon}
                    onClick={() => {
                      setSaveListModalActive({
                        isOpen: true,
                        id: triple.vaultId,
                        identity: triple.subject as GetAtomQuery['atom'],
                        tag: triple.object as GetAtomQuery['atom'],
                      })
                    }}
                  >
                    <Icon name={IconName.bookmark} className="h-6 w-6" />
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </List>
    </>
  )
}
