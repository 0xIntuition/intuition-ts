import { Suspense, useEffect, useState } from 'react'

import {
  Claim,
  ListHeaderCard,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Trunctacular,
} from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimsService,
  IdentityPresenter,
  UsersService,
} from '@0xintuition/api'

import { ErrorPage } from '@components/error-page'
import { TagsList } from '@components/list/tags'
import { ListTabIdentityDisplay } from '@components/lists/list-tab-identity-display'
import RemixLink from '@components/remix-link'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getListClaims } from '@lib/services/lists'
import {
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
  invariant,
} from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import {
  Await,
  useNavigation,
  useRouteLoaderData,
  useSearchParams,
} from '@remix-run/react'
import { fetchWrapper } from '@server/api'
import { NO_CLAIM_ERROR, NO_PARAM_ID_ERROR } from 'app/consts'
import { VaultDetailsType } from 'app/types'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const paramWallet = searchParams.get('user')

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

  return defer({
    globalListClaims: getListClaims({
      request,
      objectId: claim.object.id,
      searchParams,
    }),
    userListClaims: getListClaims({
      request,
      objectId: claim.object.id,
      searchParams,
    }),
    additionalUserListClaims: paramWallet
      ? getListClaims({
          request,
          objectId: claim.object.id,
          searchParams,
          userWithPosition: additionalUserObject?.id,
          userAssetsForPresent: true,
        })
      : null,
    additionalUserObject,
  })
}

export default function ReadOnlyListOverview() {
  const {
    globalListClaims,
    userListClaims,
    additionalUserListClaims,
    additionalUserObject,
  } = useLiveLoader<typeof loader>(['create', 'attest'])

  const { claim } =
    useRouteLoaderData<{
      claim: ClaimPresenter
      vaultDetails: VaultDetailsType
    }>('routes/readonly+/list+/$id') ?? {}
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
      <div className="flex flex-col gap-6 w-full">
        <Suspense fallback={<DataHeaderSkeleton />}>
          <Await resolve={globalListClaims} errorElement={<></>}>
            {(resolvedGlobalListClaims) => (
              <ListHeaderCard
                label="Identities"
                value={resolvedGlobalListClaims.pagination.totalEntries}
              >
                <Claim
                  size="md"
                  subject={{
                    variant: claim.subject?.is_user ? 'user' : 'non-user',
                    label: '?',
                    imgSrc: null,
                    shouldHover: false,
                  }}
                  predicate={{
                    variant: claim.predicate?.is_user ? 'user' : 'non-user',
                    label: getAtomLabel(claim.predicate as IdentityPresenter),
                    imgSrc: getAtomImage(claim.predicate as IdentityPresenter),
                    id: claim.predicate?.identity_id,
                    description: getAtomDescription(
                      claim.predicate as IdentityPresenter,
                    ),
                    ipfsLink: getAtomIpfsLink(
                      claim.predicate as IdentityPresenter,
                    ),
                    link: getAtomLink(
                      claim.predicate as IdentityPresenter,
                      true,
                    ),
                    linkComponent: RemixLink,
                  }}
                  object={{
                    variant: claim.object?.is_user ? 'user' : 'non-user',
                    label: getAtomLabel(claim.object as IdentityPresenter),
                    imgSrc: getAtomImage(claim.object as IdentityPresenter),
                    id: claim.object?.identity_id,
                    description: getAtomDescription(
                      claim.object as IdentityPresenter,
                    ),
                    ipfsLink: getAtomIpfsLink(
                      claim.object as IdentityPresenter,
                    ),
                    link: getAtomLink(claim.object as IdentityPresenter, true),
                    linkComponent: RemixLink,
                  }}
                />
              </ListHeaderCard>
            )}
          </Await>
        </Suspense>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <Tabs defaultValue={defaultTab}>
          <TabsList className="flex flex-row">
            <Suspense
              fallback={<Skeleton className="w-44 h-10 rounded mr-2" />}
            >
              <Await resolve={globalListClaims}>
                {(resolvedGlobalListClaims) => (
                  <TabsTrigger
                    value="global"
                    label="Global"
                    totalCount={
                      resolvedGlobalListClaims?.pagination.totalEntries
                    }
                    onClick={(e) => {
                      e.preventDefault()
                      handleTabChange('global')
                    }}
                  />
                )}
              </Await>
            </Suspense>
            {userWalletAddress && (
              <Suspense fallback={<Skeleton className="w-44 h-10 rounded" />}>
                <Await resolve={additionalUserListClaims}>
                  {(resolvedAdditionalUserListClaims) => (
                    <TabsTrigger
                      className="text-left"
                      value="additional"
                      totalCount={
                        resolvedAdditionalUserListClaims?.pagination
                          .totalEntries
                      }
                      label={
                        <ListTabIdentityDisplay
                          imgSrc={additionalUserObject?.image}
                        >
                          <Trunctacular
                            value={
                              additionalUserObject?.display_name ?? 'Additional'
                            }
                            maxStringLength={12}
                          />
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
          <TabsContent value="global" className="mt-6">
            <Suspense fallback={<PaginatedListSkeleton />}>
              <Await resolve={globalListClaims}>
                {(resolvedGlobalListClaims) => {
                  if (!resolvedGlobalListClaims) {
                    return <PaginatedListSkeleton />
                  }
                  return isNavigating ? (
                    <PaginatedListSkeleton />
                  ) : (
                    <TagsList
                      claims={resolvedGlobalListClaims.claims}
                      pagination={resolvedGlobalListClaims.pagination}
                      enableSearch={true}
                      enableSort={true}
                      readOnly={true}
                    />
                  )
                }}
              </Await>
            </Suspense>
          </TabsContent>
          <TabsContent value="you">
            <Suspense fallback={<PaginatedListSkeleton />}>
              <Await resolve={userListClaims}>
                {(resolvedUserListClaims) => {
                  if (!resolvedUserListClaims) {
                    return <PaginatedListSkeleton />
                  }
                  return isNavigating ? (
                    <PaginatedListSkeleton />
                  ) : (
                    <TagsList
                      claims={resolvedUserListClaims.claims}
                      pagination={resolvedUserListClaims.pagination}
                      enableSearch={true}
                      enableSort={true}
                      readOnly={true}
                    />
                  )
                }}
              </Await>
            </Suspense>
          </TabsContent>
          {userWalletAddress && !!additionalUserListClaims && (
            <TabsContent value="additional">
              <Suspense fallback={<PaginatedListSkeleton />}>
                <Await resolve={additionalUserListClaims}>
                  {(resolvedAdditionalUserListClaims) => {
                    return isNavigating ? (
                      <PaginatedListSkeleton />
                    ) : resolvedAdditionalUserListClaims ? (
                      <TagsList
                        claims={resolvedAdditionalUserListClaims.claims}
                        pagination={resolvedAdditionalUserListClaims.pagination}
                        enableSearch={true}
                        enableSort={true}
                        readOnly={true}
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

export function ErrorBoundary() {
  return <ErrorPage routeName="list/$id/index" />
}
