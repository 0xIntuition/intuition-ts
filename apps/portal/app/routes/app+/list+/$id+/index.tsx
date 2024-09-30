import { Suspense, useEffect, useState } from 'react'

import {
  Button,
  ButtonVariant,
  Claim,
  Icon,
  IconName,
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
import { InfoPopover } from '@components/info-popover'
import { TagsList } from '@components/list/tags'
import { ListTabIdentityDisplay } from '@components/lists/list-tab-identity-display'
import SaveListModal from '@components/save-list/save-list-modal'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getListClaims } from '@lib/services/lists'
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
import { requireUserWallet } from '@server/auth'
import {
  MULTIVAULT_CONTRACT_ADDRESS,
  NO_CLAIM_ERROR,
  NO_PARAM_ID_ERROR,
  NO_WALLET_ERROR,
} from 'app/consts'
import { VaultDetailsType } from 'app/types'
import { useAtom, useSetAtom } from 'jotai'

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

  return defer({
    wallet,
    userObject,
    globalListClaims: getListClaims({
      request,
      objectId: claim.object.id,
      searchParams,
    }),
    userListClaims: getListClaims({
      request,
      objectId: claim.object.id,
      searchParams,
      userWithPosition: userObject.id,
      userAssetsForPresent: true,
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

export default function ListOverview() {
  const {
    wallet,
    globalListClaims,
    userListClaims,
    additionalUserListClaims,
    userObject,
    additionalUserObject,
  } = useLiveLoader<typeof loader>(['create', 'attest'])

  const { claim, vaultDetails } =
    useRouteLoaderData<{
      claim: ClaimPresenter
      vaultDetails: VaultDetailsType
    }>('routes/app+/list+/$id') ?? {}
  invariant(claim, NO_CLAIM_ERROR)

  const [saveListModalActive, setSaveListModalActive] =
    useAtom(saveListModalAtom)

  const setAddIdentitiesListModalActive = useSetAtom(addIdentitiesListModalAtom)

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
      <div className="flex flex-row w-full justify-around md:justify-end gap-4">
        <Button
          variant="primary"
          onClick={() => {
            setAddIdentitiesListModalActive({
              isOpen: true,
              id: claim?.object?.id ?? null,
            })
          }}
        >
          <Icon name="plus-small" />
          Add to list
        </Button>
        <InfoPopover
          title="Save List"
          content="To add a List to &lsquo;your lists&rsquo;, you&lsquo;ll need to use the List! Save the List to your profile by staking on an entry in the List, or tagging something new with the List&lsquo;s Identity. For example - tagging [MetaMask] with [Wallet] will add the [Wallet] List to your Profile, for easy discoverability later!"
          icon={IconName.bookmark}
          trigger={
            <Button variant={ButtonVariant.primary}>
              <Icon name={IconName.bookmark} />
              Save list
            </Button>
          }
          side="bottom"
          align="end"
        />
      </div>
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
            <Suspense fallback={<Skeleton className="w-44 h-10 rounded" />}>
              <Await resolve={userListClaims}>
                {(resolvedUserListClaims) => (
                  <TabsTrigger
                    value="you"
                    label={
                      <ListTabIdentityDisplay imgSrc={userObject.image}>
                        You
                      </ListTabIdentityDisplay>
                    }
                    totalCount={resolvedUserListClaims?.pagination.totalEntries}
                    onClick={(e) => {
                      e.preventDefault()
                      handleTabChange('you')
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
                      claim={claim}
                      wallet={wallet}
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
                      claim={claim}
                      tag={claim.object}
                      wallet={wallet}
                      enableSearch={true}
                      enableSort={true}
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
                        claim={claim}
                        tag={claim.object}
                        wallet={wallet}
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
      <SaveListModal
        contract={claim.object?.contract ?? MULTIVAULT_CONTRACT_ADDRESS}
        identity={saveListModalActive.identity as IdentityPresenter}
        tag={claim.object as IdentityPresenter}
        userWallet={wallet}
        open={saveListModalActive.isOpen}
        onClose={() =>
          setSaveListModalActive({
            ...saveListModalActive,
            isOpen: false,
          })
        }
        min_deposit={vaultDetails?.min_deposit}
      />
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="list/$id/index" />
}
