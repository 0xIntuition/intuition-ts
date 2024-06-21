import { IdentityPresenter } from '@0xintuition/api'

export type ExtendedIdentityPresenter = IdentityPresenter & {
  follower_count: number
  followed_count: number
}
