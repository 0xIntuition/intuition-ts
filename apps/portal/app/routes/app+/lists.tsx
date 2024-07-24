import { Suspense, useEffect, useState } from 'react'

import {
  Button,
  Icon,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
} from '@0xintuition/api'

import { ListClaimsList } from '@components/list/list-claims'
import { getUserCreatedLists, getUserSavedLists } from '@lib/services/lists'
import { TAG_PREDICATE_VAULT_ID_TESTNET } from '@lib/utils/constants'
import { NO_WALLET_ERROR } from '@lib/utils/errors'
import logger from '@lib/utils/logger'
import { calculateTotalPages, fetchWrapper, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { defer, json, LoaderFunctionArgs } from '@remix-run/node'
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
      <Tabs defaultValue="saved">
        <Suspense fallback={<TabsSkeleton />}>
          <Await
            resolve={Promise.all([savedListClaims, userCreatedListClaims])}
          >
            {([savedListClaims, userCreatedListClaims]) => (
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
            )}
          </Await>
        </Suspense>
      </Tabs>
    </div>
  )
}

function TabsSkeleton() {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <Skeleton className="w-44 h-10" />
      <Skeleton className="w-44 h-10" />
    </div>
  )
}

{
  /* <TabsContent value="saved">
          <ListClaimsList
            listClaims={listClaims}
            pagination={pagination}
            enableSort={true}
            enableSearch={true}
          />
        </TabsContent>
        <TabsContent value="created">
          <ListClaimsList
            listClaims={listClaims}
            pagination={pagination}
            enableSort={true}
            enableSearch={true}
          />
        </TabsContent> */
}
