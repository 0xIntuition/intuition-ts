import { Claim, ClaimRow, Identity, ListGrid } from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  IdentityPresenter,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { formatBalance } from '@lib/utils/misc'
import { useNavigate } from '@remix-run/react'
import { PaginationType } from 'types/pagination'

import { SortOption } from '../sort-select'
import { List } from './list'

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
  const claimObjectIdentities: (IdentityPresenter | null | undefined)[] =
    listClaims.map((claim) => claim.object)
  logger('claimObjectIdentities', claimObjectIdentities)
  return <ListGrid identities={claimObjectIdentities} />
}
