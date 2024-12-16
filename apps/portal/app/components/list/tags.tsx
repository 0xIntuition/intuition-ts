import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
  Identity,
  IdentityRow,
} from '@0xintuition/1ui'
import { IdentityPresenter, SortColumn, Status } from '@0xintuition/api'
import { GetAtomQuery, GetListDetailsQuery } from '@0xintuition/graphql'

import { ListHeader } from '@components/list/list-header'
import { MULTIVAULT_CONTRACT_ADDRESS } from '@consts/index'
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

type Triple = GetListDetailsQuery['globalTriples'][number]

export function TagsList({
  triples,
  pagination,
  paramPrefix,
  enableHeader = true,
  enableSearch = true,
  enableSort = true,
  readOnly = false,
}: {
  triples: Triple[]
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
                    triple.subject as unknown as GetAtomQuery['atom'],
                  )}
                  name={getAtomLabelGQL(
                    triple.subject as unknown as GetAtomQuery['atom'],
                  )}
                  description={getAtomDescriptionGQL(
                    triple.subject as unknown as GetAtomQuery['atom'],
                  )}
                  id={triple.subject?.wallet_id ?? triple.subject?.id ?? ''}
                  claimLink={getClaimUrl(triple.vault_id ?? '', readOnly)}
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
                    identity as unknown as GetAtomQuery['atom'],
                    readOnly,
                  )}
                  ipfsLink={getAtomIpfsLinkGQL(
                    identity as unknown as GetAtomQuery['atom'],
                  )}
                  onStakeClick={() =>
                    setStakeModalActive((prevState) => ({
                      ...prevState,
                      mode: 'deposit',
                      modalType: 'claim',
                      direction: 'for',
                      isOpen: true,
                      claim: triple
                        ? {
                            id: triple.object?.id ?? '',
                            label: triple.object?.label ?? '',
                            image: triple.object?.image ?? '',
                            vault_id: triple.object?.vault_id ?? '',
                            against_assets_sum: '0',
                            against_conviction_price: '0',
                            against_conviction_sum: '0',
                            against_num_positions: 0,
                            assets_sum: '0',
                            claim_id: triple.id ?? '',
                            contract: MULTIVAULT_CONTRACT_ADDRESS,
                            counter_vault_id: triple.counter_vault_id ?? '',
                            created_at: new Date().toISOString(),
                            status: Status.COMPLETE,
                            creator: null,
                            for_assets_sum: '0',
                            for_conviction_price: '0',
                            for_conviction_sum: '0',
                            for_num_positions: 0,
                            num_positions: 0,
                            object: triple.object
                              ? {
                                  id: triple.object.id,
                                  label: triple.object.label,
                                  vaultId: triple.object.vault_id,
                                  image: triple.object.image,
                                  walletId: triple.object.wallet_id,
                                  type: triple.object.type,
                                  asset_delta: '0',
                                  assets_sum: '0',
                                  contract: '',
                                  conviction_price: '0',
                                  conviction_price_delta: '0',
                                  conviction_sum: '0',
                                  num_positions: 0,
                                  price: '0',
                                  price_delta: '0',
                                  status: Status.COMPLETE,
                                  total_conviction: '0',
                                  updated_at: new Date().toISOString(),
                                  created_at: new Date().toISOString(),
                                  creator_address: '',
                                  display_name: triple.object.label ?? '',
                                  follow_vault_id: '',
                                  user: null,
                                  creator: null,
                                  identity_hash: '',
                                  identity_id: '',
                                  is_contract: false,
                                  is_user: true,
                                  pending: false,
                                  pending_type: null,
                                  pending_vault_id: null,
                                  predicate: false, // Default value
                                  user_asset_delta: '0', // Default value
                                  user_assets: '0', // Default value
                                  user_conviction: '0', // Default value
                                  vault_id: triple.object.vault_id ?? '', // Default value
                                }
                              : null,
                            predicate: triple.predicate
                              ? {
                                  id: triple.predicate.id,
                                  label: triple.predicate.label,
                                  vaultId: triple.predicate.vault_id,
                                  image: triple.predicate.image,
                                  walletId: triple.predicate.wallet_id,
                                  type: triple.predicate.type,
                                  asset_delta: '0',
                                  assets_sum: '0',
                                  contract: '',
                                  conviction_price: '0',
                                  conviction_price_delta: '0',
                                  conviction_sum: '0',
                                  num_positions: 0,
                                  price: '0',
                                  price_delta: '0',
                                  status: Status.COMPLETE,
                                  total_conviction: '0',
                                  updated_at: new Date().toISOString(),
                                  created_at: new Date().toISOString(),
                                  creator_address: '',
                                  display_name: triple.predicate.label ?? '',
                                  follow_vault_id: '',
                                  user: null,
                                  creator: null,
                                  identity_hash: '',
                                  identity_id: '',
                                  is_contract: false,
                                  is_user: true,
                                  pending: false,
                                  pending_type: null,
                                  pending_vault_id: null,
                                  predicate: false, // Default value
                                  user_asset_delta: '0', // Default value
                                  user_assets: '0', // Default value
                                  user_conviction: '0', // Default value
                                  vault_id: triple.predicate.vault_id ?? '', // Default value
                                }
                              : null,
                            subject: triple.subject
                              ? {
                                  id: triple.subject.id,
                                  label: triple.subject.label,
                                  vaultId: triple.subject.vault_id,
                                  image: triple.subject.image,
                                  walletId: triple.subject.wallet_id,
                                  type: triple.subject.type,
                                  asset_delta: '0',
                                  assets_sum: '0',
                                  contract: '',
                                  conviction_price: '0',
                                  conviction_price_delta: '0',
                                  conviction_sum: '0',
                                  num_positions: 0,
                                  price: '0',
                                  price_delta: '0',
                                  status: Status.COMPLETE,
                                  total_conviction: '0',
                                  updated_at: new Date().toISOString(),
                                  created_at: new Date().toISOString(),
                                  creator_address: '',
                                  display_name: triple.subject.label ?? '',
                                  follow_vault_id: '',
                                  user: null,
                                  creator: null,
                                  identity_hash: '',
                                  identity_id: '',
                                  is_contract: false,
                                  is_user: true,
                                  pending: false,
                                  pending_type: null,
                                  pending_vault_id: null,
                                  predicate: false, // Default value
                                  user_asset_delta: '0', // Default value
                                  user_assets: '0', // Default value
                                  user_conviction: '0', // Default value
                                  vault_id: triple.subject.vault_id ?? '', // Default value
                                }
                              : null,
                            updated_at: new Date().toISOString(),
                            user_assets: '0',
                            user_assets_against: '0',
                            user_assets_for: '0',
                            user_conviction: '0',
                            user_conviction_against: '0',
                            user_conviction_for: '0',
                          }
                        : undefined,
                      vaultId: triple?.vault_id ?? '0',
                    }))
                  }
                  readOnly
                  className={`w-full hover:bg-transparent ${readOnly ? '' : 'pr-0'}`}
                />
                {readOnly === false && (
                  <Button
                    variant={ButtonVariant.text}
                    size={ButtonSize.icon}
                    onClick={() => {
                      setSaveListModalActive({
                        isOpen: true,
                        id: triple.vault_id,
                        identity: triple.subject
                          ? ({
                              id: triple.subject.id ?? '',
                              label: triple.subject.label ?? '',
                              image: triple.subject.image ?? '',
                              vault_id: triple.subject.vault_id,
                              assets_sum: '0',
                              user_assets: '0',
                              contract: MULTIVAULT_CONTRACT_ADDRESS,
                              asset_delta: '0',
                              conviction_price: '0',
                              conviction_price_delta: '0',
                              conviction_sum: '0',
                              num_positions: 0,
                              price: '0',
                              price_delta: '0',
                              status: 'active',
                              total_conviction: '0',
                              type: 'user',
                              updated_at: new Date().toISOString(),
                              created_at: new Date().toISOString(),
                              creator_address: '',
                              display_name: triple.subject?.label ?? '',
                              follow_vault_id: '',
                              user: null,
                              creator: null,
                              identity_hash: '',
                              identity_id: '',
                              is_contract: false,
                              is_user: true,
                              pending: false,
                              pending_type: null,
                              pending_vault_id: null,
                            } as unknown as IdentityPresenter)
                          : undefined,
                        tag: triple.object
                          ? ({
                              id: triple.object.id ?? '',
                              label: triple.object.label ?? '',
                              image: triple.object.image ?? '',
                              vault_id: triple.object.vault_id,
                              assets_sum: '0',
                              user_assets: '0',
                              contract: MULTIVAULT_CONTRACT_ADDRESS,
                              asset_delta: '0',
                              conviction_price: '0',
                              conviction_price_delta: '0',
                              conviction_sum: '0',
                              num_positions: 0,
                              price: '0',
                              price_delta: '0',
                              status: 'active',
                              total_conviction: '0',
                              type: 'user',
                              updated_at: new Date().toISOString(),
                              created_at: new Date().toISOString(),
                              creator_address: '',
                              display_name: triple.object?.label ?? '',
                              follow_vault_id: '',
                              user: null,
                              creator: null,
                              identity_hash: '',
                              identity_id: '',
                              is_contract: false,
                              is_user: true,
                              pending: false,
                              pending_type: null,
                              pending_vault_id: null,
                            } as unknown as IdentityPresenter)
                          : undefined,
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
