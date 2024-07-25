import { NO_WALLET_ERROR } from 'constants'
import { Suspense, useEffect, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@0xintuition/1ui'

import { ListClaimsList } from '@components/list/list-claims'
import { ListOverview } from '@components/list/list-overview'
import {
  ListClaimsSkeletonLayout,
  TabsSkeleton,
} from '@components/list/list-skeletons'
import { getUserCreatedLists, getUserSavedLists } from '@lib/services/lists'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import {
  Await,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from '@remix-run/react'
import { requireUserWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  return defer({
    userCreatedListClaims: getUserCreatedLists({
      userWallet: wallet,
      searchParams,
    }),
    savedListClaims: getUserSavedLists({
      userWallet: wallet,
      searchParams,
    }),
  })
}

export default function ListsRoute() {
  const { userCreatedListClaims, savedListClaims } =
    useLoaderData<typeof loader>()
  logger('userCreatedListClaims', userCreatedListClaims)
  logger('savedListClaims', savedListClaims)

  const [searchParams, setSearchParams] = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)

  const { state } = useNavigation()
  const defaultTab = searchParams.get('tab') || 'created'

  function handleTabChange(value: 'saved' | 'created') {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('tab', value)
    newParams.delete('search')
    newParams.set('page', '1')
    setSearchParams(newParams)
    setIsNavigating(true)
  }

  useEffect(() => {
    if (state === 'idle') {
      setIsNavigating(false)
    }
  }, [state])

  return (
    <div className="m-8 flex flex-col">
      <ListOverview />
      <Tabs defaultValue={defaultTab}>
        <Suspense fallback={<TabsSkeleton />}>
          <Await
            resolve={Promise.all([savedListClaims, userCreatedListClaims])}
          >
            {([savedListClaims, userCreatedListClaims]) => (
              <>
                <TabsList>
                  <TabsTrigger
                    value="saved"
                    label="Saved"
                    totalCount={savedListClaims?.pagination.totalEntries}
                    onClick={(e) => {
                      e.preventDefault()
                      handleTabChange('saved')
                    }}
                  />
                  <TabsTrigger
                    value="created"
                    label="Created"
                    totalCount={userCreatedListClaims?.pagination.totalEntries}
                    onClick={(e) => {
                      e.preventDefault()
                      handleTabChange('created')
                    }}
                  />
                </TabsList>
                <TabsContent value="saved">
                  {isNavigating ? (
                    <ListClaimsSkeletonLayout
                      totalItems={savedListClaims?.pagination.totalEntries || 6}
                    />
                  ) : (
                    <Suspense
                      fallback={
                        <ListClaimsSkeletonLayout
                          totalItems={
                            savedListClaims?.pagination.totalEntries || 6
                          }
                        />
                      }
                    >
                      <Await resolve={savedListClaims}>
                        {(resolvedSavedListClaims) => (
                          <ListClaimsList
                            listClaims={resolvedSavedListClaims.savedListClaims}
                            pagination={resolvedSavedListClaims.pagination}
                            enableSort={true}
                            enableSearch={true}
                          />
                        )}
                      </Await>
                    </Suspense>
                  )}
                </TabsContent>
                <TabsContent value="created">
                  {isNavigating ? (
                    <ListClaimsSkeletonLayout
                      totalItems={
                        userCreatedListClaims?.pagination.totalEntries
                      }
                    />
                  ) : (
                    <Suspense
                      fallback={
                        <ListClaimsSkeletonLayout
                          totalItems={
                            userCreatedListClaims?.pagination.totalEntries
                          }
                        />
                      }
                    >
                      <Await resolve={userCreatedListClaims}>
                        {(resolvedUserCreatedListClaims) => (
                          <ListClaimsList
                            listClaims={
                              resolvedUserCreatedListClaims.userCreatedListClaims
                            }
                            pagination={
                              resolvedUserCreatedListClaims.pagination
                            }
                            enableSort={true}
                            enableSearch={true}
                          />
                        )}
                      </Await>
                    </Suspense>
                  )}
                </TabsContent>
              </>
            )}
          </Await>
        </Suspense>
      </Tabs>
    </div>
  )
}
