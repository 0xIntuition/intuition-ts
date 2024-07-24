import { Claim, ClaimRow, Identity, ListGrid } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  IdentityPresenter,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { formatBalance } from '@lib/utils/misc'
import { useNavigate } from '@remix-run/react'
import { data } from 'autoprefixer'
import { PaginationType } from 'types/pagination'

import { SortOption } from '../sort-select'
import { List } from './list'
import { ListIdentityCardPortal } from './list-identity-card-portal'

export function ListClaimsList({
  listClaims,
  // pagination,
  // paramPrefix,
  // enableSearch = false,
  // enableSort = false,
}: {
  listClaims: ClaimPresenter[]
  // pagination: PaginationType
  // paramPrefix?: string
  // enableSearch?: boolean
  // enableSort?: boolean
}) {
  // const navigate = useNavigate()
  // const options: SortOption<ClaimSortColumn>[] = [
  //   { value: 'Total ETH', sortBy: 'AssetsSum' },
  //   { value: 'ETH For', sortBy: 'ForAssetsSum' },
  //   { value: 'ETH Against', sortBy: 'AgainstAssetsSum' },
  //   { value: 'Total Positions', sortBy: 'NumPositions' },
  //   { value: 'Positions For', sortBy: 'ForNumPositions' },
  //   { value: 'Positions Against', sortBy: 'AgainstNumPositions' },
  //   { value: 'Updated At', sortBy: 'UpdatedAt' },
  //   { value: 'Created At', sortBy: 'CreatedAt' },
  // ]

  const claimData = listClaims.map((claim) => ({
    object: claim.object,
    user_assets_for: claim.user_assets_for,
    claim_id: claim.claim_id,
  }))
  logger('claimData', claimData)

  return (
    <ListGrid>
      {claimData.map(
        (claim, index) =>
          claim &&
          claim.object && (
            <ListIdentityCardPortal
              key={claim.claim_id || index}
              displayName={claim.object.display_name ?? undefined}
              imgSrc={claim.object?.image ?? undefined}
              identitiesCount={claim.object.tag_count ?? 0}
              isSaved={claim.user_assets_for !== '0'}
              savedAmount={claim.user_assets_for}
              onSaveClick={() => logger('save list clicked')}
            />
          ),
      )}
    </ListGrid>
  )
}
