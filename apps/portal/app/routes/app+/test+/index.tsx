import { IdentitiesService, OpenAPI } from '@0xintuition/api'

import { PrivyButton } from '@client/privy-button'
import { getAuthHeaders } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const test = await IdentitiesService.getIdentities({
    paging: {
      page: 1,
      limit: 10,
      offset: 0,
    },
    sort: {
      sortBy: 'IdentityId',
      direction: 'asc',
    },
  })

  console.log('test api call response', test)

  return json({
    identities: test,
    hello: 'world',
  })
}

export default function Test() {
  const { identities } = useLoaderData<typeof loader>()
  console.log('identities', identities)
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">
        Rahul testing OpenAPI
        <PrivyButton />
      </div>
    </div>
  )
}
