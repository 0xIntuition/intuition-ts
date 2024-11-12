import {
  ApiError,
  IdentitiesService,
  IdentityPresenter,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { invariant, sleep } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR } from 'app/consts'

export interface GetIdentityLoaderData {
  identity: IdentityPresenter
  error?: string
}

const MAX_RETRIES = 10
const RETRY_DELAY = 2000 // 2 seconds

export async function loader({ request }: LoaderFunctionArgs) {
  console.log('get-identity loader called', request.url)

  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const vaultId = url.searchParams.get('vaultId') || ''

  console.log('vaultId', vaultId)

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      console.log(`Attempt ${attempt + 1} to fetch identity`)
      const identity = await fetchWrapper(request, {
        method: IdentitiesService.getIdentityById,
        args: { id: vaultId },
      })
      if (identity) {
        logger('[get-identity route] identity:', identity)
        return json({ identity })
      }
      console.log(`Identity not found on attempt ${attempt + 1}`)
    } catch (error) {
      console.log(`Error on attempt ${attempt + 1}:`, error)
      if (attempt === MAX_RETRIES - 1) {
        if (error instanceof ApiError && error.status === 404) {
          return json({ error: 'Identity not found' }, { status: 404 })
        }
        logger('[get-identity route] Error:', error)
        return json({ error: 'Error fetching identity' }, { status: 500 })
      }
    }

    if (attempt < MAX_RETRIES - 1) {
      console.log(`Waiting ${RETRY_DELAY}ms before next attempt`)
      await sleep(RETRY_DELAY)
    }
  }

  return json({ error: 'Identity not found' }, { status: 404 })
}
