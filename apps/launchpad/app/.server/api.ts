import { ApiError } from '@0xintuition/api'

import logger from '@lib/utils/logger'

import { setupAPI } from './auth'

export const fetchWrapper = async <T, A>({
  method,
  args,
}: {
  method: (arg: A) => Promise<T>
  args: A
}): Promise<T> => {
  try {
    await setupAPI()
    return await method(args)
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
    }
    throw error
  }
}
