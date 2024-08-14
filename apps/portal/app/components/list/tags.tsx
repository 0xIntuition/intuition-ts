import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
  Identity,
  IdentityContentRow,
} from '@0xintuition/1ui'
import { ClaimPresenter, IdentityPresenter, SortColumn } from '@0xintuition/api'

import { ListHeader } from '@components/list/list-header'
import SaveListModal from '@components/list/save-list-modal'
import { saveListModalAtom } from '@lib/state/store'
import logger from '@lib/utils/logger'
import {
  formatBalance,
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
} from '@lib/utils/misc'
import { MULTIVAULT_CONTRACT_ADDRESS } from 'app/consts'
import { PaginationType } from 'app/types/pagination'
import { useAtom } from 'jotai'

import { SortOption } from '../sort-select'
import { List } from './list'

export function TagsList({
  identities,
  claims,
  claim,
  tag,
  wallet,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
}: {
  identities: IdentityPresenter[]
  claims: ClaimPresenter[]
  claim: ClaimPresenter
  tag?: IdentityPresenter | null
  wallet: string
  pagination?: PaginationType
  paramPrefix?: string
  enableHeader?: boolean
  enableSearch?: boolean
  enableSort?: boolean
}) {
  const options: SortOption<SortColumn>[] = [
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Total Positions', sortBy: 'NumPositions' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)

  const claimMap = new Map(
    claims
      .filter(
        (
          claim,
        ): claim is ClaimPresenter & {
          subject: NonNullable<ClaimPresenter['subject']>
        } => claim.subject !== null,
      )
      .map((claim) => [claim.subject.id, claim]),
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
              { label: 'Total Staked', icon: IconName.ethereum },
            ]}
          />
        )}
        {identities.map((identity) => {
          if (!identity || typeof identity !== 'object') {
            return null
          }

          const matchingClaim = claimMap.get(identity.id)

          return (
            <div
              key={identity.id}
              className={`grow shrink basis-0 self-stretch p-6 bg-background first:border-t-px first:rounded-t-xl last:rounded-b-xl theme-border border-t-0 flex-col justify-start items-start gap-5 inline-flex`}
            >
              <div className="flex flex-row gap-2 w-full">
                <IdentityContentRow
                  variant={identity.is_user ? Identity.user : Identity.nonUser}
                  avatarSrc={getAtomImage(identity)}
                  name={getAtomLabel(identity)}
                  description={getAtomDescription(identity)}
                  id={identity.user?.wallet ?? identity.identity_id}
                  amount={
                    +formatBalance(BigInt(identity.assets_sum || ''), 18, 4)
                  }
                  totalFollowers={identity.num_positions}
                  link={getAtomLink(identity)}
                  ipfsLink={getAtomIpfsLink(identity)}
                />
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
                        identity.tags?.find((t) => t.vault_id === tag.vault_id),
                    })
                  }}
                >
                  <Icon name={IconName.bookmark} className="h-6 w-6" />
                </Button>
              </div>
            </div>
          )
        })}
      </List>
      <SaveListModal
        contract={claim.object?.contract ?? MULTIVAULT_CONTRACT_ADDRESS}
        identity={saveListModalActive.identity as IdentityPresenter}
        tag={claim.object as IdentityPresenter}
        userWallet={wallet}
        open={saveListModalActive.isOpen}
        onClose={() =>
          setSaveListModalActive({
            ...saveListModalActive,
            isOpen: false,
          })
        }
      />
    </>
  )
}
