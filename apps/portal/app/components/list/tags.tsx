import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
  Identity,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter, SortColumn } from '@0xintuition/api'

import { IdentityRow } from '@components/identity/identity-row'
import { ListHeader } from '@components/list/list-header'
import { saveListModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
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
  identities,
  claims,
  tag,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  readOnly = false,
}: {
  identities: IdentityPresenter[]
  claims: ClaimPresenter[]
  claim: ClaimPresenter
  tag?: IdentityPresenter | null
  wallet?: string
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

  logger('readonly', readOnly)

  const setSaveListModalActive = useSetAtom(saveListModalAtom)

  const claimMap = new Map(
    claims
      .filter(
        (
          claim,
        ): claim is ClaimPresenter & {
          subject: NonNullable<ClaimPresenter['subject']>
        } => claim.subject !== null,
      )
      .map((claim) => [claim.subject.id, claim.claim_id]),
  )

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
        {identities.map((identity) => {
          if (!identity || typeof identity !== 'object') {
            return null
          }

          const claimId = claimMap.get(identity.id)
          const matchingClaim = claims.find(
            (claim) => claim.claim_id === claimId,
          )
          // TODO: ENG-0000: Show filled save if user has a position on claim
          // TODO: ENG-0000: Show only user position if user is on filtering by you.

          return (
            <div
              key={identity.id}
              className={`grow shrink basis-0 self-stretch bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start hover:bg-secondary/10 transition-colors duration-200 items-start gap-5 inline-flex`}
            >
              <div className="flex flex-row gap-2 w-full">
                <IdentityRow
                  variant={identity.is_user ? Identity.user : Identity.nonUser}
                  avatarSrc={getAtomImage(identity)}
                  name={getAtomLabel(identity)}
                  description={getAtomDescription(identity)}
                  id={identity.user?.wallet ?? identity.identity_id}
                  claimLink={getClaimUrl(claimId ?? '', readOnly)}
                  tags={
                    identity.tags?.map((tag) => ({
                      label: tag.display_name,
                      value: tag.num_tagged_identities,
                    })) ?? undefined
                  }
                  amount={
                    +formatBalance(BigInt(matchingClaim?.assets_sum || 0), 18)
                  }
                  totalFollowers={matchingClaim?.num_positions || 0}
                  link={getAtomLink(identity, readOnly)}
                  ipfsLink={getAtomIpfsLink(identity)}
                  className={`w-full hover:bg-transparent ${readOnly ? '' : 'pr-0'}`}
                />
                {readOnly === false && (
                  <Button
                    variant={ButtonVariant.text}
                    size={ButtonSize.icon}
                    onClick={() => {
                      setSaveListModalActive({
                        isOpen: true,
                        id: identity.vault_id,
                        identity,
                        tag:
                          tag &&
                          identity.tags?.find(
                            (t) => t.vault_id === tag.vault_id,
                          ),
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
