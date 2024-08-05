import { Suspense, useEffect, useState } from 'react'

import {
  Claim,
  ListHeaderCard,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@0xintuition/1ui'
import { ClaimPresenter, ClaimsService, UsersService } from '@0xintuition/api'

import { IdentitiesList } from '@components/list/identities'
import { ListTabIdentityDisplay } from '@components/list/list-tab-identity-display'
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
import { IdentityListType } from 'types'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id

  invariant(id, NO_PARAM_ID_ERROR)

  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const paramWallet = searchParams.get('user')

  const userObject = await fetchWrapper(request, {
    method: UsersService.getUserByWalletPublic,
    args: {
      wallet,
    },
  })

  const additionalUserObject = paramWallet
    ? await fetchWrapper(request, {
        method: UsersService.getUserByWalletPublic,
        args: {
          wallet: paramWallet,
        },
      })
    : null

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
    userObject,
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
      : [],
    additionalUserObject,
  })
}

export default function ListOverview() {
  const {
    globalListIdentities,
    userListIdentities,
    additionalUserListIdentities,
    totalGlobalIdentitiesCount,
    userObject,
    additionalUserObject,
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
          <TabsList>
            <Suspense fallback={<div>Loading...</div>}>
              <Await resolve={globalListIdentities}>
                {(resolvedGlobalListIdentities) => (
                  <TabsTrigger
                    value="global"
                    label="Global"
                    totalCount={
                      resolvedGlobalListIdentities?.pagination.totalEntries
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      handleTabChange('global')
                    }}
                  />
                )}
              </Await>
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <Await resolve={userListIdentities}>
                {(resolvedUserListIdentities) => (
                  <TabsTrigger
                    value="you"
                    label={
                      <ListTabIdentityDisplay imgSrc={userObject.image}>
                        You
                      </ListTabIdentityDisplay>
                    }
                    totalCount={
                      resolvedUserListIdentities?.pagination.totalEntries
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      handleTabChange('you')
                    }}
                  />
                )}
              </Await>
            </Suspense>
            {userWalletAddress && (
              <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={additionalUserListIdentities}>
                  {(resolvedAdditionalUserListIdentities) => (
                    <TabsTrigger
                      className="text-left"
                      value="additional"
                      totalCount={
                        resolvedAdditionalUserListIdentities?.pagination
                          .totalEntries
                      }
                      label={
                        <ListTabIdentityDisplay
                          imgSrc={additionalUserObject?.image}
                        >
                          {additionalUserObject?.display_name ?? 'Additional'}
                        </ListTabIdentityDisplay>
                      }
                      onClick={(e) => {
                        e.preventDefault()
                        handleTabChange('additional')
                      }}
                    />
                  )}
                </Await>
              </Suspense>
            )}
          </TabsList>
          <TabsContent value="global">
            <Suspense fallback={<PaginatedListSkeleton />}>
              <Await resolve={globalListIdentities}>
                {(resolvedGlobalListIdentities: IdentityListType | null) => {
                  if (!resolvedGlobalListIdentities) {
                    return <PaginatedListSkeleton />
                  }
                  return isNavigating ? (
                    <PaginatedListSkeleton />
                  ) : (
                    <IdentitiesList
                      identities={resolvedGlobalListIdentities.listIdentities}
                      pagination={resolvedGlobalListIdentities.pagination}
                      enableSearch={true}
                      enableSort={true}
                    />
                  )
                }}
              </Await>
            </Suspense>
          </TabsContent>
          <TabsContent value="you">
            <Suspense fallback={<PaginatedListSkeleton />}>
              <Await resolve={userListIdentities}>
                {(resolvedUserListIdentities: IdentityListType | null) => {
                  if (!resolvedUserListIdentities) {
                    return <PaginatedListSkeleton />
                  }
                  return isNavigating ? (
                    <PaginatedListSkeleton />
                  ) : (
                    <IdentitiesList
                      identities={resolvedUserListIdentities.listIdentities}
                      pagination={resolvedUserListIdentities.pagination}
                      enableSearch={true}
                      enableSort={true}
                    />
                  )
                }}
              </Await>
            </Suspense>
          </TabsContent>
          {userWalletAddress && !!additionalUserListIdentities && (
            <TabsContent value="additional">
              <Suspense fallback={<PaginatedListSkeleton />}>
                <Await resolve={additionalUserListIdentities}>
                  {(
                    resolvedAdditionalUserListIdentities: IdentityListType | null,
                  ) => {
                    return isNavigating ? (
                      <PaginatedListSkeleton />
                    ) : resolvedAdditionalUserListIdentities ? (
                      <IdentitiesList
                        identities={
                          resolvedAdditionalUserListIdentities.listIdentities
                        }
                        pagination={
                          resolvedAdditionalUserListIdentities.pagination
                        }
                        enableSearch={true}
                        enableSort={true}
                      />
                    ) : null
                  }}
                </Await>
              </Suspense>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
