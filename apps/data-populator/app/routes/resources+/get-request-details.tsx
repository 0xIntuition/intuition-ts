import { getRequest } from '@lib/services/request'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const requestHash = url.searchParams.get('requestHash')
  invariant(requestHash, 'Missing requestHash')

  try {
    logger('fetching details on requestHash', requestHash)
    const request = await getRequest(requestHash)
    return json({ request })
  } catch (error) {
    logger('Failed to fetch request details', error)
    return json({ error: 'Failed to fetch request details' }, { status: 500 })
  }
}
