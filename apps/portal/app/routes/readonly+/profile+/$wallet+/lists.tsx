import { Suspense, useEffect, useState } from 'react'

import { Text } from '@0xintuition/1ui'
import { ClaimPresenter, ClaimSortColumn } from '@0xintuition/api'

import { ErrorPage } from '@components/error-page'
import { ListClaimsList } from '@components/list/list-claims'
import { ListClaimsSkeletonLayout } from '@components/lists/list-skeletons'
import { SortOption } from '@components/sort-select'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getUserSavedLists } from '@lib/services/lists'
import { invariant, loadMore } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await, useSearchParams, useSubmit } from '@remix-run/react'
import { NO_PARAM_ID_ERROR } from 'app/consts'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const wallet = params.wallet
  invariant(wallet, NO_PARAM_ID_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { page, sortBy, direction } = getStandardPageParams({
    searchParams,
  })

  const initialLimit = 200
  const effectiveLimit = Number(
    searchParams.get('effectiveLimit') || initialLimit,
  )
  const limit = Math.max(effectiveLimit, initialLimit)

  return defer({
    savedListClaims: getUserSavedLists({
      request,
      userWallet: wallet,
      searchParams,
      limit,
    }),
    page,
    limit,
    sortBy,
    direction,
    wallet,
  })
}

type JsonifyObject<T> = {
  [P in keyof T]: T[P] extends object ? JsonifyObject<T[P]> : T[P]
}

export default function ReadOnlyProfileLists() {
  const { savedListClaims, wallet, sortBy, direction } = useLiveLoader<
    typeof loader
  >(['create', 'attest'])
  const [searchParams] = useSearchParams()

  const submit = useSubmit()
  const [accumulatedClaims, setAccumulatedClaims] = useState<
    JsonifyObject<ClaimPresenter>[]
  >([])

  const currentPage = Number(searchParams.get('page') || '1')

  useEffect(() => {
    if (currentPage === 1) {
      setAccumulatedClaims([])
    }
  }, [currentPage])

  const handleLoadMore = (
    resolvedSavedListClaims: Awaited<typeof savedListClaims>,
  ) => {
    const loadMoreFunction = loadMore({
      currentPage,
      pagination: resolvedSavedListClaims.pagination,
      sortBy,
      direction,
      submit,
    })

    loadMoreFunction()
  }

  const sortOptions: SortOption<ClaimSortColumn>[] = [
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="self-stretch justify-between items-center inline-flex">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground w-full"
        >
          My Lists
        </Text>
      </div>
      <Suspense fallback={<ListClaimsSkeletonLayout totalItems={6} />}>
        <Await resolve={savedListClaims}>
          {(resolvedSavedListClaims) => {
            setAccumulatedClaims((prev) => {
              if (currentPage === 1) {
                return resolvedSavedListClaims.savedListClaims
              }
              return [...prev, ...resolvedSavedListClaims.savedListClaims]
            })
            return (
              <ListClaimsList
                listClaims={accumulatedClaims}
                pagination={resolvedSavedListClaims.pagination}
                enableSort={true}
                enableSearch={true}
                columns={3}
                onLoadMore={() => handleLoadMore(resolvedSavedListClaims)}
                sortOptions={sortOptions}
                sourceUserAddress={wallet}
                readOnly={true}
              />
            )
          }}
        </Await>
      </Suspense>
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/lists" />
}
