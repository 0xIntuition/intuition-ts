import { useEffect, useState } from 'react'

import {
  IdentityPosition,
  Input,
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPageCounter,
  PaginationPrevious,
  PaginationRowSelection,
  PaginationSummary,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@0xintuition/1ui'
import {
  ApiError,
  ClaimSortColumn,
  ClaimsService,
  IdentitiesService,
  OpenAPI,
  PositionPresenter,
  PositionSortColumn,
  PositionsService,
  SortDirection,
  UsersService,
} from '@0xintuition/api'

import { DataCreatedHeader } from '@components/profile/data-created-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import logger from '@lib/utils/logger'
import {
  calculateTotalPages,
  formatBalance,
  getAuthHeaders,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useFetcher, useSearchParams } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'
import { formatUnits } from 'viem'

export async function loader({ params, request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const wallet = params.wallet

  if (!wallet) {
    throw new Error('Wallet is undefined.')
  }

  let userIdentity
  try {
    userIdentity = await IdentitiesService.getIdentityById({
      id: wallet,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      userIdentity = undefined
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
    } else {
      throw error
    }
  }

  if (!userIdentity) {
    return redirect('/create')
  }

  let userTotals
  try {
    if (
      !userIdentity ||
      !userIdentity.creator ||
      typeof userIdentity.creator.id !== 'string'
    ) {
      logger('Invalid or missing creator ID')
      return
    }
    userTotals = await UsersService.getUserTotals({
      id: userIdentity.creator.id,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      userTotals = undefined
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
    } else {
      throw error
    }
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  // const search = searchParams.get('search')
  const sortBy = searchParams.get('sortBy') ?? 'UpdatedAt'
  const direction = searchParams.get('direction') ?? 'asc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  let positions
  try {
    positions = await PositionsService.searchPositions({
      creator: wallet,
      paging: {
        page: page,
        limit: Number(limit),
        offset: 0,
      },
      sort: {
        sortBy: sortBy as PositionSortColumn,
        direction: direction as SortDirection,
      },
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      positions = undefined
      console.log(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  let claims
  try {
    claims = await ClaimsService.searchClaims({
      identity: userIdentity?.id,
      page: page,
      limit: Number(limit),
      offset: 0,
      sortBy: sortBy as ClaimSortColumn,
      direction: direction as SortDirection,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      claims = undefined
      console.log(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  const totalPages = calculateTotalPages(positions?.total ?? 0, Number(limit))

  logger('positions', positions)

  return json({
    userIdentity,
    userTotals,
    positions,
    claims,
    sortBy,
    direction,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: positions?.total,
      totalPages,
    },
  })
}

export default function ProfileDataCreated() {
  return (
    <div className="flex-col justify-start items-start flex w-full">
      <div className="self-stretch justify-between items-center inline-flex mb-4">
        <div className="grow shrink basis-0 text-white text-xl font-medium leading-[30px]">
          Active Positions
        </div>
      </div>
      <PositionsByIdentity />
    </div>
  )
}

export function PositionsByIdentity() {
  const initialData = useLiveLoader<typeof loader>(['attest'])
  const { userIdentity, userTotals, pagination } = initialData
  const fetcher = useFetcher<typeof loader>()
  const [positions, setPositions] = useState<PositionPresenter[]>(
    initialData.positions?.data ?? [],
  )
  const [searchParams, setSearchParams] = useSearchParams()

  console.log('fetcher.data', fetcher.data)
  useEffect(() => {
    if (fetcher.data) {
      setPositions(fetcher.data.positions?.data as PositionPresenter[])
    }
  }, [fetcher.data])

  useEffect(() => {
    setPositions(initialData.positions?.data as PositionPresenter[])
  }, [initialData.positions])

  const options = [
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Total ETH', sortBy: 'Assets' },
  ]

  const handleSortChange = (
    newSortBy: PositionSortColumn,
    newDirection: SortDirection,
  ) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sortBy: newSortBy,
      direction: newDirection,
      page: '1',
    })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value
    setSearchParams({
      ...Object.fromEntries(searchParams),
      search: newSearchValue,
      page: '1',
    })
  }

  const onPageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: newPage.toString(),
    })
  }

  return (
    <>
      <DataCreatedHeader userIdentity={userIdentity} userTotals={userTotals} />
      <div className="flex flex-row justify-between w-full mt-6">
        <Input className="w-[196px]" onChange={handleSearchChange} />
        <Select
          onValueChange={(value) => {
            const selectedOption = options.find(
              (option) => option.value.toLowerCase() === value,
            )
            if (selectedOption) {
              handleSortChange(selectedOption.sortBy, 'desc')
            }
          }}
        >
          <SelectTrigger className="w-[200px] rounded-xl border border-primary-600 bg-primary-50/5 text-card-foreground transition-colors duration-150 hover:cursor-pointer hover:border-primary-400 hover:bg-primary-50/10 hover:text-primary-foreground">
            <SelectValue placeholder={`Sort by`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value.toLowerCase()}
                value={option.value.toLowerCase()}
              >
                {option.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-6 flex flex-col w-full">
        {positions?.map((position) => (
          <div
            key={position.id}
            className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex`}
          >
            <IdentityPosition
              variant="user"
              avatarSrc={position.user?.image}
              name={position.user?.display_name}
              walletAddress={position.user?.wallet}
              amount={formatBalance(BigInt(position.assets), 18, 4)}
              feesAccrued={Number(
                formatUnits(BigInt(+position.assets - +position.value), 18),
              )}
              updatedAt={position.updated_at}
            />
          </div>
        ))}
      </div>
      <Pagination className="flex w-full justify-between my-4">
        <PaginationSummary
          totalEntries={pagination.total ?? 0}
          label="positions"
        />
        <div className="flex">
          <PaginationRowSelection defaultValue="10" />
          <PaginationPageCounter
            currentPage={pagination.page ?? 0}
            totalPages={pagination.totalPages ?? 0}
          />
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst
                href="#"
                onClick={() => onPageChange(1)}
                disabled={pagination.page === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => onPageChange(pagination.page - 1)}
                disabled={
                  pagination.page === 1 || pagination.page === undefined
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => onPageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast
                href="#"
                onClick={() => onPageChange(pagination.totalPages)}
                disabled={pagination.page === pagination.totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </div>
      </Pagination>
    </>
  )
}
