import { IdentityPresenter } from '@0xintuition/api'

import { IdentitySearchCombobox } from '@components/identity/identity-search-combo-box'
import logger from '@lib/utils/logger'

export function ViewTags({ tags }: { tags: IdentityPresenter[] }) {
  logger('tags', tags)
  return <IdentitySearchCombobox identities={tags} shouldFilter={true} />
}
