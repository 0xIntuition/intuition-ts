import {
  ApiError,
  IdentitiesService,
  IdentityPresenter,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { fetchWrapper } from '@server/api'

export async function getIdentityOrPending(
  request: Request,
  id: string,
): Promise<{ identity?: IdentityPresenter | null; isPending: boolean }> {
  try {
    const identity = await fetchWrapper(request, {
      method: IdentitiesService.getIdentityById,
      args: { id }, // currently this is params.id (but we'll pass this in)
    })
    return { identity, isPending: false }
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      try {
        logger('checking pending status')
        // const pendingIdentity = await fetchWrapper(request, {
        //   method: IdentitiesService.getIdentityById,
        //   args: { id: 'de2456d4-70fc-41d9-9fda-51624545036e' }, // currently this is params.id (but we'll pass this in)
        // })
        // return { identity: pendingIdentity, isPending: true }
        const pendingIdentity = (await fetchWrapper(request, {
          method: IdentitiesService.getPendingIdentity,
          args: { identifier: id },
        })) as unknown as IdentityPresenter
        logger('id', id)
        logger('pending identity', pendingIdentity)
        return { identity: pendingIdentity, isPending: true }
      } catch (pendingError) {
        logger('catching pendingError')
        return { identity: null, isPending: false }
      }
    }
    throw error
  }
}
