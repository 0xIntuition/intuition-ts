import { Suspense, useEffect, useState } from 'react'

import {
  Claim,
  ListHeaderCard,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@0xintuition/1ui'
import { ClaimPresenter, ClaimsService } from '@0xintuition/api'

import { IdentitiesList } from '@components/list/identities'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { getListIdentities, getListIdentitiesCount } from '@lib/services/lists'
import { invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import {
  Await,
  useLoaderData,
  useNavigation,
  useRouteLoaderData,
  useSearchParams,
} from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { NO_CLAIM_ERROR, NO_PARAM_ID_ERROR, NO_WALLET_ERROR } from 'consts'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id

  invariant(id, NO_PARAM_ID_ERROR)

  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const paramWallet = searchParams.get('user')

  const claim = await fetchWrapper(request, {
    method: ClaimsService.getClaimById,
    args: { id },
  })

  invariant(claim.object?.id, NO_PARAM_ID_ERROR)

  const totalGlobalIdentitiesCount = getListIdentitiesCount({
    request,
    objectId: claim.object.id,
  })

  const totalUserIdentitiesCount = getListIdentitiesCount({
    request,
    objectId: claim.object.id,
    creator: wallet,
  })

  return defer({
    globalListIdentities: getListIdentities({
      request,
      objectId: claim.object.id,
      searchParams,
    }),
    userListIdentities: getListIdentities({
      request,
      objectId: claim.object.id,
      creator: wallet,
      searchParams,
    }),
    additionalUserListIdentities: paramWallet
      ? getListIdentities({
          request,
          objectId: claim.object.id,
          creator: paramWallet,
          searchParams,
        })
      : null,
    totalGlobalIdentitiesCount,
    totalUserIdentitiesCount,
    additionalTotalUserIdentitiesCount: paramWallet
      ? getListIdentitiesCount({
          request,
          objectId: claim.object.id,
          creator: paramWallet,
        })
      : null,
  })
}

export default function ListOverview() {
  const {
    globalListIdentities,
    userListIdentities,
    additionalUserListIdentities,
    totalGlobalIdentitiesCount,
    totalUserIdentitiesCount,
    additionalTotalUserIdentitiesCount,
  } = useLoaderData<typeof loader>()
  const { claim } =
    useRouteLoaderData<{ claim: ClaimPresenter }>('routes/app+/list+/$id') ?? {}
  invariant(claim, NO_CLAIM_ERROR)

  const [searchParams, setSearchParams] = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  const userWalletAddress = searchParams.get('user')

  const { state } = useNavigation()
  const defaultTab = searchParams.get('tab') || 'global'

  function handleTabChange(value: 'global' | 'you' | string) {
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
    <div className="flex-col justify-start items-start flex w-full gap-6">
      <div className="flex flex-col w-full pb-4">
        <Suspense fallback={<DataHeaderSkeleton />}>
          <Await resolve={totalGlobalIdentitiesCount} errorElement={<></>}>
            {(resolvedtotalIdentitiesCount) => (
              <ListHeaderCard
                label="Identities"
                value={resolvedtotalIdentitiesCount}
                className="mb-6"
              >
                <Claim
                  size="md"
                  subject={{
                    variant: claim.subject?.is_user ? 'user' : 'non-user',
                    label: '?',
                    imgSrc: null,
                  }}
                  predicate={{
                    variant: claim.predicate?.is_user ? 'user' : 'non-user',
                    label: claim.predicate?.is_user
                      ? claim.predicate?.user?.display_name ??
                        claim.predicate?.display_name
                      : claim.predicate?.display_name ?? '',
                    imgSrc: claim.predicate?.is_user
                      ? claim.predicate?.user?.image ?? claim.predicate?.image
                      : claim.predicate?.image ?? null,
                  }}
                  object={{
                    variant: claim.object?.is_user ? 'user' : 'non-user',
                    label: claim.object?.is_user
                      ? claim.object?.user?.display_name ??
                        claim.object?.display_name
                      : claim.object?.display_name ?? '',
                    imgSrc: claim.object?.is_user
                      ? claim.object?.user?.image ?? claim.object?.image
                      : claim.object?.image ?? null,
                  }}
                />
              </ListHeaderCard>
            )}
          </Await>
        </Suspense>
        <Tabs defaultValue={defaultTab}>
          <Suspense fallback={<PaginatedListSkeleton />}>
            <Await
              resolve={Promise.all([
                globalListIdentities,
                userListIdentities,
                additionalUserListIdentities,
              ])}
            >
              {([
                globalListIdentities,
                userListIdentities,
                additionalUserListIdentities,
              ]) => (
                <>
                  <TabsList>
                    <TabsTrigger
                      value="global"
                      label="Global"
                      // totalCount={
                      //   totalGlobalIdentitiesCount?.pagination.totalEntries
                      // }
                      onClick={(e) => {
                        e.preventDefault()
                        handleTabChange('global')
                      }}
                    />
                    <TabsTrigger
                      value="you"
                      label="You"
                      // totalCount={totalUserIdentitiesCount}
                      onClick={(e) => {
                        e.preventDefault()
                        handleTabChange('you')
                      }}
                    />
                    {userWalletAddress && (
                      <TabsTrigger
                        value="additional"
                        label="Additional"
                        // totalCount={additionalTotalUserIdentitiesCount}
                        onClick={(e) => {
                          e.preventDefault()
                          handleTabChange('additional')
                        }}
                      />
                    )}
                  </TabsList>
                  <TabsContent value="global">
                    {isNavigating ? (
                      <PaginatedListSkeleton />
                    ) : (
                      <Suspense fallback={<PaginatedListSkeleton />}>
                        <Await resolve={globalListIdentities}>
                          {(resolvedListIdentities) => (
                            <IdentitiesList
                              identities={resolvedListIdentities.listIdentities}
                              pagination={resolvedListIdentities.pagination}
                              enableSearch={true}
                              enableSort={true}
                            />
                          )}
                        </Await>
                      </Suspense>
                    )}
                  </TabsContent>
                  <TabsContent value="you">
                    {isNavigating ? (
                      <PaginatedListSkeleton />
                    ) : (
                      <Suspense fallback={<PaginatedListSkeleton />}>
                        <Await resolve={userListIdentities}>
                          {(resolvedListIdentities) => (
                            <IdentitiesList
                              identities={resolvedListIdentities.listIdentities}
                              pagination={resolvedListIdentities.pagination}
                              enableSearch={true}
                              enableSort={true}
                            />
                          )}
                        </Await>
                      </Suspense>
                    )}
                  </TabsContent>
                  {userWalletAddress && (
                    <TabsContent value="additional">
                      {isNavigating ? (
                        <PaginatedListSkeleton />
                      ) : (
                        <Suspense fallback={<PaginatedListSkeleton />}>
                          <Await resolve={additionalUserListIdentities}>
                            {(resolvedListIdentities) => (
                              <IdentitiesList
                                identities={
                                  resolvedListIdentities.listIdentities
                                }
                                pagination={resolvedListIdentities.pagination}
                                enableSearch={true}
                                enableSort={true}
                              />
                            )}
                          </Await>
                        </Suspense>
                      )}
                    </TabsContent>
                  )}
                </>
              )}
            </Await>
          </Suspense>
        </Tabs>
      </div>
    </div>
  )
}
