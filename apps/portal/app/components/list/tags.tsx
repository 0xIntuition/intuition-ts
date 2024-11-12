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
import { saveListModalAtom, stakeModalAtom } from '@lib/state/store'
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
        {claims.map((claim) => {
          const identity = claim.subject
          // TODO: ENG-0000: Show filled save if user has a position on claim
          // TODO: ENG-0000: Show only user position if user is on filtering by you.

          return (
            <div
              key={claim.claim_id}
              className={`grow shrink basis-0 self-stretch bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start hover:bg-secondary/10 transition-colors duration-200 items-start gap-5 inline-flex`}
            >
              <div className="flex flex-row gap-2 w-full">
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
                  onStakeClick={() =>
                    setStakeModalActive((prevState) => ({
                      ...prevState,
                      mode: 'deposit',
                      modalType: 'identity',
                      isOpen: true,
                      identity: identity ?? undefined,
                      vaultId: identity?.vault_id ?? '0',
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
