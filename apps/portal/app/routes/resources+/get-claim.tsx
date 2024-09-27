import { ClaimPresenter, ClaimsService } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { invariant, sleep } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR } from 'app/consts'

export interface GetClaimLoaderData {
  claim: ClaimPresenter
}

const MAX_RETRIES = 10
const RETRY_DELAY = 1000 // 1 second

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const claimId = url.searchParams.get('claimId') || ''

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const claim = await fetchWrapper(request, {
        method: ClaimsService.getClaimById,
        args: { id: claimId },
      })
      if (claim) {
        logger('[get-claim route] claim:', claim)
        return json({ claim })
      }
      if (attempt < MAX_RETRIES - 1) {
        await sleep(RETRY_DELAY)
      }
    } catch (error) {
      if (attempt === MAX_RETRIES - 1) {
        console.error('Error fetching claim:', error)
        return json({ error: 'Error fetching claim' }, { status: 500 })
      }
      await sleep(RETRY_DELAY)
    }
  }

  logger('[get-claim route] claim not found after retries')
  return json({ error: 'Claim not found' }, { status: 404 })
}
