import { Suspense } from 'react'

import { Text } from '@0xintuition/1ui'

import { ListClaimsList } from '@components/list/list-claims'
import { ListClaimsSkeletonLayout } from '@components/list/list-skeletons'
import { getUserSavedLists } from '@lib/services/lists'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
// import { getStandardPageParams } from '@lib/utils/params'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR } from 'consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  // const { page, limit, sortBy, direction } = getStandardPageParams({
  //   searchParams,
  // })

  return defer({
    savedListClaims: getUserSavedLists({ request, searchParams }),
  })
}

export default function ProfileLists() {
  const { savedListClaims } = useLoaderData<typeof loader>()
  logger('savedListClaims', savedListClaims)

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="self-stretch justify-between items-center inline-flex">
        <Text
          variant="headline"
          weight="medium"
          className="theme-secondary-foreground w-full"
        >
          My Lists
        </Text>
      </div>
      <Suspense fallback={<ListClaimsSkeletonLayout totalItems={6} />}>
        <Await resolve={savedListClaims}>
          {(resolvedSavedListClaims) => (
            <ListClaimsList
              listClaims={resolvedSavedListClaims.savedListClaims}
              pagination={resolvedSavedListClaims.pagination}
              enableSort={true}
              enableSearch={false}
              columns={3}
              onLoadMore={handleLoadMore}
            />
          )}
        </Await>
      </Suspense>
    </div>
  )
}
