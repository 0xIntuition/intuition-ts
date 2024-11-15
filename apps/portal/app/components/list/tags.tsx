import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
  Identity,
  IdentityRow,
} from '@0xintuition/1ui'
import { ClaimPresenter, SortColumn } from '@0xintuition/api'

import { ListHeader } from '@components/list/list-header'
import { saveListModalAtom } from '@lib/state/store'
import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
  getClaimUrl,
} from '@lib/utils/misc'
import { PaginationType } from 'app/types/pagination'
import { useSetAtom } from 'jotai'

import { SortOption } from '../sort-select'
import { List } from './list'

export function TagsList({
  claims,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  readOnly = false,
}: {
  claims: ClaimPresenter[]
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
        {claims.map((claim, index) => {
          const identity = claim.subject
          // TODO: ENG-0000: Show filled save if user has a position on claim
          // TODO: ENG-0000: Show only user position if user is on filtering by you.

          return (
            <div
              key={claim.claim_id}
              className={`grow shrink basis-0 self-stretch bg-primary/5 first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start items-start inline-flex gap-8`}
            >
              <div className="flex flex-row gap-2 w-full pr-4">
                <IdentityRow
                  variant={
                    claim.subject?.is_user ? Identity.user : Identity.nonUser
                  }
                  avatarSrc={getAtomImage(claim.subject)}
                  name={getAtomLabel(claim.subject)}
                  description={getAtomDescription(claim.subject)}
                  id={
                    claim.subject?.user?.wallet ??
                    claim.subject?.identity_id ??
                    ''
                  }
                  claimLink={getClaimUrl(claim.vault_id ?? '', readOnly)}
                  tags={
                    claim.subject?.tags?.map((tag) => ({
                      label: tag.display_name,
                      value: tag.num_tagged_identities,
                    })) ?? undefined
                  }
                  totalTVL={formatBalance(BigInt(claim?.assets_sum || 0), 18)}
                  numPositions={claim?.num_positions || 0}
                  link={getAtomLink(identity, readOnly)}
                  ipfsLink={getAtomIpfsLink(identity)}
                  className={`w-full border-none rounded-none bg-transparent ${readOnly ? '' : 'pr-0'}`}
                  isFirst={!enableHeader && index === 0}
                  isLast={index === claims.length - 1}
                  hideContextMenu={true}
                />
                {readOnly === false && (
                  <Button
                    variant={ButtonVariant.text}
                    size={ButtonSize.icon}
                    onClick={() => {
                      setSaveListModalActive({
                        isOpen: true,
                        id: claim.vault_id,
                        identity: claim.subject,
                        tag: claim.object,
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
