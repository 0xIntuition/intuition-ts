import { Suspense, useEffect, useState } from 'react'

import {
  Claim,
  ListHeaderCard,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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
import SaveListModal from '@components/save-list/save-list-modal'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getListIdentities, getListIdentitiesCount } from '@lib/services/lists'
import { addIdentitiesListModalAtom, saveListModalAtom } from '@lib/state/store'
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
import {
  MULTIVAULT_CONTRACT_ADDRESS,
  NO_CLAIM_ERROR,
  NO_PARAM_ID_ERROR,
} from 'app/consts'
import { IdentityListType, VaultDetailsType } from 'app/types'
import { useAtom, useSetAtom } from 'jotai'
import { ErrorBoundary } from '@sentry/remix'

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

  const totalGlobalIdentitiesCount = getListIdentitiesCount({
    request,
    objectId: claim.object.id,
  })

  return defer({
    // wallet,
    globalListIdentities: getListIdentities({
      request,
      objectId: claim.object.id,
      searchParams,
    }),
    userListIdentities: getListIdentities({
      request,
      objectId: claim.object.id,
      // creator: wallet,
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
    // totalUserIdentitiesCount,
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

export default function ReadOnlyListOverview() {
  const {
    // wallet,
    globalListIdentities,
    userListIdentities,
    additionalUserListIdentities,
    totalGlobalIdentitiesCount,

    additionalUserObject,
  } = useLiveLoader<typeof loader>(['create', 'attest'])

  const { claim, vaultDetails } =
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
          <Await resolve={totalGlobalIdentitiesCount} errorElement={<></>}>
            {(resolvedtotalIdentitiesCount) => (
              <ListHeaderCard
                label="Identities"
                value={resolvedtotalIdentitiesCount}
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
                    link: getAtomLink(claim.predicate as IdentityPresenter),
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
                    link: getAtomLink(claim.object as IdentityPresenter),
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
            {userWalletAddress && (
              <Suspense fallback={<Skeleton className="w-44 h-10 rounded" />}>
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
          <TabsContent value="global" className="mt-6">
            <Suspense fallback={<PaginatedListSkeleton />}>
              <Await resolve={globalListIdentities}>
                {(resolvedGlobalListIdentities: IdentityListType | null) => {
                  if (!resolvedGlobalListIdentities) {
                    return <PaginatedListSkeleton />
                  }
                  return isNavigating ? (
                    <PaginatedListSkeleton />
                  ) : (
                    // <TagsList
                    //   identities={resolvedGlobalListIdentities.listIdentities}
                    //   claims={resolvedGlobalListIdentities.claims}
                    //   pagination={resolvedGlobalListIdentities.pagination}
                    //   claim={claim}
                    //   wallet={wallet}
                    //   enableSearch={true}
                    //   enableSort={true}
                    // />
                    <div>placeholder</div>
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
                    <div>placeholder</div>
                    // <TagsList
                    //   identities={resolvedUserListIdentities.listIdentities}
                    //   claims={resolvedUserListIdentities.claims}
                    //   pagination={resolvedUserListIdentities.pagination}
                    //   claim={claim}
                    //   tag={claim.object}
                    //   wallet={wallet}
                    //   enableSearch={true}
                    //   enableSort={true}
                    // />
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
                      // <TagsList
                      //   identities={
                      //     resolvedAdditionalUserListIdentities.listIdentities
                      //   }
                      //   claims={resolvedAdditionalUserListIdentities.claims}
                      //   pagination={
                      //     resolvedAdditionalUserListIdentities.pagination
                      //   }
                      //   claim={claim}
                      //   tag={claim.object}
                      //   wallet={wallet}
                      //   enableSearch={true}
                      //   enableSort={true}
                      // />
                      <div>placeholder</div>
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
