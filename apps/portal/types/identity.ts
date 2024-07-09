import {
  GetIdentityByIdResponse,
  IdentityPresenter,
  SearchClaimsResponse,
  SearchPositionsResponse,
} from '@0xintuition/api'

export type ExtendedIdentityPresenter = IdentityPresenter & {
  follower_count: number
  followed_count: number
}

export type InitialIdentityData = {
  userIdentity: GetIdentityByIdResponse | undefined
  positions: SearchPositionsResponse | undefined
  claims: SearchClaimsResponse | undefined
  sortBy: string
  direction: string
  pagination: {
    total: number
    page: number
    totalPages: number
  }
}
