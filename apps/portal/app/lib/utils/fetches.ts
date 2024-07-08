import { ApiError, IdentitiesService, UsersService } from '@0xintuition/api'

import logger from './logger'

export async function fetchUserIdentity(wallet: string) {
  try {
    return await IdentitiesService.getIdentityById({ id: wallet })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return undefined
    } else {
      throw error
    }
  }
}

export async function fetchUserTotals(creatorId: string) {
  try {
    return await UsersService.getUserTotals({ id: creatorId })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return undefined
    } else {
      throw error
    }
  }
}
