import { useEffect, useState } from 'react'

import { Claim, ClaimRow, Identity, Input } from '@0xintuition/1ui'
import { ClaimPresenter, ClaimSortColumn } from '@0xintuition/api'

import { useSearchAndSortParamsHandler } from '@lib/hooks/useSearchAndSortParams'
import logger from '@lib/utils/logger'
import { formatBalance } from '@lib/utils/misc'
import { useFetcher } from '@remix-run/react'
import { loader } from 'app/root'
import { InitialIdentityData } from 'types/identity'

import { PaginationComponent } from './pagination-component'
import DataAboutHeader from './profile/data-about-header'
import { SortOption, SortSelect } from './sort-select'

export function ClaimsOnIdentity({
  initialData,
}: {
  initialData: InitialIdentityData
}) {
  const { identity, pagination } = initialData
  const fetcher = useFetcher<typeof loader>()
  const [claims, setClaims] = useState<ClaimPresenter[]>(
    initialData.claims?.data ?? [],
  )

  logger('fetcher.data', fetcher.data)
  useEffect(() => {
    if (fetcher.data) {
      setClaims(fetcher.data.claims?.data as ClaimPresenter[])
    }
  }, [fetcher.data])

  useEffect(() => {
    setClaims(initialData.claims?.data as ClaimPresenter[])
  }, [initialData.positions])

  const options: SortOption<ClaimSortColumn>[] = [
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Total ETH', sortBy: 'AssetsSum' },
  ]

  const { handleSortChange, handleSearchChange, onPageChange } =
    useSearchAndSortParamsHandler<ClaimSortColumn>()

  return (
    <>
      <DataAboutHeader
        title="Claims on this Identity"
        userIdentity={identity}
        totalClaims={initialData.claims?.total}
        totalStake={16.25} // TODO: Where does this come from? -- [ENG-2502]
      />
      <div className="flex flex-row justify-between w-full mt-6">
        <Input className="w-48" onChange={handleSearchChange} />
        <SortSelect options={options} handleSortChange={handleSortChange} />
      </div>
      <div className="mt-6 flex flex-col w-full">
        {claims?.map((claim) => (
          <div
            key={claim.claim_id}
            className="grow shrink basis-0 self-stretch p-6 bg-background first:rounded-t-xl last:rounded-b-xl theme-border flex-col justify-start gap-5 inline-flex"
          >
            <ClaimRow
              claimsFor={claim.for_num_positions}
              claimsAgainst={claim.against_num_positions}
              amount={+formatBalance(claim.assets_sum, 18, 4)}
            >
              <Claim
                subject={{
                  variant: claim.subject?.is_user
                    ? Identity.user
                    : Identity.nonUser,
                  label:
                    claim.subject?.user?.display_name ??
                    claim.subject?.display_name ??
                    claim.subject?.identity_id ??
                    '',
                  imgSrc: claim.subject?.image,
                }}
                predicate={{
                  variant: claim.predicate?.is_user ? 'user' : 'non-user',
                  label:
                    claim.predicate?.user?.display_name ??
                    claim.predicate?.display_name ??
                    claim.predicate?.identity_id ??
                    '',
                  imgSrc: claim.predicate?.image,
                }}
                object={{
                  variant: claim.object?.is_user ? 'user' : 'non-user',
                  label:
                    claim.object?.user?.display_name ??
                    claim.object?.display_name ??
                    claim.object?.identity_id ??
                    '',
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
