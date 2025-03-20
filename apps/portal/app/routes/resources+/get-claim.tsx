import {
  fetcher,
  GetTripleDocument,
  GetTripleQuery,
  GetTripleQueryVariables,
} from '@0xintuition/graphql'

import logger from '@lib/utils/logger'
import { invariant, sleep } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getUserWallet } from '@server/auth'
import { NO_WALLET_ERROR } from 'app/consts'
import { Triple } from 'app/types/triple'

export interface GetClaimLoaderData {
  claim: Triple
  error?: string
}

const MAX_RETRIES = 1
const RETRY_DELAY = 2000 // 2 seconds

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await getUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const vaultId = url.searchParams.get('vaultId') || ''

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const tripleResult = await fetcher<
        GetTripleQuery,
        GetTripleQueryVariables
      >(GetTripleDocument, {
        tripleId: vaultId,
      })()
      if (tripleResult) {
        logger('[get-triple route] tripel:', tripleResult)
        return json({ tripleResult })
      }
      if (attempt < MAX_RETRIES - 1) {
        await sleep(RETRY_DELAY)
      }
    } catch (error) {
      if (attempt === MAX_RETRIES - 1) {
        logger('[get-claim route] Error:', error)
        return json({ error: 'Error fetching claim' }, { status: 500 })
      }
      await sleep(RETRY_DELAY)
    }
  }

  return json({ error: 'Claim not found' }, { status: 404 })
}
