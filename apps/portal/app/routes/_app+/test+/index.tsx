import { IdentitiesService, OpenAPI } from '@0xintuition/api'
import { PrivyButton } from '@client/privy-button'
import { getAuthHeaders } from '@lib/utils/misc'
import { LoaderFunctionArgs, json } from '@remix-run/node'
import { requireAuthedUser } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const { accessToken } = await requireAuthedUser(request)
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
    hello: 'world',
  })
}

export default function Test() {
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">
        Rahul testing OpenAPI
        <PrivyButton />
      </div>
    </div>
  )
}
