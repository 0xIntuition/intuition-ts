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
  fetcher,
  GetAccountDocument,
  GetAccountQuery,
  GetAccountQueryVariables,
  GetAtomQuery,
  GetListDetailsDocument,
  GetListDetailsQuery,
  GetListDetailsQueryVariables,
  GetTripleQuery,
  useGetAccountQuery,
  useGetListDetailsQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import { InfoPopover } from '@components/info-popover'
import { TagsList } from '@components/list/tags'
import { ListTabIdentityDisplay } from '@components/lists/list-tab-identity-display'
import RemixLink from '@components/remix-link'
import SaveListModal from '@components/save-list/save-list-modal'
import { DataHeaderSkeleton, PaginatedListSkeleton } from '@components/skeleton'
import { addIdentitiesListModalAtom, saveListModalAtom } from '@lib/state/store'
import { getSpecialPredicate } from '@lib/utils/app'
import logger from '@lib/utils/logger'
import {
  getAtomDescriptionGQL,
  getAtomImageGQL,
  getAtomIpfsLinkGQL,
  getAtomLabelGQL,
  getAtomLinkGQL,
  invariant,
} from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import {
  useLoaderData,
  useNavigation,
  useRouteLoaderData,
  useSearchParams,
} from '@remix-run/react'
import { requireUserWallet } from '@server/auth'
import { QueryClient } from '@tanstack/react-query'
import {
  CURRENT_ENV,
  MULTIVAULT_CONTRACT_ADDRESS,
  NO_CLAIM_ERROR,
  NO_PARAM_ID_ERROR,
  NO_WALLET_ERROR,
} from 'app/consts'
import { useAtom, useSetAtom } from 'jotai'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const queryClient = new QueryClient()

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const paramWallet = searchParams.get('user')

  const queryAddress = wallet.toLowerCase()
  const additionalQueryAddress = paramWallet ? paramWallet.toLowerCase() : null

  const globalWhere = {
    predicateId: {
      _eq: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
    },
    objectId: {
      _eq: `%${id}%`,
    },
  }

  const userWhere = {
    predicateId: {
      _eq: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
    },
    objectId: {
      _eq: id,
    },
    vault: {
      positions: {
        accountId: {
          _eq: wallet.toLowerCase(),
        },
      },
    },
  }

  const additionalUserWhere = {
    predicateId: {
      _eq: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
    },
    objectId: {
      _eq: id,
    },
    vault: {
      positions: {
        accountId: {
          _eq: paramWallet,
        },
      },
    },
  }

  let accountResult: GetAccountQuery | null = null

  try {
    accountResult = await fetcher<GetAccountQuery, GetAccountQueryVariables>(
      GetAccountDocument,
      { address: queryAddress },
    )()

    if (!accountResult) {
      throw new Error('No account data found for address')
    }

    if (!accountResult.account?.atomId) {
      throw new Error('No atom ID found for account')
    }

    await queryClient.prefetchQuery({
      queryKey: ['get-account', { address: queryAddress }],
      queryFn: () => accountResult,
    })
  } catch (error) {
    logger('Query Error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      queryAddress,
    })
    throw error
  }

  let additionalAccountResult: GetAccountQuery | null = null

  try {
    additionalAccountResult = await fetcher<
      GetAccountQuery,
      GetAccountQueryVariables
    >(GetAccountDocument, { address: queryAddress })()

    if (!additionalAccountResult) {
      throw new Error('No account data found for address')
    }

    if (!additionalAccountResult.account?.atomId) {
      throw new Error('No atom ID found for account')
    }

    await queryClient.prefetchQuery({
      queryKey: ['get-additional-account', { address: additionalQueryAddress }],
      queryFn: () => additionalAccountResult,
    })
  } catch (error) {
    logger('Query Error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      queryAddress,
    })
    throw error
  }

  await queryClient.prefetchQuery({
    queryKey: [
      'get-list-details',
      {
        id,
      },
    ],
    queryFn: () =>
      fetcher<GetListDetailsQuery, GetListDetailsQueryVariables>(
        GetListDetailsDocument,
        {
          globalWhere,
          userWhere,
        },
      )(),
  })

  if (paramWallet) {
    const additionalUserWhere = {
      predicateId: {
        _eq: getSpecialPredicate(CURRENT_ENV).tagPredicate.vaultId,
      },
      objectId: { _eq: id },
      vault: {
        positions: {
          accountId: { _eq: paramWallet.toLowerCase() },
        },
      },
    }

    await queryClient.prefetchQuery({
      queryKey: ['get-additional-user-list-details', { additionalUserWhere }],
      queryFn: () =>
        fetcher<GetListDetailsQuery, GetListDetailsQueryVariables>(
          GetListDetailsDocument,
          {
            userWhere: additionalUserWhere,
          },
        )(),
    })
  }

  return defer({
    queryAddress,
    additionalQueryAddress,
    initialParams: {
      id,
      paramWallet,
      globalWhere,
      userWhere,
      additionalUserWhere,
    },
  })
}

export default function ListOverview() {
  const { queryAddress, additionalQueryAddress, initialParams } =
    useLoaderData<typeof loader>()

  const { data: accountResult } = useGetAccountQuery(
    {
      address: queryAddress,
    },
    {
      queryKey: ['get-account', { address: queryAddress }],
    },
  )

  const { data: additionalAccountResult } = useGetAccountQuery(
    {
      address: additionalQueryAddress ?? '',
    },
    {
      queryKey: ['get-additional-account', { address: additionalQueryAddress }],
      enabled: !!additionalQueryAddress,
    },
  )

  const { data: listDetailsData } = useGetListDetailsQuery(
    {
      globalWhere: initialParams.globalWhere,
      userWhere: initialParams.userWhere,
    },
    {
      queryKey: [
        'get-list-details',
        {
          globalWhere: initialParams.globalWhere,
          userWhere: initialParams.userWhere,
        },
      ],
    },
  )

  const { data: additionalUserData } = useGetListDetailsQuery(
    additionalQueryAddress
      ? { userWhere: initialParams.additionalUserWhere }
      : undefined,
    {
      queryKey: [
        'get-additional-user-list-details',
        { additionalUserWhere: initialParams.additionalUserWhere },
      ],
      enabled: !!additionalQueryAddress,
    },
  )

  const { tripleResult } =
    useRouteLoaderData<{
      tripleResult: GetTripleQuery
    }>('routes/app+/list+/$id') ?? {}
  invariant(tripleResult, NO_CLAIM_ERROR)

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
              id: tripleResult?.triple?.object?.vaultId ?? null,
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
          <ListHeaderCard
            label="Identities"
            value={
              listDetailsData?.globalTriplesAggregate.aggregate?.count ?? 0
            }
          >
            <Claim
              size="md"
              subject={{
                variant:
                  tripleResult?.triple?.subject?.type === 'Account' ||
                  tripleResult?.triple?.subject?.type === 'Default'
                    ? 'user'
                    : 'non-user',
                label: '?',
                imgSrc: null,
                shouldHover: false,
              }}
              predicate={{
                variant:
                  tripleResult?.triple?.predicate?.type === 'Account' ||
                  tripleResult?.triple?.predicate?.type === 'Default'
                    ? 'user'
                    : 'non-user',
                label: getAtomLabelGQL(
                  tripleResult?.triple?.predicate as GetAtomQuery['atom'],
                ),
                imgSrc: getAtomImageGQL(
                  tripleResult?.triple?.predicate as GetAtomQuery['atom'],
                ),
                id:
                  tripleResult?.triple?.predicate?.type === 'Account' ||
                  tripleResult?.triple?.predicate?.type === 'Default'
                    ? tripleResult?.triple?.object?.walletId
                    : tripleResult?.triple?.object?.id,
                description: getAtomDescriptionGQL(
                  tripleResult?.triple?.predicate as GetAtomQuery['atom'],
                ),
                ipfsLink: getAtomIpfsLinkGQL(
                  tripleResult?.triple?.predicate as GetAtomQuery['atom'],
                ),
                link: getAtomLinkGQL(
                  tripleResult?.triple?.predicate as GetAtomQuery['atom'],
                ),
                linkComponent: RemixLink,
              }}
              object={{
                variant:
                  tripleResult?.triple?.object?.type === 'Account' ||
                  tripleResult?.triple?.object?.type === 'Default'
                    ? 'user'
                    : 'non-user',
                label: getAtomLabelGQL(
                  tripleResult?.triple?.object as GetAtomQuery['atom'],
                ),
                imgSrc: getAtomImageGQL(
                  tripleResult?.triple?.object as GetAtomQuery['atom'],
                ),
                id:
                  tripleResult?.triple?.predicate?.type === 'Account' ||
                  tripleResult?.triple?.predicate?.type === 'Default'
                    ? tripleResult?.triple?.object?.walletId
                    : tripleResult?.triple?.object?.id,
                description: getAtomDescriptionGQL(
                  tripleResult?.triple?.object as GetAtomQuery['atom'],
                ),
                ipfsLink: getAtomIpfsLinkGQL(
                  tripleResult?.triple?.object as GetAtomQuery['atom'],
                ),
                link: getAtomLinkGQL(
                  tripleResult?.triple?.object as GetAtomQuery['atom'],
                ),
                linkComponent: RemixLink,
              }}
            />
          </ListHeaderCard>
        </Suspense>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <Tabs defaultValue={defaultTab}>
          <TabsList className="flex flex-row">
            <Suspense
              fallback={<Skeleton className="w-44 h-10 rounded mr-2" />}
            >
              <TabsTrigger
                value="global"
                label="Global"
                totalCount={
                  listDetailsData?.globalTriplesAggregate.aggregate?.count ?? 0
                }
                onClick={(e) => {
                  e.preventDefault()
                  handleTabChange('global')
                }}
              />
            </Suspense>
            <Suspense fallback={<Skeleton className="w-44 h-10 rounded" />}>
              <TabsTrigger
                value="you"
                label={
                  <ListTabIdentityDisplay
                    imgSrc={accountResult?.account?.image}
                  >
                    You
                  </ListTabIdentityDisplay>
                }
                totalCount={
                  listDetailsData?.globalTriplesAggregate.aggregate?.count ?? 0
                }
                onClick={(e) => {
                  e.preventDefault()
                  handleTabChange('you')
                }}
              />
            </Suspense>
            {userWalletAddress && (
              <Suspense fallback={<Skeleton className="w-44 h-10 rounded" />}>
                <TabsTrigger
                  className="text-left"
                  value="additional"
                  totalCount={
                    additionalUserData?.userTriplesAggregate.aggregate?.count ??
                    0
                  }
                  label={
                    <ListTabIdentityDisplay
                      imgSrc={additionalAccountResult?.account?.image}
                    >
                      {additionalAccountResult?.account?.label ?? 'Additional'}
                    </ListTabIdentityDisplay>
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    handleTabChange('additional')
                  }}
                />
              </Suspense>
            )}
          </TabsList>
          <TabsContent value="global" className="mt-6">
            <Suspense fallback={<PaginatedListSkeleton />}>
              {listDetailsData?.globalTriples ? (
                isNavigating ? (
                  <PaginatedListSkeleton />
                ) : (
                  <TagsList
                    triples={listDetailsData.globalTriples}
                    enableSearch={true}
                    enableSort={true}
                  />
                )
              ) : null}
            </Suspense>
          </TabsContent>
          <TabsContent value="you">
            <Suspense fallback={<PaginatedListSkeleton />}>
              {listDetailsData?.userTriples ? (
                isNavigating ? (
                  <PaginatedListSkeleton />
                ) : (
                  <TagsList
                    triples={listDetailsData.userTriples}
                    enableSearch={true}
                    enableSort={true}
                  />
                )
              ) : null}
            </Suspense>
          </TabsContent>
          {userWalletAddress && !!additionalUserData && (
            <TabsContent value="additional">
              <Suspense fallback={<PaginatedListSkeleton />}>
                {isNavigating ? (
                  <PaginatedListSkeleton />
                ) : additionalUserData?.userTriples ? (
                  <TagsList
                    triples={additionalUserData?.userTriples}
                    enableSearch={true}
                    enableSort={true}
                  />
                ) : null}
              </Suspense>
            </TabsContent>
          )}
        </Tabs>
      </div>
      <SaveListModal
        contract={MULTIVAULT_CONTRACT_ADDRESS}
        atom={saveListModalActive.identity}
        tagAtom={tripleResult?.triple?.object as GetAtomQuery['atom']}
        userWallet={queryAddress}
        open={saveListModalActive.isOpen}
        onClose={() =>
          setSaveListModalActive({
            ...saveListModalActive,
            isOpen: false,
          })
        }
      />
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="list/$id/index" />
}
