import { PrivyButton } from '@client/privy-button'
import logger from '@lib/utils/logger'
import { calculateTotalPages } from '@lib/utils/misc'
import { LoaderFunctionArgs, json } from '@remix-run/node'
import { isAuthedUser } from '@server/auth'
import { getIdentities } from '@server/identity'
import type { Identity } from '@types/identity'
import { ClientOnly } from 'remix-utils/client-only'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await isAuthedUser(request)
  logger('user', user)
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  // pagination
  const sortBy = searchParams.get('sortBy') ?? 'assets_sum'
  const direction = searchParams.get('direction') ?? 'desc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  // search
  const search = url.searchParams.get('search') || ''

  const { data: identities, total } = (await getIdentities(request, {
    page,
    limit: Number(limit),
    sortBy,
    direction,
    search,
  })) as {
    data: Identity[]
    total: number
  }

  logger('identites', identities)
  const totalPages = calculateTotalPages(total, Number(limit))

  // logger('identities', identities)
  return json({
    identities: identities ?? [],
    sortBy,
    direction,
    search,
    pagination: { page: Number(page), limit: Number(limit), total, totalPages },
  })
}

export default function App() {
  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">
        App Route
        <ClientOnly>{() => <PrivyButton />}</ClientOnly>
      </div>
    </div>
  )
}
