import { useEffect, useState } from 'react'

import {
  Claim,
  ClaimRow,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@0xintuition/1ui'
import {
  ClaimPresenter,
  ClaimSortColumn,
  SortDirection,
} from '@0xintuition/api'

import { formatBalance } from '@lib/utils/misc'
import { useFetcher, useSearchParams } from '@remix-run/react'
import { loader } from 'app/root'
import { InitialIdentityData } from 'types/identity'

import { PaginationComponent } from './pagination-component'
import DataAboutHeader from './profile/data-about-header'

export function ClaimsOnIdentity({
  initialData,
}: {
  initialData: InitialIdentityData
}) {
  const { userIdentity, pagination } = initialData
  const fetcher = useFetcher<typeof loader>()
  const [claims, setClaims] = useState<ClaimPresenter[]>(
    initialData.claims?.data ?? [],
  )
  const [searchParams, setSearchParams] = useSearchParams()

  console.log('fetcher.data', fetcher.data)
  useEffect(() => {
    if (fetcher.data) {
      setClaims(fetcher.data.claims?.data as ClaimPresenter[])
    }
  }, [fetcher.data])

  useEffect(() => {
    setClaims(initialData.claims?.data as ClaimPresenter[])
  }, [initialData.positions])

  const options = [
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Total ETH', sortBy: 'AssetsSum' },
  ]

  const handleSortChange = (
    newSortBy: ClaimSortColumn,
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
      <DataAboutHeader
        title="Claims on this Identity"
        userIdentity={userIdentity}
        totalClaims={initialData.claims?.total}
        totalStake={16.25} // TODO: Where does this come from?
      />
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
        {claims?.map((claim) => (
          <div
            key={claim.claim_id}
            className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start  gap-5 inline-flex`}
          >
            <ClaimRow
              claimsFor={claim.for_num_positions}
              claimsAgainst={claim.against_num_positions}
              amount={+formatBalance(claim.assets_sum, 18, 4)}
            >
              <Claim
                subject={{
                  variant: claim.subject?.is_user ? 'user' : 'non-user',
                  label:
                    claim.subject?.user?.display_name ??
                    claim.subject?.display_name ??
                    claim.subject?.identity_id,
                  imgSrc: claim.subject?.image,
                }}
                predicate={{
                  variant: claim.predicate?.is_user ? 'user' : 'non-user',
                  label:
                    claim.predicate?.user?.display_name ??
                    claim.predicate?.display_name ??
                    claim.predicate?.identity_id,
                  imgSrc: claim.predicate?.image,
                }}
                object={{
                  variant: claim.object?.is_user ? 'user' : 'non-user',
                  label:
                    claim.object?.user?.display_name ??
                    claim.object?.display_name ??
                    claim.object?.identity_id,
                  imgSrc: claim.object?.image,
                }}
              />
            </ClaimRow>
          </div>
        ))}
      </div>
      <PaginationComponent
        totalEntries={pagination.total ?? 0}
        currentPage={pagination.page ?? 0}
        totalPages={pagination.totalPages ?? 0}
        onPageChange={onPageChange}
        label="claims"
      />
    </>
  )
}
