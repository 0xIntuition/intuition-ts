import { Suspense, useEffect, useState } from 'react'

import {
  Button,
  Icon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@0xintuition/1ui'

import { ListClaimsList } from '@components/list/list-claims'
import {
  ListClaimsSkeletonLayout,
  TabsSkeleton,
} from '@components/list/list-skeletons'
import { getUserCreatedLists, getUserSavedLists } from '@lib/services/lists'
import { NO_WALLET_ERROR } from '@lib/utils/errors'
import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import {
  Await,
  useLoaderData,
  useNavigate,
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
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)

  const { state } = useNavigation()
  const defaultTab = searchParams.get('tab') || 'saved'

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
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col mb-10">
          <Text
            variant="headline"
            weight="medium"
            className="theme-secondary-foreground w-full"
          >
            Lists
          </Text>
          <Text
            variant="footnote"
            weight="regular"
            className="theme-secondary-foreground/50"
          >
            Begin the process of establishing a new digital
            <br />
            representation within the blockchain network.
          </Text>
        </div>
        <div className="flex flex-row gap-2.5">
          <Button
            variant="secondary"
            onClick={() => navigate(`/app/explore/lists`)}
          >
            <Icon name="magnifying-glass" className="mr-2" />
            Explore
          </Button>
          <Button variant="secondary">
            <Icon
              name="plus-small"
              className="mr-2"
              onClick={() => logger('create new list clicked')} // TODO: [ENG-2798] - add the create list functionality
            />
            Create new list
          </Button>
        </div>
      </div>
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
