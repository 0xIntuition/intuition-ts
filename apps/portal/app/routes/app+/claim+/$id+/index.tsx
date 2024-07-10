import { useEffect, useState } from 'react'

import {
  ClaimPositionRow,
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
  Tabs,
  TabsList,
  TabsTrigger,
} from '@0xintuition/1ui'
import {
  ApiError,
  ClaimPositionsService,
  ClaimsService,
  OpenAPI,
  PositionSortColumn,
  SortDirection,
} from '@0xintuition/api'

import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import {
  calculateTotalPages,
  formatBalance,
  getAuthHeaders,
} from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useSearchParams } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'
import { formatUnits } from 'viem'

export async function loader({ request, params }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const id = params.id

  if (!id) {
    throw new Error('Claim ID is undefined.')
  }

  let claim
  try {
    if (!params.id) {
      return
    }

    claim = await ClaimsService.getClaimById({
      id: params.id,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      claim = undefined
      console.log(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const search = searchParams.get('search')
  const sortBy: PositionSortColumn =
    (searchParams.get('sortBy') as PositionSortColumn) ?? 'createdAt'
  const direction: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'
  const positionDirection: string =
    searchParams.get('positionDirection') ?? 'all'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  let positions
  try {
    positions = await ClaimPositionsService.getClaimPositions({
      id:
        positionDirection === 'for'
          ? claim?.vault_id ?? id
          : positionDirection === 'against'
            ? claim?.counter_vault_id ?? id
            : id,
      page: page,
      limit: Number(limit),
      offset: 0,
      sortBy: sortBy as PositionSortColumn,
      direction: direction as SortDirection,
      creator: search,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      positions = undefined
      console.log(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  const totalPages = calculateTotalPages(positions?.total ?? 0, Number(limit))

  return json({
    claim,
    positions,
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

export default function ClaimOverview() {
  return (
    <div className="flex-col justify-start items-start flex w-full">
      <PositionsOnClaim />
    </div>
  )
}

export function PositionsOnClaim() {
  const initialData = useLiveLoader<typeof loader>(['attest'])
  const { claim, pagination } = initialData
  const positions = initialData.positions?.data ?? []
  const [searchParams, setSearchParams] = useSearchParams()
  const [positionDirection, setPositionDirection] = useState<string>('all')

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

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      positionDirection: positionDirection,
      page: '1',
    })
  }, [positionDirection])

  return (
    <>
      <div className="flex-col justify-start items-start gap-3 flex w-full">
        <div className="self-stretch justify-between items-center inline-flex">
          <div className="grow shrink basis-0 text-white text-xl font-medium leading-[30px]">
            Positions on this Claim
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full mt-6">
        <Tabs defaultValue="">
          <TabsList>
            <TabsTrigger
              value=""
              label="All"
              totalCount={claim?.num_positions}
              onClick={(e) => {
                e.preventDefault()
                setPositionDirection('all')
              }}
            />
            <TabsTrigger
              value="for"
              label="For"
              totalCount={claim?.for_num_positions}
              onClick={(e) => {
                e.preventDefault()
                setPositionDirection('for')
              }}
            />
            <TabsTrigger
              value="against"
              label="Against"
              totalCount={claim?.against_num_positions}
              onClick={(e) => {
                e.preventDefault()
                setPositionDirection('against')
              }}
            />
          </TabsList>
        </Tabs>
      </div>
      <div className="flex flex-row justify-between w-full mt-6">
        <Input
          className="w-[196px]"
          startAdornment="magnifying-glass"
          placeholder="Search"
          onChange={handleSearchChange}
        />
        <Select
          onValueChange={(value) => {
            const selectedOption = options.find(
              (option) => option.value.toLowerCase() === value,
            )
            if (selectedOption) {
              handleSortChange(
                selectedOption.sortBy as PositionSortColumn,
                'desc',
              )
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
            <ClaimPositionRow
              variant="user"
              avatarSrc={position.user?.image ?? ''}
              name={position.user?.display_name ?? ''}
              walletAddress={position.user?.wallet ?? ''}
              amount={+formatBalance(BigInt(position.assets), 18, 4)}
              position={
                position.direction === 'for' ? 'claimFor' : 'claimAgainst'
              }
              feesAccrued={Number(
                formatUnits(BigInt(+position.assets - +position.value), 18),
              )}
              updatedAt={position.updated_at}
            />
          </div>
        ))}
      </div>
      <Pagination className="flex w-full justify-between">
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
