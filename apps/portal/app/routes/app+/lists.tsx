import {
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

import { ExploreSearch } from '@components/explore/ExploreSearch'
import { ListClaimsList } from '@components/list/list-claims'
import { TAG_PREDICATE_VAULT_ID_TESTNET } from '@lib/utils/constants'
import { NO_WALLET_ERROR } from '@lib/utils/errors'
import { calculateTotalPages, fetchWrapper, invariant } from '@lib/utils/misc'
import { getStandardPageParams } from '@lib/utils/params'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const { page, limit, sortBy, direction } = getStandardPageParams({
    searchParams,
  })
  const displayName = searchParams.get('list') || null

  const listClaims = await fetchWrapper({
    method: ClaimsService.searchClaims,
    args: {
      page,
      limit,
      sortBy: sortBy as ClaimSortColumn,
      direction,
      displayName,
      predicate: TAG_PREDICATE_VAULT_ID_TESTNET,
    },
  })

  const totalPages = calculateTotalPages(listClaims?.total ?? 0, limit)

  return json({
    listClaims: listClaims?.data as ClaimPresenter[],
    sortBy,
    direction,
    pagination: {
      currentPage: page,
      limit,
      totalEntries: listClaims?.total ?? 0,
      totalPages,
    },
  })
}

export default function ListsRoute() {
  const { listClaims, pagination } = useLoaderData<typeof loader>()

  return (
    <div className="m-8 flex flex-col">
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
      <Tabs defaultValue="saved">
        <TabsList>
          <TabsTrigger
            value="saved"
            label="Saved"
            // totalCount={resolvedClaim?.num_positions}
            // onClick={(e) => {
            //   e.preventDefault()
            //   handleTabChange(null)
            // }}
          />
          {/* <ListClaimsList
            listClaims={listClaims}
            pagination={pagination}
            enableSort={true}
            enableSearch={true}
          /> */}
          <TabsTrigger
            value="created"
            label="Created"
            // totalCount={resolvedClaim?.for_num_positions}
            // onClick={(e) => {
            //   e.preventDefault()
            //   handleTabChange('for')
            // }}
          />
          {/* <ListClaimsList
            listClaims={listClaims}
            pagination={pagination}
            enableSort={true}
            enableSearch={true}
          /> */}
        </TabsList>
        <TabsContent value="saved">
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
